<template>
        <TemplateList :list="testData"/>
</template>
 
<script lang='ts'>
import { computed, defineComponent,reactive } from 'vue';
import TemplateList from '../components/TemplateList.vue';
// 使用vuex的store
import { GlobalDataProps } from '../store/index';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components:{
      TemplateList,
  },
  setup(){
      const store=useStore<GlobalDataProps>();
      const testData = computed(() => store.state.templates.data)
    return{
        testData,
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