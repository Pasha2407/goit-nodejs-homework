const { contactModel } = require('../models/contact')
const newError = require('../heplers/newError')

async function update(req, res) {
    const { id } = req.params
    const result = await contactModel.findByIdAndUpdate(id, req.body, { new: true });
    if (result === null) {
        newError(404)
    }
    res.status(200).json(result)
}

module.exports = update