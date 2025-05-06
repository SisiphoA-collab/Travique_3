// firebase/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyA-X5M6HILMlPOwHkZuYp3PN3BeOyFuhKw",
  authDomain: "travique3.firebaseapp.com",
  projectId: "travique3",
  storageBucket: "travique3.firebasestorage.app",
  messagingSenderId: "928022136161",
  appId: "1:928022136161:web:1d23d39c6528771d9c3120"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
