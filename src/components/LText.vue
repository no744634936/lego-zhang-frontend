<template>
    <!-- component 根据tag属性的值，自动转变标签类型 -->
    <component :is="tag" :style="style_props" class="l-text-component" @click="handleClick">
    {{text}}
    </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {component_default__props,text_component_css_props_name_arr} from "../defaultProps"
import componentCommonFunc from '../hooks/componentCommonFunc'

export default defineComponent({
    name:"l-text",
    props:{
        tag:{type:String,default:'div'},
        ...component_default__props
    },
    
    setup(props){

        console.log("props",props);
    
        const {style_props,handleClick}=componentCommonFunc(props,text_component_css_props_name_arr)
        
        console.log("style_props",style_props);
        
        return {
            style_props,
            handleClick,
        }
    },
})
</script>
