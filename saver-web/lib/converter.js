const {
  POLITICS,
  ECONOMY,
  SOCIAL,
  INTERNATIONAL,
  CULTURE,
} = require('./constants/category');
const POSITIONS = require('./constants/position');
const TODAYWORD = require('./constants/todayWordStatus');
const ARTICLE_STATUS = require('./constants/articleStatus');

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

const position = {
  기자: POSITIONS.REPOTER,
  데스크: POSITIONS.DESK,
  편집장: POSITIONS.CHIEF_EDITOR,
  관리자: POSITIONS.ADMIN,
  인턴: POSITIONS.INTERN,
  외부필진: POSITIONS.EXTERNAL_WRITER
}
const positionKey = {
  [POSITIONS.REPOTER]: '기자',
  [POSITIONS.DESK]: '데스크',
  [POSITIONS.CHIEF_EDITOR]: '편집장',
  [POSITIONS.ADMIN]: '관리자',
  [POSITIONS.INTERN]: '인턴',
  [POSITIONS.EXTERNAL_WRITER]: '외부필진'
}
const inviteState = {
  '가입 대기': 0,
  '가입 승인': 1,
  '가입 완료': 2,
  '가입 거절': 3,
};

const todayWordStatus = {
    [TODAYWORD.DRAFTS]: '임시 저장',
    [TODAYWORD.COMPLETED]: '작성 완료',
    [TODAYWORD.CONFIRMED]: '날짜 지정',
}

const articleStatus = {
    [ARTICLE_STATUS.DRAFTS]: '임시 저장',
    [ARTICLE_STATUS.COMPLETED]: '작성 완료',
    [ARTICLE_STATUS.RELEASED]: '출고',
	[ARTICLE_STATUS.CONFIRMED]: '게재',
}

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
    return Object.enties(position).find(([key, v]) => {
      return v === value
    })[0];
  },
  constants: {
    category,
    categoryEng,
    inviteState,
    position,
    positionKey,
    todayWordStatus,
	articleStatus
  }
};
