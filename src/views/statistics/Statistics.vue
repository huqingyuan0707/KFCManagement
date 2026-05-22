<template>
  <div class="page-container">
    <div class="page-header">
      <h2>营收统计</h2>
      <el-select v-model="period" placeholder="选择周期">
        <el-option label="今日" value="day" />
        <el-option label="本周" value="week" />
        <el-option label="本月" value="month" />
        <el-option label="自定义" value="custom" />
      </el-select>
    </div>
    
    <div class="stats-cards">
      <el-card class="stat-card">
        <div class="stat-value">¥128,500</div>
        <div class="stat-label">今日营收</div>
        <div class="stat-change positive">+12.5%</div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-value">2,341</div>
        <div class="stat-label">订单数量</div>
        <div class="stat-change positive">+8.3%</div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-value">¥54.9</div>
        <div class="stat-label">客单价</div>
        <div class="stat-change positive">+5.2%</div>
      </el-card>
      <el-card class="stat-card">
        <div class="stat-value">2.3%</div>
        <div class="stat-label">退款率</div>
        <div class="stat-change negative">-1.1%</div>
      </el-card>
    </div>
    
    <div class="charts-row">
      <el-card class="chart-card">
        <h3>营收趋势</h3>
        <div class="chart-placeholder">
          <el-progress type="line" :percentage="65" :show-text="false" />
          <el-progress type="line" :percentage="82" :show-text="false" />
          <el-progress type="line" :percentage="78" :show-text="false" />
          <el-progress type="line" :percentage="95" :show-text="false" />
          <el-progress type="line" :percentage="88" :show-text="false" />
          <el-progress type="line" :percentage="92" :show-text="false" />
          <el-progress type="line" :percentage="100" :show-text="false" />
        </div>
      </el-card>
      
      <el-card class="chart-card">
        <h3>支付方式占比</h3>
        <div class="pie-placeholder">
          <div class="pie-chart">
            <div class="pie-slice slice1"></div>
            <div class="pie-slice slice2"></div>
            <div class="pie-slice slice3"></div>
            <div class="pie-center"></div>
          </div>
          <div class="pie-legend">
            <span><i class="dot dot1"></i> 微信支付 55%</span>
            <span><i class="dot dot2"></i> 支付宝 35%</span>
            <span><i class="dot dot3"></i> 现金 10%</span>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const period = ref('day');
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
    position: relative;
    
    .stat-value {
      font-size: 28px;
      font-weight: 700;
      color: #D92121;
      margin-bottom: 5px;
    }
    
    .stat-label {
      font-size: 14px;
      color: #666;
      margin-bottom: 5px;
    }
    
    .stat-change {
      font-size: 12px;
      position: absolute;
      top: 15px;
      right: 15px;
      
      &.positive {
        color: #67C23A;
      }
      
      &.negative {
        color: #F56C6C;
      }
    }
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

.chart-placeholder {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
}

.pie-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 20px;
}

.pie-chart {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: conic-gradient(#D92121 0deg 198deg, #E6A23C 198deg 324deg, #67C23A 324deg 360deg);
  position: relative;
  
  .pie-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
  }
}

.pie-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  span {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    
    &.dot1 { background: #D92121; }
    &.dot2 { background: #E6A23C; }
    &.dot3 { background: #67C23A; }
  }
}
</style>
