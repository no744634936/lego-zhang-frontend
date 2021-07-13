import store from '@/store/index'
import { testData } from '@/store/template'
import { testComponents } from '@/store/editor'
import { clone, last } from 'lodash-es'

const cloneComponents = clone(testComponents) // 克隆就是为了让修改testComponents的时候，cloneComponents的内容不变

describe('test vuex store', () => {
  it('should have three modules', () => {
    expect(store.state).toHaveProperty('user')
    expect(store.state).toHaveProperty('templates')
    expect(store.state).toHaveProperty('editor')
  })

  describe('test user module', () => {
    it('test login mutation', () => {
      store.commit('login')
      expect(store.state.user.isLogin).toBeTruthy()
    })
    it('test logout mutation', () => {
      store.commit('logout')
      expect(store.state.user.isLogin).toBeFalsy()
    })
  })


  describe('test templates module', () => {
    it('should have default templates', () => {
      expect(store.state.templates.data).toHaveLength(testData.length)
    })
    it('should get the correct template by Id', () => {
      const selectTemplate = store.getters.getTemplateById(1)
      expect(selectTemplate.title).toBe('前端架构项目1')
    })
  })



  describe('test editor module', () => {
    it('should have default components', () => {
      expect(store.state.editor.components).toHaveLength(cloneComponents.length)
    })


    it('should get current component when set active one component', () => {
      store.commit('setElementActive', cloneComponents[0].id)
      expect(store.state.editor.currentElement).toBe(cloneComponents[0].id)
      const currentElement = store.getters.getCurrentEditedElement
      expect(currentElement.id).toBe(cloneComponents[0].id)
    })


    it('add component should works fine', () => {
      const props: any =  {
          text: 'text1'
      }
      store.commit('addComponent', props)
      expect(store.state.editor.components).toHaveLength(cloneComponents.length + 1)

      
      
      const lastItem: any = last(store.state.editor.components)
      console.log(lastItem);

      expect(lastItem.props.text).toBe('text1')
    })
    
    it('update component should works fine', () => {
      const newProps = {
        key: 'text',
        value: 'update'
      }
      store.commit('updateComponent', newProps)
      const currentElement: any = store.getters.getCurrentEditedElement
      expect(currentElement.props.text).toBe('update')
    })
  })
})