import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signOut, signInWithPopup, OAuthProvider } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
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
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const database = getDatabase();
const creatingAcc = document.getElementById("signUp-button");
const loginWithGoogle = document.querySelector(".google-signUp-button");
const loginWithApple = document.querySelector(".apple-login-button");
// const provider = new OAuthProvider('apple.com');

const signUpForm = document.querySelector("form");


const registerWithEmail = (e) => {

    e.preventDefault();

    
    const formData = new FormData(signUpForm);


    let formValues = {};

    for (let [key, value] of formData){
        formValues[key] = value;
    }

    console.log(formValues);

    const {email, password, username} = formValues;

    // let username = formValues.username;
    // let email = formValues["email"];
    // let password = document.getElementById("password-input").value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log("🚀 ~ .then ~ userCredential:", userCredential)
        
        // set(ref(db, "Users List/" + userCredential.user.uid),{
        //     Name: username,
        //     Email: email,
        //     Uid: userCredential.user.uid
        // })
        addDoc(collection(db, "users"), {
                Name: username,
                Email: email,
                Uid: userCredential.user.uid
          })
            .then((d)=> {
            console.log("🚀 ~ .then ~ d:", d)

            window.location.replace("/landing Page.html");

            })
            .catch((err)=>{

                console.log("🚀 ~ .then ~ e:", err)

                alert(err);
            })
    })
    .catch((error) => {
        console.log("🚀 ~ registerWithEmail ~ error:", error)
        const errorCode = error.code;
        console.log("🚀 ~ registerWithEmail ~ errorCode:", errorCode)
        const errorMessage = error.message;
        console.log("🚀 ~ registerWithEmail ~ errorMessage:", errorMessage)

        alert(errorMessage);
        // ..
    });

} 

signUpForm.addEventListener("submit", registerWithEmail)


const Account = async() => {

    let username = document.getElementById("userName-input");
    let email = document.getElementById("email-input");
    let password = document.getElementById("password-input");

    let usernameValues = username.value;
    let emailValues = email.value;
    let passwordValues = password.value;
    
    if(usernameValues == '' || emailValues == '' || passwordValues == '') {

        alert("Please Fill Every Requirment");
    }

    else {
        try {
            const docRef = await addDoc(collection(db, "users"), {
            username: usernameValues,
            email: emailValues,
            password: passwordValues
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        console.log(`Account has been Created!`);
        username.value = '';
        email.value = '';
        password.value = '';
        window.location.href = 'login.html';
    }
}

const payLoad = () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            
            console.log(user , ' User');
            alert("Your Account Has Been Created!");
            window.location.href = "login.html";

        } else {
            console.log('User is Not logged In');
        }
      });
}
// payLoad();

const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        
        console.log(result);

    }).catch((error) => {
        
        console.log(error);
    });
}

const signOutWithGoogle = () => {
    
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });

}


loginWithGoogle.addEventListener('click' , signInWithGoogle);

// !  Login with Apple I.d

const signUpWithApple = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // Apple credential
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The credential that was used.
        const credential = OAuthProvider.credentialFromError(error);

        // ...
    });
}


loginWithApple.addEventListener("click" , signUpWithApple);











//?     Hide & Show Password Function 

const showHide = document.getElementById("showPassword");

function togglePasswordVisibility() {

    let password = document.getElementById("password-input");
    
    if(password.type === "password"){

        password.type = "text";
        showHide.innerHTML = "Hide";
    }

    else {
        
        password.type = "password";
        showHide.innerHTML = "Show";
    }
}

showHide.addEventListener('click', togglePasswordVisibility);

//?  ----------------       Hide & Show Password End


//?  ----------------       Creating Account


 
// creatingAcc.addEventListener('click' , registerWithEmail);

//?  ----------------       Creating Account End 

// signUpBut.addEventListener("click" , signingUp);
