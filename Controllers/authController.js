const { AppError } = require('../ErrorHandler/custom-api')
const User = require('../Models/userModel')
const jwt = require('jsonwebtoken')

signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

const createSendToken = async (user, statusCode, req, res) => {
  const token = await signToken(user._id)

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  })

  user.password = undefined

  res.status(statusCode).json({
    status: 'success',
    token,
    user,
  })
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  if ((!email, !password)) {
    return next(AppError('Please provide both email and password', 400))
  }
  // Checking the user exist or not
  const user = await User.findOne({ email }).select('+password')

  // campare the given password
  const isPasswordCorrect = await user.correctPassword(password, user.password)

  if (!user || !isPasswordCorrect) {
    return next(AppError(`Incorrect email or password`), 401)
  }

  // if everything is good create and send the cookie
  createSendToken(user, 200, req, res)
}
const register = async (req, res, next) => {
  const { username, email, password, confirmPassword } = req.body
  if (!username || !email || !password || !confirmPassword) {
    return next(AppError('Some fields are missing please fill all fields', 400))
  }
  if (password !== confirmPassword) {
    return next(AppError('password and confirm password must be same!', 400))
  }
  const user = await User.create({ username, email, password })

  res.status(201).json({
    status: 'success',
    message: 'User created successfully! Now you can login',
    user,
  })
}
const logout = async (req, res) => {
  res.cookie('jwt', 'LoggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ status: 'success', message: 'LoggedOut' })
}

module.exports = { login, logout, register }
