<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { 
  ElCard, 
  ElForm, 
  ElFormItem, 
  ElInput,
  ElSelect,
  ElOption,
  ElButton,
  ElMessage,
  ElSwitch,
  ElRadioGroup,
  ElRadio
} from 'element-plus';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

const settingsForm = reactive({
  theme: 'light',
  language: 'zh-CN',
  sidebarCollapsed: false,
  autoSave: true,
  notification: true,
});

const themeOptions = [
  { label: '浅色主题', value: 'light' },
  { label: '深色主题', value: 'dark' },
];

const languageOptions = [
  { label: '中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
];

onMounted(() => {
  settingsForm.theme = appStore.theme;
  settingsForm.language = appStore.language;
  settingsForm.sidebarCollapsed = appStore.sidebarCollapsed;
});

const handleSave = () => {
  appStore.setTheme(settingsForm.theme);
  appStore.setLanguage(settingsForm.language);
  appStore.sidebarCollapsed = settingsForm.sidebarCollapsed;
  
  ElMessage.success('设置保存成功');
};

const handleReset = () => {
  settingsForm.theme = 'light';
  settingsForm.language = 'zh-CN';
  settingsForm.sidebarCollapsed = false;
  settingsForm.autoSave = true;
  settingsForm.notification = true;
  
  appStore.setTheme('light');
  appStore.setLanguage('zh-CN');
  appStore.sidebarCollapsed = false;
  
  ElMessage.info('已重置为默认设置');
};
</script>

<template>
  <div class="settings-page">
    <el-card title="系统设置" class="settings-card">
      <el-form :model="settingsForm" label-width="120px">
        <el-form-item label="主题模式">
          <ElRadioGroup v-model="settingsForm.theme">
            <ElRadio v-for="opt in themeOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </ElRadio>
          </ElRadioGroup>
        </el-form-item>
        
        <el-form-item label="语言设置">
          <el-select v-model="settingsForm.language" placeholder="请选择语言">
            <el-option v-for="opt in languageOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="侧边栏折叠">
          <ElSwitch v-model="settingsForm.sidebarCollapsed" />
        </el-form-item>
        
        <el-form-item label="自动保存">
          <ElSwitch v-model="settingsForm.autoSave" />
        </el-form-item>
        
        <el-form-item label="消息通知">
          <ElSwitch v-model="settingsForm.notification" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存设置</el-button>
          <el-button @click="handleReset">重置默认</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
    <el-card title="关于系统" class="about-card">
      <div class="about-info">
        <div class="info-item">
          <span class="label">系统名称</span>
          <span class="value">KFC后台管理系统</span>
        </div>
        <div class="info-item">
          <span class="label">版本号</span>
          <span class="value">v1.0.0</span>
        </div>
        <div class="info-item">
          <span class="label">技术栈</span>
          <span class="value">Vue 3 + TypeScript + Element Plus</span>
        </div>
        <div class="info-item">
          <span class="label">构建工具</span>
          <span class="value">Vite</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.settings-page {
  display: flex;
  gap: 24px;
  
  .settings-card {
    flex: 1;
  }
  
  .about-card {
    width: 400px;
    
    .about-info {
      .info-item {
        display: flex;
        justify-content: space-between;
        padding: 12px 0;
        border-bottom: 1px solid #f0f0f0;
        
        &:last-child {
          border-bottom: none;
        }
        
        .label {
          color: #999;
          font-size: 14px;
        }
        
        .value {
          color: #333;
          font-size: 14px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>