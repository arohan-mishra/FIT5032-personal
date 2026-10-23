<script setup>
import { onMounted, ref } from 'vue'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import db from '../firebase/init'

const books = ref([])
const error = ref('')
const minimumIsbn = ref(1000)
const resultLimit = ref(10)

async function loadBooks() {
  error.value = ''
  try {
    const booksQuery = query(
      collection(db, 'books'),
      where('isbn', '>', Number(minimumIsbn.value)),
      orderBy('isbn'),
      limit(Number(resultLimit.value)),
    )
    const snapshot = await getDocs(booksQuery)
    books.value = snapshot.docs.map((book) => ({ id: book.id, ...book.data() }))
  } catch (err) {
    error.value = err.message
  }
}

async function editBook(book) {
  const name = window.prompt('Book name', book.name)
  if (!name?.trim()) return
  await updateDoc(doc(db, 'books', book.id), { name: name.trim() })
  await loadBooks()
}

async function removeBook(book) {
  if (!window.confirm(`Delete ${book.name}?`)) return
  await deleteDoc(doc(db, 'books', book.id))
  await loadBooks()
}

defineExpose({ loadBooks })
onMounted(loadBooks)
</script>

<template>
  <section class="mt-5">
    <h2>Books</h2>
    <form class="row g-3 align-items-end mb-3" @submit.prevent="loadBooks">
      <div class="col-sm-5">
        <label class="form-label" for="minimum-isbn">ISBN greater than</label>
        <input id="minimum-isbn" v-model.number="minimumIsbn" class="form-control" type="number" />
      </div>
      <div class="col-sm-4">
        <label class="form-label" for="result-limit">Maximum results</label>
        <input
          id="result-limit"
          v-model.number="resultLimit"
          class="form-control"
          type="number"
          min="1"
          max="50"
        />
      </div>
      <div class="col-sm-3"><button class="btn btn-outline-primary w-100">Run query</button></div>
    </form>
    <p v-if="error" class="text-danger">{{ error }}</p>
    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.isbn }}</td>
            <td>{{ book.name }}</td>
            <td>
              <button class="btn btn-sm btn-outline-primary me-2" @click="editBook(book)">
                Edit</button
              ><button class="btn btn-sm btn-outline-danger" @click="removeBook(book)">
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="!books.length">
            <td colspan="3">No matching books.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
