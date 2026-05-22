<template>
  <div class="page-container">
    <div class="page-header">
      <h2>操作日志</h2>
      <div class="header-actions">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        <el-input v-model="keyword" placeholder="搜索关键词" style="width: 200px;" />
      </div>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="time" label="操作时间" />
        <el-table-column prop="operator" label="操作人" />
        <el-table-column prop="type" label="操作类型">
          <template #default="scope">
            <el-tag :type="getTypeTag(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="module" label="操作模块" />
        <el-table-column prop="content" label="操作内容" />
        <el-table-column prop="ip" label="操作IP" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dateRange = ref(['2024-01-01', '2024-01-31']);
const keyword = ref('');

const tableData = ref([
  { time: '2024-01-31 10:30:00', operator: '管理员', type: 'update', module: '商品管理', content: '修改商品「香辣鸡腿堡」价格为25元', ip: '192.168.1.100' },
  { time: '2024-01-31 10:25:00', operator: '操作员', type: 'create', module: '订单管理', content: '接单订单 KFC202401310001', ip: '192.168.1.101' },
  { time: '2024-01-31 10:20:00', operator: '管理员', type: 'delete', module: '商品管理', content: '下架商品「老北京鸡肉卷」', ip: '192.168.1.100' },
  { time: '2024-01-31 10:15:00', operator: '店长', type: 'update', module: '库存管理', content: '入库食材「面包胚」100个', ip: '192.168.1.102' },
  { time: '2024-01-31 10:10:00', operator: '管理员', type: 'create', module: '营销活动', content: '创建活动「新年特惠套餐」', ip: '192.168.1.100' },
]);

const getTypeTag = (type: string) => {
  const tags: Record<string, string> = {
    create: 'success',
    update: 'primary',
    delete: 'danger',
    login: 'info'
  };
  return tags[type] || 'default';
};

const getTypeText = (type: string) => {
  const texts: Record<string, string> = {
    create: '新增',
    update: '修改',
    delete: '删除',
    login: '登录'
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
}
</style>
