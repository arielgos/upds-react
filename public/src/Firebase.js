// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDL1P4iZf2Xi1-ZlXAKFYlaxppsREZQqN4',
  authDomain: 'upds-react.firebaseapp.com',
  projectId: 'upds-react',
  storageBucket: 'upds-react.appspot.com',
  messagingSenderId: '298876380292',
  appId: '1:298876380292:web:c18d103e8d9637eebfced1',
  measurementId: 'G-4WM7652YNV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const firestore = getFirestore()
