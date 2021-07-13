import { shallowMount,mount,VueWrapper} from '@vue/test-utils'
import UserProfile from '@/components/userProfile.vue'
import { message } from 'ant-design-vue'
import { useStore } from 'vuex'
import store from '@/store/index'

let wrapper: VueWrapper<any>

jest.mock('ant-design-vue', () => {
    return{
        message: {
          success: jest.fn()
        }
      }
})


// 使用真的store来测试,
// 1，引入store 像这样import store from '@/store/index'
// 2，将这个 provide:{ store } 放进wrapper的global里面


// 使用半真半假的模式
const mockedRoutes: string[] = []
jest.mock('vue-router', () => ({
  useRouter: () => ({
    push: (url: string) => mockedRoutes.push(url)
  })
}))

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
                provide:{
                    store
                }
            }
        })
    })
    it('should show login button when login is false',async ()=>{

        expect(wrapper.get('div').text()).toBe('登录')
        // 测试行为,行为一般都伴随着页面的更新，所以要用async， await
        await wrapper.get('div').trigger('click')
        expect(message.success).toHaveBeenCalled()
        
    })

    it('should show userName  when login is true',async()=>{
        // 改变wrapper的props,界面要更新所以是async await
        await wrapper.setProps({
            user:{isLogin: true,userName:'wang'}
        })
        // console.log('UserProfile',wrapper.html());
        expect(wrapper.get('.user-profile-component').html()).toContain('wang')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()

        // 真的使用store.commit 方法的写法
        expect(store.state.user.userName).toBe('zhang')
    })


    it('should call logout and show message, call router.push after timeout', async () => {
        await wrapper.get('.user-profile-dropdown div').trigger('click')
        expect(store.state.user.isLogin).toBeFalsy()
        expect(message.success).toHaveBeenCalledTimes(1)
        jest.runAllTimers()
        expect(mockedRoutes).toEqual(['/'])
    })


    afterEach(() => {
        // 重置 message.success
        // message方法已经被模拟了
        (message as jest.Mocked<typeof message>).success.mockReset()
      })
})



