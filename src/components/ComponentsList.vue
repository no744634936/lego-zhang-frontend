<template>
    <!-- 
        为什么要用div来隔离一下呢？因为需要在LText这个组件上添加click事件，但是并不想影响到组件本身的click事件？
        LText 组件上本身已经有了一个click事件了，点击一下跳转到另一个网页的事件。
        现在又想点击一下组件，让他从左边的模板列表跑到中间的编辑器，也需要一个click事件，
        为了区分开两个click事件，所以用div来隔离一下，给div一个新的click事件
    <div class="component-list">
        <LText v-for="(item,index) in list" :key="index" v-bind="item" class="component-item"></LText>
    </div> 
    -->
    <div class="component-list">
        <!-- @click="onItemClick(item)" 被点击之后，触发 onItemClick(data) 函数，将data 传给 父组件Editor.vue -->
        <!-- 父组件里用 onItemClick="addItem" 接收传来的数据，触发 addItem(props) 函数，将子组件传过来的数据添加到store中-->
        <div class="component-item" v-for="(item,index) in list" :key="index"  @click="onItemClick(item)">
             <!-- v-bind="item"  的意思就是将 item 这个对象传给LText里的props 这是v-bind单独使用时的作用-->
            <LText v-bind="item"></LText>
        </div>
    </div> 
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LText from './LText.vue'
export default defineComponent({
    name:'componentsList',
    emits:['onItemClick'],//发送一个事件给父组件
    props:{
        list:{type:Array,required:true}
    },
    components:{
        LText
    },
    setup(props,context){
        const onItemClick=(data: any)=>{
            context.emit('onItemClick',data)
        }

        return {
            onItemClick,
        }
    }
})
</script>

<style scoped>
.component-list{
    display: flex;
    flex-direction: column;
    text-align: center;
}


</style>
