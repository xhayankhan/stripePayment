const { stripe } = require("../../setting/setting");
const httpGetCurrentCardHandler = async (req, res) => {
  const { accountId } = req.body;
  try {
    const account = await stripe.accounts.retrieve(accountId);
    if (account.external_accounts) {
      res.status(200).json({
        cardId: account.external_accounts.data[0].id,
      });
    } else {
      res.status(400).json({ error: "No attached card or bank found!" });
    }
  } catch (e) {
    res.status(400).json({ error: "Account not found!" });
  }
};
module.exports = httpGetCurrentCardHandler;
