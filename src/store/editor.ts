import {Module} from "vuex"
import {GlobalDataProps} from "./index"
import { uuid } from 'uuidv4'

// 这样命名interface比较好一点
export interface ComponentDataProps{

  // 这个元素的 属性，属性请详见下面
  props: {[key: string]: any};
  // id，uuid v4 生成
  id: string;
  // 业务组件库名称 l-text，l-image 等等 
  name: string;
}

export interface EditorDataProps{
  // 供中间编辑器渲染的数组
  components: ComponentDataProps[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  // 当然最后保存的时候还有有一些项目信息，这里并没有写出，等做到的时候再补充
}

const testComponents: ComponentDataProps[]= [
    { id: uuid(), name: 'l-text', props: { text: 'hello', fontSize: '30px', color: 'red', 'lineHeight': '1', textAlign: 'left', fontFamily: '' }},
    { id: uuid(), name: 'l-text', props: { text: 'hello2', fontSize: '10px', fontWeight: 'bold', 'lineHeight': '2', textAlign: 'left', fontFamily: '' }},
    { id: uuid(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', 'lineHeight': '3', textAlign: 'left', fontFamily: '' }}
  ]

const editor: Module<EditorDataProps,GlobalDataProps>={
    state:{
        components:testComponents,
        currentElement:"",
    },

    // 修改state使用motations 获取state里的值使用 getters
    mutations:{
        // props 是从Editor.vue 中的 const addItem=(props: any) 方法传过来的
        addComponent(state,props){
            const newComponent: ComponentDataProps={
                id:uuid(),
                name:"l-text",
                props
            }
            state.components.push(newComponent)
        },
        // 使用这个方法，store 就知道了现在正在编辑的component是哪一个。
        setElementActive(state,currentId: string){
            state.currentElement = currentId
        }
    },
    getters:{
        getCurrentEditedElement: (state)=>{
            return  state.components.find(component=>component.id===state.currentElement)
        }
    }
}

export default editor