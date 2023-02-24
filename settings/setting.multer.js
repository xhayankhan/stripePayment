const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "/uploads/"));
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    cb(null, req.body.accID + "-" + file.fieldname + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

module.exports = upload;
