import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../../firebase-config';
import { checkDueDate } from '../components/utils/checkDue.js';

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
  stores.doc(uid).collection('location').doc(locId)
    .collection('items').get()
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
  stores.doc(uid).collection('location').doc(locId)
    .collection('items').add(newItem)
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
  stores.doc(uid).collection('location').doc(locId)
    .collection('items').doc(itemId).get()
    .then(function(store) {
      resolve(store);
    }).catch(function (err) {
      reject(err);
    });
});

export const moveItemAction = (oldLocId, newLocId, itemId, item) => new Promise((resolve, reject) => {
  const uid = auth.currentUser.uid;
  stores.doc(uid).collection('location').doc(oldLocId)
    .collection('items').doc(itemId).delete()
    .then(function() {
      return stores.doc(uid).collection('location').doc(newLocId)
        .collection('items').add(item).then(
          function (store) {
            resolve(store);
          }
        ).catch(function (err) {
          reject(err);
        });
    }).catch(function (err) {
      reject(err);
    });
});

export const getAllItemsAction = (onlyDue) => new Promise((resolve, reject) => {
  let itemsPromises = [];
  getAllLocationsAction().then((locations) => {
    itemsPromises = locations.docs.map((loc) => {
      const locData = loc.data();
      return getAllLocationItemsAction(loc.id).then((items) => {
        return items.docs.map((item) => ({ locationName: locData.name, itemId: item.id, ...item.data() }))
      }).catch(function (err) {
        reject(err);
      });
    });
    Promise.all(itemsPromises).then(results => {
      if (onlyDue) {
        resolve(results.flat().filter((item) => checkDueDate(item.due)));
      }
      resolve(results.flat());
    });
  }).catch(function (err) {
    reject(err);
  });
});
