import { mount, VueWrapper } from '@vue/test-utils'
import rgbHex from 'rgb-hex'
import ColorPicker from '@/components/ColorPicker.vue'
const defaultColors = ['#ffffff', '#f5222d', '#fa541c', '#fadb14', '#52c41a', '#1890ff', '#722ed1', '#8c8c8c', '#000000', '']
let wrapper: VueWrapper<any>


// 测试的流程就是要考虑输入什么，然后输出，显示什么。
describe('UserProfile component', () => {
  beforeAll(() => {
    wrapper = mount(ColorPicker, {
      props: {
        value: '#ffffff'
      },
    })
  })
  it('should render the correct interface', () => {
    // <div>
    //      <input type='color value='#ffffff'>
    // </div>
    // <ul class="picked-color-list">
    // <li class="item-0" or class="transparent-back">
    // <div></div>
    // </li></ul>
    
    // 测试左侧是否为 input，类型和值是否正确
    expect(wrapper.find('input').exists()).toBeTruthy()
    const input = wrapper.get('input').element
    expect(input.type).toBe('color')
    expect(input.value).toBe('#ffffff')
    // 测试右侧是否有颜色的列表
    expect(wrapper.findAll('.picked-color-list li').length).toBe(defaultColors.length)
    // 检查一个元素的 css backgroundColor属性是否相等对应的颜色
    // HTMLElement是typescript的内置对象
    const firstItem = wrapper.get('li:first-child div').element as HTMLElement

    // 浏览器会自动将16进制格式的#ffffff 自动转换成rgb(255,255,255) 所以使用rgbHex来转换一下
    expect('#' + rgbHex(firstItem.style.backgroundColor)).toBe(defaultColors[0])
    // 测试最后一个元素是否有特殊的类名
    const lastItem = wrapper.get('li:last-child div').element as HTMLElement
    expect(lastItem.classList.contains('transparent-back')).toBeTruthy()
  })


  it('should send the correct event when change input', async () => {
    // 测试 input 修改以后，是否发送对应的事件和对应的值
    const blackHex = '#000000'
    const input = wrapper.get('input')
    await input.setValue(blackHex)  // 改变它的值之后就触发了他的input事件，然后触发onchange事件
    expect(wrapper.emitted()).toHaveProperty('change')// 是否发送发送了change事件的写法
    const events: any = wrapper.emitted('change')  // 发送的change事件是一个events数组，里面有发送到的参数
    expect(events[0]).toEqual([blackHex])
  })


  it('should send the correct event when clicking the color list', async () => {
    // 测试点击右侧颜色列表以后，是否发送对应的值
    const firstItem = wrapper.get('li:first-child div')
    firstItem.trigger('click')
    const events: any = wrapper.emitted('change')
    expect(events[1]).toEqual([defaultColors[0]])
  })
})
