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
      // 工作台总览（首页看板）
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true, title: '工作台' },
      },
      
      // 商品管理模块
      {
        path: '/product',
        name: 'Product',
        component: () => import('@/views/product/Product.vue'),
        meta: { requiresAuth: true, title: '商品列表' },
      },
      {
        path: '/product/category',
        name: 'ProductCategory',
        component: () => import('@/views/product/Category.vue'),
        meta: { requiresAuth: true, title: '商品分类' },
      },
      {
        path: '/product/spec',
        name: 'ProductSpec',
        component: () => import('@/views/product/Spec.vue'),
        meta: { requiresAuth: true, title: '规格配置' },
      },
      
      // 订单管理模块
      {
        path: '/order',
        name: 'Order',
        component: () => import('@/views/order/Order.vue'),
        meta: { requiresAuth: true, title: '订单列表' },
      },
      {
        path: '/order/aftersale',
        name: 'OrderAftersale',
        component: () => import('@/views/order/Aftersale.vue'),
        meta: { requiresAuth: true, title: '订单售后' },
      },
      
      // 后厨出餐模块
      {
        path: '/kitchen',
        name: 'Kitchen',
        component: () => import('@/views/kitchen/Kitchen.vue'),
        meta: { requiresAuth: true, title: '后厨出餐' },
      },
      
      // 库存管理模块
      {
        path: '/inventory',
        name: 'Inventory',
        component: () => import('@/views/inventory/Inventory.vue'),
        meta: { requiresAuth: true, title: '库存管理' },
      },
      {
        path: '/inventory/log',
        name: 'InventoryLog',
        component: () => import('@/views/inventory/Log.vue'),
        meta: { requiresAuth: true, title: '库存日志' },
      },
      
      // 营销活动模块
      {
        path: '/marketing',
        name: 'Marketing',
        component: () => import('@/views/marketing/Marketing.vue'),
        meta: { requiresAuth: true, title: '营销活动' },
      },
      {
        path: '/marketing/coupon',
        name: 'MarketingCoupon',
        component: () => import('@/views/marketing/Coupon.vue'),
        meta: { requiresAuth: true, title: '优惠券管理' },
      },
      {
        path: '/marketing/statistics',
        name: 'MarketingStatistics',
        component: () => import('@/views/marketing/Statistics.vue'),
        meta: { requiresAuth: true, title: '活动统计' },
      },
      
      // 数据统计模块
      {
        path: '/statistics',
        name: 'Statistics',
        component: () => import('@/views/statistics/Statistics.vue'),
        meta: { requiresAuth: true, title: '营收统计' },
      },
      {
        path: '/statistics/sales',
        name: 'StatisticsSales',
        component: () => import('@/views/statistics/Sales.vue'),
        meta: { requiresAuth: true, title: '销量统计' },
      },
      {
        path: '/statistics/report',
        name: 'StatisticsReport',
        component: () => import('@/views/statistics/Report.vue'),
        meta: { requiresAuth: true, title: '报表导出' },
      },
      
      // 系统管理模块
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/settings/Settings.vue'),
        meta: { requiresAuth: true, title: '账号权限' },
      },
      {
        path: '/settings/store',
        name: 'SettingsStore',
        component: () => import('@/views/settings/Store.vue'),
        meta: { requiresAuth: true, title: '门店配置' },
      },
      {
        path: '/settings/log',
        name: 'SettingsLog',
        component: () => import('@/views/settings/Log.vue'),
        meta: { requiresAuth: true, title: '操作日志' },
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
