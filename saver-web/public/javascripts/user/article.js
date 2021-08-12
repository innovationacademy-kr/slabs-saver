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
  selectBookmarkClass(pathnames[pathnames.length - 1], "btn_bookmark"); 

  if (bookmarkBtn) bookmarkBtn.onclick = () => clickBookmark(pathnames[pathnames.length - 1], "btn_bookmark");
});

setTimeout(() => {
  const briefing = document.getElementById("editor_briefing");
  const paragraphs = document.getElementById("editor_paragraphs");
  const briefVi = briefing.querySelector(".note-video-clip");
  const paragVi = paragraphs.querySelector(".note-video-clip");

  console.log(briefing);
  console.log(paragraphs);
  console.log(briefVi);
  console.log(paragVi);
  briefVi?.removeAttribute("height");
  briefVi?.removeAttribute("width");
  briefVi?.setAttribute("style", "max-width: 100%; width:95vw; height: 53.43vw;");
  paragVi?.removeAttribute("height");
  paragVi?.removeAttribute("width");
  paragVi?.setAttribute("style", "max-width: 100%; width:95vw; height: 53.43vw");
}, 300)