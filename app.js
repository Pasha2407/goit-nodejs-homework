const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
const usersRouter = require('./routes/api/users')
const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', usersRouter)

app.use((req, res) => {
  res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
  if (err instanceof Error && err.status === 400) {
    res.status(400).json({ message: err.message })
  } else if (err instanceof Error && err.status === 404) {
    res.status(404).json({ message: err.message })
  } else if (err instanceof Error && err.status === 409) {
    res.status(409).json({ message: err.message })
  } else {
    res.status(500).json({ message: "Internal Server Error" })
  }
})

module.exports = app
