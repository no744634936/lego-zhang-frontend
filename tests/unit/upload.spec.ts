import {shallowMount,VueWrapper} from '@vue/test-utils'
import Upload from '@/components/Upload.vue'

import flushPromises from 'flush-promises'
import axios from 'axios'
jest.mock('axios')  // 拦截axios
const mockAxios = axios as jest.Mocked<typeof axios> // 这样写之后就可以在mockAxios后面点出各种方法了


let wrapper: VueWrapper<any>
//  new File是由js 提供的创建文件的对象
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
const testFile2 = new File(['xyz'], 'viking.png', { type: 'image/png' })

describe('Upload.vue component',()=>{
    beforeAll(()=>{
        wrapper=shallowMount(Upload,{
            props:{
                api_url: 'test.url'
            }
        })
    })

    // it('basic html layout before uploading',()=>{
    //     expect(wrapper.find('button').exists()).toBeTruthy()
    //     expect(wrapper.get('button span').text()).toBe('点击上传')
    //     expect(wrapper.get('input').isVisible()).toBeFalsy()

    // })

    it('upload process should work fine',async ()=>{
        
        mockAxios.post.mockResolvedValueOnce({ errno:0})
        // 按流程是在界面上点击以后手动选择文件，然后触发input 的 change 事件
        // 单元测试没有办法模拟手动点击选择的这个过程，
        // 这个过程的目的就是触发change事件，那么我直接触发input的 change事件就可以了

        // 改变 e.target.files 的值，这个文件选择框的值
        // 获取input的dom节点
        const fileInput = wrapper.get('input').element as HTMLInputElement

        // 修改dom节点的值
        // fileInput之后的files是一个fileList类型的，直接赋值为[testFile]会报错
        // fileInput.files=[testFile]  这样写不行

        // 这样写测试的时候通不过
        // 报Failed to set the 'files' property on 'HTMLInputElement': The provided value is not of type 'FileList'
        // const files=[testFile] as any
        // fileInput.files=files

        // 那就从根上给fileInput 对象修改一下现有属性files
        const files=[testFile] as any

        // 也就是直接将 files 赋值给 fileInput.files
        Object.defineProperty(fileInput, 'files', {
            value: files,
            writable: false
        })
        // 触发change 事件
        await wrapper.get('input').trigger('change')
        expect(mockAxios.post).toHaveBeenCalledTimes(1)
        expect(wrapper.get('button').text()).toBe('正在上传')
    })  
})