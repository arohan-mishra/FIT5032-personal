const { onRequest } = require('firebase-functions/v2/https')
const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { initializeApp } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const cors = require('cors')({ origin: true })

initializeApp()
const db = getFirestore()

exports.countBooks = onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const snapshot = await db.collection('books').count().get()
      response.json({ count: snapshot.data().count })
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  })
})

exports.getAllBooks = onRequest((request, response) => {
  cors(request, response, async () => {
    try {
      const snapshot = await db.collection('books').orderBy('isbn').get()
      const books = snapshot.docs.map((document) => ({ id: document.id, ...document.data() }))
      response.json({ books })
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  })
})

exports.addBook = onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' })
    const isbn = Number(request.body.isbn)
    const name = String(request.body.name || '')
      .trim()
      .toUpperCase()
    if (!isbn || !name) return response.status(400).json({ error: 'ISBN and name are required' })
    const document = await db.collection('books').add({ isbn, name })
    return response.status(201).json({ id: document.id, isbn, name })
  })
})

exports.capitaliseBookName = onDocumentCreated('books/{bookId}', async (event) => {
  const snapshot = event.data
  if (!snapshot) return
  const name = String(snapshot.data().name || '')
  const capitalisedName = name.toUpperCase()
  if (name !== capitalisedName) await snapshot.ref.update({ name: capitalisedName })
})
