<template>
  <div>
    <h1>Sign In</h1>
    <p><input v-model="email" type="text" placeholder="Email" /></p>
    <p><input v-model="password" type="password" placeholder="Password" /></p>
    <p><button @click="signin">Sign In via Firebase</button></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = getAuth()
const route = useRoute()
const router = useRouter()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Firebase Sign In Successful!')
      console.log(auth.currentUser)
      console.log(data.user)
      router.push(route.query.redirect || '/members')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
