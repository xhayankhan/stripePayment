const express = require("express");
const router = express.Router();

const httpGetCardHandler = require("../../controller/getAccountCardController/getAccountCard.controller");
const httpPostUpdateCardHandler = require("../../controller/updateAccountCardController/updateAccountCard.controller");

router.post("/", httpPostUpdateCardHandler);
router.post("/get", httpGetCardHandler);

module.exports = router;
