import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getCookie } from '../modules/cookie';
import { uri } from '../modules/uri';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue'),
        meta: {
            requiresAuth: false,
            layout: "empty"
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "Register" */ '../views/RegisterView.vue'),
        meta: {
            requiresAuth: false,
            layout: "empty"
        }
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "Dashboard" */ '../views/DashboardView.vue'),
        meta: {
            requiresAuth: true,
            layout: "default"
        }
    },
    {
        path: '/members',
        name: 'Members',
        component: () => import(/* webpackChunkName: "members" */ '../views/UsersView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    // tags
    {
        path: '/tags',
        name: 'Tags',
        component: () => import(/* webpackChunkName: "tags" */ '../views/TagsView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/tags/new-tag',
        name: 'NewTask',
        component: () => import(/* webpackChunkName: "new-task" */ '../views/CreateTagView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    // roles
    {
        path: '/roles',
        name: 'Roles',
        component: () => import(/* webpackChunkName: "tags" */ '../views/RolesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/roles/new-role',
        name: 'NewRole',
        component: () => import(/* webpackChunkName: "new-role" */ '../views/CreateRoleView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    //Projects
    {
        path: '/projects',
        name: 'projects',
        component: () => import(/* webpackChunkName: "Projects" */ '../views/ProjectsView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/project/:id',
        name: 'project',
        component: () => import(/* webpackChunkName: "Project" */ '../views/ProjectView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/project/edit/:id',
        name: 'project-edit',
        component: () => import(/* webpackChunkName: "edit-project" */ '../views/EditProjectView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/projects/new-project',
        name: 'new-project',
        component: () => import(/* webpackChunkName: "create-project */ '../views/CreateProjectView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    // templates
    {
        path: '/templates',
        name: 'templates',
        component: () => import(/* webpackChunkName: "templates" */ '../views/TemplatesView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/templates/new-template',
        name: 'new-template',
        component: () => import(/* webpackChunkName: "new-template" */ '../views/CreateTemplateView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    // tasks
    {
        path: '/edit-task/:id',
        name: 'edit-task',
        component: () => import(/* webpackChunkName: "edit-task" */ '../views/EditTaskView.vue'),
        meta: {
            requiresAuth: true
        }
    },
    //user
    {
        path: '/profile/:id',
        name: 'profile',
        component: () => import(/* webpackChunkName: "Profile" */ '../views/ProfileView.vue'),
        meta: {
            requiresAuth: true,
            reloadOnParamChange: true
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
];

// navigation guard to check for logged in users

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    let isAuthenticated = false;

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: getCookie('token')
        })
    };

    // check if user is logged in and redirects accordingly
    fetch(uri + 'users/verify-token', requestOptions)
        .then(respone => respone.json())
        .then(data => {
            if (getCookie('id')) {
                if (data.decoded.id === getCookie('id')) {
                    isAuthenticated = true;
                }
            } else {
                isAuthenticated = false;
            }
        }).then(() => {
            if (requiresAuth && !isAuthenticated) {
                next('/login');
            } else if (!requiresAuth && isAuthenticated) {
                next('/');
            } else {
                next();

            }
        })

});

export default router;
