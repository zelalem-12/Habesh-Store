const express = require('express');
const asyncHandler = require('express-async-handler');
const Product = require('../models/product-model');
const  {isAuthenticated, isAdmin} = require('../util');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const category = req.query.category ? { category: req.query.category } : {};
  const search = req.query.search ? {
    name: {
      $regex: req.query.search,
      $options: 'i',
    },

  } : {};
  const order = req.query.sort ? (req.query.sort === 'lowest'
    ? { price: 1 } : { price: -1 }) : { _id: -1 };
  const products = await Product.find({ ...category, ...search }).sort(order);
  res.send(products);
}));

router.get('/categories', asyncHandler(async (req, res) => {
  const categories = await Product.find().distinct('category');
  res.send(categories);
}));

router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    throw Error('Product not found.');
  }
}));
router.post('/', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    countInStock: req.body.countInStock,
    imageUrl: req.body.imageUrl,
    category: req.body.category,
    brand: req.body.brand,
    // features: req.body.features,
  });
  const newProduct = await product.save();
  res.send({ message: 'Product Created', data: newProduct });
}));

router.put('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.countInStock = req.body.countInStock || product.countInStock;
    product.image = req.body.image || product.image;
    product.category = req.body.category || product.category;
    product.brand = req.body.brand || product.brand;
    product.features = req.body.features || product.features;

    const updatedProduct = await product.save();
    res.send({ message: 'Product Updated', data: updatedProduct });
  } else {
    throw Error('Product does not exist.');
  }
}));
router.post('/:id/reviews', isAuthenticated, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      rating: req.body.rating, comment: req.body.comment, user: req.user._id, name: [req.user.first_name, req.user.last_name].join(' ')
    };
    product.reviews.push(review);
    product.rating = product.reviews.reduce((a, c) => c.rating + a, 0) / product.reviews.length;
    product.numReviews = product.reviews.length;
    const updatedProduct = await product.save();
    res.send({ message: 'Comment Created.', data: updatedProduct.reviews[updatedProduct.reviews.length - 1] });
  } else {
    throw Error('Product does not exist.');
  }
}));
router.delete('/:id', isAuthenticated, isAdmin, asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const removeProduct = await product.remove();
    res.send({ message: 'Product Deleted', data: removeProduct });
  } else {
    throw Error('Product already removed.');
  }
}));

module.exports = router;
