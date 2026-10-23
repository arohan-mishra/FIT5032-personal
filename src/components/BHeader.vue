<script setup>
import { authState, logOut } from '../firebase/auth'
import { isAuthenticated, logout } from '../auth'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item"><RouterLink to="/" class="nav-link">Home</RouterLink></li>
        <li class="nav-item"><RouterLink to="/about" class="nav-link">About</RouterLink></li>
        <li v-if="!isAuthenticated" class="nav-item">
          <RouterLink to="/login" class="nav-link">Login</RouterLink>
        </li>
        <li v-else class="nav-item">
          <button class="nav-link" type="button" @click="handleLogout">Logout</button>
        </li>
        <li class="nav-item">
          <RouterLink to="/FireSignIn" class="nav-link">Fire Sign In</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/FireRegister" class="nav-link">Fire Register</RouterLink>
        </li>
        <li class="nav-item"><RouterLink to="/addbook" class="nav-link">Add Book</RouterLink></li>
        <li class="nav-item">
          <RouterLink to="/GetBookCount" class="nav-link">Get Book Count</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/WeatherCheck" class="nav-link">Get Weather</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/CountBookAPI" class="nav-link">Count Book API</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/GetAllBookAPI" class="nav-link">Get All Book API</RouterLink>
        </li>
        <li v-if="authState.user" class="nav-item">
          <RouterLink to="/members" class="nav-link">Members</RouterLink>
        </li>
        <li v-if="authState.user" class="nav-item">
          <button class="nav-link" type="button" @click="logOut">Log out</button>
        </li>
      </ul>
    </header>
  </div>
</template>
