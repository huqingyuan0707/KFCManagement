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
  ElInputNumber,
  ElMessage,
  ElPagination,
  ElCheckbox,
  ElTooltip
} from 'element-plus';
import { Plus, Edit, Trash2, Search, Download } from '@element-plus/icons-vue';
import { 
  getProductList, 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  type IProduct,
  type IProductListParams
} from '@/api/product';

const tableData = ref<IProduct[]>([]);
const total = ref(0);
const loading = ref(false);
const searchKeyword = ref('');
const statusFilter = ref<number | undefined>();
const categoryFilter = ref('');
const selectedIds = ref<number[]>([]);

const pagination = reactive({
  page: 1,
  pageSize: 10,
});

const dialogVisible = ref(false);
const isEdit = ref(false);
const form = reactive({
  id: 0,
  name: '',
  price: 0,
  category: '',
  status: 1,
  description: '',
});

const categories = ['汉堡类', '炸鸡类', '饮料类', '甜点类', '套餐类'];

const loadData = async () => {
  loading.value = true;
  try {
    const params: IProductListParams = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      status: statusFilter.value,
      category: categoryFilter.value || undefined,
    };
    const res = await getProductList(params);
    tableData.value = res.list;
    total.value = res.total;
  } catch (error) {
    console.error('Load products error:', error);
    ElMessage.error('加载商品列表失败');
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
  categoryFilter.value = '';
  pagination.page = 1;
  loadData();
};

const handleAdd = () => {
  isEdit.value = false;
  form.id = 0;
  form.name = '';
  form.price = 0;
  form.category = '';
  form.status = 1;
  form.description = '';
  dialogVisible.value = true;
};

const handleEdit = (row: IProduct) => {
  isEdit.value = true;
  form.id = row.id;
  form.name = row.name;
  form.price = row.price;
  form.category = row.category;
  form.status = row.status;
  form.description = row.description;
  dialogVisible.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await deleteProduct(id);
    ElMessage.success('删除成功');
    loadData();
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的商品');
    return;
  }
  try {
    for (const id of selectedIds.value) {
      await deleteProduct(id);
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
  if (!form.name || !form.category || form.price <= 0) {
    ElMessage.warning('请填写完整信息');
    return;
  }
  
  try {
    if (isEdit.value) {
      await updateProduct(form.id, {
        name: form.name,
        price: form.price,
        category: form.category,
        status: form.status,
        description: form.description,
      });
      ElMessage.success('修改成功');
    } else {
      await createProduct({
        name: form.name,
        price: form.price,
        category: form.category,
        status: form.status,
        description: form.description,
      });
      ElMessage.success('创建成功');
    }
    dialogVisible.value = false;
    loadData();
  } catch (error) {
    ElMessage.error(isEdit.value ? '修改失败' : '创建失败');
  }
};

const handleSelectionChange = (val: number[]) => {
  selectedIds.value = val;
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="product-page">
    <div class="page-header">
      <div class="search-bar">
        <el-input 
          v-model="searchKeyword"
          placeholder="搜索商品名称"
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #suffix><Search @click="handleSearch" /></template>
        </el-input>
        <el-select 
          v-model="categoryFilter"
          placeholder="选择分类"
          class="filter-select"
        >
          <el-option label="全部" value="" />
          <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
        </el-select>
        <el-select 
          v-model="statusFilter"
          placeholder="选择状态"
          class="filter-select"
        >
          <el-option label="全部" :value="undefined" />
          <el-option label="在售" :value="1" />
          <el-option label="下架" :value="0" />
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
        <el-button type="primary" @click="handleAdd">
          <Plus />
          <span>添加商品</span>
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
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="category" label="分类" />
      <el-table-column 
        prop="price" 
        label="价格" 
        :formatter="(row) => `¥${row.price.toFixed(2)}`"
      />
      <el-table-column 
        prop="status" 
        label="状态"
        :formatter="(row) => row.status === 1 ? '在售' : '下架'"
      />
      <el-table-column prop="description" label="描述" />
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
      :title="isEdit ? '编辑商品' : '添加商品'" 
      :visible="dialogVisible"
      @close="dialogVisible = false"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option v-for="cat in categories" :key="cat" :label="cat" :value="cat" />
          </el-select>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input-number 
            v-model="form.price" 
            :min="0" 
            :step="0.01"
            placeholder="请输入价格"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option :label="1" :value="1" />
            <el-option :label="0" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入商品描述" />
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
.product-page {
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