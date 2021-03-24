import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebase-config';

const firebaseApp = firebase.initializeApp(firebaseConfig);

// utils
const firestoreSttings = {timestampsInSnapshots: true};
// const db = firebaseApp.firestore().settings(firestoreSttings);
const db = firebaseApp.firestore()
const auth = firebaseApp.auth(); 

// collection references
// const usersCollection = db.collection('users')
// const postsCollection = db.collection('posts')
// const commentsCollection = db.collection('comments')
// const likesCollection = db.collection('likes')

// export utils/refs
export {
  firebase,
  db,
  auth,
  firebaseApp,
//   usersCollection,
//   postsCollection,
//   commentsCollection,
//   likesCollection
}