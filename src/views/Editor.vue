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
            <div class="body-container"  :style="page.props">
                <EditWrapper 
                        v-for="component in components" 
                        :key="component.id" 
                        :id="component.id"
                        :active="component.id===(currentEditedElement&& currentEditedElement.id)"
                        @setActive="setElementActive"
                        @deleteItem="deleteItemFromStore"
                        :props="component.props"
                        @update-position="updatePosition"
                    >
                        <component :is="component.name" v-bind="component.props"/>
                </EditWrapper>
           </div>
        </div>
      </a-layout-content>
    </a-layout>

    <a-layout-sider width="300" style="background: #fff" class="settings-panel">
        <a-tabs type="card">
            <a-tab-pane key="component" tab="属性设置" v-model:activeKey="activePanel">
                <EditGroup 
                        v-if="currentEditedElement && currentEditedElement.props && !currentEditedElement.isLocked"
                        :props='currentEditedElement.props'
                        @changeValue="handleChangeValue"
                ></EditGroup>
                 <div v-else>
                    <a-empty>
                    <template #description>
                        <p>该元素被锁定，无法编辑</p>
                    </template>
                    </a-empty>
                </div>
                <pre>
                    <!--当 currentEditedElement存在的时候 打印currentEditedElement.props，因为有.props 所以必须判断currentEditedElement是否存在-->
                    {{currentEditedElement&& currentEditedElement.props}}
                </pre>
            </a-tab-pane>
            <a-tab-pane key="layer" tab="图层设置">
                <LayerList
                    :list="components"
                    @lock="handleChangeValue"
                    :selectedId="currentEditedElement && currentEditedElement.id"
                    @select="setElementActive"
                >
                </LayerList>
            </a-tab-pane>
            <a-tab-pane key="page" tab="背景页面设置">
                <PropsTable :props="page.props" @changeValue="pageChange"></PropsTable>
            </a-tab-pane>
        </a-tabs>
    </a-layout-sider> 
  </a-layout>
</div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { defineComponent ,computed,ref, version} from 'vue';
import { GlobalDataProps } from '../store/index';

import ComponentsList from "../components/ComponentsList.vue";
import LText from "../components/LText.vue";
import LImage from "../components/LImage.vue";
import defaultTextTemplatesList from '../defaultTextTemplatesList'
import EditWrapper from '../components/EditWrapper.vue';

import PropsTable from '../components/PropsTable.vue'

import LayerList from '../components/LayerList.vue'

import EditGroup from "../components/EditGroup.vue"
import { pickBy, forEach } from 'lodash-es'
import initHotKeys from '../plugins/hotKeys'


export default defineComponent({
    name:"editor",
    components:{
        LText,
        LImage,
        ComponentsList,
        EditWrapper,
        PropsTable,
        LayerList,
        EditGroup,
        initHotKeys
    },

    setup(){
        initHotKeys()
        const store=useStore<GlobalDataProps>();


        const components=computed(()=>{return store.state.editor.components})
        const page = computed(() => store.state.editor.page)

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
        const activePanel=ref('layer')

        const pageChange = (e: any) => {
            console.log('page', e)
            store.commit('updatePage', e)
        }
        const updatePosition = (data: { left: number; top: number; id: string }) => {
            // const { left,top,id } = data
            // store.commit('updateComponent', { key: "left", value: left+"px", id })
            // store.commit('updateComponent', { key: "top", value: top+"px", id })

            const { id } = data
            const updatedData = pickBy<number>(data, (v, k) => k !== 'id')
            forEach(updatedData,(v,key)=>{
                store.commit('updateComponent', { key: key, value: v+"px", id })
            })
        }
        return {
            components,
            defaultTextTemplatesList,
            EditWrapper,
            addItem,
            setElementActive,
            currentEditedElement,
            handleChangeValue,
            deleteItemFromStore,
            activePanel,
            page,
            pageChange,
            updatePosition,
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