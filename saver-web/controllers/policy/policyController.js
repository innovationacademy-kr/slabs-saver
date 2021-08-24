
const getPolicyPage = (req, res, next) => {
  res.render('user/policy', { title: 'slab-saver', layout: 'layout/userLayout' });
};

const getPrivacyPage = (req, res, next) => {
  res.render('user/privacy', { title: 'slab-saver', layout: 'layout/userLayout' });
};

module.exports = {
  request: {
    policyPage: getPolicyPage,
    privacyPage: getPrivacyPage,
  },
};
