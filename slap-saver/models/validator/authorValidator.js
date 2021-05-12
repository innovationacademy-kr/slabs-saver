module.exports = {
  password: (value) => {

    // NOTE: password check -> 영 + 숫자 6자리 ~ 15
    // if (!/^[a-zA-Z0-9]{6,15}$/.test(value)) {
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
