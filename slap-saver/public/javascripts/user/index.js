function initEditor(id, briefing) {
	const editor = new EditorJS({
		holder: `editorjs_${id}`,
		data: briefing,
		readOnly: true,
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

/***
 * 함수 시작
 */
function initPage() {
	console.log(articles);
	articles.map(item => {
		initEditor(item.id, item.briefing);
	})
}
initPage()