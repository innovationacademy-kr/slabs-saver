var lis = document.querySelectorAll('li a');
var current = window.location.pathname;
var options = [
    '/author',
    '/author/edit-meeting',
    '/author/articles',
    '/author/articles/new'
]

options.forEach(function(opt, index) {
  console.log(lis[index].firstChild)
  lis[index].classList.remove('aactive');
  if (current === opt) {
    console.log('here!!!')
    lis[index].classList.add('active');
  }
})