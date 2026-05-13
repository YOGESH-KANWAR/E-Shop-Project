require("dotenv").config();
const mongoose = require("mongoose");
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log("database contion succefully");
  } catch (error) {
    console.log("database conection feild..", error);
  }
};
module.exports = dbConnect;
