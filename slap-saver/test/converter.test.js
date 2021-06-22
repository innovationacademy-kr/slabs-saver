const converter = require('../lib/converter');

describe('convert category test', () => {
  const categoryNum = [1, 2, 3, 4, 5];
  const category = ['경제', '정치', '국제', '사회', '문화'];

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
