const express = require("express");
const router = express.Router();
const httpGetCustomerHandler = require("../../controllers/getCustomerController/getCustomer.controller");
router.get("/:customerId", httpGetCustomerHandler);
module.exports = router;
