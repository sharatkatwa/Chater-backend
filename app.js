require('dotenv').config()
const express = require('express')
const app = express()
require('express-async-errors')

const globalErrorHandler = require('./Controllers/errorController')
const userRoutes = require('./Routes/userRoutes')
const authRoutes = require('./Routes/authRoutes')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('this is chater application')
})

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/auth', authRoutes)

app.use(globalErrorHandler)

module.exports = app
