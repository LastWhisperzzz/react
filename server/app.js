const express = require('express')
const path = require('path')
const cors = require('cors')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./plugins/db')
const colors = require('colors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const axios = require('axios')
const morgan = require('morgan')

dotenv.config() // 从.env文件加载环境变量
connectDB() // 连接数据库

const app = express()
app.use(cors()) // 跨域
app.use(express.json()) // 将请求解析为json
// 打印请求到控制台
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// 路由
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

// upload文件夹作为静态文件
app.use('/upload', express.static(__dirname + '/uploads'))

//获取支付的status状态码
app.get('/status', (req, res) => {
  axios.get('https://www.thenewstep.cn/pay/logs/log.txt').then(response => {
    res.json({ status: response.data })
  })
})

// 错误处理中间件
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || ''
app.listen(PORT, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} at: http://${HOST ? HOST : 'localhost'}:${PORT}`.yellow
  )
})
