const express = require('express')
const router = express.Router()
// const { Register, Login } = require('../controller/auth.controller')

const { register, login, Whoami } = require('../../controller/auth/auth.controller')
const { Authenticate } = require('../../middleware/restric')

router.post('/register', register)
router.post('/login', login)
router.get('/Whoami', Authenticate, Whoami)

module.exports = router
