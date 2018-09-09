const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const Stripe = require("stripe");
const fetch = require("isomorphic-fetch");

console.log("SETUP START");

const config = functions.config();
const app = express();
admin.initializeApp(config.firebase);

const events = admin.database().ref("/events");

const TIMESTAMP = admin.database.ServerValue.TIMESTAMP;

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

console.log("SETUP END");

app.post("/register", (req, res) => {
  try {
    console.info(req.method, req.path);
    const { token, form } = req.body;

    const stripe = token.livemode
      ? Stripe(config.live.stripe_sk)
      : Stripe(config.test.stripe_sk);

    stripe.charges
      .create({
        amount: form.amount,
        currency: "usd",
        source: token.id,
        description: "MFT2 Registration",
        receipt_email: form.email
      })
      .then(result => {
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

app.get("/photos/:year", (req, res) => {
  const year = req.params.year;

  const albumId = config.fb[`album_${year}`];

  if (!albumId) {
    res.status(400).send("Invalid year:", year);
  }

  fetch(
    `https://graph.facebook.com/oauth/access_token?client_id=${
      config.fb.app_id
    }&client_secret=${config.fb.secret_id}&grant_type=client_credentials`
  )
    .then(response => response.json())
    .then(({ access_token }) => {
      return fetch(
        `https://graph.facebook.com/v2.8/${albumId}/photos?fields=link,images&access_token=${access_token}&limit=300`
      ).then(response => response.json());
    })
    .then(data => res.json(data));
});

exports.api = functions.https.onRequest(app);
