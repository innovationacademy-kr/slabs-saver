const category = {
  전체: 0,
  정치: 2,
  경제: 3,
  기술: 4,
  환경: 5,
  과학: 6,
  건강: 7,
  스포츠: 8,
};

const inviteState = {
  '가입 대기': 0,
  '가입 승인': 1,
  '가입 완료': 2,
  '가입 거절': 3,
};

const position = {
  1: '기자',
  2: '데스크',
  3: '편집장',
  4: '관리자'
};

module.exports = {
  category: (value) => {
    return Object.keys(category).find((key) => category[key] === value);
  },
  inviteState: (value) => {
    return Object.keys(inviteState).find((key) => inviteState[key] === value);
  },
  position: (value) => {
    return Object.keys(position).find((key) => position[key] === value);
  },
};
