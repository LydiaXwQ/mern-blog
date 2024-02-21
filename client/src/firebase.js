// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-3be6e.firebaseapp.com",
  projectId: "mern-blog-3be6e",
  storageBucket: "mern-blog-3be6e.appspot.com",
  messagingSenderId: "884118854751",
  appId: "1:884118854751:web:a83152f1e4141bbeb94fea",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
