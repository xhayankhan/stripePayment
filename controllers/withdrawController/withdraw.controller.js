const withdrawal = require("../../handlers/withdrawal.handler");
const cardTokenGeneration = require("../../handlers/bankTokenCreate.handler");
const stripe = require("../../settings/settings");
const httpPostWithdrawHandler = async (req, res) => {
  try {
    try {
      var data = req.body;
      var ssn = req.body.id_number;
      var fname = req.body.first_name;
      var lname = req.body.last_name;
      var phnNo = req.body.phone_number;
      var addressLine;
      var addressCity;
      var addressState;
      var addressPostal;
      var country;
      if (req.body.address) {
        addressLine = req.body.address.line1;
        addressCity = req.body.address.city;
        addressState = req.body.address.state;
        addressPostal = req.body.postalCode;
        country = req.body.address.country;
      }

      var dobDate;
      var dobMonth;
      var dobYear;
      if (req.body.dob) {
        var dobDate = req.body.dob.date;
        var dobMonth = req.body.dob.month;
        var dobYear = req.body.dob.year;
      }

      var cardNumber;
      var cardExpiryMonth;
      var cardExpiryYear;
      var cardCvc;
      if (req.body.card) {
        cardNumber = req.body.card.number;
        cardExpiryMonth = req.body.card.expMonth;
        cardExpiryYear = req.body.card.expYear;
        cardCvc = req.body.card.cvc;
      }
    } catch (e) {
      console.log(e);
    }

    const customer = await stripe.customers.retrieve(data.cid);
    if (req.body.account) {
      withdrawal(req.body.account, req.body.amount, res);
    } else {
      stripe.accounts
        .create({
          type: "custom",
          country: "US",
          email: customer.email,
          business_type: "individual",
          individual: {
            id_number: ssn ?? "123456789",
            first_name: fname ?? customer.email.split("@")[0],
            last_name: lname ?? "Doe",
            email: customer.email,
            phone: phnNo ?? "555-555-5555",
            address: {
              line1: addressLine ?? "421 8TH AVE",
              city: addressCity ?? "New York",
              state: addressState ?? "NY",
              postal_code: addressPostal ?? "10001",
              country: country ?? "US",
            },
            registered_address: {
              line1: addressLine ?? "421 8TH AVE",
              city: addressCity ?? "New York",
              state: addressState ?? "NY",
              postal_code: addressPostal ?? "10001",
              country: country ?? "US",
            },
            dob: {
              day: dobDate ?? 1,
              month: dobMonth ?? 1,
              year: dobYear ?? 1970,
            },
            ssn_last_4: 6789,
          },
          business_profile: {
            mcc: "5411",
            url: "https://sirzaxxxx.info",
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
          tos_acceptance: {
            ip: req.socket.remoteAddress.split(":")[3],
            date: Math.floor(Date.now() / 1000),
          },
        })
        .then((account) => {
          stripe.tokens
            .create({
              card: {
                number: cardNumber ?? "4000056655665556",
                exp_month: cardExpiryMonth ?? 2,
                exp_year: cardExpiryYear ?? 2024,
                cvc: cardCvc ?? "314",
                currency: "usd",
              },
            })
            .then((token) => {
              stripe.accounts
                .createExternalAccount(account.id, {
                  external_account: token.id,
                })
                .then((resp) => {
                  // stripe.accounts
                  //   .retrieve(resp.account)
                  //   .then((acc) => {
                  //     console.log(acc);
                  //     res.send(acc);
                  //   })
                  //   .catch((e) => {
                  //     res.status(500).json({ err: e });
                  //   });
                  withdrawal(account.id, data.amount, res);
                })
                .catch((e) => {
                  res.status(500).json({
                    error: "Error attaching an external account. Try Again!",
                    accErr: e,
                  });
                });
            })
            .catch((e) => {
              res.status(500).json({
                error:
                  "Error occurred during card token creation! Try providing correct debit card.",
                accErr: e,
              });
            });
        })
        .catch((e) => {
          res
            .status(500)
            .json({ error: "Cannot create account.", acctualErr: e });
        });
    }
    // await withdrawal(data.account, data.amount, res);
  } catch (e) {
    res.status(404).json({ error: "Customer not found", actualErr: e });
  }
};
module.exports = httpPostWithdrawHandler;
