import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD0ol07LiGiTwkq2w1L4bSUCbsTVazTw4I",
    authDomain: "quizo-cc.firebaseapp.com",
    projectId: "quizo-cc",
    storageBucket: "quizo-cc.appspot.com",
    messagingSenderId: "364265088318",
    appId: "1:364265088318:web:1e132997d0163610c6b86f"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
//export const toMillis = firebase.firestore.Timestamp.toMillis;
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;


export const storage = firebase.storage();

export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
}

export function postToJSON(doc) {
    const data = doc.data();
  
    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON

        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        //createdAt: data?.createdAt.toDate() || 0,
        //updatedAt: data?.updatedAt.toDate() || 0,   

        //createdAt: doc.get('time', data?.createdAt).toMillis() || 0,
        //updatedAt: doc.get('time', data?.updatedAt).toMillis() || 0,
        
        //createdAt: data?.createdAt.toMillis() || 0,
        //updatedAt: data?.updatedAt.toMillis() || 0,

        //createdAt: data?.createdAt || 0,
        //updatedAt: data?.updatedAt || 0,
    }
}

