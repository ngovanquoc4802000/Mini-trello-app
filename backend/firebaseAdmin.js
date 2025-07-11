import "dotenv/config";
import admin from "firebase-admin";
const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

if (!serviceAccountPath) {
  console.error("Lỗi: SERVICE_ACCOUNT_KEY_PATH chưa được đặt trong tệp .env");
  process.exit(1);
}

let serviceAccount;

try {
  serviceAccount = serviceAccountPath 
  console.log("Success: Đã đọc được tệp Service Account Path");
} catch (error) {
  console.error(`Lỗi: Không thể đọc tệp tài khoản dịch vụ tại đường dẫn: ${serviceAccountPath}`);
  console.error("Vui lòng kiểm tra lại đường dẫn và quyền truy cập của tệp JSON.");
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

export {
  firebaseStoreDB, 
  auth,
  storage,
  realtimeDB,
  adminSdk
};