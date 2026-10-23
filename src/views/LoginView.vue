<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <p><input v-model="username" type="text" placeholder="Username" /></p>
      <p><input v-model="password" type="password" placeholder="Password" /></p>
      <p><button type="submit">Login</button></p>
      <p v-if="error">Invalid username or password</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../auth'

const username = ref('')
const password = ref('')
const error = ref(false)
const router = useRouter()

const handleLogin = () => {
  if (login(username.value, password.value)) {
    router.push('/about')
  } else {
    error.value = true
  }
}
</script>
