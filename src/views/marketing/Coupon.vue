<template>
  <div class="page-container">
    <div class="page-header">
      <h2>优惠券管理</h2>
      <div class="header-actions">
        <el-button type="primary">新增优惠券</el-button>
      </div>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="优惠券名称" />
        <el-table-column prop="type" label="券类型">
          <template #default="scope">
            <el-tag :type="getTypeTag(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="优惠金额" />
        <el-table-column prop="condition" label="使用条件" />
        <el-table-column prop="total" label="发放数量" />
        <el-table-column prop="used" label="已使用" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusTag(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small">发放记录</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
  { name: '新人专享券', type: 'new', value: '满30减10', condition: '新人首单', total: 1000, used: 856, status: 'active' },
  { name: '满减优惠券', type: 'full', value: '满50减15', condition: '全场通用', total: 5000, used: 3256, status: 'active' },
  { name: '单品折扣券', type: 'single', value: '汉堡8折', condition: '汉堡单品', total: 2000, used: 1234, status: 'active' },
  { name: '会员专属券', type: 'member', value: '满100减30', condition: '会员专享', total: 1500, used: 892, status: 'active' },
]);

const getTypeTag = (type: string) => {
  const tags: Record<string, string> = {
    new: 'success',
    full: 'primary',
    single: 'warning',
    member: 'danger'
  };
  return tags[type] || 'default';
};

const getTypeText = (type: string) => {
  const texts: Record<string, string> = {
    new: '新客券',
    full: '满减券',
    single: '单品券',
    member: '会员券'
  };
  return texts[type] || type;
};

const getStatusTag = (status: string) => {
  const tags: Record<string, string> = {
    active: 'success',
    inactive: 'warning',
    expired: 'default'
  };
  return tags[status] || 'default';
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    active: '生效中',
    inactive: '已暂停',
    expired: '已过期'
  };
  return texts[status] || status;
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    gap: 10px;
  }
}

.page-content {
  min-height: calc(100vh - 200px);
}
</style>
