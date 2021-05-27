function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var table = document.querySelector('.table');
var select = document.querySelector('#category');

table.addEventListener('change', (e) => {
  var cell = e.target.closest('.table-body__cell');
  var hiddenInput = cell.querySelector('.hidden');
  hiddenInput.value = hiddenInput.value === '1' ? '0' : '1';
});

const currentCategory = getParameterByName('category');
if (currentCategory) {
  select.value = currentCategory;
}