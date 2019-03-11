<template>
  <div id="app" class="App">
    <header class="main-header">
      <h1>Welcome to the App</h1>
    </header>
    <router-view></router-view>
    <small class="footer">Mockup App made by Cédric D.</small>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
@import './App.css';
</style>
