<template>
  <div class="page-container">
    <div class="page-header">
      <h2>销量统计</h2>
      <el-select v-model="category" placeholder="选择分类">
        <el-option label="全部" value="all" />
        <el-option label="汉堡" value="burger" />
        <el-option label="套餐" value="package" />
        <el-option label="小食" value="side" />
        <el-option label="饮品" value="drink" />
      </el-select>
    </div>
    
    <div class="charts-row">
      <el-card class="chart-card">
        <h3>销量排行TOP10</h3>
        <div class="ranking-list">
          <div v-for="(item, index) in topSellers" :key="item.name" class="ranking-item">
            <span class="rank" :class="{ top3: index < 3 }">{{ index + 1 }}</span>
            <span class="name">{{ item.name }}</span>
            <span class="sales">{{ item.sales }}</span>
            <el-progress :percentage="item.percentage" :show-text="false" stroke-width="8" />
          </div>
        </div>
      </el-card>
      
      <el-card class="chart-card">
        <h3>品类销售占比</h3>
        <div class="category-bars">
          <div v-for="item in categoryData" :key="item.name" class="category-bar">
            <span class="label">{{ item.name }}</span>
            <div class="bar-container">
              <div class="bar" :style="{ width: item.percentage + '%', background: item.color }"></div>
            </div>
            <span class="percent">{{ item.percentage }}%</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const category = ref('all');

const topSellers = ref([
  { name: '香辣鸡腿堡', sales: 12580, percentage: 100 },
  { name: '奥尔良烤鸡腿堡', sales: 9856, percentage: 78 },
  { name: '原味鸡(5块)', sales: 8756, percentage: 70 },
  { name: '超值全家桶', sales: 6543, percentage: 52 },
  { name: '薯条(中)', sales: 5432, percentage: 43 },
  { name: '可乐(中)', sales: 4321, percentage: 34 },
  { name: '鸡翅(2块)', sales: 3210, percentage: 25 },
  { name: '蛋挞(6个)', sales: 2109, percentage: 17 },
  { name: '老北京鸡肉卷', sales: 1987, percentage: 16 },
  { name: '圣代', sales: 1234, percentage: 10 },
]);

const categoryData = ref([
  { name: '汉堡', percentage: 45, color: '#D92121' },
  { name: '套餐', percentage: 25, color: '#E6A23C' },
  { name: '小食', percentage: 18, color: '#67C23A' },
  { name: '饮品', percentage: 12, color: '#409EFF' },
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

.charts-row {
  display: flex;
  gap: 20px;
  
  .chart-card {
    flex: 1;
    
    h3 {
      font-size: 16px;
      margin-bottom: 15px;
      padding-left: 10px;
      border-left: 4px solid #D92121;
    }
  }
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  
  .rank {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: #f0f0f0;
    font-size: 12px;
    font-weight: 600;
    
    &.top3 {
      background: #D92121;
      color: #fff;
    }
  }
  
  .name {
    flex: 1;
    font-size: 14px;
  }
  
  .sales {
    width: 80px;
    text-align: right;
    font-size: 14px;
    font-weight: 600;
    color: #D92121;
  }
}

.category-bars {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.category-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .label {
    width: 60px;
    font-size: 14px;
  }
  
  .bar-container {
    flex: 1;
    height: 24px;
    background: #f5f5f5;
    border-radius: 12px;
    overflow: hidden;
    
    .bar {
      height: 100%;
      border-radius: 12px;
      transition: width 0.3s ease;
    }
  }
  
  .percent {
    width: 50px;
    text-align: right;
    font-size: 14px;
    font-weight: 600;
    color: #666;
  }
}
</style>
