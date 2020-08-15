const Joi = require('joi');

const loginSchemaValidation = Joi.object.keys({
    username: Joi.string().email().required(),
    password: Joi.string().required(),
})

module.exports = loginSchemaValidation;