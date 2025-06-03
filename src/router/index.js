import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/components/LoginPage/LoginPage.vue';
import Schedule from '@/components/StudentAgent/SchedulePage/SchedulePage.vue';
import RegisterPage from "@/components/RegisterPage/RegisterPage.vue";
import StudentProfilePage from "@/components/StudentAgent/StudentProfilePage/StudentProfilePage.vue";
import DashboardPage from "@/components/TeacherAgent/DashboardPage/DashboardPage.vue";
import ScheduleSettingPage from "@/components/TeacherAgent/ScheduleSettingPage/ScheduleSettingPage.vue";
import JournalPage from "@/components/TeacherAgent/JournalPage/JournalPage.vue";
import MonitoringPage from "@/components/TeacherAgent/MonitoringPage/MonitoringPage.vue";

const routes = [
    { path: '/', component: Login, meta: { requiresAuth: false } },
    { path: '/schedule', component: Schedule, meta: { requiresAuth: true } },
    { path: '/register', component: RegisterPage, meta: { requiresAuth: true } },
    { path: '/profile', component: StudentProfilePage, meta: { requiresAuth: true } },
    { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: false } },
    { path: '/journal', component: JournalPage, meta: { requiresAuth: false } },
    { path: '/scheduleT', component: ScheduleSettingPage, meta: { requiresAuth: false } },
    { path: '/monitoring', component: MonitoringPage, meta: { requiresAuth: false } },
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