const schedule = require('node-schedule');
module.exports = {

    //20 * * * * *  --> 매 20초마다 실행 << 6단위일땐 초부터 (초, 분, 시간, 날짜, 달, 요일)
    //20 * * * *    --> 매 20분마다 실행 << 5단위일땐 분부터 (분, 시간, 날짜, 달, 요일)
    //30 12 * * 0,4-6 --> 매주 일요일, 목~토 12시 30분에 실행
    //{hour: 14, minute: 30, dayOfWeek: 0} -> 일요일 오후 2시 30분마다 실행
  test: () => {
    schedule.scheduleJob('30 12 * * 0,4-6', async()=>{
    
      console.log('hi!')
    })

   	}
  }