require('dotenv').config();
var admin = require("firebase-admin");

let serviceAccount;

try {
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} catch (error) {
  console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY:', error);
  throw new Error('Invalid service account key format');
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://expensifly-c25c2-default-rtdb.firebaseio.com"
});

const db = admin.firestore();
module.exports = db;
