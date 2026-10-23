<script setup>
import { ref, useTemplateRef } from 'vue'
import { addDoc, collection } from 'firebase/firestore'
import db from '../firebase/init'
import BookList from '../components/BookList.vue'

const isbn = ref(null)
const name = ref('')
const message = ref('')
const error = ref('')
const bookList = useTemplateRef('book-list')

async function addBook() {
  message.value = ''
  error.value = ''
  try {
    await addDoc(collection(db, 'books'), {
      isbn: Number(isbn.value),
      name: name.value.trim(),
    })
    message.value = 'Book added.'
    isbn.value = null
    name.value = ''
    await bookList.value?.loadBooks()
  } catch (err) {
    error.value = err.message
  }
}
</script>

<template>
  <main class="container py-5">
    <h1>Add Book</h1>
    <form class="card card-body" @submit.prevent="addBook">
      <label class="form-label" for="isbn">ISBN</label>
      <input id="isbn" v-model.number="isbn" class="form-control mb-3" type="number" required />
      <label class="form-label" for="book-name">Name</label>
      <input id="book-name" v-model.trim="name" class="form-control mb-3" type="text" required />
      <p v-if="message" class="text-success">{{ message }}</p>
      <p v-if="error" class="text-danger">{{ error }}</p>
      <button class="btn btn-primary">Add Book</button>
    </form>
    <BookList ref="book-list" />
  </main>
</template>
