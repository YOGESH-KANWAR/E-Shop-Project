const addOfferProduct = require("../../Models/addOfferProductModel");
const productoffer = require("../../Models/getOfferProductModel");
const addOferProduct = async (req, res) => {
  try {
    await OfferProductModel.save(req.body);
    const data = await addOfferProduct.find();
    res.status(200).json({ resData: data });
  } catch (err) {
    res(500).json({ message: err.message });
  }
};
const getOfferData = async (req, res) => {
  try {
    const data = await productoffer.find();
    res.status(200).json({ message: "ok", resData: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addOferProduct, getOfferData };
