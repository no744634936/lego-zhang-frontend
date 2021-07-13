import { shallowMount ,VueWrapper } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import Hello from '@/components/Hello.vue'

// 有关axios的测试
import flushPromises from 'flush-promises'
import axios from 'axios'


// 如果这样拦截axios ,no.1,  no.2, no.3, no.4 这三个地方的将不能使用使用
jest.mock('axios',()=>{
    return{
        get:jest.fn(()=>{
            return Promise.resolve({data:{username: 'viking'}})
        })
    }
})  

// no.1 这个写法也不行了
// const mocAxios = axios as jest.Mocked<typeof axios> 


const msg = 'new message'

let wrapper: VueWrapper<any>  // // let wrapper: any 这样写也可以
describe('HelloWorld.vue', () => {

  beforeAll(() => {
    // 所有测试用例都用同一个wrapper
    wrapper = shallowMount(HelloWorld, {
      props: { msg }
    })
  })

  afterEach(() => {
    //  no.2 这个方法也用不了了
    // axios.get.mockReset()
  })

  // 对html渲染及props传递的测试
  it('renders props.msg when passed', () => {

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
    await wrapper.get('button').trigger('click')
    expect(wrapper.get('button').text()).toBe('2') // 注意是字符串
  })


  it('should add todo when fill the input and click the add button', async () => {

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
    
    // no.3 不能 axios.get.mockResolvedValueOnce 了
    // axios.get.mockResolvedValueOnce({ data: { username: 'viking'}}) // 让axios.get 返回一个resolved 
   
    // 第一步点击事件
    await wrapper.get('.loadUser').trigger('click')
    expect(axios.get).toHaveBeenCalled()
    expect(wrapper.find('.loading').exists()).toBeTruthy()
    // 获取数据是一个promise ，等待promise获取到数据并结束是要花时间的
    await flushPromises()   // 等待promise resolved，并等待页面更新完毕，
    // 界面更新完毕
    expect(wrapper.find('.loading').exists()).toBeFalsy()
    expect(wrapper.get('.userName').text()).toBe('viking')
  })


//   no.4 不能再这样写  axios.get.mockRejectedValueOnce('error') 
//   it('should load error when return promise reject', async () => {

//     axios.get.mockRejectedValueOnce('error')  // 让axios.get 放回一个rejected
//     await wrapper.get('.loadUser').trigger('click')
//     expect(axios.get).toHaveBeenCalledTimes(1)  // 这里变为1了，因为afterEach里面重置了
//     await flushPromises()
//     expect(wrapper.find('.loading').exists()).toBe(false)
//     expect(wrapper.find('.error').exists()).toBe(true)
//   })


})