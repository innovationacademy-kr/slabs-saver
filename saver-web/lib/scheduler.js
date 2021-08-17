const schedule = require('node-schedule');
const ampmCtrl = require('../controllers/today/ampmController');

const amSchedule = new schedule.RecurrenceRule();
amSchedule.hour = 7;
const pmSchedule = new schedule.RecurrenceRule();
pmSchedule.hour = 19;

const scheduler = () => {
    schedule.scheduleJob(amSchedule, () => {
        ampmCtrl.createAMPM(true);
    });
    schedule.scheduleJob(pmSchedule, () => {
        ampmCtrl.createAMPM(false);
    });
}
module.exports = {
    scheduler
}