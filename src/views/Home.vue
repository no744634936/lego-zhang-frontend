<template>
        <TemplateList :list="testData"/>
</template>
 
<script lang='ts'>
import { computed, defineComponent,reactive,onMounted} from 'vue';
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
      console.log("testData",testData);
      
      
    //  这是一开始建页面布局用的testData
    //   const testData=reactive([
    //     {id:1,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
    //     {id:2,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
    //     {id:3,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
    //     {id:4,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
    //     {id:5,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
    // ]);

    onMounted(()=>{
        store.dispatch("fetchTemplates") // 触发的是action里的fetchTemplates 方法
    })
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