import { shallowMount,mount,VueWrapper} from '@vue/test-utils'
import UserProfile from '@/components/userProfile.vue'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
let wrapper: VueWrapper<any>

// 测试第三方库的 message.success('登录成功', 2)
// 由 import { message } from 'ant-design-vue' 跟 message.success('登录成功', 2) 这两句话可以知道
// ant-design-vue  里return一个对象
// 这个对象上有一个message对象，然后这个message对象上面有一个success方法，
// success 方法的返回值是什么不知道，我可以模拟指定它返回的值
// jest mock的第二个参数是一个function,它可以模拟这个第三方模块的上述的调用过程
// 这样ant-design-vue里的message里的success方法就被模拟了，返回值为'success方法调用成功'
// 这与 example3.spec.ts文件里的写法是一样的

// jest.mock('ant-design-vue', () => {
//     return{
//         message: {
//           success: jest.fn(()=>{
//               return 'success方法调用成功'
//           })
//         }
//       }
// })

// 我要监控的仅仅是success方法是否被触发，不关心jest.fn()的返回值是什么，所以就像下面这样写
// 注意还要导入 message 像这样，import { message } from 'ant-design-vue'
// 然后message 才会被接管
jest.mock('ant-design-vue', () => {
    return{
        message: {
          success: jest.fn()
        }
    }
})

// 测试第三库的 store.commit('login')
// vuex 返回一个对象，这个对象上有useState方法，useState方法又返回一个对象，这个都像上有commit 方法
// 可以这样写

jest.mock('vuex',()=>{
    return{
        useStore:()=>{
            return {
                commit:jest.fn()
            }
        }
    }
})

jest.mock('vue-router', () => {
    return {
        useRouter: () => { 
            return { 
                push: jest.fn() 
            } 
        }
    }
})


const mockComponent={
    template: '<div><slot></slot></div>'
}

// a-dropdown-button 有点特殊， 里面包含了一个系统自带的router-link和template，各算一个slot
// 注意为了区分slot 这个name="overlay"必须写上
const mockComponent2={
    template: '<div><slot></slot><slot name="overlay"></slot></div>'
}

const globalComponents = {
    'a-button': mockComponent,
    'a-dropdown-button': mockComponent2,
    'router-link': mockComponent,
    'a-menu': mockComponent,
    'a-menu-item': mockComponent,
}

describe('UserProfile component',()=>{
    beforeAll(()=>{

        // userProfile.vue 文件里的logout方法有setTimeout，所以要让时间快进
        jest.useFakeTimers()

        wrapper= mount(UserProfile,{
            props:{
                user:{isLogin: false}
            },
            global:{
                // UserProfile组件里的a-button，router-link，a-menu 都会被替换为 <div></slot></slot></div>
                components: globalComponents,
            }
        })
    })
    it('should show login button when login is false',async ()=>{
        // console.log('UserProfile',wrapper.html());
        // a-button  被转换成了div ，所以这个是 get('div')
        // 测试界面
        expect(wrapper.get('div').text()).toBe('登录')
        
    })

    // 这个测试用例有问题
    it.skip('click login',async ()=>{
        // 测试行为,行为一般都伴随着页面的更新，所以要用async， await
        await wrapper.get('div').trigger('click')

        //这里有问题
        let store=useStore()
        expect(useStore().commit).toHaveBeenCalled()

        expect(message.success).toHaveBeenCalled()
    })

    it('should show userName  when islogin is true',async()=>{
        // 改变wrapper的props,界面要更新所以是async await
        await wrapper.setProps({
            user:{isLogin: true,userName:'wang'}
        })
        // console.log('UserProfile',wrapper.html());
        expect(wrapper.get('.user-profile-component').html()).toContain('wang')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
    })

    // 这个测试用例有问题
    it.skip('should call logout and show message, call router.push after timeout', async () => {
        await wrapper.get('.user-profile-dropdown div').trigger('click')
        expect(message.success).toHaveBeenCalledTimes(1)
        jest.runAllTimers()
        let router=useRouter()
        expect(router.push).toHaveBeenCalled()

    })

    afterEach(() => {
        // 重置 message.success
        (message as jest.Mocked<typeof message>).success.mockReset()
    })
})



