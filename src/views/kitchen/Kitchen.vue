<template>
  <div class="page-container">
    <div class="page-header">
      <h2>后厨出餐</h2>
      <div class="header-actions">
        <el-button type="primary">刷新订单</el-button>
      </div>
    </div>
    
    <div class="kitchen-content">
      <div class="order-section">
        <h3>待制作订单</h3>
        <div class="order-list">
          <el-card v-for="order in pendingOrders" :key="order.id" class="order-card">
            <div class="order-header">
              <span class="order-no">{{ order.orderNo }}</span>
              <span class="takeout-no">取餐号: {{ order.takeoutNo }}</span>
            </div>
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <span>{{ item.name }}</span>
                <span class="spec" v-if="item.spec">{{ item.spec }}</span>
                <span class="quantity">×{{ item.quantity }}</span>
              </div>
            </div>
            <div class="order-footer">
              <span class="time">下单时间: {{ order.createTime }}</span>
              <div class="actions">
                <el-button size="small" type="primary">开始制作</el-button>
                <el-button size="small">异常报备</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      
      <div class="order-section">
        <h3>制作中订单</h3>
        <div class="order-list">
          <el-card v-for="order in processingOrders" :key="order.id" class="order-card processing">
            <div class="order-header">
              <span class="order-no">{{ order.orderNo }}</span>
              <span class="takeout-no">取餐号: {{ order.takeoutNo }}</span>
            </div>
            <div class="order-items">
              <div v-for="item in order.items" :key="item.id" class="order-item">
                <span>{{ item.name }}</span>
                <span class="spec" v-if="item.spec">{{ item.spec }}</span>
                <span class="quantity">×{{ item.quantity }}</span>
              </div>
            </div>
            <div class="order-footer">
              <span class="time">制作时间: {{ order.processTime }}</span>
              <div class="actions">
                <el-button size="small" type="success">制作完成</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pendingOrders = ref([
  {
    id: 1,
    orderNo: 'KFC202401010001',
    takeoutNo: 'A001',
    createTime: '10:30:00',
    items: [
      { id: 1, name: '香辣鸡腿堡', spec: '双层', quantity: 1 },
      { id: 2, name: '薯条(中)', quantity: 1 },
      { id: 3, name: '可乐(中)', quantity: 1 }
    ]
  },
  {
    id: 2,
    orderNo: 'KFC202401010002',
    takeoutNo: 'A002',
    createTime: '10:32:00',
    items: [
      { id: 1, name: '奥尔良烤鸡腿堡', quantity: 2 },
      { id: 2, name: '鸡翅(2块)', quantity: 1 }
    ]
  }
]);

const processingOrders = ref([
  {
    id: 3,
    orderNo: 'KFC202401010003',
    takeoutNo: 'A003',
    processTime: '10:28:00',
    items: [
      { id: 1, name: '原味鸡(5块)', quantity: 1 },
      { id: 2, name: '蛋挞(6个)', quantity: 1 }
    ]
  }
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

.kitchen-content {
  display: flex;
  gap: 20px;
}

.order-section {
  flex: 1;
  
  h3 {
    font-size: 16px;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 4px solid #D92121;
  }
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-card {
  .order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    
    .order-no {
      font-weight: 600;
    }
    
    .takeout-no {
      background: #D92121;
      color: #fff;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }
  }
  
  .order-items {
    margin-bottom: 10px;
    
    .order-item {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      
      .spec {
        color: #999;
        font-size: 12px;
      }
      
      .quantity {
        color: #D92121;
      }
    }
  }
  
  .order-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 10px;
    border-top: 1px solid #eee;
    
    .time {
      font-size: 12px;
      color: #999;
    }
  }
  
  &.processing {
    border-left: 4px solid #FFD700;
  }
}
</style>
