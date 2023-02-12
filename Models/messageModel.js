const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      require,
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model('Message', msgSchema)
