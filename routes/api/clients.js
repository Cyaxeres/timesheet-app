const express = require('express')
const router = express.Router()
const auth = require('../auth')
const ClientsController = require('../../controllers/clients')

router.get('/', auth.optional, ClientsController.clients_get_all)

router.get('/:clientId', auth.optional, ClientsController.clients_get_client)

module.exports = router
