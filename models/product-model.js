const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  rating: {
    type: Number, required: true, default: 0, min: 0, max: 5,
  },
  comment: { type: String, required: true },
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  countInStock: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  reviews: [reviewSchema],
  rating: {
    type: Number, required: true, default: 0, min: 0, max: 5,
  },
  numReviews: { type: Number, required: true, default: 0 },

}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product
