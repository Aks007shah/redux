const mongoose = require('mongoose');

const addProducts = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const addProductsNew = new mongoose.model('AddNewProducts', addProducts);

module.exports = addProductsNew;
