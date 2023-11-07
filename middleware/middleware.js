const { ResponseTemplate } = require('../helper/template.helper')
const Joi = require('joi');

function PrintSuccess(req, res, next) {
    console.log(`Print ${req.url}` )
    next()
}
function PrintSuccessRoute(req, res, next) {
    console.log(`sukses lewat route` )
    next()
}
function CheckPostReq(req, res, next) {

    const schema = Joi.object({
        name: Joi.string().alphanum().max(255).required(),
        address: Joi.string().alphanum().required(),
        password: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        identity_type: Joi.string().alphanum().max(255).required(),
        identity_number: Joi.string().alphanum().max(255).required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}
function CheckPostAccount(req, res, next) {

    const schema = Joi.object({
        bank_name: Joi.string().max(255).required(),
        bank_account_number: Joi.string().required(),
        balance: Joi.number().integer(),
        user_Id: Joi.number().integer().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}
function CheckPostTransaction(req, res, next) {

    const schema = Joi.object({
        amount: Joi.number().integer().required(),
        source_account_Id: Joi.number().integer().required(),
        destination_account_Id: Joi.number().integer().required(),
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}
module.exports = {
    PrintSuccess,
    PrintSuccessRoute,
    CheckPostReq,
    CheckPostAccount,
    CheckPostTransaction
}