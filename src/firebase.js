import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "***",
  authDomain: "***",
  projectId: "***",
  storageBucket: "***",
  messagingSenderId: "***",
  appId: "***",
  measurementId: "***",
});

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };
