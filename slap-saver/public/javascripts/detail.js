var detailBtn = document.querySelector('.detail--button');

var detailSection = document.querySelector('.detail-sections');

detailBtn.addEventListener('click', () => {
  detailSection.style.display = detailSection.style.display === 'none' ? 'block' : 'none';
});

