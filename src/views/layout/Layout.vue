<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { useAppStore } from '@/stores/app';
import { 
  ElMenu, 
  ElMenuItem, 
  ElSubMenu, 
  ElButton, 
  ElDropdown, 
  ElDropdownMenu, 
  ElDropdownItem,
  ElAvatar
} from 'element-plus';
import { 
  ShoppingBag, 
  Document, 
  User, 
  Setting, 
  ArrowLeft, 
  ArrowRight,
  Bell,
  PieChart,
  UserFilled,
  Back,
  Grid
} from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const appStore = useAppStore();

const menuItems = [
  { path: '/', name: 'Dashboard', label: '工作台', icon: PieChart },
  { 
    name: 'Product', 
    label: '商品管理', 
    icon: ShoppingBag,
    children: [
      { path: '/product', name: 'Product', label: '商品列表' },
      { path: '/product/category', name: 'ProductCategory', label: '分类管理' },
      { path: '/product/spec', name: 'ProductSpec', label: '规格配置' },
    ]
  },
  { 
    name: 'Order', 
    label: '订单管理', 
    icon: Document,
    children: [
      { path: '/order', name: 'Order', label: '订单列表' },
      { path: '/order/aftersale', name: 'OrderAftersale', label: '订单售后' },
    ]
  },
  { path: '/kitchen', name: 'Kitchen', label: '后厨出餐', icon: Grid },
  { 
    name: 'Inventory', 
    label: '库存管理', 
    icon: Document,
    children: [
      { path: '/inventory', name: 'Inventory', label: '库存管理' },
      { path: '/inventory/log', name: 'InventoryLog', label: '库存日志' },
    ]
  },
  { 
    name: 'Marketing', 
    label: '营销活动', 
    icon: ShoppingBag,
    children: [
      { path: '/marketing', name: 'Marketing', label: '活动列表' },
      { path: '/marketing/coupon', name: 'MarketingCoupon', label: '优惠券管理' },
      { path: '/marketing/statistics', name: 'MarketingStatistics', label: '活动统计' },
    ]
  },
  { 
    name: 'Statistics', 
    label: '数据统计', 
    icon: PieChart,
    children: [
      { path: '/statistics', name: 'Statistics', label: '营收统计' },
      { path: '/statistics/sales', name: 'StatisticsSales', label: '销量统计' },
      { path: '/statistics/report', name: 'StatisticsReport', label: '报表导出' },
    ]
  },
  { path: '/user', name: 'User', label: '用户管理', icon: UserFilled },
  { 
    name: 'Settings', 
    label: '系统设置', 
    icon: Setting,
    children: [
      { path: '/settings', name: 'Settings', label: '账号权限' },
      { path: '/settings/store', name: 'SettingsStore', label: '门店配置' },
      { path: '/settings/log', name: 'SettingsLog', label: '操作日志' },
    ]
  },
];

const currentPath = ref('');

onMounted(() => {
  currentPath.value = route.path;
});

const handleMenuClick = (path: string) => {
  currentPath.value = path;
  router.push(path);
};

const getPageTitle = () => {
  for (const item of menuItems) {
    if (item.path === currentPath.value) {
      return item.label;
    }
    if (item.children) {
      const child = item.children.find(c => c.path === currentPath.value);
      if (child) {
        return child.label;
      }
    }
  }
  return '欢迎';
};

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};

const handleToggleSidebar = () => {
  appStore.toggleSidebar();
};
</script>

