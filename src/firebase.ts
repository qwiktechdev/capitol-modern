import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let isFirebaseInitialized = false;

const firebaseConfig = {
  apiKey: "AIzaSyA9hqoiW1ZEsmzH3xLCfY9jX7gxfEdbk4o",
  authDomain: "de-capital-fin.firebaseapp.com",
  projectId: "de-capital-fin",
  storageBucket: "de-capital-fin.firebasestorage.app",
  messagingSenderId: "926395787015",
  appId: "1:926395787015:web:a63619c5f88e28882447a2",
};

let database: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

const initializeFirebase = () => {
  if (!isFirebaseInitialized) {
    const app = initializeApp(firebaseConfig);
    database = getFirestore(app);
    auth = getAuth(app);
    storage = getStorage(app);
    isFirebaseInitialized = true;
  }
};

initializeFirebase();

export { auth, database, storage };
