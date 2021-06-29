const STATUS = {
	DRAFTS: 1,
	COMPLETED: 2
}
class ArticlePage {
	editor;

	constructor() {

	}

	getEditorJSON = async () => {
		const content = await this.editor.save();
		const json = JSON.stringify(content);
		return json;
	}
	createArticle = (data) => {
		axios({
			method: 'post',
			url: '/author/createArticle',
			data,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => {
			console.error(res.data);
			if (res.data.result) {
				alert('등록되었습니다');
				location.href = '/author/articles';
			}
		}).catch((err) => {
			alert('실패');
			console.error(err);
		})
	};

	getForm = async (status) => {

		const titles = Array.from(document.querySelectorAll('.paragraph-item__title')).map(el => el.value);
		const contents = Array.from(document.querySelectorAll('.paragraph-item__content')).map(el => el.value);
		const payload = new FormData();


		payload.append('status', status);
		payload.append('category', $('#category')[0].value);
		payload.append('headline', $('#headline')[0].value);
		payload.append('picture', $('#picture')[0].files[0], $('#picture')[0].files[0].name);
		// 이미지는 blob타입으로 formData에 저장되며, 해당 경우 세번째 파라미터에 파일이름을 지정해줘야한다.
		payload.append('picture', $('#picture')[0].value); // 이미지 파일임
		payload.append('imageDesc', $('#imageDesc')[0].value);
		payload.append('imageFrom', $('#imageFrom')[0].value);
		payload.append('briefing', await this.getEditorJSON());
		const paragraphs = JSON.stringify(titles.map((title, index) => ({ title, content: contents[index] })));
		payload.append('paragraphs', paragraphs);
		return payload;
	}

	addEvent = () => {
		$('form').on('submit', (e) => {
			e.preventDefault()
		})
		$('button[name="saveBtn"]').on('click', async () => {
			const briefing = await this.editor.save();
			if (briefing.blocks.length === 0) {
				alert('100자 브리핑이 비어있습니다!')
				return 0;
			}
			window.removeEventListener('beforeunload', confirmExit);
			const form = await this.getForm(STATUS.DRAFTS);
			this.createArticle(form)
		});

		$('button[name="completeBtn"]').on('click', async () => {
			const briefing = await this.editor.save();
			if (briefing.blocks.length === 0) {
				alert('100자 브리핑이 비어있습니다!')
				return 0;
			}
			window.removeEventListener('beforeunload', confirmExit);
			const form = await this.getForm(STATUS.COMPLETED);
			this.createArticle(form)
		});
	}

	initEditorJS = () => {
		this.editor = new EditorJS({
			holder: 'editorjs',
			tools: {
				linkTool: {
					class: LinkTool, // ejs파일에서 불러옴
					config: {
						endpoint: '', // 크롤링해오는 기능은 사용하지 않음 (newArticle.ejs에서 css로 버튼 가림)
					}
				},
				list: {
					class: NestedList,
					inlineToolbar: true,
				},
				image: {
					class: ImageTool,
					config: {
						endpoints: {
							byFile: '/articles/upload/image', // Your backend file uploader endpoint
							byUrl: '/articles/fetch/image', // Your endpoint that provides uploading by Url
						}
					}
				}
			},
		});
	}
}

const page = new ArticlePage();
page.addEvent();
page.initEditorJS();

window.addEventListener('beforeunload', confirmExit);

function confirmExit() {
	return "정말 페이지를 벗어나시겠습니까?";
}