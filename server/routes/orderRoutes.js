const express = require('express')
const router = express.Router()
const {
  addOrderItems,
  getOrderById,
  getOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders
} = require('../controllers/orderContorller')
const { protect, admin } = require('../middleware/authMiddleware')

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/pay/:id').put(protect, updateOrderToPaid)
router.route('/deliver/:id').put(protect, admin, updateOrderToDelivered)

module.exports = router
