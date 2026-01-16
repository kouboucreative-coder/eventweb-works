import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase 設定
const firebaseConfig = {
  apiKey: "AIzaSyB6HIFdthpPNAih9Wsyd3ikliiNqhDdJFM",
  authDomain: "ankensite.firebaseapp.com",
  projectId: "ankensite",
  storageBucket: "ankensite.firebasestorage.app",
  messagingSenderId: "423982777926",
  appId: "1:423982777926:web:a72043e5e901456264ec47",
};

// Next.js では多重初期化を避ける必要がある
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Firestore / Auth を export
export const db = getFirestore(app);
export const auth = getAuth(app);