const express = require('express')
const router = express.Router()

const validateToken = require('../../middlewares/validateToken')
const uploadAvatar = require('../../middlewares/uploadAvatar')
const jimpEdit = require('../../middlewares/jimpEdit')

const validateSchema = require('../../middlewares/validateSchema')
const { userJoiSchema } = require('../../models/users')
const { subscriptionJoiSchema } = require('../../models/users')

const wrapper = require('../../heplers/wrapper')
const method = require('../../controllers/users/index')

router.post('/register', validateSchema(userJoiSchema), wrapper(method.register))

router.post('/login', validateSchema(userJoiSchema), wrapper(method.login))

router.get('/logout', validateToken, wrapper(method.logout))

router.get('/current', validateToken, wrapper(method.current))

router.patch('/subscription', validateToken, validateSchema(subscriptionJoiSchema), wrapper(method.updateSubscription))

router.patch('/avatar', validateToken, uploadAvatar.single('avatar'), jimpEdit, wrapper(method.updateAvatar))

router.get('/avatar', validateToken, wrapper(method.getAvatar))

module.exports = router