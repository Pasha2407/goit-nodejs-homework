const { contactModel } = require('../models/contact')

async function getAll(req, res) {
    const result = await contactModel.find()
    res.status(200).json(result)
}

module.exports = getAll