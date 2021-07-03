<template>
        <TemplateList :list="testData"/>
</template>
 
<script lang='ts'>
import { defineComponent,reactive } from 'vue';
import TemplateList from '../components/TemplateList.vue';


export default defineComponent({
  name: 'App',
  components:{
      TemplateList,
  },
  setup(){
    //  这是一开始建页面布局用的testData
      const testData=reactive([
        {id:1,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
        {id:2,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
        {id:3,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
        {id:4,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
        {id:5,coverImage:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
    ]);

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