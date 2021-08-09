
<template>
<!-- 
循环展示一组数据的组件
a-row 被分为24份，一个a-row里面的可以包含多个a-col 
a-col的span属性的总和为24 
24除以6 =4 ,意味着一个a-row里有4个a-col

栅格常常需要和间隔进行配合，你可以使用 Row 的 gutter 属性

a-card是一个卡片component

v-slot 具名插槽。 v-slot 只能添加在 <template> 上 
https://www.youtube.com/watch?v=WovdX7ZK8F0&list=PLC3y8-rFHvwgeQIfSDtEGVvvSEPDkL_1f&index=38
a-card 组件里面有很多slot，使用v-slot:description 这样的名字是将，template标签里的内容放进a-card组件里对应的slot里面
-->
  <div class="gutter-example">
    <a-row :gutter="16" >
      <a-col class="gutter-row" :span="6" v-for="item in list" :key="item.id">
        <div class="gutter-box">
            <a-card hoverable>
                <template v-slot:cover>
                    <img :src="item.coverImg"  v-if="item.coverImg" />
                    <img src="http://typescript-vue.oss-cn-beijing.aliyuncs.com/vue-marker/5f81cca3f3bf7a0e1ebaf885.png"  v-else />
                    <div class="hover-item">
                        <router-link :to="`/template/${item.id}`">
                            <a-button size="large" type="primary">使用该模版创建</a-button>
                        </router-link>
                    </div>
                </template>
                <a-card-meta :title="item.title">
                <template v-slot:description>
                     <p>作者:zhang</p>
                     <p>copiedCount:4</p>
                </template>
                </a-card-meta>
            </a-card>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name:"template_list",
    
    props:{
        list:{
            type:Array,
            required:true
        },
    },
    setup(props, context){
        console.log(props);
        console.log(props.list);
        
    }
});
</script>
<style scoped>
.gutter-example >>> .ant-row > div {
  background: transparent;
  border: 0;
}
.gutter-box {
  background: #00a0e9;
  padding: 5px 0;
}
</style>