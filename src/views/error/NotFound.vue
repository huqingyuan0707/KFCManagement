<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElButton } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';

const router = useRouter();

const handleGoHome = () => {
  router.push('/');
};
</script>

<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h2>页面未找到</h2>
      <p>抱歉，您访问的页面不存在或已被删除</p>
      <el-button type="primary" @click="handleGoHome">
        <ArrowLeft />
        <span>返回首页</span>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.not-found-content {
  text-align: center;
  
  .error-code {
    font-size: 120px;
    font-weight: bold;
    color: #ff6b35;
    margin-bottom: 24px;
    text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 12px;
  }
  
  p {
    color: #999;
    margin-bottom: 32px;
  }
}
</style>