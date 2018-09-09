const admin = require("firebase-admin");
const fs = require("fs");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-3321352546240710706.firebaseio.com"
});

const db = admin.database();

const ref = db.ref("events");

function shirtSizeCounts(data) {
  let shirts = {};
  Object.keys(data).forEach(id => {
    const { type, payload } = data[id];
    if (type === "REGISTERED") {
      const { shirt_size_1, shirt_size_2, shirt_size_3 } = payload;

      shirts[shirt_size_1] = shirts[shirt_size_1] || 0;
      shirts[shirt_size_1] = shirts[shirt_size_1] + 1;

      if (shirt_size_2) {
        shirts[shirt_size_2] = shirts[shirt_size_2] || 0;
        shirts[shirt_size_2] = shirts[shirt_size_2] + 1;
      }

      if (shirt_size_3) {
        shirts[shirt_size_3] = shirts[shirt_size_3] || 0;
        shirts[shirt_size_3] = shirts[shirt_size_3] + 1;
      }
    }
  });
  console.log("SHIRT SIZES:");
  Object.keys(shirts).forEach(size => console.log(size, ":", shirts[size]));
  console.log("==================");
}

function roster(data) {
  let registers = {};
  let count = 0;
  Object.keys(data).forEach(id => {
    const { type, payload } = data[id];
    if (type === "REGISTERED") {
      switch (payload.type) {
        case "SINGLE":
          count += 1;
          break;
        case "DOUBLE":
          count += 2;
          break;
        case "TRIPLE":
          count += 3;
          break;
        default:
          console.log("What...");
      }

      console.log(
        Object.keys(payload)
          .map(key => `"${payload[key]}"`)
          .join(",")
      );

      // registers[payload.type] = [...(registers[payload.type] || []), payload];
    }
  });
  console.log("ROSTER:");
  console.log("TOTAL:", count);
  // Object.keys(registers).forEach(type => {
  //   console.log("\nRegister Type:", type);
  //   registers[type].forEach(reg => {
  //     console.log(reg);
  //     // console.log(
  //     //   `${reg.first_name} ${reg.last_name} ${
  //     //     reg.team_name ? " - " + reg.team_name : ""
  //     //   } - ${[reg.shirt_size_1, reg.shirt_size_2, reg.shirt_size_3]
  //     //     .filter(item => item)
  //     //     .join(", ")}`
  //     // );
  //   });
  // });
  // console.log("==================");
}

ref.once("value", snap => {
  const data = snap.val();
  shirtSizeCounts(data);
  roster(data);
});
