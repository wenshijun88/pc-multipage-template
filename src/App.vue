<template>
  <div id="app" v-loading="isLoading">
    <router-view />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'App',
    components: {

    },
    computed: {
      ...mapGetters(['isLoading']),
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  box-sizing: border-box;
}
</style>
