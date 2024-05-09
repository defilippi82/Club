// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_cmk9IMXt_XKM9uSCLen1opKOwYkNY8Q",

  authDomain: "clubreservas-716b9.firebaseapp.com",

  projectId: "clubreservas-716b9",

  storageBucket: "clubreservas-716b9.appspot.com",

  messagingSenderId: "718834689226",

  appId: "1:718834689226:web:2dadf58ae5a560c3e94033"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);