// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHLmR5K6nDZCMzsF7OuhoaEWQZ8_hX2Pg",
  authDomain: "one-deck-dungeon-fd061.firebaseapp.com",
  projectId: "one-deck-dungeon-fd061",
  storageBucket: "one-deck-dungeon-fd061.appspot.com",
  messagingSenderId: "929996213919",
  appId: "1:929996213919:web:b3db0bcf07ad01fada9caa",
  measurementId: "G-NYJNDVJ4C5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app}