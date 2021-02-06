const mongoose = require('mongoose')

// 连接数据库
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log(
      `MongoDB Connected at: ${connect.connection.host}:${connect.connection.port}`.cyan.underline
    )
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline)
    process.exit(1)
  }
}

module.exports = connectDB
