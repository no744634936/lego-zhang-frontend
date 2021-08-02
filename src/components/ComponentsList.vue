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
    <StyledUploader @success="onImageUploaded"></StyledUploader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LText from './LText.vue'
import StyledUploader from '../components/StyledUploader.vue'
import { v4 as uuidv4 } from 'uuid'
import { message } from 'ant-design-vue'
import { image_component_props_with_defalut_value} from '../defaultProps'
import { getImageDimensions } from '../helper'
export default defineComponent({
    name:'components-list',
    emits:['on-item-click'],//发送一个事件
    props:{
        list:{type:Array,required:true}
    },
    components:{
        LText,
        StyledUploader,
    },
    setup(props,context){
        const onItemClick = (props: any) => {
        const componentData: any = {
            name: 'l-text',
            id: uuidv4(),
            props
        }
        context.emit('on-item-click', componentData)
        }

        const onImageUploaded = (data: { resp: any; file: File }) => {
        const { resp, file } = data
        const componentData = {
            name: 'l-image',
            id: uuidv4(),
            props: {
            ...image_component_props_with_defalut_value
            }
        }
        message.success('上传成功')
        console.log("ffffff",resp.urls[0]);
        
        componentData.props.src = resp.urls[0]

        getImageDimensions(file).then(({ width }) => {
            console.log(width)
            const maxWidth = 373
            componentData.props.width = ((width > maxWidth) ? maxWidth : width) + 'px'
            context.emit('on-item-click', componentData)
        })
        }
        return {
            onItemClick,
            onImageUploaded,
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
