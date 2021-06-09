import { computed, defineComponent } from 'vue'
import {pick} from "lodash-es";
import { getConfirmLocale } from 'ant-design-vue/lib/modal/locale';


// 所有component共有的方法就抽取出来做成一个hook
const componentCommonFunc=(props: {[key: string]: any},text_component_css_props_name_arr: string[])=>{
    
    // /挑选出与css有关的属性跟默认值
    const style_props=computed(()=>pick(props,text_component_css_props_name_arr))
    
    // 点击后的回调函数所以是个function
    const handleClick=()=>{
        if(props.actionType==='url' && props.url){
            window.location.href=props.url
        }
    }

    return {
        style_props,
        handleClick,
    }

}

export default componentCommonFunc