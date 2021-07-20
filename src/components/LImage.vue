<template>
  <img 
    :style="style_props" 
    class="l-image-component" 
    @click.prevent="handleClick"
    :src="src"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import componentCommonFunc from '../hooks/componentCommonFunc'
import {image_component_default_props,image_component_css_props_name_arr} from "../defaultProps"

// array that contains style props
export default defineComponent({
  name: 'l-image',
  props: {
    ...image_component_default_props
  },
  setup (props) {
    // 重用并且简化
    // 抽离并且获得 styleProps
    const { style_props, handleClick} = componentCommonFunc(props, image_component_css_props_name_arr)
    return {
       style_props,
       handleClick
    }
  }
})
</script>

<style scoped>
.l-image-component {
  max-width: 100%;
  position: relative !important;
}
</style>
