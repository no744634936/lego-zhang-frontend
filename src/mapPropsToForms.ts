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
    text: {component: 'a-input'},  // antd design vue 提供的input 组件
    fontSize: {component: 'a-input-number'}, 
}

