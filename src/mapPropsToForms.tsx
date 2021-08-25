// typescript 里面的每一个变量都用interface定义他显示的内容是什么
// 现在对泛型还不太熟悉，就先做个LooseObject


interface ObjectWithComponent{
    [key: string]: any;
}

interface LooseObject {
    [key: string]: ObjectWithComponent;
}

const fongFamilyOptionArr = [
    { text: '宋体', value: '"SimSun","STSong"' },
    { text: '黑体', value: '"SimHei","STHeiti"' },
    { text: '楷体', value: '"KaiTi","STKaiti"' },
    { text: '仿宋', value: '"FangSong","STFangsong"' },
]

const fongFamilyOptionHtmlArr = fongFamilyOptionArr.map(e=>{
    // <span style={{fontFamily:e.value}}>{e.text}</span> 这种 html元素是不能直接取出来放进template里的
    // 要用 RenderVnode 组件处理一下，这个组件是固定写法，
    return {text: <span style={{fontFamily: e.value}}>{e.text}</span>, value: e.value,}

})




export const mapPropsToForms: LooseObject={
    text: {
        text: "文本",
        component: 'a-textarea',
        extraProps:{rows:3},
        transformEventValue:(e: any)=>{return e.target.value}
    },  // antd design vue 提供的a-textarea 组件

    fontSize: {
        text:"字号",
        component: 'a-input-number',
        initalTransform: (v: any) =>{ return  parseInt(v,10)}, //注意有大括号的时候，必须些return
        transformEventValue:(e: number)=>{return e ? `${e}px` : ''}
    }, 

    lineHeight: {
        text:"行高",
        component: 'a-slider',
        //antd design vue的a-slider组件可配置的属性
        // propsTable.vue文件里 使用 v-bind="value.extraProps" 将这些属性绑定到a-slider上面
        extraProps:{min:0,max:10,step:0.1},
        initalTransform: (v: any) => parseInt(v,10),
        transformEventValue:(e: number)=>{return e.toString()}
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
        transformEventValue:(e: any)=>{return e.target.value}
    },
    fontFamily: {
        text: '字体',
        component: 'a-select',
        subComponent: 'a-select-option',
        options: [
          { value: '', text: '无' },
          ...fongFamilyOptionHtmlArr,
        ],
        // fontFamily 不需要 transformEventValue
    },
    width: {
        text: '宽度',
        component: 'a-input-number',
        initalTransform: (v: any) =>{ return  parseInt(v,10)}, //注意有大括号的时候，必须些return
        transformEventValue:(e: number)=>{return e ? `${e}px` : ''}
      },
    color: {
        component: 'ColorPicker',
        text: '字体颜色'
    },

     // imageComponentProps
  src: {
    component: 'ImageProcesser'
  },
}

console.log("mapPropsToForms",mapPropsToForms);


