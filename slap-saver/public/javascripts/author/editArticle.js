const STATUS = {
	DRAFTS: 1,
	COMPLETED: 2
}
class ArticlePage {

	constructor() {
		this.editor;
		this.articleId = location.pathname.split("edit/")[1];
	}

	getEditorJSON = async () => {
		const content = await this.editor.save();
		const json = JSON.stringify(content);
		console.log({ json });
		return json;
	}

	editArticle = (data, articleId) => {
		axios({
			method: 'post',
			url: `/author/articles/edit/${articleId}`,
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
			alert('실패하였습니다');
			console.error(err);
		})
	};

	getForm = async (status) => {
		const titles = Array.from(document.querySelectorAll('.paragraph-item__title')).map(el => el.value);
		const contents = Array.from(document.querySelectorAll('.paragraph-item__content')).map(el => el.value);
		const payload = new FormData();


		payload.append('status', status);
		payload.append('category', $('#category')[0].selectedIndex);
		payload.append('headline', $('#headline')[0].value);
		if ($('#picture')[0].files[0]) {
			payload.append('picture', $('#picture')[0].files[0], $('#picture')[0].files[0].name);
			// 이미지는 blob타입으로 formData에 저장되며, 해당 경우 세번째 파라미터에 파일이름을 지정해줘야한다.
			payload.append('picture', $('#picture')[0].value); // 이미지 파일임
		}
		payload.append('imageDesc', $('#imageDesc')[0].value);
		payload.append('imageFrom', $('#imageFrom')[0].value);
		payload.append('briefing', await this.getEditorJSON());
		const paragraphs = JSON.stringify(titles.map((title, index) => ({ title, content: contents[index] })));
		payload.append('paragraphs', paragraphs);
		return payload;

	}

	addEvent = () => {
		$('button[name="saveBtn"]').on('click', async () => {
			window.removeEventListener('beforeunload', confirmExit);
			const form = await this.getForm(STATUS.DRAFTS);
			this.editArticle(form, this.articleId)
		});

		$('button[name="completeBtn"]').on('click', async () => {
			window.removeEventListener('beforeunload', confirmExit);
			const form = await this.getForm(STATUS.COMPLETED);
			this.editArticle(form, this.articleId)
		});
	}


	initEditorJS = (editorContent) => {
		this.editor = new EditorJS({
			holder: 'editorjs',
			data: editorContent,
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
page.initEditorJS(editorContent); // editorContent는 ejs에서 받아옴
window.addEventListener('beforeunload', confirmExit);

function confirmExit() {
	return "정말 페이지를 벗어나시겠습니까?";
}