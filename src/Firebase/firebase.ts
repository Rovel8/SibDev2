import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDC3Veeb7YDqti5oS9pYND-MjsZ3Ejzxvs",
    authDomain: "sibdev-task2.firebaseapp.com",
    databaseURL: "https://sibdev-task2.firebaseio.com",
    projectId: "sibdev-task2",
    storageBucket: "sibdev-task2.appspot.com",
    messagingSenderId: "703541723691",
    appId: "1:703541723691:web:a14299ca1ea820a853e06e"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const auth=  firebase.auth()