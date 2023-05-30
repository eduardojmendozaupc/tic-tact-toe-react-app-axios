// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBQKRv3pRKBBnhiN2gFJAc3X30pZ275xw",
  authDomain: "proyecto-grupo1.firebaseapp.com",
  projectId: "proyecto-grupo1",
  storageBucket: "proyecto-grupo1.appspot.com",
  messagingSenderId: "842192636605",
  appId: "1:842192636605:web:3103c0a18c80d5a45305d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
