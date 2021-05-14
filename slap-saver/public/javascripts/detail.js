const detailBtn = document.querySelector('.article-detail');

const detailSection = document.querySelector('.detail-sections');

detailBtn.addEventListener('click', () => {
  detailSection.style.display = detailSection.style.display === 'none' ? 'block' : 'none';
});
