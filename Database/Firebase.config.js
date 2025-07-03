// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3U_46GnVNjHYfoKBBtqngmFmQADSpwwM",
  authDomain: "ezrakran-c1bfb.firebaseapp.com",
  projectId: "ezrakran-c1bfb",
  storageBucket: "ezrakran-c1bfb.firebasestorage.app",
  messagingSenderId: "85950007785",
  appId: "1:85950007785:web:19bdb5f381dfb0355e6378",
};

// Initialize Firebase
console.log("firebase add");

const app = initializeApp(firebaseConfig);
export default app;
