/* Section Class */
class Section {
  constructor(title, text, type) {
    this.title = title;
    this.text = text;
    this.type = type;
  }
}

const economy = new Section(
  '경제',
  ['부동산, 증시, 경기전망', '어려운 이야기를 쉽게 풀어주는', '세이버 경제 섹션'],
  'economy',
);
const politics = new Section(
  '정치',
  ['애매모호한 설명은 없다.', '맥락과 숨은 뜻까지 집어주는', '색다른 브리핑 서비스'],
  'politics',
);
const international = new Section(
  '국제',
  ['놓칠 수 없는 국제뉴스', '세이버에서 확인하세요', '정확한 뉴스를 전해드립니다.'],
  'international',
);
const social = new Section(
  '사회',
  ['우리들 살아가는 세상 이야기', '세이버와 친구처럼 친절하게 알려드립니다.'],
  'social',
);

//TODO:정렬기준 중간으로 되어 있음.
const culture = new Section(
  '문화',
  ['영화, 음악, 책, 축제…', '세이버가 전하는 문화소식은 새롭습니다.'],
  'culture',
);

const ampm = new Section(
  'AM7/PM7',
  ['아침 7시, 저녁7시', '오늘 당신이 알아야할 뉴스를', '일목요연하게 알려드립니다.'],
  '7',
);

const categories = [null, economy, politics, international, social, culture, ampm];

module.exports = categories;
