import {Module} from "vuex"
import {GlobalDataProps} from "./index"
import { v4 } from 'uuid'

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
    { id: v4(), name: 'l-text', props: { text: 'hello', fontSize: '30px', color: 'red', 'lineHeight': '1', textAlign: 'left', fontFamily: '' }},
    { id: v4(), name: 'l-text', props: { text: 'hello2', fontSize: '10px', fontWeight: 'bold', 'lineHeight': '2', textAlign: 'left', fontFamily: '' }},
    { id: v4(), name: 'l-text', props: { text: 'hello3', fontSize: '15px', actionType: 'url', url: 'https://www.baidu.com', 'lineHeight': '3', textAlign: 'left', fontFamily: '' }}
  ]

const editor: Module<EditorDataProps,GlobalDataProps>={
    state:{
        components:testComponents,
        currentElement:"",
    }
}

export default editor