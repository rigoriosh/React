import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


 const firebaseConfig = {
    apiKey: "AIzaSyB-0ruod17xh_JYQfd404oBI9E1IwKrSD4",
    authDomain: "react-app-cursos-ce166.firebaseapp.com",
    projectId: "react-app-cursos-ce166",
    storageBucket: "react-app-cursos-ce166.appspot.com",
    messagingSenderId: "212073659783",
    appId: "1:212073659783:web:335e8f7b8bb3d7a051e722"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const dbFirebase = firebase.firestore();

  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export { dbFirebase, googleAuthProvider, firebase}