const express = require('express');
const Order = require('../models/Order');
const { auth, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all orders (admin)
router.get('/', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new order
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, shippingAddress } = req.body;
    const order = new Order({ user: req.user.userId, items, total, shippingAddress });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin)
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get orders for a specific user
router.get('/user/:userId', auth, async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ user: userId }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;