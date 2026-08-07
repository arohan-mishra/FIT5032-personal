<script setup>
import { computed, ref } from 'vue'
import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'

defineOptions({ name: 'JSONActivities' })

const showMessage = ref(false)
const highlightedAuthor = 'George Orwell'

const modernAuthors = computed(() => authors.filter((author) => author.birthYear > 1850))

const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title)),
)

const highlightStyle = {
  backgroundColor: '#facc15',
  color: '#422006',
  borderColor: '#eab308',
}
</script>

<template>
  <main class="page-shell">
    <header class="page-header">
      <p class="eyebrow">EFOLIO TASK 2.2</p>
      <h1>Author Explorer</h1>
      <p>Data from {{ bookstores.name }} · {{ bookstores.totalStores }} stores</p>
    </header>

    <section class="panel author-panel">
      <div class="section-heading">
        <div>
          <p class="section-number">Activity 3.1 + Post-Lab 5</p>
          <h2>Authors and birth years</h2>
        </div>
        <span class="legend">Highlighted author</span>
      </div>

      <ul class="author-list">
        <li
          v-for="author in authors"
          :key="author.id"
          :title="author.name === highlightedAuthor ? 'George Orwell is highlighted' : author.name"
          :aria-label="`${author.name}, born ${author.birthYear}${author.name === highlightedAuthor ? ', highlighted' : ''}`"
          :class="{ 'author-highlight': author.name === highlightedAuthor }"
          :style="author.name === highlightedAuthor ? highlightStyle : {}"
        >
          <span>{{ author.name }}</span>
          <span class="birth-year">{{ author.birthYear }}</span>
        </li>
      </ul>
    </section>

    <div class="activity-grid">
      <section class="panel">
        <p class="section-number">Activity 3.2</p>
        <h2>Born after 1850</h2>
        <ul class="simple-list">
          <li v-for="author in modernAuthors" :key="author.id">
            {{ author.name }} ({{ author.birthYear }})
          </li>
        </ul>
      </section>

      <section class="panel">
        <p class="section-number">Activity 3.3</p>
        <h2>Famous works</h2>
        <ul class="simple-list works-list">
          <li v-for="work in allFamousWorks" :key="work">{{ work }}</li>
        </ul>
      </section>
    </div>

    <section class="panel message-panel">
      <div>
        <p class="section-number">Activity 4.1</p>
        <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
        <p v-else class="message">Click the button to see a message.</p>
      </div>
      <button type="button" @click="showMessage = !showMessage">Toggle Message</button>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  width: min(100%, 920px);
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.page-header {
  margin-bottom: 1.75rem;
}

.eyebrow,
.section-number {
  margin: 0 0 0.35rem;
  color: #2563eb;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.11em;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 0.45rem;
  color: #0f172a;
  font-size: clamp(2.3rem, 7vw, 4rem);
  line-height: 1;
}

h2 {
  margin-bottom: 1rem;
  color: #1e293b;
  font-size: 1.15rem;
}

.page-header > p:last-child,
.message {
  color: #64748b;
}

.panel {
  padding: 1.5rem;
  border: 1px solid #dbe4f0;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
}

.section-heading,
.message-panel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.legend {
  flex: none;
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: #fef9c3;
  color: #854d0e;
  font-size: 0.72rem;
  font-weight: 700;
}

.author-list,
.simple-list {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.author-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 11px;
  color: #334155;
  transition: transform 0.2s ease;
}

.author-highlight {
  transform: translateX(6px);
  font-weight: 800;
  box-shadow: 0 7px 18px rgba(234, 179, 8, 0.24);
}

.birth-year {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}

.activity-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.simple-list {
  color: #475569;
  font-size: 0.9rem;
}

.simple-list li {
  padding-left: 0.75rem;
  border-left: 3px solid #bfdbfe;
}

.works-list {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.message-panel p {
  margin-bottom: 0;
}

.success {
  color: #15803d;
  font-weight: 700;
}

button {
  flex: none;
  padding: 0.7rem 1rem;
  border: 0;
  border-radius: 9px;
  background: #2563eb;
  color: white;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

button:hover {
  background: #1d4ed8;
}

@media (max-width: 640px) {
  .activity-grid {
    grid-template-columns: 1fr;
  }

  .section-heading,
  .message-panel {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
