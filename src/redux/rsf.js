import firebase from 'firebase'
import '@firebase/firestore' // 👈 If you're using firestore
import ReduxSagaFirebase from 'redux-saga-firebase'
import * as params from '../config/params'

var config = {
  apiKey: params.firebase.apiKey,
  authDomain: params.firebase.authDomain,
  databaseURL: params.firebase.databaseURL,
  projectId: params.firebase.projectId,
  storageBucket: params.firebase.storageBucket,
  messagingSenderId: params.firebase.messagingSenderId
}

const myFirebaseApp = firebase.initializeApp(config);

const rsf = new ReduxSagaFirebase(myFirebaseApp)

export default rsf
