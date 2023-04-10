const generateAccountLink = require("../../handlers/generateAccountLink");
const httpGetOnBoardAccountRefresh = async (req, res) => {
  const origin = process.env.ORIGIN;
  if (!req.session.accountID) {
    res.redirect(`${origin}`);
    return;
  }
  try {
    const { accountID, uID } = req.session;
    console.log("iwasnthere" + origin);
    const accountLinkURL = await generateAccountLink(accountID, origin, uID);
    res.redirect(accountLinkURL);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};
module.exports = httpGetOnBoardAccountRefresh;
