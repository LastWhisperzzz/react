const express = require('express')
const router = express.Router()
const addOrderItems = require('../controllers/orderContorller')
const protect = require('../middleware/authMiddleware')

router.route('/').post(protect, addOrderItems)
