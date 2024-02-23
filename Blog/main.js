import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyDl0Ohp6wTbGQ_hqE78nSE36ncgkIYhQGg",
    authDomain: "ali-code-crazehub.firebaseapp.com",
    databaseURL: "https://ali-code-crazehub-default-rtdb.firebaseio.com",
    projectId: "ali-code-crazehub",
    storageBucket: "ali-code-crazehub.appspot.com",
    messagingSenderId: "85369896826",
    appId: "1:85369896826:web:98d2f55de0518566d5a0c3",
    measurementId: "G-NERSGML518"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const logOutBut = document.querySelector(".logout-button");


const loginSection = () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
      }).catch((error) => {
        // An error happened.
      });
}

logOutBut.addEventListener("click" , loginSection);
