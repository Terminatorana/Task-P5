// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4tFJRCdY-lfAlb0uQ2qV3Y263aC9nxTQ",
  authDomain: "staff-name.firebaseapp.com",
  projectId: "staff-name",
  storageBucket: "staff-name.firebasestorage.app",
  messagingSenderId: "719494229098",
  appId: "1:719494229098:web:6c5cee6282a2b6b38cae13",
  measurementId: "G-WQ8CQ3B6S5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);
