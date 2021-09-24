// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
} from "@firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuMXjajfUVQX4mf1CZA_Z6_iXc35pUMkA",
  authDomain: "letsdive-134db.firebaseapp.com",
  projectId: "letsdive-134db",
  storageBucket: "letsdive-134db.appspot.com",
  messagingSenderId: "581033159831",
  appId: "1:581033159831:web:9c3279ab5863a71f2b4dd2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// export const create = createUserWithEmailAndPassword(auth, email, password);
// export const enter = signInWithEmailAndPassword(auth, email, password);
