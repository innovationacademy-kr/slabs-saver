var lis = document.querySelectorAll('li a');
var current = window.location.pathname;
var options = [
    '/author/_admin',
    '/author/_admin/invitation',
]

options.forEach(function(opt, index) {
  console.log(lis[index].firstChild)
  lis[index].classList.remove('active');
  if (current === opt) {
    console.log(current, opt, 'here!!!')
    lis[index].classList.add('active');
  }
})