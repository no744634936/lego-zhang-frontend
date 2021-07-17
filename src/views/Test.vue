<template>
        <Upload/>
</template>
 
<script lang='ts'>
import { defineComponent } from 'vue';
import Upload from '../components/Upload.vue';


export default defineComponent({
  name: 'Test',
  components:{
      Upload
  },
  setup(){
    return{
    };
  }
});
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title {
  color: #fff;
}
.footer{
    background-color: rgb(241, 53, 53);
}
</style>