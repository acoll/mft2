const admin = require("firebase-admin");
const { format } = require("date-fns");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-3321352546240710706.firebaseio.com"
});
const db = admin.database();

db.ref("events")
  .orderByChild("timestamp")
  .startAt(1538982000000)
  .on("child_added", snap => {
    const { timestamp, type, payload } = snap.val();
    const fromNow = format(new Date(timestamp), "MM/dd/yyyy");
    console.log(
      type,
      fromNow,
      payload.email,
      payload.type,
      payload.first_name,
      payload.last_name
    );
  });
