const { contactModel } = require('../models/contact')
const newError = require('../heplers/newError')

async function get(req, res) {
    const { id } = req.params
    const result = await contactModel.findById(id)
    if (result === null) {
        newError(404)
    }
    res.status(200).json(result)
}

module.exports = get