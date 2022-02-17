// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCVI_kylsPS0XjicHbelhxYAuQIWTwcEqo",
  authDomain: "learning-76483.firebaseapp.com",
  databaseURL: "https://learning-76483-default-rtdb.firebaseio.com",
  projectId: "learning-76483",
  storageBucket: "learning-76483.appspot.com",
  messagingSenderId: "134716710728",
  appId: "1:134716710728:web:dacf7989cf34991ab1dd7d",
  measurementId: "G-KSR4C27XJS",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const store = firebase.firestore();
const storage = firebase.storage();
const pdfStorageRef = storage.ref();
var pdfChildRef = pdfStorageRef.child("files");
var samplePDFRef = pdfStorageRef.child("files/sample.pdf")
export { firebase, storage, store, app,pdfStorageRef, pdfChildRef,samplePDFRef };

