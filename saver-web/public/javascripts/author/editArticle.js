// TODO: 유저페이지 스타일 추가
// TODO: 기존 데이터 다 작성하기
// TODO: 백업본 만들기
// TODO: seeder 만들기
// TODO: Editor.js 없에기
// TODO: 테스트 서버올려보기
// TODO: thesaver.io에 올려보₩기

class Editor {

	constructor() {
		this.briefingEditor;
		this.paragraphsEditor;
		this.articleId = location.pathname.split("edit/")[1];
	}

	createEditor = (selector, editorContent) => {
		if ($(selector)) {
			const editor = $(selector).summernote();
			$(selector).summernote('code', editorContent)
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

	editArticle = (data, articleId) => {
		axios({
			method: 'post',
			url: `/author/articles/edit/${articleId}`,
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

	getForm = async (status) => {
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
		payload.append('briefing', escape(this.getBriefingMarkUp()));
		payload.append('paragraphs', escape(this.getParagraphsMarkUp()));
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

	init = (briefingContent, paragraphsContent) => {
		console.log({ briefingContent, paragraphsContent });
		this.briefingEditor = this.createEditor('#editor_briefing', briefingContent)
		this.paragraphsEditor = this.createEditor('#editor_paragraphs', paragraphsContent)
	}
}


$(document).ready(function () {
	window.addEventListener('beforeunload', confirmExit);
	const editor = new Editor();
	editor.init(unescape(briefingContent), unescape(paragraphsContent))
	editor.addEvent()
});

function confirmExit() {
	return "정말 페이지를 벗어나시겠습니까?";
}
