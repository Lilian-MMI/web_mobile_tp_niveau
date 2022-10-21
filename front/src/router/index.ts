import { useUserStore } from './../stores/user';
import { getCurrentUser } from '@/api/user';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      role: 'user',
    },
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/admin-dashboard',
    name: 'admin-dashboard',
    meta: {
      role: 'admin',
    },
    component: () => import('../views/AdminDashboard.vue'),
  },
  {
    path: '/super-admin-dashboard',
    name: 'super-admin-dashboard',
    meta: {
      role: 'super-admin',
    },
    component: () => import('../views/SuperAdminDashboard.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    const { user } = (await getCurrentUser().catch(() => false)) as any;

    if (user) {
      const userStore = useUserStore();
      userStore.SET_USER(user);

      const role = user.role;

      if (to.meta.role === role) {
        return next();
      } else {
        return next('/login');
      }
    } else {
      return next('/login');
    }
  }
  return next();
});

export default router;
