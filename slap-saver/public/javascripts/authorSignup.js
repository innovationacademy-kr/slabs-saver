// (function() {

//   function insertAfter(newNode, referenceNode) {
//     referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
//   }

//   var form = document.querySelector('form');
//   // 키보드 입력이 있을 때 마다 검사를 하는 방향으로
//   var passwordInput = document.querySelector('.signup-form__password');
//   var password;
//   var errorMessage = document.createElement('p');

//   passwordInput.addEventListener('keydown', (e) => {
//     var value = passwordInput.value;
//     if (value.length < 6) {
//       errorMessage.innerText = 'password는 6글자를 넘어야합니다.';
//       console.log(errorMessage.innerText);
//       insertAfter(errorMessage, passwordInput);
//     } else {
//       if (errorMessage) {
//         console.log(errorMessage)
//         errorMessage.parentNode.removeChild(errorMessage);
//         console.log(errorMessage)
//       }
//       password = value;
//     }
//   })

//   var confirmInput = document.querySelector('.signup-form__confirm');
//   confirmInput.addEventListener('keydown', (e) => {
//     var confirm = confirmInput.value;
//     if (confirm !== password) {
//       console.log('비밀번호가 다릅니다.');
//     }
//   })



//   // button 을 누르면 서버에 요청을 날리기 전에 먼저 valid 체크를 한다.
// }());
