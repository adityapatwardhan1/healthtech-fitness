// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const APIKey = process.env.REACT_APP_FIREBASE_API_KEY;
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: APIKey,
  authDomain: "healthtech-fitness.firebaseapp.com",
  projectId: "healthtech-fitness",
  storageBucket: "healthtech-fitness.firebasestorage.app",
  messagingSenderId: "846024147192",
  appId: "1:846024147192:web:a0fd31cef6d8a5cd0d3b0d"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);