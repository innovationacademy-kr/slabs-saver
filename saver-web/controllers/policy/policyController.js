
const getPolicyPage = (req, res, next) => {
  res.render('user/policy', { title: 'slab-saver', layout: 'layout/userLayout' });
};

module.exports = {
  request: {
    policyPage: getPolicyPage,
  },
};
