import firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAaWk1ZpPvwsOqf64XueGv9z7Y0ektjyrY",
    authDomain: "rescueapp-baf89.firebaseapp.com",
    projectId: "rescueapp-baf89",
    storageBucket: "rescueapp-baf89.appspot.com",
    messagingSenderId: "975023284603",
    appId: "1:975023284603:web:0ce7e362c4faefbe6d9dde",
    measurementId: "G-0R8YYJT9ZS"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db }
