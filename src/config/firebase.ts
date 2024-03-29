// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId ///is optional
const firebaseConfig = {
  apiKey: "ENTER_YOUR_API_KEY",
  authDomain: "ENTER_YOUR_DOMAIN",
  projectId: "ENTER_YOUR_PROJECT_ID",
  storageBucket: "ENTER_YOUR_STORAGE_BUCKET",
  messagingSenderId: "ENTER_YOUR_SENDER_ID",
  appId: "ENTER_YOUR_APP_ID",
  measurementId: "ENTER_YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);