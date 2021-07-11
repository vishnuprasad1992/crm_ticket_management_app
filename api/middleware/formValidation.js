const joi = require('joi');


const email = joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

const pin = joi.string().min(100000).max(999999).required();

const newPassword = joi.string().min(6).max(30).required();
const password = joi.string().min(6).max(30).required();
const name = joi.string().min(6).max(30).required();
const mobile = joi.number().min(6000000000).max(9999999999).required();
const address = joi.string().min(6).max(100).required();
const company = joi.string().min(6).max(30).required();


const subject = joi.string().min(5).max(300).required();
const message = joi.string().min(5).max(300).required();
const messageBy = joi.string().min(5).max(50).required();
const date = joi.date();


// subject, message, messageBy

const reapeatPasswordValidation = (req, res, next) => {

    const schema = joi.object({ email });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.json({status:"error",message:error.message})
    }
    next()
}

const updatePasswordValidation = (req, res, next) => {
    const schema = joi.object({ email,pin,newPassword });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.json({status:"error",message:error.message})
    }
    next()
}

const createPostValidation = (req, res, next) => {
    const schema = joi.object({ subject,message,messageBy,date });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.json({status:"error",message:error.message})
    }
    next()
}

const updatePostValidation = (req, res, next) => {
    const schema = joi.object({ message,messageBy });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.json({status:"error",message:error.message})
    }
    next()
}

const newUserValidation = (req, res, next) => {
    const schema = joi.object({ name,email,mobile,company,address,password });
    const { error, value } = schema.validate(req.body);
    if (error) {
        return res.json({status:"error",message:error.message})
    }
    next()
}

module.exports = {
    reapeatPasswordValidation,
    updatePasswordValidation,
    createPostValidation,
    updatePostValidation,
    newUserValidation
}
