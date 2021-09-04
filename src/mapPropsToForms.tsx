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

const defaultHandler = {
    component: 'a-input',
    eventName: 'change',
    valueProp: 'value',
    intialTransform: (v: any) => v,
    afterTransform: (e: any) => e
}
  const pxToNumberHandler: any = {
    component: 'a-input-number',
    initalTransform: (v: string) => v ? parseInt(v): 0,
    transformEventValue: (e: number) => e ? `${e}px` : '',
}

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
    fontWeight: {
        component: 'icon-switch',
        initalTransform: (v: string) => v === 'bold',
        afterTransform: (e: boolean) => e ? 'bold' : 'normal',
        valueProp: 'checked',
        extraProps: { iconName: 'BoldOutlined', tip: '加粗' }
    },
    fontStyle: {
        component: 'icon-switch',
        initalTransform: (v: string) => v === 'italic',
        afterTransform: (e: boolean) => e ? 'italic' : 'normal',
        valueProp: 'checked',
        extraProps: { iconName: 'ItalicOutlined', tip: '斜体' }
    },
    textDecoration: {
        component: 'icon-switch',
        initalTransform: (v: string) => v === 'underline',
        afterTransform: (e: boolean) => e ? 'underline' : 'none',
        valueProp: 'checked',
        extraProps: { iconName: 'UnderlineOutlined', tip: '下划线' }
    },
    color: {
        component: 'ColorPicker',
        text: '字体颜色'
    },
    backgroundColor: {
        component: 'color-picker',
        text: '背景颜色'
    },

     // imageComponentProps
    src: {
        component: 'ImageProcesser'
    },

    width: {
        text: '宽度',
        component: 'a-input-number',
        initalTransform: (v: any) =>{ return  parseInt(v,10)}, //注意有大括号的时候，必须些return
        transformEventValue:(e: number)=>{return e ? `${e}px` : ''}
    },
    height: {
        text: '高度',
        ...pxToNumberHandler
    },
    paddingLeft: {
        ...pxToNumberHandler,
        text: '左边距'
    },
    paddingRight: {
        ...pxToNumberHandler,
        text: '右边距'
    },
    paddingTop: {
        ...pxToNumberHandler,
        text: '上边距'
    },
    paddingBottom: {
        ...pxToNumberHandler,
        text: '下边距'
    },
      // commonComponentProps - border type
    borderStyle: {
        ...defaultHandler,
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '边框类型',
        options: [
          { value: 'none', text: '无' },
          { value: 'solid', text: '实线' },
          { value: 'dashed', text: '破折线' },
          { value: 'dotted', text: '点状线' }
        ]
    },
    borderColor: {
        ...defaultHandler,
        component: 'color-picker',
        text: '边框颜色'
    },
    borderWidth: {
        ...pxToNumberHandler,
        component: 'a-slider',
        text: '边框宽度',
        extraProps: { min: 0, max: 100 }
    },
    borderRadius: {
        ...pxToNumberHandler,
        component: 'a-slider',
        text: '边框圆角',
        extraProps: { min: 0, max: 100 }
    },
    // commonComponentProps - opacity and boxShadow
    opacity: {
        component: 'a-slider',
        text: '透明度',
        initalTransform: (v: number) => v ? v * 100 : 100,
        transformEventValue: (e: number) => (e / 100),
        extraProps: { min: 0, max: 100, reverse: true }
    },
    boxShadow: {
        component: 'shadow-picker'
    },
      // commonComponentProps - positions
    left: {
        ...pxToNumberHandler,
        text: 'X轴坐标'
    },
    top: {
        ...pxToNumberHandler,
        text: 'Y轴坐标'
    },
    // commonComponentProps - actions and urls
    // actions
    actionType: {
        ...defaultHandler,
        component: 'a-select',
        subComponent: 'a-select-option',
        text: '点击',
        options: [
          { value: '', text: '无' },
          { value: 'to', text: '跳转到 URL' }
        ]
    },
    url: {
        ...defaultHandler,
        afterTransform: (e: any) => e.target.value,
        text: '链接'
    },
    backgroundImage: {
        ...defaultHandler,
        component: 'background-processer',
        initalTransform: (v: string) => {
          if (v) {
            const reg = /\(["'](.+)["']\)/g
            const matches = reg.exec(v)
            if (matches && matches.length > 1) {
              console.log(matches)
              return matches[1]
            } else {
              return ''
            }
          } else {
            return ''
          }
        },
        afterTransform: (e: string) => e ? `url('${e}')` : ''
    },
}

console.log("mapPropsToForms",mapPropsToForms);


