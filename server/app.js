const express = require('express')
const cors = require('cors')

const products = require('./data/products')

const app = express()
// 跨域
app.use(cors())
// 将请求转为json
app.use(express.json())

app.get('/api/products', (req, res) => {
  res.send(products)
})
app.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product._id === req.params.id)
  res.send(product)
})

// 从文件加载环境变量
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`App running at ${process.env.NODE_ENV}: http://localhost:${process.env.PORT}`)
})
