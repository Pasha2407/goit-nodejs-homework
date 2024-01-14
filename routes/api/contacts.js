const express = require('express')
const { contactJoiSchema, favoriteJoiSchema } = require("../../models/contact")

const router = express.Router()
const wrapper = require('../../heplers/wrapper')
const method = require('../../controllers/index')
const validateSchema = require('../../middlewares/validateSchema')

router.get('/', wrapper(method.getAll));

router.get('/:id', wrapper(method.get));

router.post('/', validateSchema(contactJoiSchema), wrapper(method.add));

router.delete('/:id', wrapper(method.remove));

router.put('/:id', validateSchema(contactJoiSchema), wrapper(method.update));

router.patch('/:id', validateSchema(favoriteJoiSchema), wrapper(method.update));

module.exports = router
