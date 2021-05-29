<template>
<pre>{{route}}</pre>
<div class="work-detail-container">
  <a-row type="flex" justify="center" >
    <a-col span="8" class="cover-img">
      <img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" alt="">
    </a-col>
    <a-col :span="8">
      <h2>test</h2>
      <p>tes</p>
    <div class="author">
      <a-avatar>V</a-avatar>
      该模版由 <b>test</b> 创作
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
import { defineComponent } from 'vue';
import {useRoute,useRouter} from "vue-router";
export default defineComponent({

    setup(){
        //獲取url的中的数据
        const route=useRoute();
        //定义路由的行为，比如url跳转
        const router=useRouter();

        // 两秒后跳转路由到/template/1
        // 只跳转一次
        setTimeout(()=>{
            router.push("/template/1");
        },2000);

        return{
            route
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
