import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'

// 有关axios的测试
import flushPromises from 'flush-promises'
import axios from 'axios'
jest.mock('axios')  // 拦截axios
const mockAxios = axios as jest.Mocked<typeof axios> // 这样写之后就可以在mockAxios后面点出各种方法了


describe('HelloWorld.vue', () => {

  // 对html渲染及props传递的测试
  it('renders props.msg when passed', () => {
    const msg = 'new message'

    // 渲染组件，使用shallowMount将逐渐渲染成html文件格式
    // 将msg 传递给HelloWorld组件的props，
    // HelloWorld组件里又将msg 传给 Hello.vue 组件
    // shallowMount 方法只将HelloWorld渲染成html
    // 如果使用mount 方法，那么HelloWorld.vue 跟 Hello.vue 子组件都会被渲染成html
    // 使用shallowMount 更快，更适合单元测试
    const wrapper = shallowMount(HelloWorld, {props: { msg }})

    // 用这个方法可以查看渲染结果
    console.log(wrapper.html()); 

    // 用get方法来确当元素是否功的显示
    // h1 标签里的文本是否能取到
    console.log(wrapper.get('h1').text()); 
    
    // expect(wrapper.text()).toMatch(msg)

    // 寻找是否包含子组件
    console.log(wrapper.getComponent(Hello));

    // 查看传递的props
    console.log(wrapper.getComponent(Hello).props());
    
    expect(wrapper.get('h1').text()).toBe(msg)
    expect(wrapper.findComponent(Hello).exists()).toBeTruthy()
    
  })
  
  // 测试触发事件
  //所有引起dom更新的操作都要在前面使用await
  it("should update the count when click the button",async()=>{
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {props: { msg }})
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('2') // 注意是字符串
  })


  it('should add todo when fill the input and click the add button', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {props: { msg }})

    const todoContent = 'buy milk'

    // 使用setValue来给input 赋值，用element.value来获取input的value
    await wrapper.get('input').setValue(todoContent)
    expect(wrapper.get('input').element.value).toBe(todoContent)


    // .addTodo 是元素的class 名
    await wrapper.get('.addTodo').trigger('click')
    // 所有的li 长度为1
    expect(wrapper.findAll('li')).toHaveLength(1)
    // 第一个li 的text内容为'buy milk'
    expect(wrapper.get('li').text()).toBe(todoContent)

    // 测试发送事件
    console.log("发送事件的内容",wrapper.emitted())    //{send: [ [ 'buy milk' ] ]}
    expect(wrapper.emitted()).toHaveProperty('send')
    const events = wrapper.emitted('send')
    if(events){ // 如果不写if(events) 会报 events[0] is possibly 'undefined'. 错误
        expect(events[0]).toEqual([todoContent])   //判断对象(object,array)的内容是否相等要用toEqual不能用toBe，toBe会检查引用是否相等
    }
  })

  // 异步请求的测试
  // 可以加个only关键词，it.only('should load user message when click the load button', async () => {.......}) 这种带only的写法是告诉jest 只跑这一个测试，其他测试都不跑
  it('should load user message when click the load button', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {props: { msg }})
    mockAxios.get.mockResolvedValueOnce({ data: { username: 'viking'}}) // 让axios.get 返回一个resolved 
    // 第一步点击事件
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalled()
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    // 获取数据是一个promise ，等待promise获取到数据并结束是要花时间的
    await flushPromises()   // 等待promise resolved，并等待页面更新完毕，
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.get('.userName').text()).toBe('viking')
  })

  it('should load error when return promise reject', async () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {props: { msg }})

    mockAxios.get.mockRejectedValueOnce('error')  // 让axios.get 放回一个rejected
    await wrapper.get('.loadUser').trigger('click')
    expect(mockAxios.get).toHaveBeenCalledTimes(2)  // 写2 是因为88行呼叫过一次
    await flushPromises()
    expect(wrapper.find('.loading').exists()).toBe(false)
    expect(wrapper.find('.error').exists()).toBe(true)
  })
})

// 不足的地方
// 1，每个测试用例都用重复的代码  使用beforeAll 来解决

// 2, GET方法被掉用的次数为2 (toHaveBeenCalledTimes(2))，每个测试用例间有影响，
//    使用beforeEach来解决
// 具体查看 example2.spec.ts 文件