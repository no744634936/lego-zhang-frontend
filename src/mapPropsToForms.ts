// typescript 里面的每一个变量都用interface定义他显示的内容是什么
// 现在对泛型还不太熟悉，就先做个LooseObject

import {text_component_props_with_defalut_value} from './defaultProps'

interface ObjectWithComponent{
    [key: string]: any;
}

interface LooseObject {
    [key: string]: ObjectWithComponent;
    
}

export const mapPropsToForms: LooseObject={
    text: {
        text: "文本",
        component: 'a-textarea',
        extraProps:{rows:3} 
    },  // antd design vue 提供的input 组件
     

    fontSize: {
        text:"字号",
        component: 'a-input-number'
    }, 

    lineHeight: {
        text:"行高",
        component: 'a-slider',
        //antd design vue的a-slider组件可配置的属性
        // propsTable.vue文件里 使用 v-bind="value.extraProps" 将这些属性绑定到a-slider上面
        extraProps:{min:0,max:3,step:0.1}  
    }, 
}

