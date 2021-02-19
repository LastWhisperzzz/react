const mongoose = require('mongoose')

// 评论
const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

// 产品
const productSchema = new mongoose.Schema(
  {
    // 用户id
    user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true }, // 评分
    reviews: [reviewSchema], // 评论
    numReviews: { type: Number, required: true }, // 评价数
    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 } //库存
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', productSchema)
