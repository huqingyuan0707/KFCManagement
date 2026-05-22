import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { login as loginApi, logout as logoutApi, getUserInfo, type User } from '@/api/user';
import { ElMessage } from 'element-plus';

export interface IUserState {
  token: string;
  userInfo: User | null;
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string>(localStorage.getItem('token') || '');
  const userInfo = ref<User | null>(null);

  const isLoggedIn = computed(() => !!token.value);
  const hasPermission = computed(() => (permission: string) => {
    if (!userInfo.value) return false;
    return userInfo.value.role === 'admin' || (userInfo.value as unknown as { permissions?: string[] }).permissions?.includes(permission);
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await loginApi({ username, password });
      token.value = res.token;
      userInfo.value = res.userInfo;
      localStorage.setItem('token', res.token);
      localStorage.setItem('userInfo', JSON.stringify(res.userInfo));
      ElMessage.success('登录成功');
      return true;
    } catch (error) {
      ElMessage.error('登录失败');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await logoutApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      token.value = '';
      userInfo.value = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      ElMessage.success('退出成功');
    }
  };

  const loadUserInfo = async (): Promise<void> => {
    try {
      const res = await getUserInfo();
      userInfo.value = res;
      localStorage.setItem('userInfo', JSON.stringify(res));
    } catch (error) {
      console.error('Load user info error:', error);
    }
  };

  const initUserInfo = (): void => {
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      userInfo.value = JSON.parse(savedUserInfo);
    }
  };

  return {
    token,
    userInfo,
    isLoggedIn,
    hasPermission,
    login,
    logout,
    loadUserInfo,
    initUserInfo,
  };
}, {
  persist: {
    key: 'kfc-user',
    storage: localStorage,
  },
});