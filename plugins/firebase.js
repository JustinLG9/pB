import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCPGNNeGpW42b7QEr42YY18Znr9ZUHdHvw',
  authDomain: 'personalblog-4239c.firebaseapp.com',
  databaseURL: 'https://personalblog-4239c.firebaseio.com',
  projectId: 'personalblog-4239c',
  storageBucket: 'personalblog-4239c.appspot.com',
  messagingSenderId: '279999960033',
  appId: '1:279999960033:web:2c562dc34585f32243f8a0',
  measurementId: 'G-YTE0T86YDX'
}

let app = null
if (!firebase.apps.length) {
  app = firebase
  app.initializeApp(firebaseConfig)
}

// firebase.analytics()

export default firebase
