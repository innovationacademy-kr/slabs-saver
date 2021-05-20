var detailBtn = document.querySelector('.detail--button');

var detailSection = document.querySelector('.detail-sections');

var closeBtn = document.querySelector('.closeBtn');

var inviteSection = document.querySelector('.invite-section');

detailBtn.addEventListener('click', () => {
  detailSection.style.display = detailSection.style.display === 'none' ? 'block' : 'none';
});

closeBtn.addEventListener('click', () => {
  inviteSection.style.display = "none";
})

window.onclick = function(event) {
  if (event.target == inviteSection) {
    inviteSection.style.display = "none";
  }
}