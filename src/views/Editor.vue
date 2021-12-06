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
            <!-- 
                使用EditWrapper 让逻辑跟业务分离
                像LText 这种类型的html 展示型的组件，
                里面就别写上for ，if ，点击，拖拽事件之类的逻辑了，
                在外面包裹一层wrapper 在这个wrapper里面写逻辑就好
            -->
            <!--
                (currentEditedElement&& currentEditedElement.id) 的意思是
                当 currentEditedElement存在的时候返回currentEditedElement.id 
            -->
           <EditWrapper 
                v-for="component in components" 
                :key="component.id" 
                :id="component.id"
                :active="component.id===(currentEditedElement&& currentEditedElement.id)"
                @setActive="setElementActive"
            >
                <LText v-bind="component.props"></LText>
           </EditWrapper>
        </div>
      </a-layout-content>
    </a-layout>
    <a-layout-sider width="300" style="background: purple" class="settings-panel">
      组件属性
      <pre>
          <!--当 currentEditedElement存在的时候 打印currentEditedElement.props，因为有.props 所以必须判断currentEditedElement是否存在-->
          {{currentEditedElement&& currentEditedElement.props}}
      </pre>
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
import EditWrapper from '../components/EditWrapper.vue';

export default defineComponent({
    name:"editor",

    components:{
        LText,
        ComponentsList,
        EditWrapper,
    },

    setup(){
        const store=useStore<GlobalDataProps>();


        const components=computed(()=>{return store.state.editor.components})

        // console.log("components",components); 
        const currentEditedElement= computed(()=>store.getters.getCurrentEditedElement)

        // currentEditedElement 一开始的值是undefined，
        // 因为一开始 getCurrentEditedElement 找不到正在编辑的组件是哪一个
        // 当 const currentEditedElement=undefined 的时候
        // template 里面的{{currentEditedElement&& currentEditedElement.props}} 就要有额外的判断currentEditedElement&&
        // 如果只是写{{currentEditedElement.props}}，就会报错

        const addItem=(props: any)=>{
            // 用store来进行state的更新.
            // props 是ComponentsList.vue那边的onItemClick(item)中的item
            store.commit('addComponent',props)
        }

        const setElementActive=(id: string)=>{
            store.commit('setElementActive',id)
        }
        
        return {
            components,
            defaultTextTemplatesList,
            EditWrapper,
            addItem,
            setElementActive,
            currentEditedElement,
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