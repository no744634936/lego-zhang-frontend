<template>
    <Index/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Index from './views/Index.vue';

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
.homepage-container{
    margin: 0;
    padding: 0;
}
</style>
