import firebase from 'firebase'
import 'firebase/firestore'


var config = {
  apiKey: "AIzaSyAwDw0-KgSXIIQ8Vkvi8P2k2Z-r_Oc8SfM",
  authDomain: "thenetwork-8d967.firebaseapp.com",
  databaseURL: "https://thenetwork-8d967.firebaseio.com",
  projectId: "thenetwork-8d967",
  storageBucket: "thenetwork-8d967.appspot.com",
  messagingSenderId: "685970794523"
};


const fire = firebase.initializeApp(config);
const db = firebase.firestore();
const storage = firebase.storage();


export {fire, db, storage}
