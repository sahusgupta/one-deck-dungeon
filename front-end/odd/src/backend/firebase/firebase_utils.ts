// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBL28_d_xUOwK5hlxeVAswAgkZvFI6xGXA",
  authDomain: "one-deck-2.firebaseapp.com",
  projectId: "one-deck-2",
  storageBucket: "one-deck-2.appspot.com",
  messagingSenderId: "24270877900",
  appId: "1:24270877900:web:132b0a30b2d5171ca1fe69",
  measurementId: "G-Q50H64M0HJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export {db, app}