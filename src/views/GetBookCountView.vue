<script setup>
import { ref } from 'vue'
import axios from 'axios'

const count = ref(null)
const error = ref('')
const loading = ref(false)

async function getBookCount() {
  loading.value = true
  error.value = ''
  try {
    const response = await axios.get(
      'https://us-central1-efolio-a8b60.cloudfunctions.net/countBooks',
    )
    count.value = response.data.count
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="container py-5">
    <h1>Book Counter</h1>
    <button class="btn btn-primary" type="button" :disabled="loading" @click="getBookCount">
      {{ loading ? 'Loading...' : 'Get Book Count' }}
    </button>
    <p v-if="count !== null" class="alert alert-success mt-3">Total number of books: {{ count }}</p>
    <p v-if="error" class="alert alert-danger mt-3">{{ error }}</p>
  </main>
</template>
