const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;
const profileValidate = (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res.status(401).json({
        profileStatus: true,
        message: "Token not found",
      });
    }

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // email/id save

    next();
  } catch (err) {
    return res.status(401).json({
      profileStatus: true,
      message: err.message,
    });
  }
};
const tokenCheck = (req, res, next) => {
  const Token = req.cookies.token;
  if (!Token) {
    return next();
  }
  try {
    const decoded = jwt.verify(Token, SECRET);
    req.email = decoded;
    return res.status(200).send({
      message: "Already logged in..",
    });
  } catch (err) {
    //wrong token and expare token
    next();
  }
};
const tokenVerify = (req, res, next) => {
  const Token = req.cookies.token;
  if (!Token) {
    return res.status(401).json({ message: "there is no token" });
  }
  try {
    const decoded = jwt.verify(Token, SECRET);
    req.email = decoded;
    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
module.exports = { tokenCheck, profileValidate, tokenVerify };
