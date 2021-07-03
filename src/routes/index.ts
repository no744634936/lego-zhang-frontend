import { createRouter, createWebHistory } from 'vue-router';

import Home from '../views/Home.vue';
import Editor from '../views/Editor.vue';
import TemplateDetail from '../views/TemplateDetail.vue';

const router = createRouter({
    // history: createWebHistory(), 必须要写上，这句话的背后原理还不太懂
    history: createWebHistory(),
    routes: [
        // meta是这个路由带着的额外的信息、App.vue 文件里用来明确是否使用header
        { path: '/', name: 'home', component: Home,meta:{needHeader:true}},
        { path: '/editor', name: 'editor', component: Editor },
        { path: '/template/:id', name: 'templateDetail', component: TemplateDetail,meta:{needHeader:true} },
    ]
});

export default router;