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

//공유버튼함수(드롭다운만 적용할경우 추가안해도됨)
function kakaoshare(url, image, headline, descrip){
	//공유하기버튼을 여러번누를때 init이 또작동하면 버튼이 반응을 안해버림
	//Kakao.isInitialized() 이용해서 init이 되있는지 확인을해줌
  try {
	if (!(Kakao.isInitialized()))
	  Kakao.init('kakao js키 집어넣는부분');
	Kakao.Link.sendDefault({
	  objectType: 'feed',
		content: {
		  title: headline,
		  description: descrip,
		imageUrl: image,
		link: {
			mobileWebUrl: url,
			webUrl: url,
		},
	  },
	  social: {
		likeCount: 10,
		commentCount: 20,
		sharedCount: 30,
	  },
	  buttons: [
		{
		  title: '웹으로 이동',
		  link: {
			mobileWebUrl: url,
			webUrl: url
		  },
		},
		{
		  title: '앱으로 이동',
		  link: {
			androidExecutionParams: 'articles/detail/1'
		  },
		},
	  ]
	});
  ; window.kakaoDemoCallback && window.kakaoDemoCallback() }
  catch(e) { window.kakaoDemoException && window.kakaoDemoException(e) }
  }

  function facebookshare(url) {
	console.log(url);
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + url);
}