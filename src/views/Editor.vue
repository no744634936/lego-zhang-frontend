<template>
<div class="editor-container">
  <a-layout>
    <a-layout-sider width="300" style="background: yellow">
      <div class="sidebar-container">
          <!-- onItemClick 这个事件是从ComponentsList.vue那边传过来的 -->
        <ComponentsList :list="defaultTextTemplatesList" @onItemClick="addItem"></ComponentsList>
      </div>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content class="preview-container">
        <p>画布区域</p>
        <div class="preview-list" id="canvas-area">
             <!-- v-bind="component.props"  的意思就是将 component.props 这个对象传给LText里的props 这是v-bind单独使用时的作用-->
          <LText
            v-for="component in components" 
            :key="component.id" 
            v-bind="component.props"
          >
              {{component.props.text}}
          </LText>
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

import ComponentsList from "../components/ComponentsList.vue";
import LText from "../components/LText.vue";
import {defaultTextTemplatesList} from '../defaultTextTemplatesList'

export default defineComponent({
    name:"editor",

    components:{
        LText,
        ComponentsList,
    },

    setup(){
        const store=useStore<GlobalDataProps>();
        const components=computed(()=>{return store.state.editor.components}) 
        // console.log("components",components);

        const addItem=(props: any)=>{
            // 用store来进行state的更新.
            // props 是ComponentsList.vue那边的onItemClick(item)中的item
            store.commit('addComponent',props)
        }
        
        return {
            components,
            defaultTextTemplatesList,
            addItem,
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