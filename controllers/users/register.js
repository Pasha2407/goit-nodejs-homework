const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const { userModel } = require('../../models/users')
const newError = require('../../heplers/newError')

async function register(req, res) {
    const { email, password, subscription } = req.body
    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

    const user = await userModel.findOne({ email })
    if (user !== null) {
        throw newError(409)
    }
    const passwordHash = await bcrypt.hash(password, 8)

    const result = await userModel.create({ email, password: passwordHash, subscription, avatarURL })

    const { subscription: subscriptionResponse } = result
    const userResponse = { email, subscription: subscriptionResponse }

    res.status(201).send({ user: userResponse })
}

module.exports = register
