<template>
    <draggable
        ghost-class="ghost"
        :list="list"
        class="ant-list-items ant-list-bordered"
        handle=".handle"
        item-key="id"
    >
        <template #item="{ element }">
            <li
            class="ant-list-item"
            :key="element.id"
            :class="{active: element.id===selectedId}"
            @click="handleClick(element.id)"
            >
                <!-- 根据不同属性，展示不同的图标  ant design vue 里面的-->
                <a-tooltip :title="element.isHidden ? '显示': '隐藏'">
                    <a-button shape="circle">
                        <template v-slot:icon v-if="element.isHidden"><EyeOutlined /> </template>
                        <template v-slot:icon v-else><EyeInvisibleOutlined /> </template>
                    </a-button>
                </a-tooltip>
                <a-tooltip :title=" (element && element.isLocked )? '解锁' : '锁定'">
                    <a-button shape="circle" @click="handleChange(element.id,'isLocked',!element.isLocked)">
                        <template v-slot:icon v-if="element.isLocked"> <LockOutlined /></template>
                        <template v-slot:icon v-else><UnlockOutlined /> </template>
                    </a-button>
                </a-tooltip>
                <!-- <span>{{element.layerName}}</span> -->
                <InlineEdit class="edit-area" :value="element.layerName" @change="(valueFromSon) => {handleChange(element.id, 'layerName', valueFromSon)}"></InlineEdit>
             <a-tooltip title="拖动排序">
                <a-button shape="circle" class="handle">
                    <template v-slot:icon><DragOutlined /> </template>
                </a-button>
            </a-tooltip>
            </li>
        </template>
    </draggable>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined, UnlockOutlined,DragOutlined } from '@ant-design/icons-vue'
import { ComponentDataProps } from '../store/editor'
import InlineEdit from './InlineEdit.vue'
import draggable from "vuedraggable"

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
  emits: ['select', 'change', 'drop','lock'],
  components: {
    EyeOutlined,
    EyeInvisibleOutlined,
    LockOutlined,
    UnlockOutlined,
    DragOutlined,
    InlineEdit,
    draggable,
  },
  setup (props, context) {


    const handleChange=(id: string,key: string,value: boolean)=>{
        const data={
            id,
            key,
            value,
            changeRoot:true,
        }
        context.emit("lock",data)
    }

    const handleClick=(id: string)=>{
        context.emit("select",id)
    }

    return {
        handleChange,
        handleClick
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