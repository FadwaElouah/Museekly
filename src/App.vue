<template>
 <router-view />
</template>

<script>
import HomePage from './pages/HomePage.vue'

export default {
  components: {
    HomePage
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
body {
  font-family: 'Segoe UI', sans-serif;
  color: #fff;
  background: linear-gradient(135deg,rgba(30, 30, 47, 0.8),rgb(245, 143, 96));
  background-attachment: fixed;
}
</style>

