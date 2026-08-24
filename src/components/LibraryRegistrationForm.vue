<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form / Credentials</h1>

        <form @submit.prevent>
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input id="username" class="form-control" name="username" type="text" />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input id="password" class="form-control" name="password" type="password" />
          </div>

          <div class="mb-3 form-check">
            <input
              id="isAustralian"
              class="form-check-input"
              name="isAustralian"
              type="checkbox"
            />
            <label for="isAustralian" class="form-check-label">Australian Resident?</label>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining:</label>
            <textarea id="reason" class="form-control" name="reason" rows="3"></textarea>
          </div>

          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" class="form-select" name="gender">
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'LibraryRegistrationForm' })
</script>
