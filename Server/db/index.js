const mongoose = require("mongoose");
require("dotenv").config();
const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("database contion succefully");
  } catch (error) {
    console.log("database conection feild..", error);
  }
};
module.exports = dbConnect;
