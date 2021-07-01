var lis = document.querySelectorAll('li a');
var current = window.location.pathname;
var options = [
    '/author',
    '/author/articles',
    '/author/articles/new',
    '/author/today'
];

options.forEach(function(opt, index) {
  lis[index].classList.remove('active');
  if (current === opt) {
    lis[index].classList.add('active');
  }
})
