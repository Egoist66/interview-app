import { initializeApp } from "firebase/app";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "interviews-app-7bb81.firebaseapp.com",
  projectId: "interviews-app-7bb81",
  storageBucket: "interviews-app-7bb81.appspot.com",
  messagingSenderId: "235756703376",
  appId: "1:235756703376:web:6653d4d77d6ca0bb641215"
};


/**
 * Initializes the Firebase application.
 *
 * @return {firebase.app.App} The initialized Firebase app instance
 */
export const initFireBaseApp = () => {
    return initializeApp(firebaseConfig);
}