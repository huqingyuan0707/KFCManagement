<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { 
  ElTable, 
  ElTableColumn, 
  ElButton, 
  ElDialog, 
  ElForm, 
  ElFormItem, 
  ElInput,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElMessage,
  ElPagination,
  ElCheckbox
} from 'element-plus';
import { Edit, Trash2, Search, Download } from '@element-plus/icons-vue';
import { 
  getOrderList, 
  updateOrder, 
  deleteOrder, 
  type IOrder,
  type IOrderListParams
} from '@/api/order';

const tableData = ref<IOrder[]>([]);
const total = ref(0);
const loading = ref(false);
const searchKeyword = ref('');
const statusFilter = ref<number | undefined>();
const selectedIds = ref<number[]>([]);

const pagination = reactive({
  page: 1,
  pageSize: 10,
});

const dialogVisible = ref(false);
const form = reactive({
  id: 0,
  orderNo: '',
  customerName: '',
  phone: '',
  address: '',
  totalAmount: 0,
  status: 1,
  paymentMethod: '',
});

const statusOptions = [
  { label: '待支付', value: 0 },
  { label: '已支付', value: 1 },
  { label: '已发货', value: 2 },
  { label: '已完成', value: 3 },
  { label: '已取消', value: 4 },
];

const paymentMethods = ['微信支付', '支付宝', '银行卡'];

const loadData = async () => {
  loading.value = true;
  try {
    const params: IOrderListParams = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      status: statusFilter.value,
    };
    const res = await getOrderList(params);
    tableData.value = res.list;
    total.value = res.total;
  } catch (error) {
    console.error('Load orders error:', error);
    ElMessage.error('加载订单列表失败');
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  pagination.page = 1;
  loadData();
};

const handleReset = () => {
  searchKeyword.value = '';
  statusFilter.value = undefined;
  pagination.page = 1;
  loadData();
};

const handleEdit = (row: IOrder) => {
  form.id = row.id;
  form.orderNo = row.orderNo;
  form.customerName = row.customerName;
  form.phone = row.phone;
  form.address = row.address;
  form.totalAmount = row.totalAmount;
  form.status = row.status;
  form.paymentMethod = row.paymentMethod;
  dialogVisible.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await deleteOrder(id);
    ElMessage.success('删除成功');
    loadData();
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的订单');
    return;
  }
  try {
    for (const id of selectedIds.value) {
      await deleteOrder(id);
    }
    ElMessage.success('批量删除成功');
    selectedIds.value = [];
    loadData();
  } catch (error) {
    ElMessage.error('批量删除失败');
  }
};

const handleExport = () => {
  ElMessage.info('导出功能开发中');
};

const handleSubmit = async () => {
  try {
    await updateOrder(form.id, {
      status: form.status,
    });
    ElMessage.success('修改成功');
    dialogVisible.value = false;
    loadData();
  } catch (error) {
    ElMessage.error('修改失败');
  }
};

const handleSelectionChange = (val: number[]) => {
  selectedIds.value = val;
};

const getStatusLabel = (status: number): string => {
  const option = statusOptions.find(opt => opt.value === status);
  return option?.label || '未知';
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="order-page">
    <div class="page-header">
      <div class="search-bar">
        <el-input 
          v-model="searchKeyword"
          placeholder="搜索订单号/客户名称"
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #suffix><Search @click="handleSearch" /></template>
        </el-input>
        <el-select 
          v-model="statusFilter"
          placeholder="选择状态"
          class="filter-select"
        >
          <el-option label="全部" :value="undefined" />
          <el-option v-for="opt in statusOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
        </el-select>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </div>
      <div class="action-bar">
        <el-button type="danger" @click="handleBatchDelete" :disabled="selectedIds.length === 0">
          批量删除
        </el-button>
        <el-button @click="handleExport">
          <Download />
          <span>导出</span>
        </el-button>
      </div>
    </div>
    
    <el-table 
      :data="tableData"
      border
      :loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="orderNo" label="订单号" />
      <el-table-column prop="customerName" label="客户名称" />
      <el-table-column prop="phone" label="联系电话" />
      <el-table-column prop="address" label="配送地址" />
      <el-table-column 
        prop="totalAmount" 
        label="订单金额" 
        :formatter="(row) => `¥${row.totalAmount.toFixed(2)}`"
      />
      <el-table-column 
        prop="status" 
        label="状态"
        :formatter="(row) => getStatusLabel(row.status)"
      />
      <el-table-column prop="paymentMethod" label="支付方式" />
      <el-table-column 
        prop="createTime" 
        label="创建时间"
        :formatter="(row) => new Date(row.createTime).toLocaleString('zh-CN')"
      />
      <el-table-column label="操作" width="180">
        <template #default="scope">
          <el-button 
            type="primary" 
            size="small" 
            @click="handleEdit(scope.row)"
          >
            <Edit />
            <span>编辑</span>
          </el-button>
          <el-button 
            type="danger" 
            size="small" 
            @click="handleDelete(scope.row.id)"
          >
            <Trash2 />
            <span>删除</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="loadData"
        @current-change="loadData"
      />
    </div>
    
    <el-dialog 
      title="编辑订单" 
      :visible="dialogVisible"
      @close="dialogVisible = false"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="订单号">
          <el-input v-model="form.orderNo" disabled />
        </el-form-item>
        <el-form-item label="客户名称">
          <el-input v-model="form.customerName" disabled />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" disabled />
        </el-form-item>
        <el-form-item label="配送地址">
          <el-input v-model="form.address" disabled />
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input :value="`¥${form.totalAmount.toFixed(2)}`" disabled />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option v-for="opt in statusOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-input v-model="form.paymentMethod" disabled />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.order-page {
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    
    .search-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .search-input {
        width: 280px;
      }
      
      .filter-select {
        width: 150px;
      }
    }
    
    .action-bar {
      display: flex;
      gap: 12px;
    }
  }
  
  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 24px;
  }
}
</style>