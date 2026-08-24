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
              :aria-invalid="Boolean(errors.username)"
              :class="{ 'is-invalid': errors.username }"
              class="form-control"
              name="username"
              type="text"
              @blur="validateUsername(true)"
              @input="validateUsername(false)"
            />
            <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              id="password"
              v-model="formData.password"
              :aria-invalid="Boolean(errors.password)"
              :class="{ 'is-invalid': errors.password }"
              class="form-control"
              name="password"
              type="password"
              @blur="validatePassword(true)"
              @input="validatePassword(false)"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <div class="mb-3 form-check">
            <input
              id="isAustralian"
              v-model="formData.isAustralian"
              :aria-invalid="Boolean(errors.resident)"
              :class="{ 'is-invalid': errors.resident }"
              class="form-check-input"
              name="isAustralian"
              type="checkbox"
              @change="validateResident(true)"
            />
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
            <div v-if="errors.resident" class="text-danger">{{ errors.resident }}</div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining:</label>
            <textarea
              id="reason"
              v-model="formData.reason"
              :aria-invalid="Boolean(errors.reason)"
              :class="{ 'is-invalid': errors.reason }"
              class="form-control"
              name="reason"
              rows="3"
              @blur="validateReason(true)"
              @input="validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select
              id="gender"
              v-model="formData.gender"
              :aria-invalid="Boolean(errors.gender)"
              :class="{ 'is-invalid': errors.gender }"
              class="form-select"
              name="gender"
              @change="validateGender(true)"
            >
              <option disabled value="">Please select a gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
            <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
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
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateUsername = (showError) => {
  const isValid = formData.value.username.trim().length >= 3
  errors.value.username = !isValid && showError ? 'Name must be at least 3 characters' : null
  return isValid
}

const validatePassword = (showError) => {
  const password = formData.value.password
  let message = null

  if (password.length < 8) {
    message = 'Password must be at least 8 characters long.'
  } else if (!/[A-Z]/.test(password)) {
    message = 'Password must contain at least one uppercase letter.'
  } else if (!/[a-z]/.test(password)) {
    message = 'Password must contain at least one lowercase letter.'
  } else if (!/\d/.test(password)) {
    message = 'Password must contain at least one number.'
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    message = 'Password must contain at least one special character.'
  }

  errors.value.password = showError ? message : null
  return message === null
}

const validateResident = (showError) => {
  const isValid = formData.value.isAustralian
  errors.value.resident =
    !isValid && showError ? 'Please confirm that you are an Australian resident.' : null
  return isValid
}

const validateGender = (showError) => {
  const isValid = Boolean(formData.value.gender)
  errors.value.gender = !isValid && showError ? 'Please select a gender.' : null
  return isValid
}

const validateReason = (showError) => {
  const isValid = formData.value.reason.trim().length >= 10
  errors.value.reason =
    !isValid && showError ? 'Reason for joining must be at least 10 characters.' : null
  return isValid
}

const submitForm = () => {
  const isValid = [
    validateUsername(true),
    validatePassword(true),
    validateResident(true),
    validateGender(true),
    validateReason(true),
  ].every(Boolean)

  if (!isValid) return

  submittedCards.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = emptyForm()
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
  }
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
