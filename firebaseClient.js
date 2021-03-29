import firebase from "firebase/app";
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAl7hJ_UvdhRYsHvb3f9mcumeevTvBUr6E",
    authDomain: "today-i-learned-de137.firebaseapp.com",
    databaseURL: "https://today-i-learned-de137-default-rtdb.firebaseio.com",
    projectId: "today-i-learned-de137",
    storageBucket: "today-i-learned-de137.appspot.com",
    messagingSenderId: "384199196104",
    appId: "1:384199196104:web:f8d89504eb56df261814fd"
}

export default function firebaseClient() {
    if(!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CONFIG)
    }
}