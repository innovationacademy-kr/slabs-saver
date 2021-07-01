var closeBtn = document.querySelector('.closeBtn');

var inviteSection = document.querySelector('.invite-section');

closeBtn.addEventListener('click', () => {
  inviteSection.style.display = "none";
})

window.onclick = function(event) {
  if (event.target == inviteSection) {
    inviteSection.style.display = "none";
  }
}