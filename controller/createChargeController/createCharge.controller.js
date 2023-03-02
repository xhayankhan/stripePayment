const stripe = require("../../settings/settings");
const httpPostCreateChargeHandler = async (req, res) => {
  try {
    const charge = await stripe.charges.create({
      amount: req.body.amount,
      currency: req.body.currency,
      customer: req.body.customer,
      source: req.body.source,
      description: req.body.description,
    });
    console.log("Charge created successfully:", charge);
    res.send({ message: "Charge created successfully", charge });
  } catch (error) {
    console.error("Error creating charge:", error);
    res.status(500).send({ message: "Error creating charge" });
  }
};
module.exports = httpPostCreateChargeHandler;
