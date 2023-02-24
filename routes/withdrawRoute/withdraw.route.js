const express = require("express");
const router = express.Router();
const httpPostWithdrawHandler = require("../../controllers/withdrawController/withdraw.controller");

router.post("/", httpPostWithdrawHandler);

module.exports = router;
