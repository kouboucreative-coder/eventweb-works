import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB6HIFdthpPNAih9Wsyd3ikliiNqhDdJFM",
  authDomain: "ankensite.firebaseapp.com",
  projectId: "ankensite",
  storageBucket: "ankensite.firebasestorage.app",
  messagingSenderId: "423982777926",
  appId: "1:423982777926:web:a72043e5e901456264ec47",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);