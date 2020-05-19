const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
});
const addressSchema = {
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
};
const paymentResultSchema = {
  orderID: { type: String },
  payerID: { type: String },
  paymentID: { type: String },
};
const paymentSchema = {
  paymentResult: paymentResultSchema,
  paymentMethod: { type: String, enum: ['paypal'], required: true },
};
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [orderItemSchema],
  payment: paymentSchema,
  shipping: addressSchema,
  itemsPrice: { type: Number, required: true, min: 0 },
  shippingPrice: { type: Number, required: true, min: 0 },
  taxPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 },
  isPaid: { type: Boolean,  default: false },
  paidAt: { type: Date},
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },

}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order