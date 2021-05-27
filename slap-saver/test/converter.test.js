const converter = require('../lib/converter');

describe('convert category test', () => {
  const categoryNum = [2, 3, 4, 5, 6, 7, 8];
  const category = ['정치', '경제', '기술', '환경', '과학', '건강', '스포츠'];

  category.forEach((value, index) => {
    test(`category ${categoryNum[index]} toBe ${value}`, () => {
      expect(converter.category(categoryNum[index])).toBe(value);
    })
  })
});

describe('convert invite state test', () => {
  const stateNum = [0, 1, 2, 3];
  const state = ['가입 대기', '가입 승인', '가입 완료', '가입 거절'];

  state.forEach((value, index) => {
    test(`invite state ${stateNum[index]} toBe ${value}`, () => {
      expect(converter.inviteState(stateNum[index])).toBe(value);
    })
  })
});
