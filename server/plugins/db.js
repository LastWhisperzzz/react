const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected at: ${connect.connection.host}:${connect.connection.port}`)
  } catch (error) {
    console.log(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB
