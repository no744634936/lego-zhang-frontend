<template>
    <!-- 需要header跟footer的页面 -->
    <div class="homepage-container" v-if="needHeader">
        <a-layout>
            <a-layout-header>
                <div class="page-title">
                   <router-link to="/"> zhang-lego</router-link>
                </div>
            </a-layout-header>

            <!-- <router-view></router-view> 的作用就是显示根据路由不同显示不同的component -->
            <a-layout-content>
                <div class="content-container">
                   <router-view></router-view>
                </div>
            </a-layout-content>

            <a-layout-footer>
                <div>
                    © 1996-2020, zhang-lego.com, Inc. or its affiliates
                </div>
            </a-layout-footer>
        </a-layout>
    </div>
    <!-- 不需要header跟footer的页面 -->
    <div class="homepage-container" v-else>
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup(){
      const route=useRoute()
      //needHeader 不是一个响应式对象，用computed包裹之后就可以随着路由的切换做出改变
      const needHeader=computed(()=>route.meta.needHeader)

      return{
          needHeader,
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
  margin-top: 60px;
}
</style>
