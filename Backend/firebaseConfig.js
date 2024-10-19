var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://expensifly-c25c2-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

module.exports = db;