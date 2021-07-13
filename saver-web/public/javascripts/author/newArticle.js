
class Editor {

	constructor() {
		this.briefingEditor;
		this.paragraphsEditor;
	}

	createEditor = (selector, editorContent) => {
		if ($(selector)) {
			const editor = $(selector).summernote();
			$(selector).summernote('code', editorContent)

			// 붙여넣을 경우 이벤트리스너
			editor.on('summernote.paste', function (e, ne) {
				setTimeout(() => {
					var badAttributes = ['style', 'width', 'hegith'];
					let output = editor.summernote('code');

					// 문자열에서 style="" 어트리뷰트를 공백으로 치환
					for (var i = 0; i < badAttributes.length; i++) {
						var attributeStripper = new RegExp(' ' + badAttributes[i] + '="(.*?)"', 'gi');
						output = output.replace(attributeStripper, '');
					}
					editor.summernote('code', output)
				}, 10)
			})

			return editor;
		} else {
			throw '셀렉터를 확인해주세요';
		}
	}
	getBriefingMarkUp = () => {
		const content = this.briefingEditor.summernote('code');
		return content;
	}

	getParagraphsMarkUp = () => {
		const content = this.paragraphsEditor.summernote('code');
		return content;
	}

	createArticle = (data) => {
		axios({
			method: 'post',
			url: `/author/createArticle`,
			data,
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		}).then((res) => {
			if (res.data.result) {
				alert('등록되었습니다');
				location.href = '/author/articles';
			}
		}).catch((err) => {
			alert('실패하였습니다');
			console.error(err);
		})
	};

	getForm = (status) => {
		const payload = new FormData();
		payload.append('status', status);
		payload.append('category', $('#category')[0].value);
		payload.append('headline', $('#headline')[0].value);
		if ($('#picture')[0].files[0]) {
			payload.append('picture', $('#picture')[0].files[0], $('#picture')[0].files[0].name);
			// 이미지는 blob타입으로 formData에 저장되며, 해당 경우 세번째 파라미터에 파일이름을 지정해줘야한다.
		}
		payload.append('imageDesc', $('#imageDesc')[0].value);
		payload.append('imageFrom', $('#imageFrom')[0].value);
		payload.append('briefing',  escape(this.getBriefingMarkUp()));
		payload.append('paragraphs',  escape(this.getParagraphsMarkUp()));
		return payload;
	}

	addEvent = () => {
		$('form').on('submit', (e) => {
			e.preventDefault()
		})
		$('button[name="saveBtn"]').on('click', async () => {
			const briefing = this.getBriefingMarkUp();
			if (!briefing) {
				alert('100자 브리핑이 비어있습니다!')
				return 0;
			}
			window.removeEventListener('beforeunload', confirmExit);
			const form = this.getForm(STATUS.DRAFTS);
			this.createArticle(form)
		});

		$('button[name="completeBtn"]').on('click', async () => {
			if (!this.getBriefingMarkUp()) {
				alert('100자 브리핑이 비어있습니다!')
				return 0;
			}
			window.removeEventListener('beforeunload', confirmExit);
			const form = this.getForm(STATUS.COMPLETED);
			this.createArticle(form)
		});
	}

	init = (briefingContent, paragraphsContent) => {
		console.log({ briefingContent, paragraphsContent });
		this.briefingEditor = this.createEditor('#editor_briefing', briefingContent)
		this.paragraphsEditor = this.createEditor('#editor_paragraphs', paragraphsContent)
	}
}


$(document).ready(function () {
	window.addEventListener('beforeunload', confirmExit);
	const editor = new Editor();
	editor.init('', '')
	editor.addEvent()
});

window.addEventListener('beforeunload', confirmExit);

function confirmExit() {
	return "정말 페이지를 벗어나시겠습니까?";
}