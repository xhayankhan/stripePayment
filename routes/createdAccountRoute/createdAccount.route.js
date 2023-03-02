const express = require("express");
const { stripe, db } = require("../../setting/setting");

// {connectAccountCard:"asdasd",
// connectAccountId:"asdaskjd"}

const router = express.Router();
router.post("/", async (req, res) => {
  const { accId, uid } = req.body;
  if (accId && uid) {
    console.log(accId, uid);
    try {
      const account = await stripe.accounts.retrieve(accId);
      const cards = await stripe.accounts.listExternalAccounts(account.id, {
        object: "card",
        limit: 1,
      });
      const cityRef = db.collection("careTakers").doc(uid);

      try {
        const res = await cityRef.update({
          connectAccountId: account.id,
          connectAccountCard: cards.data[0].id,
        });
        res.status(200).json({ message: "Done" });
      } catch (e) {
        res.status(400).json({ error: "Session Expired. Try again!" });
      }
    } catch (e) {
      res.status(400).json({ error: "Invalid accountID" });
    }
  } else {
    res.status(400).json({ error: "Error" });
  }
});
module.exports = router;
