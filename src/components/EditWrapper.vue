<template>
  <!-- :class="{ active: active }" 这个表达式，一开始是 :class="{ active: false }"  的-->
  <!-- 父节点将active设置为true并传进来之后变为，:class="{ active: true }" -->
  <!-- 此时div的class属性里会多一个active值 变成这样 <div class="edit-wrapper active"></div> -->
  <!-- 然后div的border 就会变为蓝色，呈选中的状态 -->
  <div class="edit-wrapper" @click="onItemClick(id)" :class="{ active: active }">
    <slot></slot>
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
  emits: ['setActive'],
  setup(props, context) {
    const onItemClick = (id: string) => {
      context.emit('setActive', id)
    }
    return {
      onItemClick
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