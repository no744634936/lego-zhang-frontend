<template>
    <!-- 这个a-modal是ant-design-vue里的组件 -->
    <a-modal
      title="裁剪图片"
      v-model:visible="showModal"
      @ok="handleOk"
      @cancel="showModal = false"
      okText="确认"
      cancelText="取消"
    >
      <!-- 这个 div 是 cropper.js库里的固定用法 -->
      <div class="image-cropper">
        <!-- 下面用ref="cropperImg"来获取这个img dom节点 -->
        <img :src="ImageUrl" id="processed-image" ref="cropperImg"/>
      </div>
    </a-modal>

  <div class="image-processer">
    <div class="image-preview" :style="{ backgroundImage: backgroundUrl }" :class="{ 'extraHeight': showDelete }"></div>
    <div class="image-process">
      <styled-uploader  @success="handleFileUploaded"></styled-uploader>
      <a-button  @click="showModal = true">
        <template v-slot:icon><ScissorOutlined /></template>裁剪图片
      </a-button>
      <a-button v-if="showDelete" type="danger" @click="handleDelete">
        <template v-slot:icon><DeleteOutlined /></template>删除图片
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,  computed, ref, watch, nextTick} from 'vue'
import { message } from 'ant-design-vue'
import { DeleteOutlined} from '@ant-design/icons-vue'
import StyledUploader from './StyledUploader.vue'
import { UploadResp } from '../extraType'
import Cropper from 'cropperjs';

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    },
    ratio: {
      type: Number
    },
    showDelete: {
      type: Boolean,
      default: false
    }
  },
  components: {
    DeleteOutlined,
    StyledUploader,
  },
  emits: ['change', 'uploaded'],
  setup (props, context) {
    const backgroundUrl = computed(() => `url(${props.value})`)
    const ImageUrl=  computed(() => props.value)
    
    
    const showModal=ref(false)
    const handleFileUploaded = (data: { resp: UploadResp; file: File }) => {
      const { resp } = data
      message.success('上传成功')
      context.emit('change', resp.data.url)
      context.emit('uploaded', data)
    }

    const handleDelete = () => {
      context.emit('change', '')
    }

    // 获取 上面ref="cropperImg" 的dom节点， 相当于getElementById()
    // 这里必须写HTMLImageElement 否者cropper会报错，也可以把ref的类型去掉
    const cropperImg=ref<null | HTMLImageElement>(null)

    // cropper导入了，showModal为true的时候初始化它比较合理,用watch来监视showModal值的变化
    // 需要注意的是，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化之后，不会立即更新dom，
    // 与showModal相关的 a-modal 会被放入一个queue中执行，然后等待呼叫渲染进已存在的dom中去，
    // console.log(cropperImg.value) 拿不到节点，显示为null，因为这时a-modal还没被渲染完成
    // 所以这个callback函数必须是async ，然后用 await nextTick()等待DOM 更新完成

    // let cropper!: Cropper 这里加个感叹号的意思，
    // 告诉编译器cropper不可能为空
    // this is the non-null assertion operator. 
    // It is a way to tell the compiler "this expression cannot be null or undefined here, so don't complain about the possibility of it being null or undefined."
    // 不加感叹号，cropper.destroy()就老是报错 Variable 'cropper' is used before being assigned
    let cropper!: Cropper
    watch(showModal,async (newValue)=>{
        if(newValue===true){

            // 等待DOM 更新完成,再执行后面的代码
            await nextTick()
            console.log("backgroundUrl",backgroundUrl);

            // 拿到dom节点
            // console.log(cropperImg.value);
            const imgElem = cropperImg.value

            if(imgElem){
                // 这段代码是cropper提供的
                cropper=new Cropper(imgElem, {
                    aspectRatio: 16 / 9,
                    crop(event) {
                        console.log(event.detail.x);
                        console.log(event.detail.y);
                        console.log(event.detail.width);
                        console.log(event.detail.height);
                        console.log(event.detail.rotate);
                        console.log(event.detail.scaleX);
                        console.log(event.detail.scaleY);
                    },
                });
            }
        }else{
            // 实例化一个对象，在不用的时候要将之销毁
            // 从dom中把跟cropper相关的节点删除
            if(cropper){
                console.log("distroyed");
                
                cropper.destroy()
            }
        }
    })
    return {
      handleFileUploaded,
      handleDelete,
      backgroundUrl,
      showModal,
      cropperImg,
      ImageUrl
    }
  }
})
</script>

<style>
  .image-processer {
    display: flex;
    justify-content: space-between;
  }
  .image-preview {
    width: 150px;
    height: 84px;
    border: 1px dashed #e6ebed;
    background: no-repeat 50%/contain;
  }
  .image-preview.extraHeight {
    height: 110px;
  }
  .image-process {
    padding: 5px 0;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .image-cropper img {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }



</style>
