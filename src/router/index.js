import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginPage/LoginPage.vue';
import Schedule from '@/components/SchedulePage/SchedulePage.vue';
import RegisterPage from "@/components/RegisterPage/RegisterPage.vue";
import ProfilePage from "@/components/ProfilePage/ProfilePage.vue";

const routes = [
    { path: '/', component: Login, meta: { requiresAuth: false } },
    { path: '/schedule', component: Schedule, meta: { requiresAuth: true } },
    { path: '/register', component: RegisterPage, meta: { requiresAuth: true } },
    { path: '/test', component: ProfilePage, meta: { requiresAuth: false } },
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