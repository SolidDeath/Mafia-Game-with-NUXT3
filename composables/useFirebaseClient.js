import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbploDv1TPKAq8zfuVz6kex5BvFPRrSPo",
  authDomain: "mafia-tool.firebaseapp.com",
  projectId: "mafia-tool",
  storageBucket: "mafia-tool.appspot.com",
  messagingSenderId: "323574644367",
  appId: "1:323574644367:web:cffd1bd85c4bac363c3afa"
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