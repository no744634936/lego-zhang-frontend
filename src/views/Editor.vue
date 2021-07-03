<template>
<div class="editor-container">
  <a-layout>
    <a-layout-sider width="300" style="background: yellow">
      <div class="sidebar-container">
        组件列表
      </div>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content class="preview-container">
        <p>画布区域</p>
        <div class="preview-list" id="canvas-area">
          <div v-for="component in components" :key="component.id">
              {{component.props.text}}
          </div>
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider width="300" style="background: purple" class="settings-panel">
      组件属性
    </a-layout-sider>  
  </a-layout>
</div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent ,computed} from 'vue';
import { GlobalDataProps } from '../store/index';

export default defineComponent({
    setup(){
        // 传入GlobalDataProps 这个泛型，store.state. 后面的内容就有了自动补全
        // setup 方法里面可以自动补全，template里面还不能自动补全，有点麻烦
        const store=useStore<GlobalDataProps>();

        const components=computed(()=>{return store.state.editor.components}) 
        console.log(components);
        
        return {
            components
        }
    }

});
</script>

<style>
.editor-container .preview-container {
  padding: 24px;
  margin: 0;
  min-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.editor-container .preview-list {
  padding: 0;
  margin: 0;
  min-width: 375px;
  min-height: 200px;
  border: 1px solid #efefef;
  background: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  margin-top: 50px;
  max-height: 80vh;
}
</style>