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
const blogBut = document.querySelector('.blog-button');
const loginBut = document.querySelector('.login-button');
const logOutBut = document.querySelector('.logout-button');
const question = document.querySelector('.question');
const userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
const userInfo = JSON.parse(sessionStorage.getItem("user-info"));


onAuthStateChanged(auth, (user) => {
    if (user) {
        
        loginBut.style.display = 'none';
        logOutBut.style.display = 'block';

    } else {
        loginBut.style.display = 'block';
        logOutBut.style.display = 'none';

    }
});

// const payLoad = () => {
//     onAuthStateChanged(auth, (user) => {
//         if (user) {
          
//             console.log(user , ' User');
//             // window.location.href = "landing Page.html";

//         } else {
//             console.log('User is Not logged In');
//             // window.location.href = "login.html";
//         }
//       });
// }

// payLoad();

const blogSection = () => {

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user , ' User');
            window.location.href = "blog.html";

        } else {
            console.log('User is Not logged In');
            window.location.href = "login.html";
            

        }
      });

}

// const signOutWithGoogle = () => {
    
//     signOut(auth).then(() => {
//         // Sign-out successful.
//       }).catch((error) => {
//         // An error happened.
//       });

// }

const loginSection = () => {
    window.location.href = 'login.html';
}

const logOutSection = () => {

    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "login.html";
    
}

const questionSection = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user , ' User');
            window.location.href = "questionPage.html";

        } else {
            console.log('User is Not logged In');
            window.location.href = "login.html";
            

        }
    });
}

loginBut.addEventListener('click' , loginSection);
logOutBut.addEventListener('click' , logOutSection);
blogBut.addEventListener('click' , blogSection);
question.addEventListener('click' , questionSection);