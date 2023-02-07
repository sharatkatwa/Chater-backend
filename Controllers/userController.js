const { create } = require('../Models/userModel')
const User = require('../Models/userModel')

const getAllUsers = async (req, res) => {
  const users = await User.find()

  res.status(200).json({
    status: 'success',
    results: users.length,
    users,
  })
}
const getUser = async (req, res) => {
  const userId = req.params.id

  const user = await User.findById(userId)

  res.status(200).json({
    status: 'success',
    user,
  })
}
const createUser = async (req, res) => {
  const { username, email, password } = req.body

  const user = await User.create({ username, email, password })

  res.status(201).json({
    status: 'success',
    user,
  })
}
const updateUser = async (req, res) => {
  const userId = req.params.id
  const { username, email, password } = req.body

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username, email, password },
    {
      new: true,
      runValidators: true,
    }
  )

  res.status(200).json({
    status: 'success',
    updatedUser,
  })
}
const deleteUser = async (req, res) => {
  const userId = req.params.id

  const deletedUser = await User.findByIdAndDelete(userId)

  res.status(204).json({
    deletedUser,
  })
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
}
