import { createApp } from 'vue'
import App from './App.vue'

//1,导入ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

//3, 导入router
import router from './routes/index'

//5,导入store
import store from './store/index'

import LegoBricks from 'zhang-lego-components'
import 'zhang-lego-components/dist/bundle.css'

//cropper.js的样式文件
import 'cropperjs/dist/cropper.css';

const app=createApp(App)
//2,将 ant-design-vue 放进app当中
app.use(Antd)
//4,将router放入app当中
app.use(router)

app.use(LegoBricks)

//6，将store 放进app当中
app.use(store)

app.mount('#app')

