require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const app = express();
const https = require("https");
const fs = require("fs");

const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/api.hailocare.com/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/api.hailocare.com/fullchain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
};

const router = express.Router();

const withdrawRoute = require("./routes/withdrawRoute/withdraw.route");

const onboardUserRoute = require("./routes/onboardUserRoute/onboardUser.route");

const saveCardRoute = require("./routes/saveCardRoute/saveCard.route");

const createChargeRoute = require("./routes/createChargeRoute/createCharge.route");

const createCustomerRoute = require("./routes/createCustomerRoute/createCustomer.route");

const getCustomerRoute = require("./routes/getCustomerRoute/getCustomer.route");

const getCustomerCardsRoute = require("./routes/getCustomerCardsRoute/getCustomerCards.route");

const createdAccountRoute = require("./routes/createdAccountRoute/createdAccount.route");

const accountRoute = require("./routes/updateAccountRoute/account.route");

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
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  next();
});
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
router.use("/account-success", (req, res) => {
  const file = path.join("public", "success.html");
  res.sendFile(file);
});
//server
app.use("/api", router);

const httpsServer = https.createServer(credentials, app);

const port = process.env.PORT || 4242;
httpsServer.listen(port, () =>
  console.log(`Node server listening on port ${port}!`)
);
