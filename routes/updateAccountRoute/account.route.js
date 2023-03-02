const express = require("express");
const router = express.Router();

const httpPostUpdateCardHandler = require("../../controller/updateAccountCardController/updateAccountCard.controller");

router.post("/card", httpPostUpdateCardHandler);

module.exports = router;
