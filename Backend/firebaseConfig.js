var admin = require("firebase-admin");
var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://expensifly-c25c2-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

module.exports = db;