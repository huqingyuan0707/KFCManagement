<template>
  <div class="page-container">
    <div class="page-header">
      <h2>库存日志</h2>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="time" label="操作时间" />
        <el-table-column prop="type" label="操作类型">
          <template #default="scope">
            <el-tag :type="getTypeTag(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="material" label="食材名称" />
        <el-table-column prop="change" label="变动数量">
          <template #default="scope">
            <span :class="scope.row.change > 0 ? 'increase' : 'decrease'">
              {{ scope.row.change > 0 ? '+' : '' }}{{ scope.row.change }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="before" label="变动前" />
        <el-table-column prop="after" label="变动后" />
        <el-table-column prop="operator" label="操作人" />
        <el-table-column prop="remark" label="备注" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
  { time: '2024-01-01 10:30:00', type: 'in', material: '面包胚', change: 100, before: 50, after: 150, operator: '管理员', remark: '日常入库' },
  { time: '2024-01-01 10:25:00', type: 'out', material: '炸鸡排', change: -5, before: 50, after: 45, operator: '操作员', remark: '订单出库' },
  { time: '2024-01-01 10:20:00', type: 'out', material: '生菜', change: -2, before: 32, after: 30, operator: '操作员', remark: '订单出库' },
  { time: '2024-01-01 10:15:00', type: 'loss', material: '酱料', change: -1, before: 21, after: 20, operator: '管理员', remark: '损耗登记' },
  { time: '2024-01-01 10:00:00', type: 'in', material: '芝士片', change: 50, before: 150, after: 200, operator: '管理员', remark: '日常入库' },
]);

const getTypeTag = (type: string) => {
  const tags: Record<string, string> = {
    in: 'success',
    out: 'primary',
    loss: 'danger',
    check: 'info'
  };
  return tags[type] || 'default';
};

const getTypeText = (type: string) => {
  const texts: Record<string, string> = {
    in: '入库',
    out: '出库',
    loss: '损耗',
    check: '盘点'
  };
  return texts[type] || type;
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

.increase {
  color: #67C23A;
}

.decrease {
  color: #F56C6C;
}
</style>
