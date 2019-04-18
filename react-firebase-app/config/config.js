import firebase from "firebase";

// api details
// Initialize Firebase

const config = {
  apiKey: "AIzaSyD1kHC9e5gQ-s6eA9MIXAGlGPkzulP5q4U",
  authDomain: "myfirstproject-31bf3.firebaseapp.com",
  databaseURL: "https://myfirstproject-31bf3.firebaseio.com",
  projectId: "myfirstproject-31bf3",
  storageBucket: "myfirstproject-31bf3.appspot.com",
  messagingSenderId: "874920620338"
};

firebase.initializeApp(config);

export const f = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();


