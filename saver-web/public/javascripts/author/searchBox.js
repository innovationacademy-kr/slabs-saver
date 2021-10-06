function clickSearchlist(headline, link) {
  const ulElement = document.getElementById('search-ul');
  var target = document.getElementsByClassName('note-editable')[1];

  target?.insertAdjacentHTML(
    'beforeend',
    `<p >
		  <a href="${link}" target="_blank"><font color="#0000ff">Saver 관련 기사 : ${headline}</font></a>
	  </p>`,
  );
  ulElement.innerHTML = '';
}

function searchConnectedNews() {
  const searchbtn = document.getElementById('search');
  const serchInput = document.getElementById('connected');
  const ulElement = document.getElementById('search-ul');
  searchbtn.addEventListener('click', () => {
    ulElement.innerHTML = '';
    const searchWord = serchInput.value;
    if (!searchWord || searchWord === '') return;

    $.ajax({
      url: `/author/searchArticles?word=${searchWord}`,
      type: 'get',
      success: function (result) {
        const temp = result.article;
        temp.map(function (article) {
          ulElement.insertAdjacentHTML(
            'beforeend',
            `<li>
			<button class="search-result-btn" id="${
        article.id
      }" formnovalidate>${article.headline.trim()}</button>
		  </li>`,
          );
        });

        const resultBtns = document.getElementsByClassName('search-result-btn');
        for (var i = 0; i < resultBtns.length; i++) {
          resultBtns[i].addEventListener('click', (e) => {
            clickSearchlist(
              e.target.innerText,
              `${window.location.protocol}//${window.location.host}/articles/detail/${e.target.id}`,
            );
          });
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
}

window.addEventListener('load', () => {
  searchConnectedNews();
});
