<template>
  <div class="form">
    <h1>User Information Form / Credentials</h1>

    <form>
      <label for="username">Username:</label><br />
      <input id="username" name="username" type="text" /><br />

      <label for="password">Password:</label><br />
      <input id="password" name="password" type="password" /><br />

      <label for="isAustralian">Australian Resident?</label><br />
      <input id="isAustralian" name="isAustralian" type="checkbox" /><br />

      <label for="reason">Reason For Joining:</label><br />
      <textarea id="reason" name="reason" rows="3"></textarea><br />

      <label for="gender">Gender</label><br />
      <select id="gender" name="gender">
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
    </form>
  </div>
</template>

<script setup>
defineOptions({ name: 'LibraryRegistrationForm' })
</script>
