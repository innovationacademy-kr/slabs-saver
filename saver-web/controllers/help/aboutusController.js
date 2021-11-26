
const getSupportURL = (req, res, next) => {
  res.render('user/aboutus', { title: 'slab-saver', layout: 'layout/userLayout' });
};

module.exports = {
  request: {
    supportURL: getSupportURL,
  },
};
