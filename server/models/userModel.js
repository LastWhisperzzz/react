const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, //unique唯一
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false } // 是否为管理员
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)
