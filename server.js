require('dotenv').config()
const app = require('./app')
const connectDB = require('./DB/connect')

// mongodb connection
const startDB = async () => {
  try {
    await connectDB(process.env.DATABASE)
    console.log('DB connection successful!')
  } catch (error) {
    console.log(error)
  }
}

// start express server
const port = process.env.PORT || 3000
startDB().then(() => {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`)
  })
})
