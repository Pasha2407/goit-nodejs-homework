const { contactModel } = require('../../models/contacts')
const newError = require('../../heplers/newError')

async function remove(req, res) {
    const { id } = req.params
    const result = await contactModel.findByIdAndDelete(id)
    if (result === null) {
        newError(404)
    }
    res.status(200).json({ message: "contact deleted" })
}

module.exports = remove