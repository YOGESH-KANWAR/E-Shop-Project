const multer = require("multer");
const fs = require("fs");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads/");  //uploads folder hai image save
  },
  filename: (red, file, cd) => {
    cd(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
module.exports = upload;
