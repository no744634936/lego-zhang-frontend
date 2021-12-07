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
        <!-- 除了直接导入 <LText/> -->
        <!-- component tag 可以根据component的name 来调用LText -> :is="component.name"  -->
        
        <!-- v-bind="component.props"  的意思就是将 component.props 这个对象传给LText里的props 这是v-bind单独使用时的作用-->
          
          <!-- <LText
            v-for="component in components" 
            :key="component.id" 
            v-bind="component.props"
          >
              {{component.props.text}}
          </LText> -->
         
          <component 
            v-for="component in components" 
            :is="component.name" 
            :key="component.id" 
            v-bind="component.props"
          >
          </component>
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
import LText from "../components/LText.vue"

export default defineComponent({
    name:"editor",

    components:{
        LText,
    },

    setup(){
        const store=useStore<GlobalDataProps>();
        const components=computed(()=>{return store.state.editor.components}) 
        console.log("components",components);
        
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
