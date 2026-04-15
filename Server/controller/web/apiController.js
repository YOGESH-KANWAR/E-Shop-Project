const ApiModel = require("../../Models/ApiModel");
const getApi = async (req, res) => {
  try {
    const apiData = await ApiModel.find();
    res.send({ status: 200, message: "show api data", resData: apiData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = { getApi, };
