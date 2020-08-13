const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('./index');
const tokenService = require('../services/token.service');

const isAuthenticated = async (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        const token = req.headers.authorization.split(" ")[1];
        try{
            const tokenDoc = await tokenService.verifyToken(token);
            res.locals.userId= tokenDoc.user;
            return next();
        }catch(err){
            res.status(httpStatus.UNAUTHORIZED).json({error: 'Invalid token'});
        }
    } else {
        res.status(httpStatus.UNAUTHORIZED).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}

module.exports = isAuthenticated;