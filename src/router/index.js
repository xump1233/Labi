// src/router/index.js 
import { createRouter, createWebHashHistory } from 'vue-router';
// import Body from '../views/Body.vue'; // 引入你的视图组件
import History from '@/views/History.vue';
import Mistake from '@/views/Mistake.vue';
import Everyday from '@/views/Everyday.vue';

const routes = [
    { 
        path: '/', 
        component: Everyday,
    },
    { 
        path: '/history', 
        component: History 

    },
    { 
        path: '/mistake', 
        component: Mistake 

    },
];

const router = createRouter({
    history: createWebHashHistory(), // 或者使用 createWebHistory() 依赖浏览器的history API
    routes, 
});

export default router;