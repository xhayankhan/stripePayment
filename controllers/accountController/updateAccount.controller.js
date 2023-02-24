const stripe = require("../../settings/settings");
const fs = require("fs");
const httpPostUpdateAccountHandler = async (req, res) => {
  const { accId } = req.body;
  const { front, back } = req.files;

  var frontp = fs.readFileSync(
    accId + "-" + front[0].fieldname + "-" + front[0].originalname
  );
  var backp = fs.readFileSync(
    accId + "-" + back[0].fieldname + "-" + back[0].originalname
  );

  var frontDoc = await stripe.files.create({
    purpose: "identity_document",
    file: {
      data: frontp,
      name: front[0].fieldname,
      type: "application/octet-stream",
    },
  });
  var backDoc = await stripe.files.create({
    purpose: "identity_document",
    file: {
      data: backp,
      name: back[0].fieldname,
      type: "application/octet-stream",
    },
  });

  const account = await stripe.accounts.update(accId, {
    individual: {
      verfication: {
        document: {
          front: frontDoc,
          back: backDoc,
        },
      },
    },
  });
};
module.exports = httpPostUpdateAccountHandler;
