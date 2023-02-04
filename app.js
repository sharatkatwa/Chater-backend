const express = require('express')
const app = express()

app.use(express.json())

app.use('/', (req, res) => {
  res.send('this is chater application')
})

module.exports = app
