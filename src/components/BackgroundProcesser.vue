<template>
  <div class="background-processer">
    <!-- 有value使用StyledUploader组件来展示图片，及其图片周边功能，没有value就使用ImageProcesser组件，上传图片 -->
    <StyledUploader 
      v-if="!value"
      @success="onImageUploaded"
    >
    </StyledUploader>
    <ImageProcesser
      v-else
      :value="value"
      @change="handleUploadUrl"
      :showDelete="true"
    >
    </ImageProcesser>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { message } from 'ant-design-vue'
import ImageProcesser from './ImageProcesser.vue'
import StyledUploader from './StyledUploader.vue'
import { UploadResp } from '../extraType'
export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    }
  },
  components: {
    ImageProcesser,
    StyledUploader
  },
  emits: ['change'],
  setup (props, context) {
    const onImageUploaded = (data: {resp: UploadResp; file: File}) => {
      const { resp } = data
      message.success('上传成功')
      context.emit('change', resp.data.url)
    }
    const handleUploadUrl = (url: string) => {

      console.log("kkkk")
      console.log(url==="")
    
      context.emit('change', url)
    }
    return {
      onImageUploaded,
      handleUploadUrl
    }
  }
})
</script>

<style>

</style>
