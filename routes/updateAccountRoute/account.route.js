const express = require("express");
const router = express.Router();

const httpGetCardHandler = require("../../controller/getAccountCardController/getAccountCard.controller");
const httpGetCurrentCardHandler = require("../../controller/getAccountCurrentCardController/getAccountCurrentCard.controller");
const httpPostUpdateCardHandler = require("../../controller/updateAccountCardController/updateAccountCard.controller");

router.post("/", httpPostUpdateCardHandler);
router.post("/get", httpGetCardHandler);
router.post("/current", httpGetCurrentCardHandler);

module.exports = router;
