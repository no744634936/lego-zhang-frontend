<template>
    <!-- 需要header跟footer的页面 -->
    <div class="homepage-container">
        <!-- header -->
        <a-layout>
            <a-layout-header class="header">
                <div class="page-title">
                   <router-link to='/'><span> zhang-lego</span></router-link>
                </div>
                <div>
                    <span style='color:white'>username:zhang</span>
                </div>
            </a-layout-header>

            <!-- content -->
            <a-layout-content>
                <div class="content-container">
                   <Home/>
                   <!-- <TemplateDetail/> -->
                   <!-- <Editor/> -->
                </div>
            </a-layout-content>

            <!-- footer -->
            <a-layout-footer>
                <div>
                    © 1996-2020, zhang-lego.com, Inc. or its affiliates
                </div>
            </a-layout-footer>
        </a-layout>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Home from './Home.vue'
import Editor from './Editor.vue'
import TemplateDetail from './TemplateDetail.vue'

export default defineComponent({
  name: 'Index',
  components: {
    Home,
    // TemplateDetail,
    // Editor,
  },
  setup () {
    return {
    }
  }
})
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
</style>
