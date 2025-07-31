import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcZaq2r16iVpwezSiQ6H46_HbY1TIt7eE",
  authDomain: "fir-97d82.firebaseapp.com",
  databaseURL: "https://fir-97d82-default-rtdb.firebaseio.com",
  projectId: "fir-97d82",
  storageBucket: "fir-97d82.firebasestorage.app",
  messagingSenderId: "212485371221",
  appId: "1:212485371221:web:6e89b0957c45c9acd52bdc",
  measurementId: "G-WW11L7EXEE"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);