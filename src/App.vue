<template>
  <a-layout>
    <a-layout-header>Header</a-layout-header>
    <a-layout-content>Content</a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
    <Index/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Index from './views/Index.vue'
export default defineComponent({
  name: 'App',
  components: {
      Index
  },
  setup(){
      return{

      }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
