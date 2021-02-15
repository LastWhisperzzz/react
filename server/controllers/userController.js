const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

//@desc    用户身份验证 & 获取Token
//@route   POST/api/users/login
//@access  公开
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  console.log(email)
  console.log(password)
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('邮箱或者密码无效')
  }
})

module.exports = authUser
