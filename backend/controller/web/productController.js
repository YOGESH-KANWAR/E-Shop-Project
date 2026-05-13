const OrderModel = require("../../Models/OrderModel");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;
const addOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    // const ordId = orderDetails.orderId;
    const ordId = orderId;
    const newOrder = new OrderModel(req.body);
    await newOrder.save();
    const result = await OrderModel.findOne({ orderId: ordId });
    res.json({
      status: 200,
      message: "Conform your order..",
      resData: result,
    });
    // orderDetails;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// OrderDetails....
const getOrderDetails = async (req, res) => {
  const Token = req.cookies.token;
  try {
    const decoded = jwt.verify(Token, SECRET);
    //req.email = decoded;
    // const userId = (req.email = decoded);
    const result = await OrderModel.find({ userId: decoded.email });
    res.status(200).json({ message: "ok..", resData: result });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = { addOrder, getOrderDetails };
