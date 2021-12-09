<template>
  <div class="props-table">
    <div v-for="(value, key) in resultProps"  :key="key"  class="prop-item">
        <span class="label" v-if="value.text">{{value.text}}</span>

        <component
            v-if="value" 
            :is="value.component" 
            :[value.valueProp]="value.value" 
            v-bind="value.extraProps"
            v-on="value.eventActiion" 
        >
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
              item.valueProp = item.valueProp ? item.valueProp : "value"
              item.eventName = item.eventName ? item.eventName : "change"
              const eventNameKey = item.eventName
              const { transformEventValue }= item
              item.eventActiion = {[eventNameKey]: (e: any)=>{context.emit("changeValue",{key,value: transformEventValue ? transformEventValue(e) : e})}}

              result[key] = item
              
          }
            return result
        }, {} )
    })

    console.log("resultProps",resultProps);

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