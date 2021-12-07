<template>
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
