<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const jsondata = ref(null)
const error = ref(null)

const getBookCountAPI = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-efolio-a8b60.cloudfunctions.net/countBooks',
    )
    jsondata.value = JSON.stringify(response.data, null, 2)
    error.value = null
  } catch {
    error.value = 'Error fetching book count'
    jsondata.value = null
  }
}

onMounted(() => {
  getBookCountAPI()
})
</script>

<template>
  <pre>{{ jsondata }}</pre>
  <p v-if="error">{{ error }}</p>
</template>
