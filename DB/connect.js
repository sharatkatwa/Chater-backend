const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = (url) => {
  mongoose.set('strictQuery', false).connect(url)
}
module.exports = connectDB
