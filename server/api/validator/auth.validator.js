const Joi = require('joi');

const signUp = {
    payload: Joi.object({
        username: Joi.string().required(),  
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

const signin = {
    payload: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

module.exports = {
    signUp,
    signin
}