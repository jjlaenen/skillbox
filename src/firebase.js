import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCDEBPky0YohO1YG3L0ubJrI0pV1B5CnOo",
    authDomain: "skillbox-9fa58.firebaseapp.com",
    databaseURL: "https://skillbox-9fa58.firebaseio.com",
    projectId: "skillbox-9fa58",
    storageBucket: "skillbox-9fa58.appspot.com",
    messagingSenderId: "621423399264",
    appId: "1:621423399264:web:20c417aa3770a43b"
};
firebase.initializeApp(config);
export default firebase;