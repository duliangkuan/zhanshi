<template>
  <div id="app">
    <ThemeAnimations />
    <router-view />
  </div>
</template>

<script>
import ThemeAnimations from './components/ThemeAnimations.vue'

export default {
  name: 'App',
  components: {
    ThemeAnimations
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>
