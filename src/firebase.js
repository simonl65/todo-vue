import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyDs8QdJn7H6LXhG1rDsV3N9iHzzjqqtPvg",
  authDomain: "todos-6c830.firebaseapp.com",
  databaseURL: "https://todos-6c830.firebaseio.com",
  projectId: "todos-6c830",
  storageBucket: "todos-6c830.appspot.com",
  messagingSenderId: "553791024416"
}

const firebaseApp = firebase.initializeApp(config)
const firestore = firebaseApp.firestore()
firestore.settings({ timestampsInSnapshots: true })

export default firestore
