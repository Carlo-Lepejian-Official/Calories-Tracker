import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxdNqIXFe4OUpwp98yAi1snhNDskLvVpk",
  authDomain: "calorie-tracker-ff0f8.firebaseapp.com",
  projectId: "calorie-tracker-ff0f8",
  storageBucket: "calorie-tracker-ff0f8.firebasestorage.app",
  messagingSenderId: "590141040658",
  appId: "1:590141040658:web:aed852a0db49d46fb7d0cb",
  measurementId: "G-7VP93KT8CR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
