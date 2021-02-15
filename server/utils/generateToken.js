const jwt = require('jsonwebtoken')

// 生成token,有效期30天
const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

module.exports = generateToken
