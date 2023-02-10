const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const stripe = require("stripe")("sk_test_51InumCJNs8MZJzppyvx0VDvVS0bmEg0vyRUjUpyQGeB7TKW4YROG9PjSgTIH061ImZV6Qr9CDZRuXJak7hqAzyDF00SJjXBtGu");

const app = express();
app.use(bodyParser.json());

async function saveCard(token, customerId) {
  try {
    const card = await stripe.customers.createSource(customerId, {
      source: token
    });
    console.log("Credit card saved successfully:", card.id);

    // const response = await axios.post("/save-card", {
    //   cardId: card.id,
    //   customerId: customerId
    // });
    console.log("Credit card information saved on the server:", response.data);
  } catch (error) {
    console.error("Error saving credit card:", error);
  }
}

app.post("/save-card", async (req, res) => {
  const { token, customerId } = req.body;
  await saveCard(token, customerId);
  res.send({ message: "Credit card saved successfully" });
});
app.post("/create-charge", async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      customer:req.body.customer,
      source: req.body.source,
      description: req.body.description
    });
    console.log("Charge created successfully:", charge);
    res.send({ message: "Charge created successfully", charge });
  } catch (error) {
    console.error("Error creating charge:", error);
    res.status(500).send({ message: "Error creating charge" });
  }
});
app.post("/create-customer", async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      name: req.body.name,
      description: req.body.description
    });
    console.log("Customer created successfully:", customer.id);
    res.send({ message: "Customer created successfully", customerId: customer.id });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).send({ message: "Error creating customer" });
  }
});
app.get("/get-customer/:customerId", async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(req.params.customerId);
    console.log("Customer retrieved successfully:", customer.id);
    res.send({ message: "Customer retrieved successfully", customer });
  } catch (error) {
    console.error("Error retrieving customer:", error);
    res.status(500).send({ message: "Error retrieving customer" });
  }
});
app.get("/get-customer-cards/:customerId", async (req, res) => {
  try {
    const customer = await stripe.customers.retrieve(req.params.customerId);
    const cards = await stripe.customers.listSources(customer.id, {
      object: "card"
    });
    console.log("Cards retrieved successfully:", cards.data);
    res.send({ message: "Cards retrieved successfully", cards: cards.data });
  } catch (error) {
    console.error("Error retrieving cards:", error);
    res.status(500).send({ message: "Error retrieving cards" });
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});