<template>
<div class="edit-row">
  <div class="edit-wrapper" @click="onItemClick(id)" :class="{ active: active }">
    <slot></slot>
  </div>
  <span  @click="deleteItem(id)">x</span>
</div>

  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
    }
  },
  emits: ['setActive','deleteItem'],
  setup(props, context) {
    const onItemClick = (id: string) => {
      context.emit('setActive', id)
    }

    const deleteItem =(id: string)=>{
        context.emit('deleteItem',id)
    }
    return {
      onItemClick,
      deleteItem,
    }
  }
})
</script>

<style>
.edit-row{
  display: flex;
  flex-direction: row;
}
.edit-wrapper {
  padding: 0px;
  cursor: pointer;
  border: 1px solid transparent;
  user-select: none;
}
.edit-wrapper:hover {
  border: 1px dashed #ccc;
}
.edit-wrapper.active {
  border: 1px solid #1890ff;
  user-select: none;
  z-index: 1500;
}
</style>