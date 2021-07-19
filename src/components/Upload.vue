<template>
    <div class='file-upload'>
        <!-- input元素是被隐藏的，点击button然后触发input的click事件，就可以传文件了 -->
        <div class="upload-area" @click="triggerUpload" >
            <slot  v-if="isUploading" name="loading">
                <button disabled>正在上传</button>
            </slot>
            <slot name="uploaded" v-else-if="lastFileData && lastFileData.loaded" :uploadedData="lastFileData.response">
                <button>点击上传</button>
            </slot>
            <slot  v-else name="default">
                <button>点击上传</button>
            </slot>
        </div>
        <input ref="fileInput" type="file" :style="{display: 'none'}" @change="handleFileUpload">
        <ul>
            <li :class="`upload-file upload-${file.status}`" v-for="file in uploadedFiles" :key='file.uid'>
                <span v-if="file.status === 'loading'" class="file-icon"><LoadingOutlined/></span>
                <span v-else class="file-icon"><FileOutlined/></span>
                <span class="filename">{{file.name}}</span>
                <span class="delete-icon" @click="removeFile(file.uid)"><DeleteOutlined/></span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import axios from 'axios'
import { uuid  } from 'uuidv4'
import { last } from 'lodash-es'
import { DeleteOutlined, LoadingOutlined, FileOutlined } from '@ant-design/icons-vue'

type UploadSatuts = 'ready' | 'loading' | 'success' | 'error'

export interface UploadFile{
    uid: string;
    size: number;
    name: string;
    status: UploadSatuts;
    raw: File;
    response?: any;
}

export default defineComponent({
  name: 'Hello',
  props: {
    api_url: {
        type: String,
        required: true,
    }
  },
  components: {
    DeleteOutlined,
    LoadingOutlined,
    FileOutlined
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
            result = await axios.post( props.api_url,formData,{
                headers:{
                    'content-Type':'multipart/form-data',
                    'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEzNjM4MTM3MDA0IiwicGhvbmVOdW1iZXIiOiIxMzYzODEzNzAwNCIsIm5pY2tOYW1lIjoia2tra2siLCJpYXQiOjE2MjY3MDA5NjYsImV4cCI6MTYyNjc4NzM2Nn0.rPzDg2PADSqaRN7zz37bFJtx1qOHQjmiAw-4DkfjxAY',                
                }
            })

            if(result.data.errno == 0){
                console.log('上传图片成功');
                fileObj.status='success'
                fileObj.response=result.data.data

            }else{
                console.log('上传图片出错');
                fileObj.status='error'
            }

            //连续传相同的图片的时候没有反应，传不了
            //change事件被触发的前提条件是input的value值被改变，传了一张图片之后，又传同一张图片，change事件没有被触发，
            //图片上传完毕之后将input的值清空，解决不能传同名图片的错误。
            if(fileInput.value){ // dom 节点有可能是null，所以判断一下
                fileInput.value.value=''
            }
            
        }
        console.log('testtest',result);
    }

    const lastFileData=computed(()=>{
        const lastFile=last(uploadedFiles.value)
        if(lastFile){
            return {
                loaded: lastFile.status==='success',
                data: lastFile.response
            }
        }else{
            return false
        }
        
    })

    const removeFile=(id: string)=>{
        uploadedFiles.value=uploadedFiles.value.filter(file=>file.uid!==id)
    }
    return{
        fileInput,
        triggerUpload,
        fileStatus,
        handleFileUpload,
        isUploading,
        uploadedFiles,
        removeFile,
        lastFileData,
    }
  }
})
</script>

<style lang="scss">
.upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;  
}
.upload-list li {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;
  &:first-child {
    margin-top: 10px;
  }
  .upload-list-thumbnail {
    vertical-align: middle;
    display: inline-block;
    width: 70px;
    height: 70px;
    position: relative;
    z-index: 1;
    background-color: #fff;
    object-fit: cover;
  }
  .file-icon {
    svg {
      margin-right: 5px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
  .filename {
    margin-left: 5px;
    margin-right: 40px;
  }
  &.upload-error {
    color: #f5222d;
    svg {
      color: #f5222d;
    }
  }
  .file-status {
    display: block;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
  }
  .delete-icon {
    display: none;
    position: absolute;
    right: 7px;
    top: 0;
    line-height: inherit;
    cursor: pointer;
  }
  &:hover {
    background-color: #efefef;
    .file-status {
      display: none;
    }
    .delete-icon {
      display: block;
    }
  }
}
</style>