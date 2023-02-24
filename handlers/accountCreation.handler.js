const stripe = require("../settings/settings");
const createAccount = async (customer) =>
  stripe.accounts.create({
    type: "express",
    country: "US",
    email: customer.email,
    business_type: "individual",
    individual: {
      first_name: customer.email.split("@")[0],
      last_name: "Doe",
      email: customer.email,
      phone: "555-555-5555",
      address: {
        line1: "123 Main St",
        city: "Anytown",
        state: "NY",
        postal_code: "12345",
        country: "US",
      },
      dob: {
        day: 1,
        month: 1,
        year: 1970,
      },
      ssn_last_4: "1234",
    },
    business_profile: {
      mcc: "7292",
      url: "https://sirzaxxxx.info",
    },
    tos_acceptance: {
      date: Math.floor(Date.now() / 1000),
      ip: req.socket.remoteAddress.split(":")[3],
    },
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
module.exports = createAccount;
