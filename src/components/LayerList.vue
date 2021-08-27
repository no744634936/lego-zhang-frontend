<template>
    <ul
        :list="list"
        class="ant-list-items ant-list-bordered"
    >
        <li
        class="ant-list-item"
        v-for="item in list "
        :key="item.id"
        >
        <!-- 根据不同属性，展示不同的图标  ant design vue 里面的-->
        <a-tooltip :title="item.isHidden ? '显示': '隐藏'">
            <a-button shape="circle">
            <template v-slot:icon v-if="item.isHidden"><EyeOutlined /> </template>
            <template v-slot:icon v-else><EyeInvisibleOutlined /> </template>
            </a-button>
        </a-tooltip>
        <a-tooltip :title="item.isLocked ? '解锁' : '锁定'">
            <a-button shape="circle">
            <template v-slot:icon v-if="item.isLocked"><UnlockOutlined /> </template>
            <template v-slot:icon v-else><LockOutlined /> </template>
            </a-button>
        </a-tooltip>
        <span>{{item.layerName}}</span>
        </li>
    </ul>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons-vue'
import { ComponentDataProps } from '../store/editor'
export default defineComponent({ 
  props: {
    list: {
      type: Array as PropType<ComponentDataProps[]>,
      required: true
    },
    selectedId: {
      type: String,
      required: true
    }
  },  
  emits: ['select', 'change', 'drop'],
  components: {
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
  },
  setup (props, context) {

    return {

    }
  }
})
</script>

<style scoped>
.ant-list-item {
  padding: 10px 15px;
  transition: all 0.5s ease-out;
  cursor: pointer;
  justify-content: normal;
  border: 1px solid #fff;
  border-bottom-color: #f0f0f0;
}
.ant-list-item.active {
  border: 1px solid #1890ff;
}
.ant-list-item.ghost {
  opacity: .5;
}

.ant-list-item:hover {
  background: #e6f7ff;
}
.ant-list-item > * {
  margin-right: 10px;
}
.ant-list-item button {
  font-size: 12px;
}

.ant-list-item .handle {
  cursor: move;
  margin-left: auto;
}
.ant-list-item .edit-area {
  width: 100%;
}

</style>