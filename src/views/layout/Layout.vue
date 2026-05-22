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
  SignOut
} from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const appStore = useAppStore();

const menuItems = [
  { path: '/', name: 'Dashboard', label: '数据看板', icon: PieChart },
  { path: '/product', name: 'Product', label: '商品管理', icon: ShoppingBag },
  { path: '/order', name: 'Order', label: '订单管理', icon: Document },
  { path: '/user', name: 'User', label: '用户管理', icon: UserFilled },
  { path: '/settings', name: 'Settings', label: '系统设置', icon: Setting },
];

const currentPath = ref('');

onMounted(() => {
  currentPath.value = route.path;
});

const handleMenuClick = (path: string) => {
  currentPath.value = path;
  router.push(path);
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
          <span class="logo-text">KFC</span>
        </div>
      </div>
      
      <el-menu 
        mode="vertical"
        class="sidebar-menu"
        :collapse="appStore.sidebarCollapsed"
      >
        <el-menu-item 
          v-for="item in menuItems" 
          :key="item.path"
          :index="item.path"
          :class="{ active: currentPath === item.path }"
          @click="handleMenuClick(item.path)"
        >
          <component :is="item.icon" />
          <span>{{ item.label }}</span>
        </el-menu-item>
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
          <h1 class="page-title">{{ menuItems.find(item => item.path === currentPath)?.label || '欢迎' }}</h1>
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
                  <SignOut />
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
  background: #f5f5f5;
}

.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
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
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    
    .logo {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #ff6b35 0%, #d4145a 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .logo-text {
        font-size: 18px;
        font-weight: bold;
        color: #fff;
      }
    }
  }
  
  .sidebar-menu {
    flex: 1;
    border: none;
    background: transparent;
    padding: 20px 0;
    
    .el-menu-item {
      color: rgba(255, 255, 255, 0.8);
      margin: 4px 12px;
      border-radius: 8px;
      transition: all 0.2s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
      
      &.active {
        background: linear-gradient(135deg, #ff6b35 0%, #d4145a 100%);
        color: #fff;
      }
      
      i {
        font-size: 18px;
      }
    }
  }
  
  .sidebar-footer {
    padding: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    .toggle-btn {
      width: 100%;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: #fff;
      
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}

.main-content {
  flex: 1;
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  
  .sidebar-collapsed & {
    margin-left: 64px;
  }
}

.header {
  background: #fff;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .sidebar-toggle {
      background: transparent;
      border: none;
      color: #666;
      
      &:hover {
        background: #f5f5f5;
      }
    }
    
    .page-title {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }
  
  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .notification-btn {
      background: transparent;
      border: none;
      color: #666;
      position: relative;
      
      &::after {
        content: '';
        position: absolute;
        top: 4px;
        right: 4px;
        width: 8px;
        height: 8px;
        background: #ef4444;
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
        background: #f5f5f5;
      }
      
      .user-avatar {
        background: linear-gradient(135deg, #ff6b35 0%, #d4145a 100%);
      }
      
      .user-name {
        font-size: 14px;
        color: #333;
        font-weight: 500;
      }
    }
  }
}

.content-wrapper {
  padding: 24px;
}
</style>