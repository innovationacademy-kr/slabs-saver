// state: 0 -> 가입 대기
// state: 1 -> 가입 승인
// state: 2 -> 가입 완료
// state: 3 -> 가입 거절

const WAIT = 0; //가입 대기
const APPROVAL = 1; //가입 승인
const COMPLETE = 2; //가입 완료
const REFUSED = 3; //가입 거절

module.exports = {
	WAIT,
	APPROVAL,
	COMPLETE,
	REFUSED,
}
