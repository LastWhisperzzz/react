const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()

// 创建磁盘存储引擎
const storage = multer.diskStorage({
  // 定义路径
  destination(req, file, cb) {
    cb(null, '../uploads/')
  },
  // 定义文件名
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
  }
})

//验证文件类型
const checkFileType = (file, cb) => {
  //定义允许的文件扩展名
  const filtTypes = /jpg|jpeg|png/
  //判断文件扩展名
  const extname = filtTypes.test(path.extname(file.originalname).toLowerCase())
  //验证资源的媒体类型
  const mimetype = filtTypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb(new Error('仅限图片格式'))
  }
}

//上传文件
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

//创建文件上传路由
router.post('/', upload.single('image'), (req, res) => {
  const file = req.file
  file.url = `http://localhost:3000/uploads/${file.filename}`
  res.send(file)
  // res.send(`/${req.file.path}`)
})

module.exports = router
