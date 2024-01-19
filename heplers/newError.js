const messages = {
    404: "Not found",
    409: 'Email in use'
}

function newError(status, message = messages[status]) {
    const error = new Error(message)
    error.status = status
    throw error
}

module.exports = newError;
