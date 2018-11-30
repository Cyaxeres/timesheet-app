// const mongoose = require('mongoose')

const express = require('express')
const router = express.Router()
const auth = require('../auth')
const UsersController = require('../../controllers/users')

router.post('/', auth.optional, UsersController.users_create_user)

router.post('/login', auth.optional, UsersController.users_login_user)

router.get('/current', auth.required, UsersController.users_show_user)

module.exports = router
