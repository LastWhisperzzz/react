const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./plugins/db')
const colors = require('colors')

// 从.env文件加载环境变量
dotenv.config()
const PORT = process.env.PORT || 5000
const products = require('./data/products')

const app = express()
// 跨域
app.use(cors())
// 将请求转为json
app.use(express.json())

// 连接数据库
connectDB()

app.get('/api/products', (req, res) => {
  res.send(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product._id === req.params.id)
  res.send(product)
})

app.listen(PORT, () => {
  console.log(
    `App running in ${process.env.NODE_ENV} at: http://localhost:${process.env.PORT}`.yellow.bold
  )
})
