<template>
  <div class="page-container">
    <div class="page-header">
      <h2>报表导出</h2>
      <div class="header-actions">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        <el-select v-model="type" placeholder="报表类型">
          <el-option label="日报" value="daily" />
          <el-option label="周报" value="weekly" />
          <el-option label="月报" value="monthly" />
        </el-select>
        <el-button type="primary">导出Excel</el-button>
      </div>
    </div>
    
    <el-card class="page-content">
      <h3>报表列表</h3>
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="报表名称" />
        <el-table-column prop="type" label="报表类型">
          <template #default="scope">
            <el-tag>{{ getTypeText(scope.row.type) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="报表日期" />
        <el-table-column prop="size" label="文件大小" />
        <el-table-column prop="createTime" label="生成时间" />
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="small">下载</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dateRange = ref(['2024-01-01', '2024-01-31']);
const type = ref('daily');

const tableData = ref([
  { name: '2024年1月31日营业日报', type: 'daily', date: '2024-01-31', size: '125 KB', createTime: '2024-01-31 23:59:59' },
  { name: '2024年第5周营业周报', type: 'weekly', date: '2024-01-28至2024-02-03', size: '456 KB', createTime: '2024-02-03 23:59:59' },
  { name: '2024年1月营业月报', type: 'monthly', date: '2024-01', size: '1.2 MB', createTime: '2024-02-01 00:00:00' },
  { name: '2024年1月30日营业日报', type: 'daily', date: '2024-01-30', size: '118 KB', createTime: '2024-01-30 23:59:59' },
  { name: '2024年1月29日营业日报', type: 'daily', date: '2024-01-29', size: '132 KB', createTime: '2024-01-29 23:59:59' },
]);

const getTypeText = (type: string) => {
  const texts: Record<string, string> = {
    daily: '日报',
    weekly: '周报',
    monthly: '月报'
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
  
  .header-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
}

.page-content {
  min-height: calc(100vh - 200px);
  
  h3 {
    font-size: 16px;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 4px solid #D92121;
  }
}
</style>
