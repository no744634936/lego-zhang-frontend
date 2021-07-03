<template>
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