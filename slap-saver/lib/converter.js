const category = {
  전체: 0,
  경제: 1,
  정치: 2,
  국제: 3,
  사회: 4,
  문화: 5,
};

const categoryEng = {
  ALL: 0,
  ECONOMY: 1,
  POLITICS: 2,
  INTERNATIONAL: 3,
  SOCIAL: 4,
  CULTURE: 5,
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
};
