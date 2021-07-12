<template>
  <a-button 
    type="primary" v-if="!user.isLogin" 
    class="user-profile-component"
    @click="login"
  >
    登录
  </a-button>
  <div v-else>
    <a-dropdown-button  class="user-profile-component">
      <router-link to="/setting">{{user.userName}}</router-link>
      <!-- <template #overlay> 是ant design vue的写法也可以写成  <template v-slot:overlay> -->
      <template #overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { UserProps } from '../store/user'

export default defineComponent({
  name: 'user-profile',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props) {

    console.log(props.user.isLogin);      

    const store = useStore()
    
    //定义路由的行为，比如url跳转
    const router = useRouter()
    
    const login = () => {
      //触发 store里的mutations里的login方法
      store.commit('login')
      message.success('登录成功', 2)
    }

    const logout = () => {
      //触发 store里的mutations里的logout方法
      store.commit('logout')
      message.success('退出登录成功，2秒后跳转到首页', 2)
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }

    return {
      login,
      logout
    }
  }
})
</script>
<style>
.user-profile-dropdown {
  border-radius: 2px !important;
}
.user-operation > * {
  margin-left: 30px !important;
}
</style>