import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAB5wFU2vRtoY4l4PqcLbFzx0MEDYShYeI",
  authDomain: "martketplace-f9318.firebaseapp.com",
  projectId: "martketplace-f9318",
  storageBucket: "martketplace-f9318.appspot.com",
  messagingSenderId: "309062193525",
  appId: "1:309062193525:web:1c23b3f1e0dba9b876c33c",
  measurementId: "G-BS780VZPR9"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
