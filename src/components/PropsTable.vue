<template>
  <div class="props-table">
    <div v-for="(value, key) in resultProps"  :key="key"  class="prop-item">
        <span class="label" v-if="value.text">{{value.text}}</span>
        <!--value.eventActiion 的内容为 {change: (e: any)=>{context.emit("changeValue",{key,value:e})}} -->
        <component
            v-if="value" 
            :is="value.component" 
            :[value.valueProp]="value.value" 
            v-bind="value.extraProps"
            v-on="value.eventActiion" 
        >
            <!-- template 是vue提供的空节点，仅仅是用来判断subComponent是否存在 -->
            <!-- 下面这个结构是用来渲染下拉菜单，或者单选框 多选框的 -->
            <!-- 例，上面那个component显示<a-radio-group> 下面这个component显示 <a-radio-button> -->
            <template v-if="value.subComponent"> 
                <component 
                    :is="value.subComponent" 
                    v-for="(option,k) in value.options" 
                    :key="k"
                    :value="option.value"
                >
                    <RenderVnode :vNode="option.text"></RenderVnode>
                </component>
            </template>
        </component>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,} from 'vue'
import { reduce } from 'lodash'
import {  mapPropsToForms } from '../mapPropsToForms'
import RenderVnode from './RenderVnode'
import ColorPicker from './ColorPicker.vue'
import ImageProcesser from './ImageProcesser.vue'
import BackgroundProcesser from './BackgroundProcesser.vue'

export default defineComponent({
  name: 'props-table',
  props: {
    props: {
      type: Object,
      required: true
    }
  },
  components:{
      RenderVnode,
      ColorPicker,
      ImageProcesser,
      BackgroundProcesser,
  },
  emits:['changeValue'],
  setup(props, context) {
      
    // 将{ text:"hello",  ...} 和{ text:{component:'a-input'}, ...} 组合变为 {text:{component:'a-input',value:'hello'},...}
    const resultProps = computed(()=>{
        return reduce(props.props, (result: any, value, key) => {
          const item=mapPropsToForms[key]

          if(item){
              
              item.value = item.initalTransform ? item.initalTransform(value) : value
              console.log(item.value)

              // 给item添加valueProp 属性，用于适配
              item.valueProp = item.valueProp ? item.valueProp : "value"

              //  给item添加eventName 属性
              //  每一个item都有自己的事件，如change 事件，click 事件，keyup事件等，都可以在
              //  mapPropsToForms.ts 文件里面注明，如果没有注明默认为 change事件
              item.eventName = item.eventName ? item.eventName : "change"

              const eventNameKey = item.eventName
              
              // 给item添加eventName 对应的事件，每一个事件名所对应的方法
              // 注意[eventNameKey] 必须使用中括号，改成[item.eventName] 也是不行的
              // e代表的是这个change 事件
              // console.log("event",e); // e 因为component的不同，内容也千奇百怪，没有办法发送给父组件后直接更新到store里去
              // item.eventActiion = {[eventNameKey]: (e: any)=>{context.emit("changeValue",{key,value: e})}}

              const { transformEventValue }= item
              item.eventActiion = {[eventNameKey]: (e: any)=>{context.emit("changeValue",{key,value: transformEventValue ? transformEventValue(e) : e})}}

              result[key] = item
              
          }
            return result
        }, {} )
    })


    // console.log("mapPropsToForms",mapPropsToForms);
    console.log("resultProps",resultProps);

    // 为什么这个方法不行，resultProps 不会随着点击而改变，为什么上面那个方法可以呢？
    // interface LooseObject {
    //     [key: string]: object;
    // }
    // const finalProps: LooseObject ={}

    // const hasProperty = (obj: object, key: string) => {
    //     // eslint 里面不能用 obj.hasOwnProperty(key)
    //     // 必须使用 Object.prototype.hasOwnProperty.call(obj, key)
    //     return !!(obj) && Object.prototype.hasOwnProperty.call(obj, key);
    // }

    // Object.entries(props.props).forEach(([key, val]) => {
    //     if( hasProperty(mapPropsToForms,key) ){
    //         finalProps[key] = {component: mapPropsToForms[key].component, value: val}
    //     }
    // });

    // const resultProps= computed(()=>{return finalProps})

    return {
      resultProps
    }
  }
})
</script>

<style>
.prop-item {
  /* display: flex; */
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}
.ant-select-show-arrow{
    width:6rem
}
</style>