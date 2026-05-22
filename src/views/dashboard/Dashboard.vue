<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { 
  ShoppingBag, 
  Wallet, 
  Burger, 
  Clock, 
  CircleCheck,
  Warning,
  Plus,
  Document,
  Calendar,
  TrendCharts,
  Box,
  HotWater,
  WarnTriangleFilled,
  ArrowUp,
  ArrowDown,
  DocumentChecked,
  Present,
  Download,
  TrendingUp,
  Users,
  Percent,
  Store
} from '@element-plus/icons-vue';
import { getDashboardStatistics } from '@/api/dashboard';
import { type IDashboardStats, type IRecentOrder, type IHotProduct, type IStockWarning } from '@/api/dashboard';

const stats = ref<IDashboardStats>({
  todayOrders: 0,
  todayRevenue: 0,
  burgerSales: 0,
  pendingOrders: 0,
  verificationRate: 0,
  orderGrowth: 0,
  revenueGrowth: 0,
  statusCounts: {
    pending: 0,
    preparing: 0,
    waiting: 0,
    completed: 0,
    cancelled: 0
  }
});

const recentOrders = ref<IRecentOrder[]>([]);
const hotProducts = ref<IHotProduct[]>([]);
const stockWarnings = ref<IStockWarning[]>([]);

onMounted(() => {
  loadDashboardData();
});

const loadDashboardData = async () => {
  try {
    const res = await getDashboardStatistics();
    stats.value = res.stats;
    recentOrders.value = res.recentOrders;
    hotProducts.value = res.hotProducts;
    stockWarnings.value = res.stockWarnings;
  } catch (error) {
    console.error('Load dashboard data error:', error);
  }
};

const handleAddProduct = () => {
  window.location.href = '/product';
};

const handleVerifyOrder = () => {
  window.location.href = '/order';
};

const handleCreateActivity = () => {
  window.location.href = '/marketing';
};

const handleExportReport = () => {
  alert('导出日报功能开发中');
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    '待接单': '#f59e0b',
    '制作中': '#3b82f6',
    '待取餐': '#f59e0b',
    '已完成': '#10b981',
    '已取消': '#ef4444'
  };
  return colors[status] || '#64748b';
};

const formatPrice = (price: number): string => {
  return `¥${price.toFixed(2)}`;
};

const formatTime = (timeStr: string): string => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
};

const totalOrders = computed(() => {
  return stats.value.statusCounts.pending + 
         stats.value.statusCounts.preparing + 
         stats.value.statusCounts.waiting + 
         stats.value.statusCounts.completed + 
         stats.value.statusCounts.cancelled;
});

const averageOrderValue = computed(() => {
  if (stats.value.todayOrders === 0) return 0;
  return Math.round(stats.value.todayRevenue / stats.value.todayOrders);
});
</script>

