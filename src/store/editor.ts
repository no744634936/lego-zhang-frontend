import {Module} from "vuex"
import {GlobalDataProps} from "./index"
// 自己的zhang-lego-components 用不了，不知什么原因，这里先使用用 lego-bricks来代替
// import text_component_props_with_defalut_value from "zhang-lego-components"
// import image_component_props_with_defalut_value from "zhang-lego-components"
import { textDefaultProps, imageDefaultProps } from 'lego-bricks'
import { uuid } from 'uuidv4'
import { update } from "lodash-es"

// 这样命名interface比较好一点
export interface ComponentDataProps{

    // 这个元素的 属性，属性请详见下面
    props: {[key: string]: any};
    // id，uuid v4 生成
    id: string;
    // 业务组件库名称 l-text，l-image 等等 
    name: string;
    // 图层是否隐藏
    isHidden?: boolean;
    // 图层是否锁定
    isLocked?: boolean;
    // 图层名称
    layerName?: string;
}

export interface EditorDataProps{
  // 供中间编辑器渲染的数组
  components: ComponentDataProps[];
  // 当前编辑的是哪个元素，uuid
  currentElement: string;
  page: PageData;
}


export interface PageData {
    props: {[key: string]: any};
    title: string;
  }

export const testComponents: ComponentDataProps[]= [
    { id: uuid(),  name: 'l-text', layerName:'图层1', props: { ...textDefaultProps, text: 'hello', fontSize: '20px', color: '#000000', 'lineHeight': '1', textAlign: 'left', fontFamily: '', width: '100px', height: '100px', backgroundColor: '#efefef', left: '100px', top: '150px' }}
]

const pageDefaultProps = { backgroundColor: '#ffffff', backgroundImage: 'url("https://static.imooc-lego.com/upload-files/%E5%B9%BC%E5%84%BF%E5%9B%AD%E8%83%8C%E6%99%AF%E5%9B%BE-994372.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', height: '560px' }

const editor: Module<EditorDataProps,GlobalDataProps>={
    state:{
        components:testComponents,
        currentElement:"",
        page:{
            props: pageDefaultProps,
            title: "test title"
        }
    },

    // 修改state使用motations 获取state里的值使用 getters
    mutations:{
        addComponent(state, component) {
            state.components.push(component)

            console.log("state.components",state.components);
            
        },
        // 使用这个方法，store 就知道了现在正在编辑的component是哪一个。
        setElementActive(state,currentId: string){
            state.currentElement = currentId
        },
        deleteItemFromStore(state,deleteId: string){
            if(deleteId){
                state.components=state.components.filter(component=>component.id !== deleteId)
            }
        },
        updateComponent(state,{key,value,id,changeRoot}){
            //(id ||state.currentElement) 表示id存在的时候使用id，如果id 不存在的时候使用state.currentElement
            const updateCompnent = state.components.find(component=>component.id===(id ||state.currentElement)) 
            if(updateCompnent){
                // 判断是在修改，component的root的内容，还是在修改root里的props的内容
                if(changeRoot){
                    // 这是TS的一个bug，不能写updateCompnent[key]=value，需要写成下面那样
                    (updateCompnent as any)[key]=value
                }else{
                    updateCompnent.props[key]=value
                }
            }
        },
        updatePage(state, { key, value }) {
            
            state.page.props[key] = value
        }
    },
    getters:{
        getCurrentEditedElement: (state)=>{
            console.log("不行啊",state);
            
            return  state.components.find(component=>component.id===state.currentElement)
        }
    }
}

export default editor