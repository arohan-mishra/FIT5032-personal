<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref(null)

const getAllBooksAPI = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-efolio-a8b60.cloudfunctions.net/getAllBooks',
    )
    jsondata.value = JSON.stringify(response.data, null, 2)
    error.value = null
  } catch {
    error.value = 'Error fetching books'
    jsondata.value = null
  }
}

onMounted(() => {
  getAllBooksAPI()
})
</script>

<template>
  <pre>{{ jsondata }}</pre>
  <p v-if="error">{{ error }}</p>
</template>
