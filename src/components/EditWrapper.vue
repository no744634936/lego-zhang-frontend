<template>
<div class="edit-row">
  <div 
    class="edit-wrapper" 
    :style="styles" 
    @click="onItemClick(id)" 
    :class="{ active: active }"
    ref="editWrapper"
    @mousedown="startMove"
    >
    <slot></slot>
  </div>
  <span  @click="deleteItem(id)">x</span>
</div>

  
</template>

<script lang="ts">
import { defineComponent,computed,ref} from 'vue'
import { pick } from 'lodash-es'
export default defineComponent({
  // 从父组件传过来的props
  props: {
    id: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    },
    props:{
        type:Object,
    }
  },
  emits: ['setActive','deleteItem'],
  setup(props, context) {
    const editWrapper = ref<null | HTMLElement>(null)
    const onItemClick = (id: string) => {
      context.emit('setActive', id)
    }

    const deleteItem =(id: string)=>{
        context.emit('deleteItem',id)
    }

    //偏移量
    const gap = {
      x: 0,
      y: 0
    }
    const styles = computed(() => pick(props.props, ['position', 'top', 'left', 'width', 'height']))
    
    const startMove = (e: MouseEvent) => {
        const currentElement = editWrapper.value
        if (currentElement) {
            const { left, top } = currentElement.getBoundingClientRect() 
            gap.x = e.clientX - left
            gap.y = e.clientY - top
            console.log(gap)
        }
    }
    
    return {
      onItemClick,
      deleteItem,
      styles,
      editWrapper,
      startMove,
    }
  }
})
</script>

<style>
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
  box-sizing: content-box !important;
}
.edit-wrapper > * {
  position: static !important;
  width: 100% !important;
  height: 100% !important;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.hidden {
  display: none;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
.edit-wrapper .resizers {
  display: none;
}
.edit-wrapper.active .resizers {
  display: block;
}
.edit-wrapper.active .resizers .resizer {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #1890ff;
  position: absolute;
}
.edit-wrapper .resizers .resizer.top-left {
  left: -5px;
  top: -5px;
  cursor: nwse-resize;
}
.edit-wrapper .resizers .resizer.top-right {
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-left {
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
}
.edit-wrapper .resizers .resizer.bottom-right {
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
}
</style>