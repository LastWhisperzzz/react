const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    // 订单
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true }, // 数量
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' }
      }
    ],
    // 送货地址
    shippingAddress: {
      address: { type: String, required: true },
      province: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true }
    },
    // 支付方式
    paymentMethod: { type: String, required: true },
    // 支付结果
    paymentResult: {
      id: { type: String },
      status: { type: String },
      updata_time: { type: String },
      email_address: { type: String }
    },
    // 发货状态
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
    // 邮费
    shippingPrice: { type: Number, required: true, default: 0 },
    // 支付费用
    totalPrice: { type: Number, required: true, default: 0 },
    // 支付状态
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Order', orderSchema)
