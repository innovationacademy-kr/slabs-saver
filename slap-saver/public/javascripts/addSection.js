var select = document.querySelector('.paragraph-select');
var paragraphList = document.querySelector('.paragraph-list');
var addParagraphBtn = document.querySelector('.paragraph-list--Btn');

function makeParagraph(title) {
  return '<div class="paragraph-list__item">' + '\n'
          + '<label for=paragraph-title ></label>'
          + '<input id=paragraph-title name=paragraph-title class="paragraph-item__title" type="text" value=' + title +' >' + '\n'
          + '<label for=paragraph-conetent ></label>'
          + '<textarea id=paragraph-content name=paragraph-content class="paragraph-item__content" > </textarea>' + '\n'
        + '</div>'
}

addParagraphBtn.addEventListener('click', function(e) {
  const title = select.options[select.selectedIndex].value;  
  paragraphList.insertAdjacentHTML('beforeend', makeParagraph(title));
})