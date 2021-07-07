<template>
  <div class="props-table">
    <div v-for="(value, key) in resultProps"  :key="key"  class="prop-item">
        <span class="label" v-if="value.text">{{value.text}}</span>
        <component v-if="value" :is="value.component" :value="value.value" v-bind="value.extraProps"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent,} from 'vue'
import { reduce } from 'lodash'
import {  mapPropsToForms } from '../mapPropsToForms'

export default defineComponent({
  name: 'props-table',
  props: {
    props: {
      type: Object,
      required: true
    }
  },
  setup(props, context) {
      
      console.log("mapPropsToForms",mapPropsToForms);
      
    // 将{ text:"hello",  ...} 和{ text:{component:'a-input'}, ...} 组合变为 {text:{component:'a-input',value:'hello'},...}
    const resultProps = computed(()=>{
        return reduce(props.props, (result: any, value, key) => {
          const item=mapPropsToForms[key]

          if(item){
              item.value=value
              result[key]=item

              if(key==="lineHeight"){  //lineHeight的value必须为数字，不能是字符串
                item.value=parseInt(value,10)
                result[key]=item
              }
          }
            return result
        }, {} )
    })


    // console.log("mapPropsToForms",mapPropsToForms);
    // console.log("resultProps",resultProps);

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
  display: flex;
  margin-bottom: 10px;
  align-items: center;
}
.label {
  width: 28%;
}
.prop-component {
  width: 70%;
}

</style>