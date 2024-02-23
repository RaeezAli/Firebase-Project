import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


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
const database = getDatabase();
const logOutBut = document.querySelector(".logout-button");
const submitBut = document.querySelector('#submit-button');
let submitBtn = document.querySelector('#submit-button');
const userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
const userInfo = JSON.parse(sessionStorage.getItem("user-info"));

const loginSection = () => {

    signOut(auth).then(() => {
        window.location.href = 'login.html';
      }).catch((error) => {
        // An error happened.
      });
    
}

const addComment = () => {
  
  let comment = document.querySelector('#comment');
  let para = comment.value;

  if (para == ''){
    alert("Can't Leave the Comment Empty!")
  }

  else {
    let margin = document.createElement('div');
    margin.style.width = "100%";
    margin.style.height = "1px";
    margin.style.background = "#ADBC9F";
    let anotherComment = document.querySelector("#comment-Section");
    anotherComment.appendChild(margin);

    anotherComment.innerHTML += `<div class="display"><div class="avatar placeholder image"><div class="bg-neutral text-neutral-content rounded-full w-12"><span>A</span></div></div><div class="comment"><p>${userCreds}</p><p>${para}</p></div></div>`;

    comment.value = '';
  }
}



logOutBut.addEventListener("click" , loginSection);
submitBut.addEventListener("click" , addComment);