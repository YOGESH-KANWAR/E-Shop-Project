const CartModel = require("../../Models/CartModel");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;
const addCart = async (req, res) => {
  const Token = req.cookies.token;
  try {
    const decoded = jwt.verify(Token, SECRET);
    req.user = decoded;
    const email = await req.user.email;
    const cartItem = await req.body;
    cartItem.userId = email;
    const cardData = await CartModel(cartItem);
    const result = await cardData.save();
    res.send({
      status: 200,
      message: "add to Cart Successfully",
      resData: result,
    });
  } catch (err) {
    res.send({ status: 400, message: err.message });
  }
};
const showCart = async (req, res) => {
  const Token = req.cookies.token;
  try {
    const decoded = jwt.verify(Token, SECRET);
    req.user = decoded;
    const userId = req.user.email;
    const getData = await CartModel.find({ userId });
    res.send({ status: 200, message: "show card", resData: getData });
  } catch (err) {
    res.send({ status: 400, message: err.message });
  }
};
const deleteCart = async (req, res) => {
  const Token = req.cookies.token;
  const pid = req.params.id;
  try {
    const decoded = await jwt.verify(Token, SECRET);
    req.user = decoded;
    const userid = req.user.email;
    const deleteItem = await CartModel.findOneAndDelete({
      userId: userid,
      "cartDetails.productId": pid,
    });
    if (!deleteItem) {
      return res.status(404).json({ message: "item is not found" });
    }
    res.status(200).json({
      message: "Delete your card...!",
      resData: deleteItem,
    });
  } catch (err) {
    res.send({ status: 500, message: err.message });
  }
};

module.exports = { addCart, showCart, deleteCart };
