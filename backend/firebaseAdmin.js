import "dotenv/config";
import admin from "firebase-admin";
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath) {
  console.error("Error: SERVICE_ACCOUNT_KEY_PATH is not set in .env file");
  process.exit(1);
}

let serviceAccount;

try {
  serviceAccount = serviceAccountPath;
  console.log("Success: Read File Service Account Path");
} catch (error) {
  console.error(
    `Error: Error Read Account Path: ${serviceAccountPath}`
  );
  console.error(
    "Please check the path and access rights of the JSON file."
  );
  console.error(error);
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-97d82-default-rtdb.firebaseio.com/",
});

console.log("Firebase Admin SDK Success !");

const firebaseStoreDB = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const realtimeDB = admin.database();
const adminSdk = admin;

export { firebaseStoreDB, auth, storage, realtimeDB, adminSdk };
