const mongoose = require("mongoose");
// Product Subdocument Schema
const productSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "Smartphones",
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "USD",
  },
  stock: {
    type: Number,
    default: 0,
  },
  features: [
    {
      type: String,
    },
  ],
  warranty: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  image_url: {
    type: String,
  },
});

// Main Category Schema
const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
    },
    products: [productSchema], // productSchema stracture use
  },
  { timestamps: true },
);

const productOffer = mongoose.model("productOffer", categorySchema);
module.exports = productOffer;
