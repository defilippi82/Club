// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8lSjoGXYBRo8HDm8fQtmJWT9FQrEVtHg",
  authDomain: "cube-b5537.firebaseapp.com",
  projectId: "cube-b5537",
  storageBucket: "cube-b5537.appspot.com",
  messagingSenderId: "746288096117",
  appId: "1:746288096117:web:4a121eea0fc0e72fb5e93c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);