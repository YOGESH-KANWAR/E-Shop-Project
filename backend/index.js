const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./db/index");
app.use(
  cors({
    //origin: "http://localhost:5173",
    origin: "https://e-shop-project-1oof.vercel.app/",
    credentials: true,
  }),
);
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("./Middleware/uploadImage");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//middleware *********
const {
  tokenCheck,
  pofileValidet,
  tokenVerify,
} = require("./Middleware/token");

//****Controller**** */
const {
  addOferProduct,
  getOfferData,
} = require("./controller/Admin/offerProductController");

const {
  addCart,
  showCart,
  deleteCart,
} = require("./controller/web/cartController");
const {
  register,
  loginUser,
  profileStutas,
  userLogout,
} = require("./controller/web/userController");
const { getApi } = require("./controller/web/apiController");
const {
  addOrder,
  getOrderDetails,
} = require("./controller/web/productController");
const {
  adminSignup,
  adminLogin,
} = require("./controller/Admin/adminLoginController");

//**************Route******
app.get("/", (req, res) => {
  res.send("welcom to server");
});

//Api data  show
app.get("/api", getApi);

//***************card Route ************

app.post("/addCart", addCart);
app.get("/getCart", tokenVerify, showCart);
app.delete("/deleteCart/:id", tokenVerify, deleteCart);

//******** User route *******
//add user..
app.post("/singup", register);
app.post("/login", tokenCheck, loginUser);
app.get("/profile", pofileValidet, profileStutas); //pofileValid,profileStutas
app.get("/logout", userLogout);

//************Admin routes******/
app.post("/adminLogin", adminLogin);
app.post("/adminSignup", adminSignup);
// app.post("/adminSignup", (req, res) => {
//   res.send("hii");
// });

//******** Product route *******
//Offer Products.....
app.post("/offerProduct", addOferProduct);
app.get("/offerData", getOfferData);

//Order product
app.post("/orderProduct", addOrder);
app.get("/orderDetail", tokenVerify, getOrderDetails);

const PORT = process.env.PORT_NO || 5000;
dbConnect().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`server Runnig to http://localhost/${PORT}..!`);
    });
  } catch (error) {
    console.log("server is runnin field", error);
  }
});
