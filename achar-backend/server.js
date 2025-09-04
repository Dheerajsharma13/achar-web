const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Test route
app.get('/', (req, res) => res.send('API Running'));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes); // ✅ products routes

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes); // ✅ only once

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
