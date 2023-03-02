require("dotenv").config();
const express = require("express");
const { resolve } = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const router = express.Router();

const withdrawRoute = require("./routes/withdrawRoute/withdraw.route");

const onboardUserRoute = require("./routes/onboardUserRoute/onboardUser.route");

const saveCardRoute = require("./routes/saveCardRoute/saveCard.route");

const createChargeRoute = require("./routes/createChargeRoute/createCharge.route");

const createCustomerRoute = require("./routes/createCustomerRoute/createCustomer.route");

const getCustomerRoute = require("./routes/getCustomerRoute/getCustomer.route");

const getCustomerCardsRoute = require("./routes/getCustomerCardsRoute/getCustomerCards.route");

const createdAccountRoute = require("./routes/createdAccountRoute/createdAccount.route");

const accountRoute = require("./routes/updateAccountRoute/account.route")

//middlewares
app.use(express.static(process.env.STATIC_DIR));
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());

//routes
router.use("/onboard-user", onboardUserRoute);
router.use("/save-card", saveCardRoute);
router.use("/create-charge", createChargeRoute);
router.use("/create-customer", createCustomerRoute);
router.use("/get-customer", getCustomerRoute);
router.use("/get-customer-cards", getCustomerCardsRoute);
router.use("/withdraw", withdrawRoute);
router.use("/accountCreated", createdAccountRoute);
router.use("/card", accountRoute);
//server
app.use("/api", router);

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Node server listening on port ${port}!`));
