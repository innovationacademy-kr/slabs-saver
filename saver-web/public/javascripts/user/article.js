class Editor {
  constructor() {}

  addContent = (selector, editorContent) => {
    if ($(selector)) {
      $(selector).append(editorContent);
    } else {
      throw '셀렉터를 확인해주세요';
    }
  };

  init = (briefingContent, paragraphsContent) => {
    this.addContent('#editor_briefing', briefingContent);
    this.addContent('#editor_paragraphs', paragraphsContent);
  };
}

$(document).ready(function () {
  const editor = new Editor();
  editor.init(unescape(briefingContent), unescape(paragraphsContent));

  const pathname = window.location.pathname;
  const article = {
    path: pathname.substring(1, pathname.length),
    headline: document.title,
    briefing: briefingContent,
    image: document.getElementsByTagName('img')[0].src,
  };
  const kakaoBtn = document.getElementById('kakao-share-button');
  if (kakaoBtn) KaKaoShare(kakaoBtn.id, article);
  const bookmarkBtn = document.getElementById('btn_bookmark');
  const pathnames = pathname.split('/');

  console.log(pathnames[pathnames.length - 1]);
  if (bookmarkBtn) bookmarkBtn.onclick = () => enrollBookmark(pathnames[pathnames.length - 1]);
});
