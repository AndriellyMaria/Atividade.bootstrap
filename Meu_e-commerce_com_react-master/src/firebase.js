// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzf4Hob7gEal48SdyvEgfgQp7vNcVklx4",
  authDomain: "e-commerce-58172.firebaseapp.com",
  projectId: "e-commerce-58172",
  storageBucket: "e-commerce-58172.firebasestorage.app",
  messagingSenderId: "495334805834",
  appId: "1:495334805834:web:e0539add2f10c32b2631b3"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com');

export { db, auth, googleProvider, microsoftProvider };