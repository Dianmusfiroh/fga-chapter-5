const express = require('express')
const router = express.Router()
const userRoute = require('./user.route')
const accountRoute = require('./account.route')
const transactionRoute = require('./transaction.route')
const authRoute = require('./auth/auth.route')

const morgan = require('morgan')

router.use(morgan('dev'))
router.get('/ping',(req, res, next) => {
    console.log(req)
    res.json({
        "data": null,
        "message": "PONG",
        "status": 200
    })
})

router.use('/api/v1/user',userRoute)
router.use('/api/v1/account',accountRoute)
router.use('/api/v1/transaction',transactionRoute)
router.use('/api/v1/auth',authRoute)

module.exports = router