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
        component: 'a-input-number',
        initalTransform: (v: any) => parseInt(v,10)
    }, 

    lineHeight: {
        text:"行高",
        component: 'a-slider',
        //antd design vue的a-slider组件可配置的属性
        // propsTable.vue文件里 使用 v-bind="value.extraProps" 将这些属性绑定到a-slider上面
        extraProps:{min:0,max:3,step:0.1},
        initalTransform: (v: any) => parseInt(v,10)
    },

    // 由两个ant design vue的component组成
    textAlign: {
        text: '水平对齐',
        component: 'a-radio-group',
        subComponent: 'a-radio-button',
        options: [
          { value: 'left', text: '左' },
          { value: 'center', text: '中' },
          { value: 'right', text: '右' }
        ],
    },
    fontFamily: {
        text: '字体',
        component: 'a-select',
        subComponent: 'a-select-option',
        options: [
          { value: '', text: '无' },
          { text: '宋体', value: '"SimSun","STSong"' },
          { text: '黑体', value: '"SimHei","STHeiti"' },
          { text: '楷体', value: '"KaiTi","STKaiti"' },
          { text: '仿宋', value: '"FangSong","STFangsong"' },
        ]
      }
}

