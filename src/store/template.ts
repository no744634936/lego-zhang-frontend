import {Module} from "vuex"
import {GlobalDataProps} from "./index"

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

const testData: TemplateProps[]=[
    {id:1,coverImg:"https://cdn.pixabay.com/photo/2021/05/24/12/18/lighthouse-6278951_1280.jpg",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
    {id:2,coverImg:"https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_1280.jpg",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
    {id:3,coverImg:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
    {id:4,coverImg:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
    {id:5,coverImg:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",title:"前端架构项目",author:"zhang haifeng",copiedCount:0},
];


const templates: Module<TemplatesProps,GlobalDataProps>={
    state:{
        data:testData,
    },
    getters:{
        getTemplateById:(state,getters,rootState)=>{
            return (id: number)=>{
                return state.data.find(elem=>elem.id===id)
            }
        }
    }
    
}

export default templates