<template>
  <div id="app">
    <div class="h">
      <app-header></app-header>
    </div>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import Header from "./components/Header.vue";
  import Footer from "./components/Footer.vue";
export default {
  name: 'App',
  components:{
    "app-header":Header,
    "app-footer":Footer,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.h{
  width: 100%;
  position: fixed;
  top:0;
  left:0;
  z-index:999;
}
</style>
