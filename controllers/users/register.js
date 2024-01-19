const bcrypt = require("bcrypt")

const { userModel } = require('../../models/users')
const newError = require('../../heplers/newError')

async function register(req, res) {
    const { name, email, password, subscription } = req.body

    const user = await userModel.findOne({ email })
    if (user !== null) {
        newError(409)
    }
    const passwordHash = await bcrypt.hash(password, 8)

    const result = await userModel.create({ name, email, password: passwordHash, subscription })

    const { subscription: subscriptionResponse } = result
    const userResponse = { name, email, subscription: subscriptionResponse }

    res.status(201).send({ user: userResponse })
}

module.exports = register
