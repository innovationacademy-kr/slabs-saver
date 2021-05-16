const detailBtn = document.querySelector('.detail__article--button');

const detailSection = document.querySelector('.detail-sections');

detailBtn.addEventListener('click', () => {
  detailSection.style.display = detailSection.style.display === 'none' ? 'block' : 'none';
});
