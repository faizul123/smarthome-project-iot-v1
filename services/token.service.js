const jwt = require('jsonwebtoken');
const moment = require('moment');
const config = require('../config');
const Token = require('../model/Token.model');

const generateToken = (userId, expires) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
    };
    return jwt.sign(payload, config.jwt.secret);
};


const saveToken = async (token, userId, expires) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
    });
    return tokenDoc;
};

const verifyToken = async (token) => {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({ token, user: payload.sub });
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
};

const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires);
    saveToken(accessToken, user.id, accessTokenExpires);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        }
    };
};

module.exports = {
    generateToken,
    saveToken,
    verifyToken,
    generateAuthTokens,
};