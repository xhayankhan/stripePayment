const express = require("express");
const router = express.Router();
const httpPostUpdateAccountHandler = require("../../controllers/accountController/updateAccount.controller");
const httpGetAccountStatusHandler = require("../../controllers/getUserAccountStatusController/getUserAccountStatus.controller");
const upload = require("../../settings/setting.multer");
router.get("/:acctID", httpGetAccountStatusHandler);
router.post(
  "/update",
  upload.fields([
    { name: "front", maxCount: 1 },
    { name: "back", maxCount: 1 },
  ]),
  httpPostUpdateAccountHandler
);

module.exports = router;
