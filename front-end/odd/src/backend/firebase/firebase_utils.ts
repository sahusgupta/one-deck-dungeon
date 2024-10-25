// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAivHc1CnOcEG1wj6I-tCcdt7qupElx-zI",
  authDomain: "one-deck-3.firebaseapp.com",
  projectId: "one-deck-3",
  storageBucket: "one-deck-3.appspot.com",
  messagingSenderId: "776771491549",
  appId: "1:776771491549:web:1b4998b8f9652d7cd2ad34",
  measurementId: "G-WG6S1SYVLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)
export {db, app}