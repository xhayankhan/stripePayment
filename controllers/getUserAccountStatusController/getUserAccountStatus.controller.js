const stripe = require("../../settings/settings");
const httpGetAccountStatusHandler = async (req, res) => {
  try {
    const account = await stripe.accounts.retrieve(req.params.acctID);
    res
      .status(200)
      .json({ accountStatus: account.individual.verification.status });
  } catch (e) {
    if (e.raw.code === "account_invalid") {
      res.status(400).json({ error: "User Not Found" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
module.exports = httpGetAccountStatusHandler;
