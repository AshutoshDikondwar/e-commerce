// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyB6PU_t2Fk1jMwmqMoZMsTghdNy47DVKis",
    authDomain: "e-commerce-4fcd4.firebaseapp.com",
    projectId: "e-commerce-4fcd4",
    storageBucket: "e-commerce-4fcd4.appspot.com",
    messagingSenderId: "702206535758",
    appId: "1:702206535758:web:e7d823886323b594083b1f",
    measurementId: "G-Y2X6C1MC93"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
export default db;