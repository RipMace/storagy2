import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../../firebase-config';

firebase.initializeApp(config);

// auth
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();
export const stores = db.collection('stores');

export const getAllLocations = () => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').get()
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});
