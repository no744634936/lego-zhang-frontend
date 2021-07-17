<template>
    <div class='file-upload'>
        <!-- input元素是被隐藏的，点击button然后触发input的click事件，就可以传文件了 -->
        <button @click="triggerUpload">
            <span v-if="fileStatus==='loading'">正在上传</span>
            <span v-else-if="fileStatus==='success'">上传成功</span>
            <span v-else-if="fileStatus==='error'">上传失败</span>
            <span v-else>点击上传</span>
        </button>
        <input ref="fileInput" type="file" :style="{display: 'none'}" @change="handleFileUpload">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
type UploadSatuts = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  name: 'Hello',
  props: {
    api_url: {
        type: String,
        required: true,
    }
  },
  setup(props){
    // 要拿到input这个html元素，需要使用ref
    // <null | HTMLInputElement>(null)的意思是 类型为null 或者 HTMLInputElement，初始值为null
    const fileInput = ref<null | HTMLInputElement>(null)

    const fileStatus = ref<UploadSatuts>('ready')

    //点击 点击上传 按钮触发triggerUpload方法，然后触发input元素里的click事件
    const triggerUpload=()=>{
        if(fileInput.value){
            fileInput.value.click()
        }
    }

    //
    const handleFileUpload=async(e: Event)=>{
        fileStatus.value='loading'

        const target= e.target as HTMLInputElement
        const files= target.files
        let result: any

        if(files){
            const uploadFile=files[0]
            const formData= new FormData()
            formData.append(uploadFile.name,uploadFile)
            result = await axios.post(props.api_url,formData,{
                headers:{
                    'content-Type':'multipart/form-data',
                }
            })
            if(result.errno == 0){
                console.log('.....');
                fileStatus.value='success'
                
            }else{
                console.log('上传图片出错');
                fileStatus.value='error'
            }
        }
        console.log('testtest',result);
    }
    return{
        fileInput,
        triggerUpload,
        fileStatus,
        handleFileUpload,
    }
  }
})
</script>