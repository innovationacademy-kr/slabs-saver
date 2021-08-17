const schedule = require('node-schedule');
const ampmCtrl = require('../controllers/today/ampmController');

const scheduler = () => {
    schedule.scheduleJob('0 7 * * * ', () => {
        ampmCtrl.createAMPM(true);
    });
    schedule.scheduleJob('0 19 * * *', () => {
        ampmCtrl.createAMPM(false);
    });
}
module.exports = {
    scheduler
}