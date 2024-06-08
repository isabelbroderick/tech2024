// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDW9v17UJm3ry7ccV7bz1To2NZdOdYBBV0",
  authDomain: "tech-2024.firebaseapp.com",
  databaseURL: "https://tech-2024-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tech-2024",
  storageBucket: "tech-2024.appspot.com",
  messagingSenderId: "80121578021",
  appId: "1:80121578021:web:48769f1b25026aec4675cc",
  measurementId: "G-YK4JKH5603"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

// Set up our register function
const userSignUp = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;
  const highscore = localStorage.getItem('score') || '0';

  if (!validate_email(email) || !validate_password(password)) {
    alert('Email or Password is wrong');
    return;
  }
  if (!validate_field(full_name)) {
    alert('Full Name is required');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const user_data = {
      email: email,
      full_name: full_name,
      highscore: highscore,
      last_login: Date.now()
    };

    await set(ref(database, 'users/' + user.uid), user_data);
    alert('User Created!!');
  } catch (error) {
    alert(error.message);
  }
};

// Set up our login function
const userSignIn = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;
  const newScore = parseInt(localStorage.getItem('score')) || 0;

  if (!validate_email(email) || !validate_password(password)) {
    alert('Email or Password is wrong');
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userRef = ref(database, 'users/' + user.uid);

    const snapshot = await get(userRef);
    const userData = snapshot.val();
    const currentHighScore = parseInt(userData.highscore) || 0;

    const updatedHighScore = Math.max(currentHighScore, newScore);

    const user_data = {
      last_login: Date.now(),
      highscore: updatedHighScore
    };

    if (validate_field(full_name)) {
      user_data.full_name = full_name;
    }

    await update(userRef, user_data);
    alert('User Logged In and Data Updated!!');
  } catch (error) {
    alert(error.message);
  }
};

// Check authentication state
const checkAuthState = () => {
  onAuthStateChanged(auth, user => {
    const secretContent = document.getElementById('secretContent');
    const form_container = document.getElementById('form_container');
    if (user) {
      secretContent.style.display = 'block';
      form_container.style.display = 'none';
      document.getElementById('user_name').innerText = user.displayName || 'User';
    } else {
      secretContent.style.display = 'none';
      form_container.style.display = 'block';
    }
  });
};

const userSignOut = async () => {
  await signOut(auth);
  alert('User Signed Out');
};

// Validation functions
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(String(email).toLowerCase());
}

function validate_password(password) {
  return password.length >= 6;
}

function validate_field(field) {
  return field.trim() !== '';
}

checkAuthState();

signUpButton.addEventListener('click', userSignUp);
signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('full_name');
  const h2 = document.getElementById('displayText');

  input.addEventListener('input', () => {
    h2.textContent = input.value;
  });

  const score = localStorage.getItem('score');
  if (score !== null) {
    document.getElementById('scoreDisplay').textContent = `Your score is: ${score}`;
  } else {
    document.getElementById('scoreDisplay').textContent = `No score available.`;
  }
});
