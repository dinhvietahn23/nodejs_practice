// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnv7x4BDES9IHlOuV0t3vDrtKmOpDKgS0",
  authDomain: "social-app-d6d6c.firebaseapp.com",
  projectId: "social-app-d6d6c",
  storageBucket: "social-app-d6d6c.appspot.com",
  messagingSenderId: "559139880196",
  appId: "1:559139880196:web:0cf7d3eeed59fb18a52451",
  measurementId: "G-JJ3SLMLTVQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage()
