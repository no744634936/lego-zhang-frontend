<template>
  <div class="props-table">
    <div v-for="(value, key) in resultProps"  :key="key"  class="prop-item">
        <span class="label" v-if="value.text">{{value.text}}</span>
        <component v-if="value" :is="value.component" :value="value.value" v-bind="value.extraProps">
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
                    {{option.text}}
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
              item.value= item.initalTransform ? item.initalTransform(value) : value
              result[key]=item

            //   使用 initalTransform 方法比较爽一点，写if 来判断就不美观了
            //   if(key==="lineHeight"){  //lineHeight的value必须为数字，不能是字符串
            //     item.value=parseInt(value,10)
            //     result[key]=item
            //   }
          }
            return result
        }, {} )
    })


    // console.log("mapPropsToForms",mapPropsToForms);
    // console.log("resultProps",resultProps);

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