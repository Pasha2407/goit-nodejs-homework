const express = require('express')
const contactFunctions = require('../../models/contacts')
const { contactSchema } = require("../../models/contacts")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactFunctions.listContacts()
    res.status(200).json(contacts)
  } catch {
    next()
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactFunctions.getContactById(id)
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact)
  } catch {
    next()
  }
})

router.post('/', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `missing required ${error.details[0].path} field` })
  }
  try {
    const newContact = await contactFunctions.addContact(req.body)
    res.status(201).json(newContact)
  } catch {
    next()
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactFunctions.removeContact(id)
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch {
    next()
  }
})

router.put('/:id', async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: `missing required ${error.details[0].path} field` })
  }
  try {
    const { id } = req.params;
    const contact = await contactFunctions.updateContact(id, req.body)
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact)
  } catch {
    next()
  }
})

module.exports = router
