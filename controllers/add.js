const { contactModel } = require('../models/contact')

async function add(req, res) {
    const result = await contactModel.create(req.body)
    res.status(201).json(result)
}

module.exports = add
