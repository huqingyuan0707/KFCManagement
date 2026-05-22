<template>
  <div class="page-container">
    <div class="page-header">
      <h2>订单售后管理</h2>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="orderNo" label="订单编号" />
        <el-table-column prop="customer" label="顾客信息" />
        <el-table-column prop="type" label="售后类型">
          <template #default="scope">
            <el-tag :type="scope.row.type === 'refund' ? 'danger' : 'warning'">
              {{ scope.row.type === 'refund' ? '退款' : '投诉' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="售后原因" />
        <el-table-column prop="amount" label="涉及金额" />
        <el-table-column prop="status" label="处理状态">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="handler" label="处理人" />
        <el-table-column prop="handleTime" label="处理时间" />
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="small">查看详情</el-button>
            <el-button size="small" v-if="scope.row.status === 'pending'">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
  { orderNo: 'KFC202401010001', customer: '张先生', type: 'refund', reason: '商品不符', amount: '39.00', status: 'pending', handler: '-', handleTime: '-' },
  { orderNo: 'KFC202401010002', customer: '李女士', type: 'complaint', reason: '等待时间过长', amount: '0.00', status: 'processing', handler: '管理员', handleTime: '2024-01-01 10:30' },
  { orderNo: 'KFC202401010003', customer: '王先先生', type: 'refund', reason: '商品损坏', amount: '29.00', status: 'completed', handler: '管理员', handleTime: '2024-01-01 09:15' },
]);

const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    pending: 'warning',
    processing: 'info',
    completed: 'success',
    rejected: 'danger'
  };
  return types[status] || 'default';
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: '待处理',
    processing: '处理中',
    completed: '已完成',
    rejected: '已拒绝'
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
}

.page-content {
  min-height: calc(100vh - 200px);
}
</style>
