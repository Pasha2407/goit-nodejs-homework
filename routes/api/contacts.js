const express = require('express')
const contactFunctions = require('../../models/contacts')
const { contactSchema } = require("../../models/contacts")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactFunctions.listContacts()
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactFunctions.getContactById(id)
    if (!contact) {
      const error = new Error();
      error.status = 404;
      throw error;
    }
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const errorValidate = new Error(`missing required ${error.details[0].path} field`);
      errorValidate.status = 400;
      throw errorValidate;
    }
    const newContact = await contactFunctions.addContact(req.body)
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactFunctions.removeContact(id)
    if (!contact) {
      const error = new Error();
      error.status = 404;
      throw error;
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      const errorValidate = new Error(`missing required ${error.details[0].path} field`);
      errorValidate.status = 400;
      throw errorValidate;
    }
    const { id } = req.params;
    const contact = await contactFunctions.updateContact(id, req.body)
    if (!contact) {
      const error = new Error();
      error.status = 404;
      throw error;
    }
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
})

module.exports = router
