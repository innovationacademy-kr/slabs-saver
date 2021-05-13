class DetailSection {
  constructor(app) {
    this.app = app;
    this.state = {};
  }
  add() {
    const inputTemplate = `
    <label for="addtion-section"></label>
    <input id="addtion-section" name="additionalParagraph" placeholder="자세한 내용을 입력해주십시오.">
    `;
    const addInput = document.createElement('div');
    addInput.innerHTML = inputTemplate;
    this.app.appendChild(addInput);
  }
}

const addBtn = document.querySelector('.article-add--Btn');

const detailSection = new DetailSection(document.querySelector('.article-add'));

addBtn.addEventListener('click', () => {
  detailSection.add();
});
