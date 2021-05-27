module.exports = {
  code: (value) => {
    const validCode = [1, 2, 3, 4, 5, 6, 7, 8, 201, 301, 401, 501, 601, 701, 801];
    if (!validCode.includes(+value)) {
      throw new Error('올바른 코드를 입력하세요');
    }
  },
  // TODO: 정규표현 검사는 커스텀을 따로 만들 필요가 없다. 이후에 수정하자.
  password: (value) => {
    // NOTE: password check -> 영 + 숫자 6자리 ~ 15
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/.test(value)) {
      throw new Error('패스워드 형식 틀림');
    }
  },
  contact: (value, author) => {
    // NOTE: 연락처 둘 중 하나 선택해서 사용하자
    // if (!/^\d{3}-\d{3,4}-\d{4}$/.test(value)) {
    if (!/^\d{11}$/.test(value)) {
      throw new Error('전화번호 형식 틀림');
    }
  },
};
