const express = require('express')
const { contactModel, contactJoiSchema, favoriteJoiSchema } = require("../../models/contact")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactModel.find()
    res.status(200).json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactModel.findById(id)
    if (contact === null) {
      const error = new Error()
      error.status = 404
      throw error
    }
    res.status(200).json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  try {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      const errorValidate = new Error(`missing required ${error.details[0].path} field`);
      errorValidate.status = 400;
      throw errorValidate;
    }
    const newContact = await contactModel.create(contact);
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await contactModel.findByIdAndDelete(id)
    if (contact === null) {
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
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
  };
  try {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      const errorValidate = new Error(`missing required ${error.details[0].path} field`);
      errorValidate.status = 400;
      throw errorValidate;
    }
    const { id } = req.params;
    const changedContact = await contactModel.findByIdAndUpdate(id, contact, { new: true })
    if (changedContact === null) {
      const error = new Error();
      error.status = 404;
      throw error;
    }
    res.status(200).json(changedContact)
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', async (req, res, next) => {
  const favorite = { favorite: req.body.favorite }
  try {
    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      const errorValidate = new Error("missing field favorite");
      errorValidate.status = 400;
      throw errorValidate;
    }
    const { id } = req.params;
    const changedContact = await contactModel.findByIdAndUpdate(id, favorite, { new: true })
    if (changedContact === null) {
      const error = new Error();
      error.status = 404;
      throw error;
    }
    res.status(200).json(changedContact)
  } catch (error) {
    next(error)
  }
})

module.exports = router
