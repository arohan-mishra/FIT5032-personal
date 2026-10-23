<template>
  <div>
    <h1>Create an Account</h1>
    <p><input v-model="email" type="text" placeholder="Email" /></p>
    <p><input v-model="password" type="password" placeholder="Password" /></p>
    <p>
      <select v-model="role">
        <option value="member">Member</option>
        <option value="librarian">Librarian</option>
        <option value="admin">Admin</option>
      </select>
    </p>
    <p><button @click="register">Save to Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import db from '../firebase/init'

const email = ref('')
const password = ref('')
const role = ref('member')
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (data) => {
      await setDoc(doc(db, 'users', data.user.uid), {
        email: email.value,
        role: role.value,
      })
      console.log('Firebase Register Successful!')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
