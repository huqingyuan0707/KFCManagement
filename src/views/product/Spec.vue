<template>
  <div class="page-container">
    <div class="page-header">
      <h2>规格配置</h2>
      <el-button type="primary">新增规格</el-button>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="规格名称" />
        <el-table-column prop="type" label="规格类型" />
        <el-table-column prop="options" label="可选值">
          <template #default="scope">
            {{ scope.row.options.join(', ') }}
          </template>
        </el-table-column>
        <el-table-column prop="price" label="加价" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'enabled' ? 'success' : 'warning'">
              {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" :type="scope.row.status === 'enabled' ? 'warning' : 'success'">
              {{ scope.row.status === 'enabled' ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
  { name: '层数', type: '单选', options: ['单层', '双层'], price: '+5', status: 'enabled' },
  { name: '加芝士', type: '单选', options: ['是', '否'], price: '+3', status: 'enabled' },
  { name: '加培根', type: '单选', options: ['是', '否'], price: '+4', status: 'enabled' },
  { name: '去洋葱', type: '单选', options: ['是', '否'], price: '0', status: 'enabled' },
  { name: '去酱', type: '单选', options: ['是', '否'], price: '0', status: 'enabled' },
]);
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
}

.page-content {
  min-height: calc(100vh - 200px);
}
</style>
