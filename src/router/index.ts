import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true, title: '数据看板' },
      },
      {
        path: '/product',
        name: 'Product',
        component: () => import('@/views/product/Product.vue'),
        meta: { requiresAuth: true, title: '商品管理' },
      },
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/Order.vue'),
        meta: { requiresAuth: true, title: '订单管理' },
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/User.vue'),
        meta: { requiresAuth: true, title: '用户管理' },
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/settings/Settings.vue'),
        meta: { requiresAuth: true, title: '系统设置' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFound.vue'),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  
  if (to.meta.requiresAuth) {
    if (!userStore.token) {
      next({ name: 'Login' });
      return;
    }
    
    if (!userStore.userInfo) {
      await userStore.initUserInfo();
    }
    
    next();
  } else {
    if (to.name === 'Login' && userStore.token) {
      next({ name: 'Dashboard' });
      return;
    }
    next();
  }
});

export default router;
