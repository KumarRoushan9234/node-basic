// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUeJh9a3DxIVEsJAhLSibRKlNVoUNRE8g",
  authDomain: "node-verify.firebaseapp.com",
  projectId: "node-verify",
  storageBucket: "node-verify.appspot.com",
  messagingSenderId: "203201850276",
  appId: "1:203201850276:web:1eb7f68ba51683c871ef31",
  measurementId: "G-P8T686DFG8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;