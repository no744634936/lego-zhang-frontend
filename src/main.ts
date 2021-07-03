import { createApp } from 'vue'
import App from './App.vue'

//1,导入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

//3, 导入router
import router from './routes/index'


const app=createApp(App)
//2,将 ant-design-vue 放进app当中
app.use(Antd)
//4,将router放入app当中
app.use(router)

app.mount('#app')

