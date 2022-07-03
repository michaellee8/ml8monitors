// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYtveOnvyWCVYtT_mAfk_1aeQaAGYAllA",
  authDomain: "ml8monitors.firebaseapp.com",
  projectId: "ml8monitors",
  storageBucket: "ml8monitors.appspot.com",
  messagingSenderId: "229828936184",
  appId: "1:229828936184:web:a1938218aab32248d8160d",
  measurementId: "G-JNP673WQ17",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);
export const auth = getAuth(app);

export const vapidKey =
  "BItWJIcjiiwLxSRz7Yv0AFH-Ioyfss0MYm1wYcPEHL7K4l4sEoLiNTk0aRWa_o2rf_P88qZg8mqeEVKTax1TzyU";
