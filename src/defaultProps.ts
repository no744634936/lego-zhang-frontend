import {without,pick} from "lodash-es";


// 所有component共有的属性。
export const common_props_with_default_value = {
    // actions
    actionType: '',
    url: '',
    // size
    height: '',
    width: '318px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    // border type
    borderStyle: 'none',
    borderColor: '#000',
    borderWidth: '0',
    borderRadius: '0',
    // shadow and opacity
    boxShadow: '0 0 0 #000000',
    opacity: '1',
    // position and x,y
    position: 'absolute',
    left: '0',
    top: '0',
    right: '0'
}


// 文本component特有的属性,加上所有component共有的属性。
export const text_component_props_with_defalut_value = {
    // basic props - font styles
    text: '正文内容',
    fontSize: '14px',
    fontFamily: '',
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    lineHeight: '1',
    textAlign: 'left',
    color: '#000000',
    backgroundColor: '',
    ...common_props_with_default_value
}


//  使用泛型
export const generate_component_props =(props_obj: {[key: string]: any})=> {

    const component_props: {[key: string]: any}={}

    for (const key in props_obj) {
        component_props[key]={
            type:key.constructor, // 这个属性是字符型还是数值型之类的
            default:props_obj[key]
        }
    }

    return component_props;
}

/*
用generate_component_props 方法给 components/LText.vue component做一个这个样子的 props
{
    text: { type: String, default: '正文内容' },
    fontSize: { type: String, default: '14px' },
    fontFamily: { type: String, default: '' },
    fontWeight: { type: String, default: 'normal' },
    fontStyle: { type: String, default: 'normal' },
    textDecoration: { type: String, default: 'none' },
    lineHeight: { type: String, default: '1' },
    textAlign: { type: String, default: 'left' },
    color: { type: String, default: '#000000' },
    backgroundColor: { type: String, default: '' }
    ......
}

为什么不一开始就这样写成上面那种格式呢？
因为要写很多{ type: String, default: '' } 很麻烦


为什么要用key.constructor ？
因为 "string".constructor===String

let a="eww"
console.log(a.constructor);
console.log(a.constructor===String); //true

*/

//LText.vue 的props里需要添加component_default__props。
export const component_default__props=generate_component_props(text_component_props_with_defalut_value)



// console.log("component_default__props",component_default__props);

// 为什么 generate_component_props方法的返回值赋值给component_default__props后会有"0": false, 跟 "1":true 呢?
// {
//     "text": {
//         "0": false,
//         "1": true,
//         "default": "正文内容"
//     },
//     "fontSize": {
//         "0": false,
//         "1": true,
//         "default": "14px"
//     },
//     "fontFamily": {
//         "0": false,
//         "1": true,
//         "default": ""
//     },
//     "fontWeight": {
//         "0": false,
//         "1": true,
//         "default": "normal"
//     },
//     "fontStyle": {
//         "0": false,
//         "1": true,
//         "default": "normal"
//     },
//     "textDecoration": {
//         "0": false,
//         "1": true,
//         "default": "none"
//     },
//     "lineHeight": {
//         "0": false,
//         "1": true,
//         "default": "1"
//     },
//     "textAlign": {
//         "0": false,
//         "1": true,
//         "default": "left"
//     },
//     "color": {
//         "0": false,
//         "1": true,
//         "default": "#000000"
//     },
//     "backgroundColor": {
//         "0": false,
//         "1": true,
//         "default": ""
//     },
//     "actionType": {
//         "0": false,
//         "1": true,
//         "default": ""
//     },
//     "url": {
//         "0": false,
//         "1": true,
//         "default": ""
//     },
//     "height": {
//         "0": false,
//         "1": true,
//         "default": ""
//     },
//     "width": {
//         "0": false,
//         "1": true,
//         "default": "318px"
//     },
//     "paddingLeft": {
//         "0": false,
//         "1": true,
//         "default": "0px"
//     },
//     "paddingRight": {
//         "0": false,
//         "1": true,
//         "default": "0px"
//     },
//     "paddingTop": {
//         "0": false,
//         "1": true,
//         "default": "0px"
//     },
//     "paddingBottom": {
//         "0": false,
//         "1": true,
//         "default": "0px"
//     },
//     "borderStyle": {
//         "0": false,
//         "1": true,
//         "default": "none"
//     },
//     "borderColor": {
//         "0": false,
//         "1": true,
//         "default": "#000"
//     },
//     "borderWidth": {
//         "0": false,
//         "1": true,
//         "default": "0"
//     },
//     "borderRadius": {
//         "0": false,
//         "1": true,
//         "default": "0"
//     },
//     "boxShadow": {
//         "0": false,
//         "1": true,
//         "default": "0 0 0 #000000"
//     },
//     "opacity": {
//         "0": false,
//         "1": true,
//         "default": "1"
//     },
//     "position": {
//         "0": false,
//         "1": true,
//         "default": "absolute"
//     },
//     "left": {
//         "0": false,
//         "1": true,
//         "default": "0"
//     },
//     "top": {
//         "0": false,
//         "1": true,
//         "default": "0"
//     },
//     "right": {
//         "0": false,
//         "1": true,
//         "default": "0"
//     }
// }


// 去掉 "actionType","url","text" 只留保留 文本组件的css 属性的数组
export const text_component_css_props_name_arr=without(Object.keys(text_component_props_with_defalut_value),"actionType","url","text")

/**
 text_component_css_props_name_arr 的内容

["fontSize", "fontFamily", "fontWeight", "fontStyle", 
 "textDecoration", "lineHeight", "textAlign", "color", 
 "backgroundColor", "height", "width", "paddingLeft", "paddingRight",
 "paddingTop", "paddingBottom", "borderStyle", "borderColor", "borderWidth", 
 "borderRadius", "boxShadow", "opacity", "position", "left", "top", "right"
]
 */

