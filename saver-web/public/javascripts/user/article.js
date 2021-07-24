class Editor {
  constructor() {}

  KaKaoShare = () => {
    if (!Kakao.isInitialized()) Kakao.init('카카오톡 JS 키');

    const targetLink = document.location.href;
    let headline = document.getElementsByClassName('article__title')[0].textContent;
    headline = headline.trim();
    let editor_briefing = document.getElementById('editor_briefing').textContent;
    editor_briefing = editor_briefing.trim();
    let image = document.getElementsByClassName('article__img')[0].src;

    Kakao.Link.createDefaultButton({
      container: `#btn_share`,
      objectType: 'feed',
      content: {
        title: headline,
        description: unescape(editor_briefing),
        imageUrl: image,
        link: {
          webUrl: targetLink,
          mobileWebUrl: targetLink,
          androidExecutionParams: 'test',
        },
      },
      buttons: [
        {
          title: '웹으로 이동',
          link: {
            webUrl: targetLink,
            mobileWebUrl: targetLink,
          },
        },
        {
          title: '앱으로 이동',
          link: {
            webUrl: targetLink,
            mobileWebUrl: targetLink,
            androidExecutionParams: `articles/detail/${article.id}`,
          },
        },
      ],
    });
  };

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
  const btn = document.getElementById('btn_share');
  if (btn) editor.KaKaoShare();
  console.log(btn.id);
});
