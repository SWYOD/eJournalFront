import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginPage/LoginPage.vue';
import Schedule from '@/components/SchedulePage/SchedulePage.vue';
import RegisterPage from "@/components/RegisterPage/RegisterPage.vue";
import StudentProfilePage from "@/components/StudentProfilePage/StudentProfilePage.vue";
import DashboardPage from "@/components/DashboardPage/DashboardPage.vue";

const routes = [
    { path: '/', component: Login, meta: { requiresAuth: false } },
    { path: '/schedule', component: Schedule, meta: { requiresAuth: true } },
    { path: '/register', component: RegisterPage, meta: { requiresAuth: true } },
    { path: '/profile', component: StudentProfilePage, meta: { requiresAuth: true } },
    { path: '/dashboard-page', component: DashboardPage, meta: { requiresAuth: false } }
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