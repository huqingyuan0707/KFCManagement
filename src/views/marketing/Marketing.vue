<template>
  <div class="page-container">
    <div class="page-header">
      <h2>营销活动</h2>
      <div class="header-actions">
        <el-button type="primary">新增活动</el-button>
      </div>
    </div>
    
    <el-card class="page-content">
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="活动名称" />
        <el-table-column prop="type" label="活动类型">
          <template #default="scope">
            <el-tag :type="getTypeTag(scope.row.type)">
              {{ getTypeText(scope.row.type) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <el-table-column prop="status" label="活动状态">
          <template #default="scope">
            <el-tag :type="getStatusTag(scope.row.status)">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="participants" label="参与人数" />
        <el-table-column prop="revenue" label="活动营收" />
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="small">编辑</el-button>
            <el-button size="small" :type="scope.row.status === 'active' ? 'warning' : 'success'">
              {{ scope.row.status === 'active' ? '暂停' : '启动' }}
            </el-button>
            <el-button size="small">数据统计</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tableData = ref([
  { name: '新年特惠套餐', type: 'package', startTime: '2024-01-01', endTime: '2024-01-31', status: 'active', participants: 1258, revenue: '58,600.00' },
  { name: '汉堡第二份半价', type: 'discount', startTime: '2024-01-05', endTime: '2024-01-20', status: 'active', participants: 892, revenue: '32,400.00' },
  { name: '新品上市推广', type: 'new', startTime: '2024-01-10', endTime: '2024-02-10', status: 'active', participants: 2341, revenue: '89,200.00' },
  { name: '圣诞限时优惠', type: 'flash', startTime: '2023-12-20', endTime: '2023-12-25', status: 'ended', participants: 5678, revenue: '234,500.00' },
]);

const getTypeTag = (type: string) => {
  const tags: Record<string, string> = {
    discount: 'warning',
    package: 'primary',
    new: 'success',
    flash: 'danger'
  };
  return tags[type] || 'default';
};

const getTypeText = (type: string) => {
  const texts: Record<string, string> = {
    discount: '限时折扣',
    package: '套餐优惠',
    new: '新品推广',
    flash: '限时秒杀'
  };
  return texts[type] || type;
};

const getStatusTag = (status: string) => {
  const tags: Record<string, string> = {
    pending: 'info',
    active: 'success',
    ended: 'default',
    offline: 'warning'
  };
  return tags[status] || 'default';
};

const getStatusText = (status: string) => {
  const texts: Record<string, string> = {
    pending: '未开始',
    active: '进行中',
    ended: '已结束',
    offline: '已下架'
  };
  return texts[status] || status;
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
  }
}

.page-content {
  min-height: calc(100vh - 200px);
}
</style>
