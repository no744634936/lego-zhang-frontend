// 固定写法
import { defineComponent } from "vue";

const RenderVnode = defineComponent({
    props:{
        vNode:{
            type:[Object,String], // 注意这里是Object,String。固定写法
            required:true
        }
    },
    render(){
        return this.vNode
    }
})


export default RenderVnode