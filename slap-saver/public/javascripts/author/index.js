var table = document.querySelector('.table');
table.addEventListener('change', (e) => {
  var cell = e.target.closest('.table-body__cell');
  var hiddenInput = cell.querySelector('.hidden');
  hiddenInput.value = hiddenInput.value === '1' ? '0' : '1';
});
