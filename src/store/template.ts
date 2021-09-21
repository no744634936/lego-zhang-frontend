import { context } from "ant-design-vue/lib/vc-image/src/PreviewGroup";
import axios from "axios";
import {Module} from "vuex"
import {GlobalDataProps} from "./index"
import { RespListData } from "./respTypes"

// 1,定义元素的数据格式
// template的数据格式
export interface TemplateProps{
    id: number;
    title: string;
    coverImg: string;
    author: string;
    copiedCount: number;
}

//2,定义当前模块的整体数据格式
// 注意是templatesProps 是复数
export interface TemplatesProps{
    data: TemplateProps[];
}

export const testData: TemplateProps[]=[
    {id:1,coverImg:"https://cdn.pixabay.com/photo/2021/05/24/12/18/lighthouse-6278951_1280.jpg",title:"前端架构项目1",author:"zhang haifeng",copiedCount:0},
    {id:2,coverImg:"https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_1280.jpg",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
    {id:3,coverImg:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
    {id:4,coverImg:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
    {id:5,coverImg:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
];


//Module 接收两个泛型，第一个泛型是本地这个state的形状，
//第二个泛型是全局state的形状，也就是下面的rootState
//泛型的一大优点就是，state跟rootState后面打上点之后，会自动出现个泛型里的属性
const templates: Module<TemplatesProps,GlobalDataProps>={
    //本地state
    state:{
        data:[],
    },
    //对数据进行筛选的方法可以放在getters里
    //Note that getters accessed via methods will run each time you call them, and the result is not cached.
    //getters里的方法使用有点奇怪,是这样的 store.getters.getTemplateById(1)
    //而不是store.getters.getTemplateById()(1)
    //const template=computed<TemplateProps>(()=>store.getters.getTemplateById(parseInt(currentId)))
    getters:{
        getTemplateById:(state,getters,rootState)=>{
            return (id: number)=>{
                return state.data.find(elem=>elem.id===id)
            }
        }
    },

    //由于mutation必须是同步函数，所以使用actions
    //actions跟mutation很相似，actions提交的是mutation，
    //actions可以使用异步函数
    //里面的方法可以接收context参数
    actions:{
        fetchTemplates(context){
            return axios.get('/templates').then(resp=>{
                context.commit("fetchTemplates",resp.data)
            })
        }
    },

    mutations:{
        fetchTemplates(state,respData: RespListData<TemplateProps>){
            state.data=respData.data.list
        }
    }
    
}

export default templates