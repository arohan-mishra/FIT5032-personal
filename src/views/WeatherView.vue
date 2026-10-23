<template>
  <h1>WEATHER APP</h1>
  <input v-model="city" type="text" placeholder="Enter city name" />
  <button @click="searchByCity">Search</button>
  <p v-if="errorMessage">{{ errorMessage }}</p>

  <main>
    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import axios from 'axios'

const apikey = '0a047edc34610e1393eb7658364b9e72'

const city = ref('')
const weatherData = ref(null)
const errorMessage = ref('')

const temperature = computed(() => {
  return weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `https://openweathermap.org/img/wn/${weatherData.value.weather[0].icon}.png`
    : null
})

const fetchWeatherData = async (url) => {
  try {
    errorMessage.value = ''
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (error) {
    weatherData.value = null
    errorMessage.value = error.response?.data?.message || 'Unable to retrieve weather data.'
  }
}

const fetchCurrentLocationWeather = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      await fetchWeatherData(url)
    })
  }
}

const searchByCity = async () => {
  if (!city.value.trim()) {
    errorMessage.value = 'Please enter a city name.'
    return
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`
  await fetchWeatherData(url)
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>
