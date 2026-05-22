<template>
  <div class="page-container">
    <div class="page-header">
      <h2>活动统计</h2>
      <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
    </div>
    
    <div class="stats-cards">
      <el-card class="stat-card">
        <div class="stat-value">12,580</div>
        <div class="stat-label">参与人数</div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-value">892</div>
        <div class="stat-label">核销数量</div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-value">¥586,000</div>
        <div class="stat-label">活动营收</div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-value">32.5%</div>
        <div class="stat-label">核销率</div>
      </el-card>
    </div>
    
    <el-card class="page-content">
      <h3>活动效果排行</h3>
      <el-table :data="tableData" border>
        <el-table-column prop="rank" label="排名" width="60">
          <template #default="scope">
            <span :class="{ top: scope.row.rank <= 3 }">{{ scope.row.rank }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" />
        <el-table-column prop="participants" label="参与人数" />
        <el-table-column prop="used" label="核销数量" />
        <el-table-column prop="revenue" label="活动营收" />
        <el-table-column prop="rate" label="核销率" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dateRange = ref(['2024-01-01', '2024-01-31']);

const tableData = ref([
  { rank: 1, name: '新年特惠套餐', participants: 5678, used: 3456, revenue: '234,500', rate: '60.8%' },
  { rank: 2, name: '新品上市推广', participants: 2341, used: 1892, revenue: '89,200', rate: '80.8%' },
  { rank: 3, name: '汉堡第二份半价', participants: 1258, used: 892, revenue: '58,600', rate: '70.9%' },
  { rank: 4, name: '会员专属优惠', participants: 892, used: 456, revenue: '32,400', rate: '51.1%' },
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

.stats-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  
  .stat-card {
    flex: 1;
    text-align: center;
    
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #D92121;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 14px;
      color: #666;
    }
  }
}

.page-content {
  min-height: calc(100vh - 350px);
  
  h3 {
    font-size: 16px;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 4px solid #D92121;
  }
}

.top {
  color: #D92121;
  font-weight: 700;
}
</style>
