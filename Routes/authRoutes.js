const express = require('express')
const router = express.Router()
const authController = require('../Controllers/authController')

router.route('/login').post(authController.login)
router.route('/signup').post(authController.register)

module.exports = router