<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <div class="header-left">
        <h1 class="page-title">工作台</h1>
        <p class="page-subtitle">欢迎回来！今日数据概览</p>
      </div>
      <div class="header-right">
        <div class="date-display">
          <Calendar />
          <span>{{ new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }) }}</span>
        </div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card primary">
        <div class="stat-icon-wrap">
          <ShoppingBag class="stat-icon" />
          <div class="stat-glow"></div>
        </div>
        <div class="stat-content">
          <div class="stat-label">今日订单</div>
          <div class="stat-value-row">
            <span class="stat-value">{{ stats.todayOrders }}</span>
            <span v-if="stats.orderGrowth !== 0" :class="['stat-trend', stats.orderGrowth > 0 ? 'up' : 'down']">
              <component :is="stats.orderGrowth > 0 ? ArrowUp : ArrowDown" />
              {{ Math.abs(stats.orderGrowth) }}%
            </span>
          </div>
          <div class="stat-description">较昨日 {{ stats.orderGrowth > 0 ? '增长' : '下降' }} {{ Math.abs(stats.orderGrowth) }}%</div>
        </div>
      </div>

      <div class="stat-card accent">
        <div class="stat-icon-wrap">
          <Wallet class="stat-icon" />
          <div class="stat-glow"></div>
        </div>
        <div class="stat-content">
          <div class="stat-label">今日营收</div>
          <div class="stat-value-row">
            <span class="stat-value">¥{{ stats.todayRevenue.toLocaleString() }}</span>
            <span v-if="stats.revenueGrowth !== 0" :class="['stat-trend', stats.revenueGrowth > 0 ? 'up' : 'down']">
              <component :is="stats.revenueGrowth > 0 ? ArrowUp : ArrowDown" />
              {{ Math.abs(stats.revenueGrowth) }}%
            </span>
          </div>
          <div class="stat-description">客单价 ¥{{ averageOrderValue }}</div>
        </div>
      </div>

      <div class="stat-card primary">
        <div class="stat-icon-wrap">
          <Burger class="stat-icon" />
          <div class="stat-glow"></div>
        </div>
        <div class="stat-content">
          <div class="stat-label">汉堡销量</div>
          <div class="stat-value-row">
            <span class="stat-value">{{ stats.burgerSales }}</span>
            <span class="stat-unit">份</span>
          </div>
          <div class="stat-description">占今日订单 {{ Math.round((stats.burgerSales / stats.todayOrders) * 100) || 0 }}%</div>
        </div>
      </div>

      <div class="stat-card accent">
        <div class="stat-icon-wrap">
          <Clock class="stat-icon" />
          <div class="stat-glow"></div>
        </div>
        <div class="stat-content">
          <div class="stat-label">待出餐</div>
          <div class="stat-value-row">
            <span class="stat-value">{{ stats.pendingOrders }}</span>
            <span class="stat-unit">单</span>
          </div>
          <div class="stat-description">需尽快处理</div>
        </div>
      </div>
    </div>

    <div class="main-content">
      <div class="left-panel">
        <div class="section-card">
          <div class="section-header">
            <h3 class="section-title">订单状态统计</h3>
          </div>
          <div class="status-grid">
            <div class="status-item">
              <div class="status-ring pending">
                <span class="ring-value">{{ stats.statusCounts.pending }}</span>
              </div>
              <div class="status-label">待接单</div>
            </div>
            <div class="status-item">
              <div class="status-ring preparing">
                <span class="ring-value">{{ stats.statusCounts.preparing }}</span>
              </div>
              <div class="status-label">制作中</div>
            </div>
            <div class="status-item">
              <div class="status-ring waiting">
                <span class="ring-value">{{ stats.statusCounts.waiting }}</span>
              </div>
              <div class="status-label">待取餐</div>
            </div>
            <div class="status-item">
              <div class="status-ring completed">
                <span class="ring-value">{{ stats.statusCounts.completed }}</span>
              </div>
              <div class="status-label">已完成</div>
            </div>
            <div class="status-item">
              <div class="status-ring cancelled">
                <span class="ring-value">{{ stats.statusCounts.cancelled }}</span>
              </div>
              <div class="status-label">已取消</div>
            </div>
            <div class="status-item total">
              <div class="status-ring total-ring">
                <span class="ring-value">{{ totalOrders }}</span>
              </div>
              <div class="status-label">总订单</div>
            </div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <h3 class="section-title">实时订单动态</h3>
            <span class="live-badge">
              <span class="live-dot"></span>
              实时更新
            </span>
          </div>
          <div class="order-list">
            <div v-for="(order, index) in recentOrders.slice(0, 6)" :key="order.id" class="order-item">
              <div class="order-index">{{ index + 1 }}</div>
              <div class="order-info">
                <div class="order-top">
                  <span class="order-no">{{ order.orderNo }}</span>
                  <span :class="['order-tag', order.status]" :style="{ background: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }">
                    {{ order.status }}
                  </span>
                </div>
                <div class="order-items">{{ order.items }}</div>
                <div class="order-bottom">
                  <span class="order-price">{{ formatPrice(order.amount) }}</span>
                  <span class="order-time">{{ formatTime(order.createTime) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-panel">
        <div class="section-card">
          <div class="section-header">
            <h3 class="section-title">热销爆款榜单</h3>
            <div class="hot-badge">
              <HotWater />
              <span>今日TOP10</span>
            </div>
          </div>
          <div class="ranking-list">
            <div v-for="(product, index) in hotProducts" :key="product.id" :class="['ranking-item', { top3: index < 3 }]">
              <span :class="['rank-num', `rank-${index + 1}`]">{{ index + 1 }}</span>
              <div class="product-info">
                <span class="product-name">{{ product.name }}</span>
                <span class="product-category">{{ product.category }}</span>
              </div>
              <div class="product-sales">
                <span class="sales-value">{{ product.sales }}</span>
                <span class="sales-label">份</span>
              </div>
              <span class="product-revenue">{{ formatPrice(product.revenue) }}</span>
            </div>
          </div>
        </div>

        <div class="section-card">
          <div class="section-header">
            <h3 class="section-title">库存预警提醒</h3>
          </div>
          <div v-if="stockWarnings.length > 0" class="warning-list">
            <div v-for="item in stockWarnings" :key="item.id" :class="['warning-item', { urgent: item.level === 'urgent' }]">
              <div class="warning-icon">
                <WarnTriangleFilled />
              </div>
              <div class="warning-content">
                <div class="warning-header">
                  <span class="warning-name">{{ item.name }}</span>
                  <span :class="['warning-tag', item.level]">{{ item.level === 'urgent' ? '紧急' : '提醒' }}</span>
                </div>
                <div class="warning-detail">
                  <span>当前: {{ item.current }} {{ item.unit }}</span>
                  <span class="detail-separator">/</span>
                  <span>阈值: {{ item.threshold }} {{ item.unit }}</span>
                </div>
                <div class="warning-bar">
                  <div 
                    class="warning-fill" 
                    :style="{ 
                      width: Math.min((item.current / item.threshold) * 100, 100) + '%',
                      background: item.level === 'urgent' ? '#ef4444' : '#f59e0b'
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty-warning">
            <Box class="empty-icon" />
            <p>暂无库存预警</p>
          </div>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <div class="action-card" @click="handleAddProduct">
        <div class="action-icon primary">
          <Plus />
        </div>
        <div class="action-text">
          <span class="action-title">新增商品</span>
          <span class="action-desc">上架新品到菜单</span>
        </div>
      </div>
      <div class="action-card" @click="handleVerifyOrder">
        <div class="action-icon secondary">
          <DocumentChecked />
        </div>
        <div class="action-text">
          <span class="action-title">核销订单</span>
          <span class="action-desc">验证并完成订单</span>
        </div>
      </div>
      <div class="action-card" @click="handleCreateActivity">
        <div class="action-icon accent">
          <Present />
        </div>
        <div class="action-text">
          <span class="action-title">发布活动</span>
          <span class="action-desc">创建促销活动</span>
        </div>
      </div>
      <div class="action-card" @click="handleExportReport">
        <div class="action-icon default">
          <Download />
        </div>
        <div class="action-text">
          <span class="action-title">导出日报</span>
          <span class="action-desc">生成销售报表</span>
        </div>
      </div>
    </div>

    <div class="bottom-stats">
      <div class="bottom-stat">
        <div class="stat-icon-small">
          <TrendingUp />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.todayOrders }}</span>
          <span class="stat-label">今日订单</span>
        </div>
      </div>
      <div class="bottom-stat">
        <div class="stat-icon-small">
          <Wallet />
        </div>
        <div class="stat-info">
          <span class="stat-value">¥{{ stats.todayRevenue.toLocaleString() }}</span>
          <span class="stat-label">今日营收</span>
        </div>
      </div>
      <div class="bottom-stat">
        <div class="stat-icon-small">
          <Burger />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.burgerSales }}</span>
          <span class="stat-label">汉堡销量</span>
        </div>
      </div>
      <div class="bottom-stat">
        <div class="stat-icon-small">
          <Percent />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.verificationRate }}%</span>
          <span class="stat-label">核销率</span>
        </div>
      </div>
      <div class="bottom-stat">
        <div class="stat-icon-small">
          <Store />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ stats.statusCounts.completed }}</span>
          <span class="stat-label">已完成订单</span>
        </div>
      </div>
      <div class="bottom-stat">
        <div class="stat-icon-small">
          <Users />
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ Math.round(stats.todayRevenue / 35) }}</span>
          <span class="stat-label">服务顾客</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  padding: 24px;
  min-height: 100vh;
  background: linear-gradient(180deg, #fdf2f2 0%, #fff 30%);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  
  .header-left {
    .page-title {
      font-size: 28px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px 0;
    }
    
    .page-subtitle {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
  }
  
  .header-right {
    .date-display {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #fff;
      border-radius: 30px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
      font-size: 14px;
      color: #334155;
      
      svg {
        width: 18px;
        height: 18px;
        color: #D92121;
      }
    }
  }
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.stat-card {
  position: relative;
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
  
  &.primary {
    background: linear-gradient(135deg, #fff5f5 0%, #fef2f2 100%);
    border: 1px solid #fecaca;
    
    .stat-icon-wrap {
      .stat-icon {
        color: #fff;
      }
      
      .stat-glow {
        background: radial-gradient(circle, rgba(217, 33, 33, 0.3) 0%, transparent 70%);
      }
    }
    
    .stat-icon-wrap {
      background: linear-gradient(135deg, #D92121 0%, #b91c1c 100%);
    }
  }
  
  &.accent {
    background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
    border: 1px solid #fed7aa;
    
    .stat-icon-wrap {
      .stat-icon {
        color: #D92121;
      }
      
      .stat-glow {
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
      }
    }
    
    .stat-icon-wrap {
      background: linear-gradient(135deg, #FFD700 0%, #fbbf24 100%);
    }
  }
  
  .stat-icon-wrap {
    position: relative;
    width: 64px;
    height: 64px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
    
    .stat-icon {
      font-size: 28px;
      z-index: 1;
    }
    
    .stat-glow {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: pulse 2s ease-in-out infinite;
    }
  }
  
  .stat-content {
    flex: 1;
    padding-left: 20px;
    
    .stat-label {
      font-size: 13px;
      color: #64748b;
      margin-bottom: 8px;
      display: block;
    }
    
    .stat-value-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      
      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: #0f172a;
      }
      
      .stat-unit {
        font-size: 14px;
        color: #64748b;
      }
      
      .stat-trend {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 13px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 20px;
        
        &.up {
          color: #10b981;
          background: #d1fae5;
        }
        
        &.down {
          color: #ef4444;
          background: #fee2e2;
        }
        
        svg {
          width: 14px;
          height: 14px;
        }
      }
    }
    
    .stat-description {
      font-size: 12px;
      color: #94a3b8;
      margin-top: 6px;
      display: block;
    }
  }
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.section-card {
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    .section-title {
      font-size: 16px;
      font-weight: 600;
      color: #0f172a;
      margin: 0;
    }
    
    .live-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #ef4444;
      font-weight: 500;
      
      .live-dot {
        width: 8px;
        height: 8px;
        background: #ef4444;
        border-radius: 50%;
        animation: blink 1.5s ease-in-out infinite;
      }
    }
    
    .hot-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #D92121;
      font-weight: 500;
      
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  
  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-radius: 16px;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &.total {
      background: linear-gradient(135deg, #D92121 0%, #b91c1c 100%);
      
      .status-label {
        color: rgba(255, 255, 255, 0.8);
      }
      
      .ring-value {
        color: #fff;
      }
    }
    
    .status-ring {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      font-weight: 700;
      font-size: 20px;
      
      .ring-value {
        color: #0f172a;
      }
      
      &.pending {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 3px solid #fbbf24;
      }
      
      &.preparing {
        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
        border: 3px solid #3b82f6;
      }
      
      &.waiting {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 3px solid #fbbf24;
      }
      
      &.completed {
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        border: 3px solid #10b981;
      }
      
      &.cancelled {
        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        border: 3px solid #ef4444;
      }
      
      &.total-ring {
        background: rgba(255, 255, 255, 0.2);
        border: 3px solid rgba(255, 255, 255, 0.3);
      }
    }
    
    .status-label {
      font-size: 13px;
      color: #64748b;
      font-weight: 500;
    }
  }
}

.order-list {
  .order-item {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 12px;
    transition: background 0.2s ease;
    
    &:hover {
      background: #f1f5f9;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .order-index {
      width: 28px;
      height: 28px;
      background: #e2e8f0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color: #64748b;
      flex-shrink: 0;
    }
    
    .order-info {
      flex: 1;
      min-width: 0;
      
      .order-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        
        .order-no {
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
        }
        
        .order-tag {
          font-size: 11px;
          padding: 3px 8px;
          border-radius: 12px;
          font-weight: 500;
        }
      }
      
      .order-items {
        font-size: 13px;
        color: #64748b;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 6px;
        display: block;
      }
      
      .order-bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .order-price {
          font-size: 14px;
          font-weight: 600;
          color: #D92121;
        }
        
        .order-time {
          font-size: 12px;
          color: #94a3b8;
        }
      }
    }
  }
}

.ranking-list {
  .ranking-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px;
    border-radius: 12px;
    margin-bottom: 8px;
    transition: background 0.2s ease;
    
    &:hover {
      background: #f8fafc;
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.top3 {
      background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
      padding: 16px;
      margin: 0 -24px 8px;
      padding-left: 24px;
      padding-right: 24px;
      border-radius: 0;
    }
    
    .rank-num {
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      flex-shrink: 0;
      
      &.rank-1 {
        background: linear-gradient(135deg, #FFD700 0%, #fbbf24 100%);
        color: #D92121;
      }
      
      &.rank-2 {
        background: linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%);
        color: #475569;
      }
      
      &.rank-3 {
        background: linear-gradient(135deg, #fdba74 0%, #f97316 100%);
        color: #fff;
      }
      
      &:not(.rank-1):not(.rank-2):not(.rank-3) {
        background: #f1f5f9;
        color: #64748b;
      }
    }
    
    .product-info {
      flex: 1;
      min-width: 0;
      
      .product-name {
        font-size: 14px;
        font-weight: 600;
        color: #0f172a;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .product-category {
        font-size: 12px;
        color: #94a3b8;
      }
    }
    
    .product-sales {
      text-align: right;
      
      .sales-value {
        font-size: 18px;
        font-weight: 700;
        color: #0f172a;
        display: block;
      }
      
      .sales-label {
        font-size: 11px;
        color: #94a3b8;
      }
    }
    
    .product-revenue {
      font-size: 14px;
      font-weight: 600;
      color: #D92121;
      margin-left: 12px;
    }
  }
}

.warning-list {
  .warning-item {
    display: flex;
    gap: 12px;
    padding: 16px;
    background: #fff;
    border-radius: 12px;
    margin-bottom: 12px;
    border-left: 4px solid #f59e0b;
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateX(4px);
    }
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.urgent {
      border-left-color: #ef4444;
      background: #fff5f5;
      
      .warning-icon {
        svg {
          color: #ef4444;
        }
      }
    }
    
    .warning-icon {
      width: 40px;
      height: 40px;
      background: #fef3c7;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      
      svg {
        width: 20px;
        height: 20px;
        color: #f59e0b;
      }
    }
    
    .warning-content {
      flex: 1;
      
      .warning-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        
        .warning-name {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }
        
        .warning-tag {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 12px;
          font-weight: 500;
          
          &.urgent {
            background: #fee2e2;
            color: #ef4444;
          }
          
          &.warning {
            background: #fef3c7;
            color: #f59e0b;
          }
        }
      }
      
      .warning-detail {
        font-size: 12px;
        color: #64748b;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        
        .detail-separator {
          color: #cbd5e1;
        }
      }
      
      .warning-bar {
        height: 6px;
        background: #f1f5f9;
        border-radius: 3px;
        overflow: hidden;
        
        .warning-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
      }
    }
  }
}

