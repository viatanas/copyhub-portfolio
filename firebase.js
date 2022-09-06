import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onIdTokenChanged,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAA_EqVvZHm4VP_Q9h2uk3vVCvvmeBgUa0",
  authDomain: "copyhub-portfolio.firebaseapp.com",
  projectId: "copyhub-portfolio",
  storageBucket: "copyhub-portfolio.appspot.com",
  messagingSenderId: "1093111943361",
  appId: "1:1093111943361:web:aca2bfe9a45ed6e2c08440",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  googleProvider,
  signOut,
  signInWithPopup,
  onAuthStateChanged,
  onIdTokenChanged,
};
