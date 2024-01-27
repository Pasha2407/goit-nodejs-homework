const register = require('./register')
const login = require('./login')
const logout = require('./logout')
const current = require('./current')
const updateSubscription = require('./updateSubscription')
const updateAvatar = require('./updateAvatar')
const getAvatar = require('./getAvatar')

module.exports = {
    register,
    login,
    logout,
    current,
    updateSubscription,
    updateAvatar,
    getAvatar,
}