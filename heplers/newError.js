function newError(status) {
    const error = new Error()
    error.status = status
    throw error
}

module.exports = newError;
