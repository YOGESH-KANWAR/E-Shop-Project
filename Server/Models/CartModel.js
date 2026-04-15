const mongoose = require("mongoose");
const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  cartDetails: {
    productId: {
      type: String,
      require: true,
    },
    productImage: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    productPrice: {
      type: String,
      require: true,
    },
  },
});
const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
