const { stripe } = require("../setting/setting");
function generateAccountLink(accountID, origin, uid) {
  return stripe.accountLinks
    .create({
      type: "account_onboarding",
      account: accountID,
      refresh_url: `${origin}/api/onboard-user/refresh`,
      return_url: `${origin}/api/account-success?accID=${accountID}&uid=${uid}`,
    })
    .then((link) => link.url);
}
module.exports = generateAccountLink;
