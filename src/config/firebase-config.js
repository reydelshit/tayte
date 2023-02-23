import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDVexuZZbASfyMlABjDt15v-Rd6DrvIUoc",
  authDomain: "tayte-d9b0b.firebaseapp.com",
  projectId: "tayte-d9b0b",
  storageBucket: "tayte-d9b0b.appspot.com",
  messagingSenderId: "710433647382",
  appId: "1:710433647382:web:cd203223f864a569923e37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleAuth = new GoogleAuthProvider()

export const db = getFirestore(app)