const crypto = require('node:crypto')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')

const { userModel } = require('../../models/users')
const newError = require('../../heplers/newError')
const sendEmail = require('../../heplers/sendEmail')

async function register(req, res) {
    const { email, password, subscription } = req.body
    const avatarURL = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })

    const user = await userModel.findOne({ email })
    if (user !== null) {
        throw newError(409)
    }
    const passwordHash = await bcrypt.hash(password, 8)

    const verifyToken = crypto.randomUUID()
    await sendEmail({
        to: email,
        from: 'pasha.khimchuk2@gmail.com',
        subject: 'Hello',
        html: `To confirm your registration please click on the <a href='http://localhost:3000/api/users/verify/${verifyToken}'>link</a>`,
        text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verifyToken}`,
    })

    const result = await userModel.create({ email, password: passwordHash, subscription, avatarURL, verifyToken })

    const { subscription: subscriptionResponse } = result
    const userResponse = { email, subscription: subscriptionResponse }

    res.status(201).send({ user: userResponse })
}

module.exports = register
