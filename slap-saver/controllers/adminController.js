const { Authentication } = require('../models');


module.exports = {
  home: async (req, res, next) => {
    const standByUser = await Authentication.findAll({where: { isApproved: false }});
    console.log(standByUser);
  },
};
