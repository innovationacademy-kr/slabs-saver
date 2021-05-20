var select = document.querySelector('.paragraph-select');
var paragraphList = document.querySelector('.paragraph-list');
var addParagraphBtn = document.querySelector('.paragraph-list--Btn');
var form = document.querySelector('form');

function makeParagraph(title) {
  return '<div class="paragraph-list__item">' + '\n'
          + '<label for=paragraph-title ></label>'
          + '<input id=paragraph-title name=paragraph-title class="paragraph-item__title" type="text" value=' + title +' readonly="readonly" >' + '\n'
          + '<label for=paragraph-conetent ></label>'
          + '<textarea id=paragraph-content name=paragraph-content class="paragraph-item__content" > </textarea>' + '\n'
        + '</div>'
}

addParagraphBtn.addEventListener('click', function(e) {
  var title = select.options[select.selectedIndex].value;  
  paragraphList.insertAdjacentHTML('beforeend', makeParagraph(title));
})

paragraphList.addEventListener('dblclick', function(e) {
  var paragraphTitle = e.target.closest('.paragraph-item__title');
  if (!paragraphTitle) return;
  console.log('dblclick')
  paragraphTitle.readOnly = false;
})

paragraphList.addEventListener('keydown', function(e) {
  var paragraphTitle = e.target.closest('.paragraph-item__title');
  if (!paragraphTitle) return ;
  if (e.keyCode === 13) {
    paragraphTitle.readOnly = true;
  }
})

paragraphList.addEventListener('focusout', function(e) {
  var paragraphTitle = e.target.closest('.paragraph-item__title');
  if (!paragraphTitle) return ;
  paragraphTitle.readOnly = true;
})

form.addEventListener('keydown', function(e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    return false
  }
})
