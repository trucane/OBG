import firebase from 'firebase/compat/app'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: process.env.REACT_APP_API_AUTH_DOMAIN ,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET ,
    messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID ,
    appId: process.env.REACT_APP_APPID ,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID ,
  };

  export const appApi = firebase.initializeApp(firebaseConfig)
  export const auth = getAuth(appApi)
  export const provider = new GoogleAuthProvider()
  export const db = getFirestore(appApi)