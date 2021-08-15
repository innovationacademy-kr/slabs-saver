function modalFunction(id) {
  var modal = document.getElementById('share-modal-'+id);
  var span =  document.getElementById('share-close-'+id);

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function facebookshare(url) {
  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i) == null ? false : true;
    },
    iOS: function () {
      return navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/) == null ? false : true;
    },
    any: function () {
      return (isMobile.Android() || isMobile.iOS());
    }
  };
    console.log(url);
    if (isMobile.iOS()){
      console.log("it isMobile.iOS");
      webkit.messageHandlers.iosMessage.postMessage(url);
    }
    else
    {
      console.log("it is not Mobile.iOS");
      window.open("http://www.facebook.com/sharer/sharer.php?u=" + url);
    }
}

// function facebookshare(url) {
//   console.log(url);
//   window.open("http://www.facebook.com/sharer/sharer.php?u=" + url);
// }

function urlshare(url){
  const textarea = document.createElement("textarea");

  document.body.appendChild(textarea);
  textarea.value = url;
  textarea.select();

  document.execCommand('copy');
  document.body.removeChild(textarea)

  alert('url 복사가 완료되었습니다.');
}

//html 태그 제거
function removeTag(text) {
  text = text.replace(/(<([^>]+)>)/ig, "");
  return text;
}

function KaKaoShare  (id, article)  {
  try{
    if (!Kakao.isInitialized()) Kakao.init('카카오 JS 키');
    let targetLink = document.location.href;
    if (article.id != null){
      targetLink += `articles/detail/${article.id}`;
    }

    const briefing = removeTag(unescape(article.briefing));

    Kakao.Link.createDefaultButton({
      container: `#${id}`,
      objectType: 'feed',
      content: {
        title: article.headline,
        description: briefing,
        imageUrl: article.image,
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
            androidExecutionParams: article.path,
            iosExecutionParams: article.path,
          },
        },
      ],
    });
  }catch(e){
    window.kakaoDemoException && window.kakaoDemoException(e)
  }
};
