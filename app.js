const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const router = express.Router();

//routes import
const withdrawRoute = require("./routes/withdrawRoute/withdraw.route");
const saveCardRoute = require("./routes/saveCardRoute/saveCard.route");
const createChargeRoute = require("./routes/createChargeRoute/createCharge.route");
const accountRoute = require("./routes/accountRoute/account.route");
const createCustomerRoute = require("./routes/createCustomerRoute/createCustomer.route");
const getCustomerRoute = require("./routes/getCustomerRoute/getCustomer.route");
const getCustomerCardsRoute = require("./routes/getCustomerCardsRoute/getCustomerCards.route");

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//routes
router.use("/withdraw", withdrawRoute);
router.use("/save-card", saveCardRoute);
router.use("/create-charge", createChargeRoute);
router.use("/account", accountRoute);
router.use("/create-customer", createCustomerRoute);
router.use("/get-customer", getCustomerRoute);
router.use("/get-customer-cards", getCustomerCardsRoute);

//router
app.use("/", router);

//server start
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
