import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Editor from '../views/Editor.vue';
import TemplateDetail from '../views/TemplateDetail.vue';

const router = createRouter({
    // history: createWebHistory(), 必须要写上，
    // hash 模式是用 createWebHashHistory() 创建的,url是这样的https://example.com/#/editor
    // 这个url不会被发送到服务器，所以它不需要在服务器层面上进行任何特殊处理
    // vue 会自动渲染editor组件

    // 用 createWebHistory() 创建 HTML5 模式
    // URL 会看起来很 "正常"，例如 https://example.com/editor
    // 但是这种路由会向服务器发送请求，
    // 正式上线的时候，如果没有适当的服务器配置，用户在浏览器中直接访问 https://example.com/editor，就会得到一个 404 错误
    // 本地开发的时候vue 也会跟has模式一样自动渲染editor组件，所以本地开发的时候什么模式没有影响
    // 至于服务器端怎么配置，后面会学到

    history: createWebHistory(),
    routes: [
        // meta是这个路由带着的额外的信息、App.vue 文件里用来明确是否使用header
        { path: '/', name: 'home', component: Home,meta:{needHeader:true}},
        { path: '/editor', name: 'editor', component: Editor },
        { path: '/template/:id', name: 'templateDetail', component: TemplateDetail,meta:{needHeader:true} },
    ]
});

export default router;
