const category = {
    '전체': 0,
    '정치': 1,
    '경제': 2,
    '기술': 3,
    '환경': 4,
    '과학': 5,
    '건강': 6,
    '스포츠': 7,
}

module.exports = (value) => {
    return Object.keys(category).find(key => category[key] === value);
}