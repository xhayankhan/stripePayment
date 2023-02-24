const stripe = require("../settings/settings");
const cardTokenGeneration = async () =>
  stripe.tokens.create({
    card: {
      number: "4242424242424242",
      exp_month: 2,
      exp_year: 2024,
      cvc: "424",
      currency: "usd",
    },
  });

module.exports = cardTokenGeneration;
