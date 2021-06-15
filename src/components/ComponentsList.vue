<template>
    <!-- 
        为什么要用div来隔离一下呢？因为需要在LText这个组件上添加click事件，但是并不想影响到组件本身的click事件？
    <div class="component-list">
        <LText v-for="(item,index) in list" :key="index" v-bind="item" class="component-item"></LText>
    </div> 
    -->
    <div class="component-list">
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
    name:'components-list',
    emits:['on-item-click'],//发送一个事件
    props:{
        list:{type:Array,required:true}
    },
    components:{
        LText
    },
    setup(props,context){
        const onItemClick=(data: any)=>{
            context.emit('on-item-click',data)
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
