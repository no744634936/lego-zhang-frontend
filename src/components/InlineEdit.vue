<template>

<!-- 
@click.stop  加个stop的作用
子要素でイベントが発生した時に、親のイベントを発生させないこと。デフォルトでは、子要素でイベントが発生した時に、
親要素にもイベントがあると、親のイベントも発生する。
.stopをつければ、クリックした対象のみのイベントを発火する。
（親要素のイベントを発火しない）
逆に、stopを付けないと親のイベントも合わせて実行してしまうので注意が必要。
親の上さらに要素がある場合はそのイベントも発火する。
 -->

  <div class="inline-edit" @click.stop="handleClick" ref="wrapper">
    <input
      v-model="innerValue"
      v-if="isEditing"
      placeholder="文本不能为空"
      ref="inputRef"
      class="ant-input"
      :class="{ 'input-error': !validateCheck}"
    />
    <slot v-else :text="innerValue"><span>{{innerValue}}</span></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,watch,nextTick,computed} from 'vue'
import useKeyPress from '../hooks/useKeyPress'
import useClickOutside from '../hooks/useClickOutside'

export default defineComponent({
  name: 'inline-edit',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  emits: ['change'],
  setup (props, context) {
    
    const innerValue = ref(props.value)
    // innerValue是从父组件layList.vue 传过来的，当props更新的时候，也要将对应的innerValue做个更新
    watch(() => props.value, (newValue) => {
      innerValue.value = newValue
    })

    const inputRef = ref<null | HTMLInputElement>(null)
    const isEditing = ref(false)
    let cachedOldValue = ''

    // click out side 有关变量
    const wrapper = ref<null | HTMLElement>(null)
    const isOutside = useClickOutside(wrapper)

    const validateCheck = computed(() => innerValue.value.trim() !== '')

    const handleClick = () => {
      isEditing.value = true
    }

    watch(isEditing, async (isEditing) => {
      if (isEditing) {
        // 给cachedOldValue 赋值，为了图层得值如果没有被修改，可以再恢复回原来得值
        cachedOldValue = innerValue.value
        await nextTick()

        if (inputRef.value) {
          inputRef.value.focus()
        }
      }
    })

     watch(isOutside, (newValue) => {
    if (!validateCheck.value) {
        return
      }
      if (newValue && isEditing.value) {
        isEditing.value = false
        context.emit('change', innerValue.value)    
      }
      isOutside.value = false
    })

    useKeyPress('Enter', () => {
      if (isEditing.value) {
          // 按下enter建，input栏消失，把修改后得值通过change事件出去。
        isEditing.value = false
        context.emit('change', innerValue.value)
      }
    })
    useKeyPress('Escape', () => {
      if (isEditing.value) {
        // 按下Escape建，input栏消失
        isEditing.value = false
        // 万一值被更改了，就把值恢复过来
         innerValue.value = cachedOldValue
      }
    })
    return {
      handleClick,
      innerValue,
      isEditing,
      wrapper,
      inputRef,
    }
  }
})
</script>

<style>
.inline-edit {
  cursor: pointer;
}
.ant-input.input-error {
  border: 1px solid #f5222d;
}
.ant-input.input-error:focus {
  border-color:  #f5222d;
}
.ant-input.input-error::placeholder {
  color: #f5222d;
}
</style>