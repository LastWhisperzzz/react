const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')

//@desc    请求所有产品
//@route   GET/api/products?keyword=${keyword}
//@access  公开
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
  res.send(products)
})

//@desc    请求单个产品
//@route   GET/api/products/:id
//@access  公开
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('查询不到该产品!')
  }
})

module.exports = { getProducts, getProductById }
