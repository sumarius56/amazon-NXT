import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCoEJ1dJ1TimHfUtlaZSNIxhD6PSdQhJ8w",
  authDomain: "nxt-32a68.firebaseapp.com",
  projectId: "nxt-32a68",
  storageBucket: "nxt-32a68.appspot.com",
  messagingSenderId: "967605167469",
  appId: "1:967605167469:web:40dcabe1bc9041364e6664"
};

const app =!firebase.apps.length 
? firebase.initializeApp(firebaseConfig) 
: firebase.app()

const db = app.firestore();

export default db;