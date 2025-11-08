// Import Firebase modules (from CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBFHfNt3SPnIsycwietIJDVfm2jlYpWNSM",
  authDomain: "fir-student-portal.firebaseapp.com",
  databaseURL: "https://fir-student-portal-default-rtdb.firebaseio.com",  // Add this
  projectId: "fir-student-portal",
  storageBucket: "fir-student-portal.firebasestorage.app",
  messagingSenderId: "283592280201",
  appId: "1:283592280201:web:8ddaf9cee93942bdf3de58",
  measurementId: "G-JPBGGTLM7P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// Elements
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const message = document.getElementById("message");

// Signup
signupBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(db, "users/" + user.uid), { email: email });
      message.textContent = "User signed up successfully!";
    })
    .catch(err => {
      message.textContent = err.message;
    });
});

// Login
loginBtn.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      message.textContent = "Logged in!";
    })
    .catch(err => {
      message.textContent = err.message;
    });
});

// Logout
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    message.textContent = "Logged out!";
  });
});

// Real-time Auth State
onAuthStateChanged(auth, user => {
  if (user) {
    logoutBtn.style.display = "block";
    signupBtn.style.display = "none";
    loginBtn.style.display = "none";
    message.textContent = "Welcome, " + user.email;
  } else {
    logoutBtn.style.display = "none";
    signupBtn.style.display = "block";
    loginBtn.style.display = "block";
    message.textContent = "Please log in or sign up.";
  }
});
