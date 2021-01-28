const mongoose = require('mongoose')
const dotenv = require('dotenv')
const users = require('./users')
const products = require('./products')
const User = require('../models/userModel')
const Product = require('../models/productModel')
const Order = require('../models/orderModel')
const connectDB = require('../plugins/db')
const colors = require('colors')

dotenv.config()
connectDB()

// 插入数据 yarn data:import
// 销毁数据 yarn data:destroy

//插入样本数据到数据库
const importData = async () => {
  try {
    // 清空数据库中的样本数据
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    //实现样本数据插入
    const createdUsers = await User.insertMany(users)
    const adminUser = createdUsers[0]._id //获取管理员id
    // 添加user字段
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }
    })
    await Product.insertMany(sampleProducts)

    console.log('样本数据插入成功!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

// 销毁样本数据
const destroyData = async () => {
  try {
    await Order.deleteMany()
    await User.deleteMany()
    await Product.deleteMany()

    console.log('样本数据销毁成功!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`Error: ${error.message}`.red.inverse)
    process.exit(1)
  }
}

// 判断命令行执行的函数
if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
