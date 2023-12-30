const express = require('express')
const contactFunctions = require('../../models/contacts')
const { contactSchema } = require("../../models/contacts")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactFunctions.listContacts()
    res.status(200).json(contacts)
  } catch {
    res.status(500).send("Server error")
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactFunctions.getContactById(id)
    res.status(200).json(contact)
  } catch {
    res.status(404).json({ message: "Not found" })
  }
})

router.post('/', async (req, res, next) => {
  if (!contactSchema.validate(req.body)) {
    return res.status(400).json({ message: "missing required name field" })
  }
  try {
    const newContact = await contactFunctions.addContact(req.body)
    res.status(201).json(newContact)
  } catch {
    res.status(500).send("Server error, contact not added");
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await contactFunctions.removeContact(id)
    res.status(200).json({ message: "contact deleted" });
  } catch {
    res.status(404).json({ message: "Not found" })
  }
})

router.put('/:id', async (req, res, next) => {
  if (!contactSchema.validate(req.body)) {
    return res.status(400).json({ message: "missing fields" })
  }
  try {
    const { id } = req.params;
    const contact = await contactFunctions.updateContact(id, req.body)
    res.status(200).json(contact)
  } catch {
    res.status(404).json({ message: "Not found" });
  }
})

module.exports = router
