const mongoose = require("mongoose");
const offerSchema = new mongoose.Schema({});
const offer = mongoose.model("offer", offerSchema);
module.exports = offer;
