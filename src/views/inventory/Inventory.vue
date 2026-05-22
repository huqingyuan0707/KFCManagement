<template>
  <div class="page-container">
    <div class="page-header">
      <h2>库存管理</h2>
      <div class="header-actions">
        <el-button type="primary">入库</el-button>
        <el-button>出库</el-button>
        <el-button>盘点</el-button>
      </div>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="食材名称" />
        <el-table-column prop="category" label="分类" />
        <el-table-column prop="unit" label="单位" />
        <el-table-column prop="quantity" label="库存数量">
          <template #default="scope">
            <span :class="{ warning: scope.row.quantity < scope.row.warning, danger: scope.row.quantity < scope.row.danger }">
              {{ scope.row.quantity }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="warning" label="预警阈值" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row)">
              {{ getStatusText(scope.row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdate" label="最后更新" />
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="small">入库</el-button>
            <el-button size="small">出库</el-button>
            <el-button size="small">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
  { name: '面包胚', category: '主食', unit: '个', quantity: 100, warning: 50, danger: 20, lastUpdate: '2024-01-01 10:00' },
  { name: '牛肉饼', category: '主食', unit: '个', quantity: 80, warning: 50, danger: 20, lastUpdate: '2024-01-01 09:30' },
  { name: '炸鸡排', category: '主食', unit: '个', quantity: 45, warning: 50, danger: 20, lastUpdate: '2024-01-01 08:00' },
  { name: '芝士片', category: '配料', unit: '片', quantity: 200, warning: 100, danger: 50, lastUpdate: '2024-01-01 10:00' },
  { name: '生菜', category: '配料', unit: '份', quantity: 30, warning: 50, danger: 20, lastUpdate: '2024-01-01 07:30' },
  { name: '酱料', category: '配料', unit: '瓶', quantity: 20, warning: 10, danger: 5, lastUpdate: '2024-01-01 08:00' },
]);

const getStatusType = (row: { quantity: number; warning: number; danger: number }) => {
  if (row.quantity < row.danger) return 'danger';
  if (row.quantity < row.warning) return 'warning';
  return 'success';
};

const getStatusText = (row: { quantity: number; warning: number; danger: number }) => {
  if (row.quantity < row.danger) return '库存不足';
  if (row.quantity < row.warning) return '即将不足';
  return '库存充足';
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

.warning {
  color: #E6A23C;
  font-weight: 600;
}

.danger {
  color: #F56C6C;
  font-weight: 600;
}
</style>
