<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
        <h1 class="text-center">User Information Form / Credentials</h1>

        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input
              id="username"
              v-model="formData.username"
              class="form-control"
              name="username"
              type="text"
            />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              id="password"
              v-model="formData.password"
              class="form-control"
              name="password"
              type="password"
            />
          </div>

          <div class="mb-3 form-check">
            <input
              id="isAustralian"
              v-model="formData.isAustralian"
              class="form-check-input"
              name="isAustralian"
              type="checkbox"
            />
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining:</label>
            <textarea
              id="reason"
              v-model="formData.reason"
              class="form-control"
              name="reason"
              rows="3"
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" v-model="formData.gender" class="form-select" name="gender">
              <option disabled value="">Please select a gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="submittedCards.length" class="row mt-5">
      <div class="d-flex flex-wrap justify-content-center">
        <div
          v-for="(card, index) in submittedCards"
          :key="index"
          class="card m-2"
          style="width: 18rem"
        >
          <div class="card-header">User Information</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Username: {{ card.username }}</li>
            <li class="list-group-item">Password: {{ card.password }}</li>
            <li class="list-group-item">
              Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
            </li>
            <li class="list-group-item">Gender: {{ card.gender }}</li>
            <li class="list-group-item">Reason: {{ card.reason }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineOptions({ name: 'LibraryRegistrationForm' })

const emptyForm = () => ({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const formData = ref(emptyForm())
const submittedCards = ref([])

const submitForm = () => {
  submittedCards.value.push({ ...formData.value })
}

const clearForm = () => {
  formData.value = emptyForm()
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 10px;
  border-radius: 10px 10px 0 0;
  background-color: #275fda;
  color: white;
}

.list-group-item {
  padding: 10px;
}
</style>
