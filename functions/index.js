const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require("stripe");

const config = functions.config();
const app = express();
admin.initializeApp(config.firebase);

const events = admin.database().ref("/events");

const TIMESTAMP = admin.database.ServerValue.TIMESTAMP;

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/register", (req, res) => {
  try {
    console.info(req.method, req.path, req.body);
    const { token, form } = req.body;

    const stripe = token.livemode
      ? Stripe(config.live.stripe_sk)
      : Stripe(config.test.stripe_sk);

    stripe.charges
      .create({
        amount: form.amount,
        currency: "usd",
        source: token.id,
        description: "MFT2 Registration"
      })
      .then(result => {
        console.log(result);

        form.charge_id = result.id;

        events.push({
          type: `REGISTERED${token.livemode ? "" : "_TEST"}`,
          timestamp: TIMESTAMP,
          payload: form
        });
        res.json(result);
      })
      .catch(err => {
        console.error(err);
        res.json({ error: err.message });
      });
  } catch (err) {
    console.error(err);
    res.json({ error: "sorry" });
  }
});

exports.api = functions.https.onRequest(app);
