const KaKaoShare = (id, article) => {
    try{
        if (!Kakao.isInitialized()) {
          Kakao.init('88a18de81dffaf88dc400e3b6d907468');
          console.log("init in KaKaoShare func");
        }
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

export default KaKaoShare;
