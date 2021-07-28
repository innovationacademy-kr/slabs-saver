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
	console.log(url);
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + url);
}

function KaKaoShare  (id, article)  {
    try{
        if (!Kakao.isInitialized()) Kakao.init('e02c5b453cf259510435c35b79bb45eb');
        let targetLink = document.location.href;
        if (article.id != null){
            targetLink += `articles/detail/${article.id}`;
        }

        Kakao.Link.createDefaultButton({
        container: `#${id}`,
        objectType: 'feed',
        content: {
            title: article.headline,
            description: unescape(article.briefing),
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
            },
            },
        ],
        });
        }catch(e){ 
            window.kakaoDemoException && window.kakaoDemoException(e)
    }
};

 