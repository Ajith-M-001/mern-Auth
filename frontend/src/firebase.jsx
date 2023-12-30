// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "official-mern-auth.firebaseapp.com",
  projectId: "official-mern-auth",
  storageBucket: "official-mern-auth.appspot.com",
  messagingSenderId: "607160283539",
  appId: "1:607160283539:web:a62f1f11269fca7546f866",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
