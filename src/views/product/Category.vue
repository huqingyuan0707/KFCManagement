<template>
  <div class="page-container">
    <div class="page-header">
      <h2>商品分类管理</h2>
      <el-button type="primary">新增分类</el-button>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="分类名称" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 'enabled' ? 'success' : 'warning'">
              {{ scope.row.status === 'enabled' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" />
        <el-table-column prop="createTime" label="创建时间" />
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
  { name: '经典汉堡', status: 'enabled', sort: 1, createTime: '2024-01-01' },
  { name: '香辣汉堡', status: 'enabled', sort: 2, createTime: '2024-01-01' },
  { name: '套餐组合', status: 'enabled', sort: 3, createTime: '2024-01-01' },
  { name: '小食配餐', status: 'enabled', sort: 4, createTime: '2024-01-01' },
  { name: '饮品甜品', status: 'enabled', sort: 5, createTime: '2024-01-01' },
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
