class Editor {

	constructor() {
	}

	addContent = (selector, editorContent) => {
		if ($(selector)) {
			$(selector).append(editorContent)
		} else {
			throw '셀렉터를 확인해주세요';
		}
	}

	init = (briefingContent, paragraphsContent) => {
		this.addContent('#editor_briefing', briefingContent)
		this.addContent('#editor_paragraphs', paragraphsContent)
	}
}


$(document).ready(function () {
	const editor = new Editor();
	editor.init(unescape(briefingContent), unescape(paragraphsContent))
});

