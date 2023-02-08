const mongoose = require('mongoose')
const { isEmail } = require('validator')
const uniqueValidator = require('mongoose-unique-validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide username'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      validate: [isEmail, 'Please provide valid email'],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please provide your password'],
      minLength: [8, 'Password must contain atleast eight charecters'],
    },
  },
  { timestamps: true }
)
userSchema.plugin(uniqueValidator)

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.correctPassword = async function (
  enteredPassword,
  userPassword
) {
  return await bcrypt.compare(enteredPassword, userPassword)
}

const User = mongoose.model('User', userSchema)

module.exports = User
