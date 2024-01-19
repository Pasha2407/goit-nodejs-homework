const { contactModel } = require('../../models/contacts')

async function getAll(req, res) {
    const result = await contactModel.find()
    res.status(200).json(result)
}

module.exports = getAll