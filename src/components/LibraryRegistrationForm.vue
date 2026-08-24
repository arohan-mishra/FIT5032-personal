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

    <div v-if="submittedUsers.length" class="row mt-5">
      <div class="col-12">
        <h2 class="text-center mb-3">Submitted User Information</h2>
        <DataTable
          :value="submittedUsers"
          striped-rows
          scrollable
          table-style="min-width: 50rem"
        >
          <Column field="username" header="Username" />
          <Column field="password" header="Password" />
          <Column header="Australian Resident">
            <template #body="{ data }">
              {{ data.isAustralian ? 'Yes' : 'No' }}
            </template>
          </Column>
          <Column field="gender" header="Gender" />
          <Column field="reason" header="Reason" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

defineOptions({ name: 'LibraryRegistrationForm' })

const emptyForm = () => ({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const formData = ref(emptyForm())
const submittedUsers = ref([])
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

  submittedUsers.value.push({ ...formData.value })
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
