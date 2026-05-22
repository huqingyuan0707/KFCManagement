<template>
  <div class="page-container">
    <div class="page-header">
      <h2>门店配置</h2>
      <el-button type="primary">保存配置</el-button>
    </div>
    
    <el-card class="page-content">
      <el-form label-width="120px">
        <el-form-item label="门店名称">
          <el-input v-model="form.storeName" placeholder="请输入门店名称" />
        </el-form-item>
        
        <el-form-item label="门店地址">
          <el-input v-model="form.address" placeholder="请输入门店地址" />
        </el-form-item>
        
        <el-form-item label="营业时间">
          <div class="time-picker">
            <el-time-picker v-model="form.openTime" format="HH:mm" placeholder="开始时间" />
            <span class="separator">至</span>
            <el-time-picker v-model="form.closeTime" format="HH:mm" placeholder="结束时间" />
          </div>
        </el-form-item>
        
        <el-form-item label="起送价">
          <el-input v-model="form.minOrderAmount" placeholder="请输入起送价" />
          <span class="unit">元</span>
        </el-form-item>
        
        <el-form-item label="配送范围">
          <el-input v-model="form.deliveryRange" placeholder="请输入配送范围" />
          <span class="unit">公里</span>
        </el-form-item>
        
        <el-form-item label="库存预警阈值">
          <el-input v-model="form.inventoryWarning" placeholder="请输入预警阈值" />
          <span class="unit">%</span>
        </el-form-item>
        
        <el-form-item label="自动接单">
          <el-switch v-model="form.autoAccept" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary">保存配置</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const form = reactive({
  storeName: '肯德基XX店',
  address: 'XX市XX区XX路XX号',
  openTime: '06:00',
  closeTime: '23:00',
  minOrderAmount: '20',
  deliveryRange: '3',
  inventoryWarning: '30',
  autoAccept: true
});
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

.time-picker {
  display: flex;
  align-items: center;
  gap: 10px;
  
  .separator {
    color: #999;
  }
}

.unit {
  margin-left: 8px;
  color: #999;
}
</style>
