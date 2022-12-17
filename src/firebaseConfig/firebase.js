// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6EGw5VEcoU3hFruvTjoUGmjTy0w-HJ64",
  authDomain: "crud-22808-mdohmen.firebaseapp.com",
  projectId: "crud-22808-mdohmen",
  storageBucket: "crud-22808-mdohmen.appspot.com",
  messagingSenderId: "961140162015",
  appId: "1:961140162015:web:a948e50a0ae2a0f8ac986a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// servicio (metodos) de BBDD
export const db = getFirestore(app)
