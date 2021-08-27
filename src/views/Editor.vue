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
          <!-- 
          <LText
            v-for="component in components" 
            :key="component.id" 
            v-bind="component.props"
          >
          </LText>

          使用EditWrapper 让逻辑跟业务分离
          像LText 这种类型的html 展示型的组件，里面就别写上for ，if ，点击，拖拽事件之类的逻辑了，
          在外面包裹一层wrapper 在这个wrapper里面写逻辑就好
           -->
           <EditWrapper 
                v-for="component in components" 
                :key="component.id" 
                :id="component.id"
                :active="component.id===(currentEditedElement&& currentEditedElement.id)"
                
                @setActive="setElementActive"
                @deleteItem="deleteItemFromStore"
            >
                <component :is="component.name" v-bind="component.props"/>
           </EditWrapper>
        </div>
      </a-layout-content>
    </a-layout>

    <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        <a-tabs type="card">
            <a-tab-pane key="component" tab="属性设置" v-model:activeKey="activePanel">
                <PropsTable 
                        v-if="currentEditedElement&& currentEditedElement.props"
                        :props='currentEditedElement.props'
                        @changeValue="handleChangeValue"
                ></PropsTable>
                
                <pre>
                    <!--当 currentEditedElement存在的时候 打印currentEditedElement.props，因为有.props 所以必须判断currentEditedElement是否存在-->
                    {{currentEditedElement&& currentEditedElement.props}}
                </pre>
            </a-tab-pane>
            <a-tab-pane key="layer" tab="图层设置">
                <LayerList
                    :list="components"
                    :selectedId="currentEditedElement && currentEditedElement.id"
                >
                </LayerList>
            </a-tab-pane>
        </a-tabs>
</a-layout-sider> 
  </a-layout>
</div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent ,computed,ref} from 'vue';
import { GlobalDataProps } from '../store/index';

import ComponentsList from "../components/ComponentsList.vue";
import LText from "../components/LText.vue";
import LImage from "../components/LImage.vue";
import {defaultTextTemplatesList} from '../defaultTextTemplatesList'
import EditWrapper from '../components/EditWrapper.vue';

import PropsTable from '../components/PropsTable.vue'

import LayerList from '../components/LayerList.vue'

export default defineComponent({
    name:"editor",

    components:{
        LText,
        LImage,
        ComponentsList,
        EditWrapper,
        PropsTable,
        LayerList
    },

    setup(){
        const store=useStore<GlobalDataProps>();


        const components=computed(()=>{return store.state.editor.components})

        // console.log("components",components);
        const currentEditedElement= computed(()=>store.getters.getCurrentEditedElement)
        
        // 就算 const components=null ，不需要额外的判断
        // template 里面的v-for="component in components" 也不会报错。 这是因为in 关键字的作用

        // 但是 const currentEditedElement=null 的时候
        // template 里面的{{currentEditedElement&& currentEditedElement.props}} 就要有额外的判断currentEditedElement&&
        // 如果只是这样{{currentEditedElement.props}}，就会报错

        const addItem=(props: any)=>{
            // 用store来进行state的更新.
            // props 是ComponentsList.vue那边的onItemClick(item)中的item
            store.commit('addComponent',props)
        }

        const setElementActive=(id: string)=>{
            store.commit('setElementActive',id)
        }
        const deleteItemFromStore=(id: string)=>{
            console.log('deleteItemFromStore',id);
            
            store.commit('deleteItemFromStore',id)
        }
        const handleChangeValue=(data: any)=>{
            // console.log("event",data); 
            store.commit('updateComponent',data)
            
        }
        // ant design vue 的a-tab-pane 默认显示component这个tab
        const activePanel=ref('component')
        return {
            components,
            defaultTextTemplatesList,
            EditWrapper,
            addItem,
            setElementActive,
            currentEditedElement,
            handleChangeValue,
            deleteItemFromStore,
            activePanel
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