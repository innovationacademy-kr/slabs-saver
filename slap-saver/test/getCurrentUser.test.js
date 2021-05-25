const getCurrentUser = require('../lib/getCurrentUser');
const sequelize = require('../models').sequelize;

// afterAll(() => {
//   console.log('ee')
// })

// NOTE: 디비가 실행되어 있을 때만 테스트 가능함.

describe('getCurrentUser async 테스트 연습용.', () => {
  await test(`user id -1 must be null`, async (done) => {
    const currentUser = await getCurrentUser(-1);
    expect(currentUser).toBe(null);
    done();
  })

  test(`user id 1 must not be null`, async (done) => {
    const currentUser = await getCurrentUser(1);
    expect(currentUser).not.toBe(null);
    done();
    sequelize.close();
  })

});

