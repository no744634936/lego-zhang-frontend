<template>
<pre>{{route}}</pre>
<div class="work-detail-container">
  <a-row type="flex" justify="center" >
    <a-col span="8" class="cover-img">
      <img :src="template.coverImg" alt="">
    </a-col>
    <a-col :span="8">
      <h2>{{template.title}}</h2>
      <p>{{template.title}}</p>
    <div class="author">
      <a-avatar>V</a-avatar>
      该模版由 <b>{{template.author}}</b> 创作
    </div>
    <div class="bar-code-area" >
      <span>扫一扫，手机预览</span>
      <div ref="container"></div>
    </div>
    <div class="use-button">
        <router-link to="/editor">
            <a-button type="primary" size="large">使用模版</a-button>
        </router-link>
        <a-button size="large">下载图片海报</a-button>
    </div>
    </a-col>
  </a-row>
</div>
</template>

<script lang="ts">
import { defineComponent ,computed} from 'vue';
import {useRoute,useRouter} from "vue-router";
import {useStore} from "vuex"

// 写成/store/index 不能写/store/index.ts
import {TemplateProps} from "../store/template"
import {GlobalDataProps} from "../store/index"

export default defineComponent({

    setup(){
        //獲取url的中的数据
        const route=useRoute();

        // 将store里的数据放进template里面去。
        //写 <GlobalDataProps>的好处就是，使用store这个变量的时候会有代码提醒。
        //写 <TemplateProps>的好处就是，使用template这个变量的时候会有代码提醒。

        const store=useStore<GlobalDataProps>();
        const currentId=route.params.id as string
        const template=computed<TemplateProps>(()=>store.getters.getTemplateById(parseInt(currentId)))
       
        console.log(currentId);
        console.log(template);
        

        return{
            route,
            template
        };
    }

});
</script>

<style scoped>
.work-detail-container {
  margin-top:50px;
}
.cover-img {
  margin-right: 30px;
}
.cover-img img {
  width: 100%;
}
.use-button {
  margin: 30px 0;
}
.ant-avatar {
  margin-right: 10px;
}
.bar-code-area {
  margin: 20px 0;
}
</style>
