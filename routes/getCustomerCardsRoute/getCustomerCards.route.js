const express = require("express");
const router = express.Router();
const httpGetCustomerCardsHandler = require("../../controllers/getCustomerCardsController/getCustomerCards.controller");

router.get("/:customerId", httpGetCustomerCardsHandler);

module.exports = router;
