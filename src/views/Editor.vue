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

    <a-layout-sider width="300" style="background: #fff" class="settings-panel">
      组件属性
      <PropsTable 
            v-if="currentEditedElement&& currentEditedElement.props"
            :props='currentEditedElement.props'
            @changeValue="handleChangeValue"
      ></PropsTable>
      
      <pre>
          <!--当 currentEditedElement存在的时候 显示currentEditedElement.props，因为有.props 所以必须判断currentEditedElement是否存在-->
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

import PropsTable from '../components/PropsTable.vue'

export default defineComponent({
    name:"editor",

    components:{
        LText,
        ComponentsList,
        EditWrapper,
        PropsTable,
    },

    setup(){
        const store=useStore<GlobalDataProps>();

        const components=computed(()=>{return store.state.editor.components})

        // console.log("components",components);
        const currentEditedElement= computed(()=>store.getters.getCurrentEditedElement)

        const addItem=(props: any)=>{
            // 用store来进行state的更新.
            // props 是ComponentsList.vue那边的onItemClick(item)中的item
            store.commit('addComponent',props)
        }

        const setElementActive=(id: string)=>{
            store.commit('setElementActive',id)
        }
        
        const handleChangeValue=(data: any)=>{
            // console.log("event",data);    //=>{key: 'text', value: 'hello23'}
            store.commit('updateComponent',data)
            
        }
        return {
            components,
            defaultTextTemplatesList,
            EditWrapper,
            addItem,
            setElementActive,
            currentEditedElement,
            handleChangeValue,
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