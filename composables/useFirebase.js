import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_j0EN4okFX_fNCb3SPsPSYMXxLqgO42E",
  authDomain: "nuxt-auth-8cf00.firebaseapp.com",
  projectId: "nuxt-auth-8cf00",
  storageBucket: "nuxt-auth-8cf00.appspot.com",
  messagingSenderId: "992986381893",
  appId: "1:992986381893:web:5f535956c92830c9456d2c"
};

export default function useFirebase() {
    if(getApps().length == 0){ // check if firebase app is already initialized
        initializeApp(firebaseConfig);
    }
}