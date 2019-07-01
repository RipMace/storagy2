import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../../firebase-config';

firebase.initializeApp(config);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();
export const stores = db.collection('stores');

export const getAllLocationsAction = () => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').get()
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});

export const addLocationsAction = (newLocation) => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').add(newLocation)
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});

export const getAllLocationItemsAction = (locId) => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').doc(locId).collection('items').get()
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});

export const getLocationAction = (locId) => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').doc(locId).get()
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});

export const addItemAction = (locId, newItem) => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').doc(locId).collection('items').add(newItem)
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});

export const editItemAction = (locId, itemId, editItem) => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').doc(locId)
    .collection('items').doc(itemId).update(editItem)
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});

export const getItemAction = (locId, itemId) => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').doc(locId).collection('items').doc(itemId).get()
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});


