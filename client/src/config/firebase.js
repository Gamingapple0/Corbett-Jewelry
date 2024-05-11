// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const apiKey = `${process.env.FREBASE_KEY}`;


const firebaseConfig = {
  apiKey: "#####",
  authDomain: "corbett-jewelry.firebaseapp.com",
  projectId: "corbett-jewelry",
  storageBucket: "corbett-jewelry.appspot.com",
  messagingSenderId: "963640321962",
  appId: "1:963640321962:web:d57f51c96ead5d20362dd3"
};

console.log(firebaseConfig)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app)
