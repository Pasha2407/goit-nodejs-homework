const crypto = require('node:crypto')

const { userModel } = require('../../models/users')
const newError = require('../../heplers/newError')
const sendEmail = require('../../heplers/sendEmail')

async function reVerification(req, res) {
    const { email } = req.body

    const user = await userModel.findOne({ email })
    if (user.verify === true) {
        throw newError(400, 'Verification has already been passed')
    }

    const verifyToken = crypto.randomUUID()
    await sendEmail({
        to: email,
        from: 'pasha.khimchuk2@gmail.com',
        subject: 'Hello',
        html: `To confirm your registration please click on the <a href='http://localhost:3000/api/users/verify/${verifyToken}'>link</a>`,
        text: `To confirm your registration please open the link http://localhost:3000/api/users/verify/${verifyToken}`,
    })

    await userModel.findByIdAndUpdate(user._id, { verifyToken })

    res.status(200).send({ message: 'Verification email sent' })
}

module.exports = reVerification