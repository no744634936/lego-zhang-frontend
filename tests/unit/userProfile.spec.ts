import { shallowMount,mount,VueWrapper} from '@vue/test-utils'
import UserProfile from '@/components/userProfile.vue'
import { message } from 'ant-design-vue'
let wrapper: VueWrapper<any>

// 将组件的所有第三方模块都mock，这样即使没有使用vuex，vue-router也不会影响到ant-design-vue的测试
// 否则会报 injection "store" not found. 
// "Symbol([vue-router]: router)" not found 
// 之类的warn
jest.mock('ant-design-vue')
jest.mock('vuex')
jest.mock('vue-router')

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
        wrapper= mount(UserProfile,{
            props:{
                user:{isLogin: false}
            },
            global:{
                // UserProfile组件里的a-button，router-link，a-menu 都会被替换为 <div></slot></slot></div>
                components: globalComponents
            }
        })
    })
    it('should show login button when login is false',()=>{
        // console.log('UserProfile',wrapper.html());
        expect(wrapper.get('div').text()).toBe('登录')
        
    })
    it('should show userName  when login is true',async()=>{
        // 改变wrapper的props,界面要更新所以是async await
        await wrapper.setProps({
            user:{isLogin: true,userName:'zhang haifeng'}
        })
        console.log('UserProfile',wrapper.html());
        expect(wrapper.get('.user-profile-component').html()).toContain('zhang haifeng')
        expect(wrapper.find('.user-profile-dropdown').exists()).toBeTruthy()
    })
})



