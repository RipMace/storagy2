import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { config } from '../../firebase-config';

firebase.initializeApp(config);

// auth
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

// firestore
const db = firebase.firestore();
export const test = db.collection('test');