.empty-warning {
  text-align: center;
  padding: 40px;
  
  .empty-icon {
    font-size: 48px;
    color: #d1fae5;
    margin-bottom: 16px;
  }
  
  p {
    color: #94a3b8;
    font-size: 14px;
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 32px;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
  }
  
  .action-icon {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    
    &.primary {
      background: linear-gradient(135deg, #D92121 0%, #b91c1c 100%);
      color: #fff;
    }
    
    &.secondary {
      background: #f1f5f9;
      color: #64748b;
    }
    
    &.accent {
      background: linear-gradient(135deg, #FFD700 0%, #fbbf24 100%);
      color: #D92121;
    }
    
    &.default {
      background: #f1f5f9;
      color: #64748b;
    }
  }
  
  .action-text {
    flex: 1;
    
    .action-title {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
      display: block;
      margin-bottom: 4px;
    }
    
    .action-desc {
      font-size: 12px;
      color: #94a3b8;
    }
  }
}

.bottom-stats {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.bottom-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  
  .stat-icon-small {
    width: 40px;
    height: 40px;
    background: #fef2f2;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #D92121;
    font-size: 18px;
  }
  
  .stat-info {
    .stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
      display: block;
    }
    
    .stat-label {
      font-size: 12px;
      color: #94a3b8;
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .main-content {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .bottom-stats {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-actions {
    grid-template-columns: 1fr;
  }
  
  .bottom-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .status-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>