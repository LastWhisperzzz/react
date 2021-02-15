const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./plugins/db')
const colors = require('colors')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')

dotenv.config() // 从.env文件加载环境变量
connectDB() // 连接数据库

const app = express()
app.use(cors()) // 跨域
app.use(express.json()) // 将请求解析为json

// 路由
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

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
