const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

//实现用户密码是否匹配
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
