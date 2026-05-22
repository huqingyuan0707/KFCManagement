import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface IAppState {
  sidebarCollapsed: boolean;
  theme: string;
  language: string;
}

export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false);
  const theme = ref('light');
  const language = ref('zh-CN');

  const toggleSidebar = (): void => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };

  const setTheme = (newTheme: string): void => {
    theme.value = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setLanguage = (lang: string): void => {
    language.value = lang;
    localStorage.setItem('language', lang);
  };

  const initSettings = (): void => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    if (savedTheme) {
      theme.value = savedTheme;
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    if (savedLanguage) {
      language.value = savedLanguage;
    }
  };

  return {
    sidebarCollapsed,
    theme,
    language,
    toggleSidebar,
    setTheme,
    setLanguage,
    initSettings,
  };
}, {
  persist: {
    key: 'kfc-app',
    storage: localStorage,
  },
});