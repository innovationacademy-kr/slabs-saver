var jwt = require('jsonwebtoken'); //JWT
const bcrypt = require('bcrypt');
const { Subscriber } = require('../models');
var tokenKey = "slap!#abcd"

const signupPage = (req, res, next) => {
    res.render('subscriber/signup');
}

const loginPage = (req, res, next) => {
    res.render('subscriber/login');
}

const signupRequest = async (req, res, next) => {
    const { email, password, name, confirm } = req.body;
    let deleted = 1;
    try {
        const exUser = await Subscriber.findOne({ where: { email } });
        if (exUser)
        {
            res.status(400).json({
                result: false,
                message: '이미 계정이 있습니다.',
            });
        }
        else if (password != confirm)
        {
            res.status(400).json({
                result: false,
                message: '비밀번호가 동일하지 않습니다.',
            });
        }
        else {
            await Subscriber.create({ email, name, password, deleted });
            res.status(200).json({
                result: true,
                message: '회원가입 성공',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            result: false,
            message: `오류가 발생하였습니다 (${error.message})`,
        });
    }
};

const loginRequest = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const exUser = await Subscriber.findOne({ where: { email } });
        if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
                jwt.sign({
                    userId: exUser.id,
                    userEmail: exUser.email
                },
                    tokenKey, {
                    expiresIn: '10d', //유통기간
                    issuer: 'slap.admin', //누가 만들었느지
                    subject: 'user.login.info'
                },
                    function (err, token) {
                        console.log('로그인 성공', token)
                        res.status(200).json({ token })
                    })
            }
            else {
                res.status(400).json({
                    result: false,
                    message: '비밀번호가 맞지 않습니다',
                });
            }
        }
        else {
            res.status(400).json({
                result: false,
                message: '가입된 ID가 없습니다 ',
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}

module.exports = {
    request: {
        signup: signupRequest,
        login: loginRequest
    },
    page: {
        login: loginPage,
        signup: signupPage,
    },
};
