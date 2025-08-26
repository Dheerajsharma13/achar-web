const express = require('express');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/authMiddleware'); // <-- Add this line
const router = express.Router();


// Get a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new product (admin only)
router.post('/', auth, admin, async (req, res) => { // <-- Protect this route
  try {
    const { name, description, price, image, stock } = req.body;
    const product = new Product({ name, description, price, image, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;