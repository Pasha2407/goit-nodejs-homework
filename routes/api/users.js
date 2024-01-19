const express = require('express')
const router = express.Router()

const validateSchema = require('../../middlewares/validateSchema')
const { userJoiSchema } = require('../../models/users')

const wrapper = require('../../heplers/wrapper')
const method = require('../../controllers/users/index')

router.post('/register', validateSchema(userJoiSchema), wrapper(method.register))

module.exports = router
