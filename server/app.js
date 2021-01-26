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

app.listen(5000, () => {
  console.log('App running at: http://localhost:5000')
})
