import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Home" */ '../views/DashboardView.vue')
    },
    {
        path: '/projects/project',
        name: 'project',
        component: () => import(/* webpackChunkName: "Project" */ '../views/projectView.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/ProfileView.vue')
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "Projects" */ '../views/ProjectsView.vue')
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
