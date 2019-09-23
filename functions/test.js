const admin = require("firebase-admin");
const { Transform: ToCsv } = require("json2csv");
const fs = require("fs");
const serviceAccount = require("./serviceAccountKey.json");
const stream = require("stream");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-3321352546240710706.firebaseio.com"
});
const db = admin.database();

db.ref("events")
  .orderByChild("timestamp")
  .startAt(1536364800000)
  .once("value", snapAll => {
    snapAll.forEach(snap => {
      const { type, payload, timestamp } = snap.val();
      // console.log(type);
      // console.log(payload);
      if (type === "REGISTERED") {
        // console.log(payload);
        handlePayload(payload, timestamp);
      }
    });
  });

const input = new stream.Readable({ objectMode: true, read() {} });

input
  .pipe(new ToCsv({ header: true }, { objectMode: true }))
  .pipe(fs.createWriteStream("./roster.csv"));

function handlePayload(
  {
    email,
    fitness,
    first_name,
    last_name,
    gender,
    shirt_size_1,
    shirt_size_2,
    shirt_size_3,
    type,
    team_name,
    city,
    state
  },
  timestamp
) {
  input.push({
    email,
    fitness,
    first_name,
    last_name,
    gender,
    shirt_size_1,
    shirt_size_2,
    shirt_size_3,
    type,
    team_name,
    city,
    state,
    timestamp
  });
}
