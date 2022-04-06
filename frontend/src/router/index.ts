import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Home" */ '../views/DashboardView.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "About" */ '../views/AboutView.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/RegisterView.vue'),
        meta: { layout: "empty" }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue'),
        meta: { layout: "empty" }
    }
];

// navigation guard to check for logged in users

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
