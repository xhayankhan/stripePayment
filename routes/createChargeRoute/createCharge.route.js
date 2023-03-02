const express = require("express");
const router = express.Router();
const httpPostCreateChargeHandler = require("../../controller/getCustomerCardsController/getCustomerCards.controller");
router.post("/", httpPostCreateChargeHandler);
module.exports = router;
