const mongoose = require("mongoose");
const apiSchema = new mongoose.Schema();
const api = mongoose.model("api", apiSchema);
module.exports = api;
