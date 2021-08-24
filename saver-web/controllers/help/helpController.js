
const getSupportURL = (req, res, next) => {
  console.log("in");
  res.render('user/help', { title: 'slab-saver', layout: 'layout/userLayout' });
};

module.exports = {
  request: {
    supportURL: getSupportURL,
  },
};
