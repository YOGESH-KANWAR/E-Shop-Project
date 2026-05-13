const mongoose = require("mongoose");
const apiSchema = new mongoose.Schema();
const api = mongoose.model("Api", apiSchema);
module.exports = api;
