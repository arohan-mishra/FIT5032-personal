<script setup>
import { authState, logOut } from '../firebase/auth'
</script>

<template>
  <main class="container py-5">
    <h1>Members Area</h1>
    <p>You are signed in as {{ authState.user?.email }}.</p>
    <p>Your role is {{ authState.role }}.</p>
    <button class="btn btn-secondary" type="button" @click="logOut">Log out</button>
  </main>
</template>
