const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// 权限验证中间件
const protect = asyncHandler(async (req, res, next) => {
  let token
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      // token解密
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // 查询用户信息,排除密码
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401)
      throw new Error('未授权，token验证失败')
    }
  }
  if (!token) {
    res.status(401)
    throw new Error('未授权，没有token')
  }
})

module.exports = protect
