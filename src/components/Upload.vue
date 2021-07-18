<template>
    <div class='file-upload'>
        <!-- input元素是被隐藏的，点击button然后触发input的click事件，就可以传文件了 -->
        <button @click="triggerUpload" :disabled="isUploading">
            <span v-if="isUploading">正在上传</span>
            <span v-else>点击上传</span>
        </button>
        <input ref="fileInput" type="file" :style="{display: 'none'}" @change="handleFileUpload">
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import axios from 'axios'
import { uuid  } from 'uuidv4'
type UploadSatuts = 'ready' | 'loading' | 'success' | 'error'

export interface UploadFile{
    uid: string;
    size: number;
    name: string;
    status: UploadSatuts;
    raw: File;
}

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

    const uploadedFiles= ref<UploadFile[]>([])

    // 只要有数组里有一项是loading，那么整个button的状态就是loading，自然使用computed
    const isUploading= computed(()=>{
        return uploadedFiles.value.some(file=>file.status==='loading')
    })

    //点击 点击上传 按钮触发triggerUpload方法，然后触发input元素里的click事件
    const triggerUpload=()=>{
        if(fileInput.value){
            fileInput.value.click()
        }
    }

    //
    const handleFileUpload=async(e: Event)=>{

        const target= e.target as HTMLInputElement
        const files= target.files
        let result: any

        if(files){
            const uploadFile=files[0]
            const formData= new FormData()
            formData.append(uploadFile.name,uploadFile)

            const fileObj= reactive<UploadFile>({
                uid:uuid(),
                size:uploadFile.size,
                name: uploadFile.name,
                status: 'loading',
                raw: uploadFile,  // 整个文件内容
            })

            uploadedFiles.value.push(fileObj)

            fileStatus.value='loading'
            result = await axios.post('https://sm.ms/api/v2/upload',formData,{
                headers:{
                    'content-Type':'multipart/form-data',
                    'Authorization': 'PQomjPYiPPVbIQJEdhq2HptD7K2DrWGE'
                }
            })
            if(result.errno == 0){
                console.log('上传图片成功');
                fileObj.status='success'
            }else{
                console.log('上传图片出错');
                fileObj.status='error'
            }
        }
        console.log('testtest',result);
    }
    return{
        fileInput,
        triggerUpload,
        fileStatus,
        handleFileUpload,
        isUploading,
        uploadedFiles
        
    }
  }
})
</script>