<template>
    <!-- component 根据tag属性的值，自动转变标签类型 -->
    <component :is="tag" :style="style_props" class="l-text-component">
    {{text}}
    </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {component_default__props,text_component_css_props_name_arr} from "../defaultProps"
import {pick} from "lodash-es";

export default defineComponent({
    name:"l-text",
    props:{
        tag:{type:String,default:'div'},
        ...component_default__props
    },
    
    setup(props){

        console.log("props",props);
        
        //挑选出与css有关的属性跟默认值
        const style_props=computed(()=>pick(props,text_component_css_props_name_arr))
        
        console.log("style_props",style_props);
        
        return {
            style_props
        }
    },
})
</script>
