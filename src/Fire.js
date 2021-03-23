import firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyCzYGVwDHpWKxChnm3DihVdHgUx3TL4LF8",
    authDomain: "final-year-project-db.firebaseapp.com",
    projectId: "final-year-project-db",
    storageBucket: "final-year-project-db.appspot.com",
    messagingSenderId: "348738667693",
    appId: "1:348738667693:web:e5ccebfc7a4442821bf224",
    measurementId: "G-1XZ56MNJCE"
  };
// Initialize Firebase
// export const auth = firebase.auth();

export default (!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app());
