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
    // position: 'absolute',
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

// 图片component特有的属性,加上所有component共有的属性。
export const image_component_props_with_defalut_value = {
    src: 'test.url',
    ...common_props_with_default_value
}


//  使用泛型
export const generate_component_props =(props_obj: {[key: string]: any})=> {

    const component_props: {[key: string]: any}={}

    for (const key in props_obj) {
        component_props[key]={
            type:key.constructor,
            default:props_obj[key]
        }
    }

    return component_props;
}


//LText.vue 的props里需要添加component_default__props。
export const component_default__props=generate_component_props(text_component_props_with_defalut_value)

// 去掉 "actionType","url","text" 只留保留 text 组件的css 属性的数组
export const text_component_css_props_name_arr=without(Object.keys(text_component_props_with_defalut_value),"actionType","url","text")

// 
export const image_component_default_props= generate_component_props(image_component_props_with_defalut_value)

export const image_component_css_props_name_arr = without(Object.keys(image_component_props_with_defalut_value), 'src')