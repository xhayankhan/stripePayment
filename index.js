require("dotenv").config();
const express = require("express");
const { resolve } = require("path");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { stripe } = require("./setting/setting");

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

app.post(
  "/webhook",
  express.json({ type: "application/json" }),
  (request, response) => {
    const event = request.body;
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Get the signature sent by Stripe
      const signature = request.headers["stripe-signature"];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`??????  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    console.log("here");
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log("payment happened");
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

const port = process.env.PORT || 4242;
app.listen(port, () => console.log(`Node server listening on port ${port}!`));
