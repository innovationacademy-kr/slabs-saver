const {
  POLITICS,
  ECONOMY,
  SOCIAL,
  INTERNATIONAL,
  CULTURE
} = require('./constants/category');

const category = {
  전체: 0,
  경제: ECONOMY,
  정치: POLITICS,
  국제: INTERNATIONAL,
  사회: SOCIAL,
  문화: CULTURE,
};

const categoryEng = {
  ALL: 0,
  ECONOMY,
  POLITICS,
  INTERNATIONAL,
  SOCIAL,
  CULTURE,
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
  categoryEng: (value) => {
    return Object.keys(categoryEng).find((key) => categoryEng[key] === value);
  },
  inviteState: (value) => {
    return Object.keys(inviteState).find((key) => inviteState[key] === value);
  },
  position: (value) => {
    return Object.keys(position).find((key) => position[key] === value);
  },
  constants: {
    category,
    categoryEng,
    inviteState,
    position
  }
};
