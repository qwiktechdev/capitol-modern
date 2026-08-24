import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

let isFirebaseInitialized = false;

const firebaseConfig = {
  apiKey: "AIzaSyAR3dLLCuzEdnAQJ9ymk6w35vh92ZTvp3g",
  authDomain: "de-capital-fin-d9d8b.firebaseapp.com",
  projectId: "de-capital-fin-d9d8b",
  storageBucket: "de-capital-fin-d9d8b.firebasestorage.app",
  messagingSenderId: "548721204008",
  appId: "1:548721204008:web:915d619482b51dd6b44e1d",
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
