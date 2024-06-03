// src/router/index.js 
import { createRouter, createWebHashHistory } from 'vue-router';
import Body from '../components/Body.vue'; // 引入你的视图组件

const routes = [
    { 
        path: '/', 
        component: Body,
    },
    { 
        path: '/history', 
        component: Body 

    },
    { 
        path: '/mistake', 
        component: Body 

    },
];

const router = createRouter({
    history: createWebHashHistory(), // 或者使用 createWebHistory() 依赖浏览器的history API
    routes, 
});

export default router;