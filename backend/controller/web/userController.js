require("dotenv").config();
const bcrypt = require("bcrypt");
const UserModel = require("../../Models/UserModel");
const LoginUserModel = require("../../Models/loginUserModel");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const SECRET = process.env.SECRET_KEY;

const register = async (req, res) => {
  try {
    const { name, lastName, mobileNumber, email, gender, age, password } =
      req.body;
    const hashPass = await bcrypt.hash(password, 10);
    const getUser = await UserModel.findOne({ email });
    if (getUser) {
      return res.send({ status: "404", message: "User alredy exist.." });
    }
    const newUser = await new UserModel({
      name: name,
      lastName: lastName,
      mobileNumber: mobileNumber,
      email: email,
      gender: gender,
      age: age,
      password: hashPass,
      status: "active",
      isVerified: false,
    });
    await newUser.save();
    res
      .status(200)
      .send({ statusOk: true, message: "Registration successfuli.." });
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await UserModel.findOne({ email });
    if (!userDetail) {
      return res.send({ status: "404", message: "User not found.." });
    }
    const passwordMatch = await bcrypt.compare(password, userDetail.password);
    if (!passwordMatch) {
      return res.send({ status: "404", message: "Wrong password " });
    }
    const Token = jwt.sign(
      { name: userDetail.name, email: userDetail.email },
      SECRET,
      { expiresIn: "1h" },
    );
    res.cookie("token", Token, {
      httpOnly: false, //true
      sameSite: "lax", //strict
      secure: true, //false
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      status: "200",
      profileStatus: true,
      message: "Login Successfuli...",
      resData: userDetail,
    });
  } catch (err) {
    res.send({ status: 401, message: err.message });
  }
};
const profileStutas = async (req, res) => {
  try {
    const Token = await req.cookies.token;
    const decoded = await jwt.verify(Token, SECRET);
    req.user = decoded;
    const email = await req.user.email;
    const userDetail = await UserModel.findOne({ email });
    return res.status(200).json({
      profileStatus: false,
      resData: userDetail,
    });
  } catch (err) {
    return res.status(401).json({ message: err.message, profileStatus: true });
  }
};

const userLogout = async (req, res) => {
  res.clearCookie("token");
  res.send({ message: "Logout Successfuly.." });
};

/* const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUser = await UserModel.findOne({ email });
    if (!getUser) {
      return res.send({ status: "404", message: "User not found.." });
    }
    const passwordMatch = await bcrypt.compare(password, getUser.password);
    if (!passwordMatch) {
      return res.send({
        status: 404,
        message: "Invalid Password ",
      });
    }
    res.send({
      status: "200",
      message: "Login Successfuli...",
      resData: req.body,
    });
  } catch (err) {
    res.send({ status: 400, message: err.message });
  }
}; */

module.exports = { register, loginUser, profileStutas, userLogout };
