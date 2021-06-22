const signupPage = (req, res, next) => {
    res.render('subscriber/signup');
}

const loginPage = (req, res, next) => {
    res.render('subscriber/login');
}

const signupRequest = (req, res, next) => {
    res.json('123');
}

module.exports = {
    request: {
        signup: signupRequest,
    },
    page: {
        login : loginPage,
        signup: signupPage,
    },
};