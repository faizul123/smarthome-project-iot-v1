const httpStatus = require('http-status');
const get = require('lodash/get');
const authService = require('../services/auth.services');
const userService = require('../services/user.services');
const tokenService  = require('../services/token.service');

const register = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
};

const profile = async (req, res) => {

    const userId = get(res, 'locals.userId',null);
    if(userId){
        const user = await userService.getUserById(userId);
        res.send({user});
    }else {
      res.send({message: "user not found"});
    }
}

module.exports = {
  register,
  login,
  profile,
};