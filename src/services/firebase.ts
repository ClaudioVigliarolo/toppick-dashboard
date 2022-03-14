import firebase from "firebase/compat";

// firebase init
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MESSAGING_APP_ID,
};

firebase.initializeApp(firebaseConfig);
// utils
const db = firebase.firestore();
const auth = firebase.auth();

// collection references
const usersCollection = db.collection("Users");

// export utils/refs
export { db, auth, usersCollection };
