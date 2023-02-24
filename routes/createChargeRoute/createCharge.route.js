const express = require("express");
const router = express.Router();
const httpPostCreateChargeHandler = require("../../controllers/getCustomerCardsController/getCustomerCards.controller");
router.post("/", httpPostCreateChargeHandler);
module.exports = router;
