const express = require('express')
const app = express()

const userRoutes = require('./Routes/userRoutes')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('this is chater application')
})

app.use('/api/v1/users', userRoutes)

module.exports = app
