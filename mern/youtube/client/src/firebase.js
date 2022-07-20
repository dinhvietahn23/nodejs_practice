// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBz_Tpazm6M4skUFa2DgBUakvrZN0zO8D0",
  authDomain: "youtub-clone-a3303.firebaseapp.com",
  projectId: "youtub-clone-a3303",
  storageBucket: "youtub-clone-a3303.appspot.com",
  messagingSenderId: "329527076470",
  appId: "1:329527076470:web:08d833869278c01e6e6157",
  measurementId: "G-9RDZG61W3N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const provider = new GoogleAuthProvider()
export default app;