import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getCookie } from '../modules/cookie';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Home" */ '../views/DashboardView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/projects/:title',
        name: 'project',
        component: () => import(/* webpackChunkName: "Project" */ '../views/ProjectView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile/:id',
        name: 'profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/ProfileView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/:id/edit',
        name: 'user',
        component: () => import(/* webpackChunkName: "Edituser" */ '../views/EditUserView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/projects',
        name: 'Projects',
        component: () => import(/* webpackChunkName: "Projects" */ '../views/ProjectsView.vue'),
        meta: {
            requiresAuth: true
        }
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

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    const isAuthenticated = getCookie('token'); // check if user is logged in



    if (requiresAuth && !isAuthenticated ) {
        next('/login');
    } else {
        next();
    } 
})

export default router;
