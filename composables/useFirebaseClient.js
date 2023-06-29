import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_j0EN4okFX_fNCb3SPsPSYMXxLqgO42E",
  authDomain: "nuxt-auth-8cf00.firebaseapp.com",
  projectId: "nuxt-auth-8cf00",
  storageBucket: "nuxt-auth-8cf00.appspot.com",
  messagingSenderId: "992986381893",
  appId: "1:992986381893:web:5f535956c92830c9456d2c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)
const timestamp = serverTimestamp()

const authReady = new Promise((resolve, reject) => {
  const unsubscribe = onAuthStateChanged(
    auth,
    user => {
      unsubscribe()
      resolve(user)
    },
    error => reject(error)
  )
})

export default function useFirebaseClient() {
    return {
        app,
        auth,
        firestore,
        authReady,
        storage,
        timestamp
    }
}