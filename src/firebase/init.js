import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCGGQddoL3oyjNlsKl5ubBDrANEFanYecQ',
  authDomain: 'efolio-a8b60.firebaseapp.com',
  projectId: 'efolio-a8b60',
  storageBucket: 'efolio-a8b60.firebasestorage.app',
  messagingSenderId: '924468444094',
  appId: '1:924468444094:web:cba130296381167832d7ef',
}

initializeApp(firebaseConfig)

const db = getFirestore()

export default db
