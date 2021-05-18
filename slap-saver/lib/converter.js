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

const inviteState = {
    '가입 대기': 0,
    '가입 승인': 1,
    '가입 완료': 2,
    '가입 거절': 3
}

module.exports = {
    category: (value) => {
        return Object.keys(category).find(key => category[key] === value);
    },
    inviteState: (value) => {
        return Object.keys(inviteState).find(key => inviteState[key] === value);        
    }
}