import { reactive } from 'vue'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import db from './init'

const auth = getAuth()

export const authState = reactive({ user: null, role: null, ready: false })

let resolveReady
const readyPromise = new Promise((resolve) => {
  resolveReady = resolve
})

onAuthStateChanged(auth, async (user) => {
  authState.user = user
  authState.role = null
  try {
    if (user) {
      const snapshot = await getDoc(doc(db, 'users', user.uid))
      authState.role = snapshot.exists() ? snapshot.data().role : 'member'
    }
  } finally {
    authState.ready = true
    resolveReady()
  }
})

export const waitForAuth = () => (authState.ready ? Promise.resolve() : readyPromise)

export async function logOut() {
  await signOut(auth)
  console.log('Current user:', auth.currentUser)
}
