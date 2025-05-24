// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK-3Qd0ws2ANNtsNJJkgSPqjYGAXv7_U8",
  authDomain: "final-web-dev-daaab.firebaseapp.com",
  projectId: "final-web-dev-daaab",
  storageBucket: "final-web-dev-daaab.firebasestorage.app",
  messagingSenderId: "690297817463",
  appId: "1:690297817463:web:e1d91e735e1f1f9f253972",
  measurementId: "G-SSTK2MTZWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const google = new GoogleAuthProvider();