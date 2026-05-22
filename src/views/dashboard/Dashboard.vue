<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { 
  ElCard, 
  ElRow, 
  ElCol, 
  ElTable, 
  ElTableColumn,
  ElStatistic,
  ElProgress
} from 'element-plus';
import { 
  ShoppingBag, 
  Document, 
  UserFilled, 
  TrendCharts,
  ArrowUp,
  ArrowDown
} from '@element-plus/icons-vue';
import { getOrderStatistics } from '@/api/order';
import { getProductList } from '@/api/product';
import { type IProduct } from '@/api/product';

const statistics = ref({
  totalOrders: 1286,
  totalProducts: 89,
  totalUsers: 3567,
  revenue: 128600,
  orderGrowth: 12.5,
  revenueGrowth: 8.3,
});

const recentProducts = ref<IProduct[]>([]);

onMounted(() => {
  loadStatistics();
  loadRecentProducts();
});

const loadStatistics = async () => {
  try {
    const res = await getOrderStatistics();
    if (res) {
      statistics.value = { ...statistics.value, ...res };
    }
  } catch (error) {
    console.error('Load statistics error:', error);
  }
};

const loadRecentProducts = async () => {
  try {
    const res = await getProductList({ page: 1, pageSize: 5 });
    recentProducts.value = res.list;
  } catch (error) {
    console.error('Load recent products error:', error);
  }
};

const formatPrice = (price: number): string => {
  return `¥${price.toFixed(2)}`;
};

const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('zh-CN');
};
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="24">
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-icon orders">
            <ShoppingBag />
          </div>
          <div class="stat-info">
            <el-statistic 
              title="今日订单" 
              :value="statistics.totalOrders"
              :suffix="`+${statistics.orderGrowth}%`"
              suffix-style="color: #10b981"
            >
              <template #prefix><ArrowUp class="prefix-icon" /></template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-icon products">
            <ShoppingBag />
          </div>
          <div class="stat-info">
            <el-statistic 
              title="商品总数" 
              :value="statistics.totalProducts"
            />
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-icon users">
            <UserFilled />
          </div>
          <div class="stat-info">
            <el-statistic 
              title="用户总数" 
              :value="statistics.totalUsers"
              suffix="+5.2%"
              suffix-style="color: #10b981"
            >
              <template #prefix><ArrowUp class="prefix-icon" /></template>
            </el-statistic>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="6">
        <el-card class="stat-card">
          <div class="stat-icon revenue">
            <TrendCharts />
          </div>
          <div class="stat-info">
            <el-statistic 
              title="今日营收" 
              :value="statistics.revenue"
              prefix="¥"
              :suffix="`+${statistics.revenueGrowth}%`"
              suffix-style="color: #10b981"
            />
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="24" style="margin-top: 24px;">
      <el-col :span="16">
        <el-card title="销售趋势" class="chart-card">
          <div class="chart-placeholder">
            <el-progress 
              type="line" 
              :percentage="75" 
              :stroke-width="6"
              stroke-color="#ff6b35"
            />
            <p style="text-align: center; margin-top: 16px; color: #999;">销售数据可视化区域</p>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card title="商品分类占比" class="chart-card">
          <div class="category-list">
            <div class="category-item">
              <span class="category-color" style="background: #ff6b35;"></span>
              <span class="category-name">汉堡类</span>
              <span class="category-percent">35%</span>
            </div>
            <div class="category-item">
              <span class="category-color" style="background: #d4145a;"></span>
              <span class="category-name">炸鸡类</span>
              <span class="category-percent">28%</span>
            </div>
            <div class="category-item">
              <span class="category-color" style="background: #06b6d4;"></span>
              <span class="category-name">饮料类</span>
              <span class="category-percent">22%</span>
            </div>
            <div class="category-item">
              <span class="category-color" style="background: #10b981;"></span>
              <span class="category-name">甜点类</span>
              <span class="category-percent">15%</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
    <el-row :gutter="24" style="margin-top: 24px;">
      <el-col :span="24">
        <el-card title="最近商品">
          <el-table :data="recentProducts" border>
            <el-table-column prop="id" label="ID" width="80" />
            <el-table-column prop="name" label="商品名称" />
            <el-table-column prop="category" label="分类" />
            <el-table-column 
              prop="price" 
              label="价格" 
              :formatter="formatPrice"
            />
            <el-table-column 
              prop="status" 
              label="状态"
              :formatter="(row) => row.status === 1 ? '在售' : '下架'"
            />
            <el-table-column 
              prop="createTime" 
              label="创建时间"
              :formatter="formatDate"
            />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  .stat-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 24px;
    border-radius: 20px;
    border: 1px solid #f1f5f9;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
    
    .stat-icon {
      width: 56px;
      height: 56px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #fff;
      
      &.orders {
        background: linear-gradient(135deg, #D92121 0%, #c51616 100%);
      }
      
      &.products {
        background: linear-gradient(135deg, #FFD700 0%, #ffc107 100%);
        color: #D92121;
      }
      
      &.users {
        background: linear-gradient(135deg, #D92121 0%, #c51616 100%);
      }
      
      &.revenue {
        background: linear-gradient(135deg, #FFD700 0%, #ffc107 100%);
        color: #D92121;
      }
    }
    
    .stat-info {
      flex: 1;
    }
  }
  
  .chart-card {
    height: 100%;
    border-radius: 20px;
    border: 1px solid #f1f5f9;
    
    .chart-placeholder {
      padding: 32px;
    }
    
    .category-list {
      padding: 16px;
      
      .category-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 0;
        
        .category-color {
          width: 12px;
          height: 12px;
          border-radius: 3px;
        }
        
        .category-name {
          flex: 1;
          font-size: 14px;
          color: #64748b;
        }
        
        .category-percent {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }
      }
    }
  }
  
  .el-table {
    border-radius: 16px;
    
    .el-table__header {
      background: #f1f5f9;
      
      th {
        font-weight: 600;
        color: #0f172a;
      }
    }
    
    .el-table__row {
      &:nth-child(even) {
        background: #fef2f2;
      }
      
      &:hover {
        background: #f1f5f9;
      }
    }
  }
}
</style>