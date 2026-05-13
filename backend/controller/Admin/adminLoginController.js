const adminModel = require("../../Models/Admin/adminModel");
const adminSignup = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await adminModel(req.body);
    const userExis = await adminModel.findOne({ email });
    if (userExis) {
      return res.status(404).json({ message: "user already login..." });
    }
    const result = await user.save();
    res
      .status(200)
      .json({ message: "Account created Successfuly", resData: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    if (password !== user.password) {
      return res.status(404).json({ message: "Wrong Password.." });
    }
    res.status(200).json({ message: "Login Successfuly.." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { adminSignup, adminLogin };
