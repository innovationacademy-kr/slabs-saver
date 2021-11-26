
const getPolicyPage = (req, res, next) => {
  res.render('user/policy', { title: 'slab-saver', layout: 'layout/userLayout' });
};

const getPrivacyPage = (req, res, next) => {
  res.render('user/privacy', { title: 'slab-saver', layout: 'layout/userLayout' });
};

const getYouthPolicyPage = (req, res, next) => {
  res.render('user/youthPolicy', { title: 'slab-saver', layout: 'layout/userLayout' });
};

const getCopyRightPolicyPage = (req, res, next) => {
  res.render('user/copyRightPolicy', { title: 'slab-saver', layout: 'layout/userLayout' });
};

const getRejectEmailPolicyPage = (req, res, next) => {
  res.render('user/rejectEmailPolicy', { title: 'slab-saver', layout: 'layout/userLayout' });
};


module.exports = {
  request: {
    policyPage: getPolicyPage,
    privacyPage: getPrivacyPage,
    youthPolicyPage: getYouthPolicyPage,
    copyRightPolicyPage: getCopyRightPolicyPage,
    rejectEmailPolicyPage: getRejectEmailPolicyPage,
  },
};
