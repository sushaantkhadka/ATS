// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "resume-ai-e09b0.firebaseapp.com",
  projectId: "resume-ai-e09b0",
  storageBucket: "resume-ai-e09b0.firebasestorage.app",
  messagingSenderId: "853207441354",
  appId: "1:853207441354:web:6d3ffad95cf9fb2a223933"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);