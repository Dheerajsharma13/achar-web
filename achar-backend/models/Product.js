const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  image: String,
  category: String,
  ingredients: [String],
  spiceLevel: { type: String, enum: ["Mild", "Medium", "Hot", "Extra Hot"] },
  weight: String,
  inStock: { type: Boolean, default: true },
  stock: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  tags: [String],
  nutritionInfo: {
    calories: Number,
    fat: String,
    sodium: String,
    carbs: String,
    protein: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
