<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import { View, Hide, User, Lock } from '@element-plus/icons-vue';

const router = useRouter();
const userStore = useUserStore();

const form = reactive({
  username: '',
  password: '',
});

const passwordVisible = ref(false);
const loading = ref(false);

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: '密码长度在6到30个字符', trigger: 'blur' },
  ],
};

const handleLogin = async () => {
  loading.value = true;
  
  const success = await userStore.login(form.username, form.password);
  
  if (success) {
    router.push('/');
  } else {
    ElMessage.error('登录失败，请检查用户名和密码');
  }
  
  loading.value = false;
};

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-header">
        <div class="logo">
          <span class="logo-text">KFC</span>
        </div>
        <h2>后台管理系统</h2>
        <p>欢迎登录，开始您的工作</p>
      </div>
      
      <el-form 
        class="login-form"
        :model="form" 
        :rules="rules"
        ref="formRef"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
          >
            <template #prefix-icon><User /></template>
          </el-input>
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            :type="passwordVisible ? 'text' : 'password'"
            placeholder="请输入密码"
            @click="togglePasswordVisible"
          >
            <template #prefix-icon><Lock /></template>
            <template #suffix-icon>
              <Hide v-if="passwordVisible" />
              <View v-else />
            </template>
          </el-input>
        </el-form-item>
        
        <el-button 
          type="primary" 
          class="login-btn"
          :loading="loading"
          @click="handleLogin"
        >
          登录
        </el-button>
      </el-form>
      
      <div class="login-footer">
        <span>忘记密码？</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff6b35 0%, #d4145a 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-wrapper {
  background: #fff;
  border-radius: 16px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
  
  .logo {
    width: 80px;
    height: 80px;
    margin: 0 auto 20px;
    background: linear-gradient(135deg, #ff6b35 0%, #d4145a 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .logo-text {
      font-size: 28px;
      font-weight: bold;
      color: #fff;
    }
  }
  
  h2 {
    margin: 0 0 8px;
    font-size: 24px;
    color: #333;
  }
  
  p {
    margin: 0;
    color: #999;
    font-size: 14px;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }
  
  .el-input {
    height: 48px;
    font-size: 14px;
  }
}

.login-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #ff6b35 0%, #d4145a 100%);
  border: none;
  
  &:hover {
    opacity: 0.9;
  }
}

.login-footer {
  text-align: center;
  margin-top: 24px;
  
  span {
    color: #666;
    font-size: 14px;
    cursor: pointer;
    
    &:hover {
      color: #ff6b35;
    }
  }
}
</style>