<template>
  <div class="layout-container">
    <aside class="sidebar" :class="{ collapsed: appStore.sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <img 
            src="/src/static/KFC_logo-image.svg" 
            alt="KFC Logo" 
            class="logo-img"
          />
        </div>
        <div class="system-name">
          <span>KFC</span>
          <span class="sub-title">运营管理系统</span>
        </div>
      </div>
      
      <el-menu 
        mode="vertical"
        class="sidebar-menu"
        :collapse="appStore.sidebarCollapsed"
      >
        <template v-for="item in menuItems" :key="item.name">
          <el-menu-item 
            v-if="!item.children"
            :index="item.path"
            :class="{ active: currentPath === item.path }"
            @click="handleMenuClick(item.path)"
          >
            <component :is="item.icon" />
            <span>{{ item.label }}</span>
          </el-menu-item>
          <el-sub-menu v-else :index="item.name">
            <template #title>
              <component :is="item.icon" />
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item 
              v-for="child in item.children" 
              :key="child.path"
              :index="child.path"
              :class="{ active: currentPath === child.path }"
              @click="handleMenuClick(child.path)"
            >
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
      
      <div class="sidebar-footer">
        <el-button 
          class="toggle-btn"
          @click="handleToggleSidebar"
        >
          <ArrowLeft />
        </el-button>
      </div>
    </aside>
    
    <main class="main-content">
      <header class="header">
        <div class="header-left">
          <el-button 
            class="sidebar-toggle"
            @click="handleToggleSidebar"
          >
            <ArrowRight />
          </el-button>
          <h1 class="page-title">{{ getPageTitle() }}</h1>
        </div>
        
        <div class="header-right">
          <el-button 
            class="notification-btn"
          >
            <Bell />
          </el-button>
          
          <el-dropdown trigger="click">
            <div class="user-info">
              <el-avatar class="user-avatar">
              <User />
            </el-avatar>
              <span class="user-name">{{ userStore.userInfo?.realName || '用户' }}</span>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <User />
                  <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <Setting />
                  <span>账户设置</span>
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <Back />
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.sidebar {
  width: 240px;
  background: #D92121;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 100;
  
  &.collapsed {
    width: 64px;
  }
  
  .sidebar-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    
    .logo {
      width: 56px;
      height: 56px;
      background: #FFD700;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
      overflow: hidden;
      
      .logo-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    
    .system-name {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
      
      span {
        font-size: 14px;
        font-weight: 600;
        color: #fff;
        text-align: center;
      }
      
      .sub-title {
        font-size: 11px;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
        letter-spacing: 1px;
      }
    }
  }
  
  .sidebar-menu {
    flex: 1;
    border: none;
    background: transparent;
    padding: 20px 0;
    
    .el-menu-item {
      color: rgba(255, 255, 255, 0.9);
      margin: 4px 12px;
      border-radius: 8px;
      transition: all 0.2s ease;
      height: 48px;
      line-height: 48px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
        color: #fff;
      }
      
      &.active {
        background: rgba(255, 215, 0, 0.3);
        color: #fff;
      }
      
      i,
      svg {
        font-size: 18px !important;
        color: inherit !important;
        width: 20px !important;
        height: 20px !important;
        flex-shrink: 0;
      }
    }
    
    .el-sub-menu {
      .el-sub-menu__title {
        color: rgba(255, 255, 255, 0.9);
        margin: 4px 12px;
        border-radius: 8px;
        height: 48px;
        line-height: 48px;
        
        &:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }
        
        i,
        svg {
          font-size: 18px !important;
          color: inherit !important;
          width: 20px !important;
          height: 20px !important;
          flex-shrink: 0;
        }
      }
      
      .el-menu-item {
        margin: 2px 12px 2px 40px;
        height: 40px;
        line-height: 40px;
        font-size: 13px;
        background: #B31212;
        border-radius: 6px;
        border: 1px solid rgba(255, 255, 255, 0.15);
        
        &:hover {
          background: #C91515;
        }
        
        &.active {
          background: #E51C23 !important;
          color: #fff;
          border-color: rgba(255, 215, 0, 0.5);
        }
      }
    }
  }
  
  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    
    .toggle-btn {
      width: 100%;
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: #fff;
      border-radius: 8px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    }
  }
}

.main-content {
  flex: 1;
  margin-left: 240px;
  transition: margin-left 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  
  .sidebar-collapsed & {
    margin-left: 64px;
  }
}

.header {
  background: #D92121;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(217, 33, 33, 0.3);
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .sidebar-toggle {
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: #fff;
      border-radius: 8px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
    }
    
    .page-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #fff;
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .notification-btn {
      background: rgba(255, 255, 255, 0.15);
      border: none;
      color: #fff;
      position: relative;
      border-radius: 8px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.25);
      }
      
      &::after {
        content: '';
        position: absolute;
        top: 4px;
        right: 4px;
        width: 8px;
        height: 8px;
        background: #FFD700;
        border-radius: 50%;
      }
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 8px;
      
      &:hover {
        background: rgba(255, 255, 255, 0.15);
      }
      
      .user-avatar {
        background: #FFD700;
        color: #D92121;
      }
      
      .user-name {
        font-size: 14px;
        color: #fff;
        font-weight: 500;
      }
    }
  }
}

.content-wrapper {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>