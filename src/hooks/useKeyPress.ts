import { onMounted, onUnmounted } from 'vue'

const useKeyPress = (key: string, cb: () => any) => {
  const trigger = (event: KeyboardEvent) => {
    if (event.key === key) {
      cb()
    }
  }

  // onMounted阶段添加事件的监听，监听到keydown 就触发trigger
  onMounted(() => {
    document.addEventListener('keydown', trigger)
  })
  // onUnmounted阶段删除监听
  onUnmounted(() => {
    document.removeEventListener('keydown', trigger)
  })
}

export default useKeyPress