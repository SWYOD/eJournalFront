import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginPage.vue';
import Schedule from '@/components/SchedulePage.vue';

const routes = [
    { path: '/', component: Login, meta: { requiresAuth: false } },
    { path: '/schedule', component: Schedule, meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;