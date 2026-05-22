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
  ElMessage,
  ElPagination,
  ElCheckbox
} from 'element-plus';
import { Plus, Edit, Trash2, Search, Download } from '@element-plus/icons-vue';
import { 
  getUserList, 
  createUser, 
  updateUser, 
  deleteUser, 
  type IUser,
  type IUserListParams
} from '@/api/user';

const tableData = ref<IUser[]>([]);
const total = ref(0);
const loading = ref(false);
const searchKeyword = ref('');
const statusFilter = ref<number | undefined>();
const roleFilter = ref('');
const selectedIds = ref<number[]>([]);

const pagination = reactive({
  page: 1,
  pageSize: 10,
});

const dialogVisible = ref(false);
const isEdit = ref(false);
const form = reactive({
  id: 0,
  username: '',
  realName: '',
  email: '',
  phone: '',
  role: '',
  status: 1,
});

const roles = ['admin', 'manager', 'user'];

const loadData = async () => {
  loading.value = true;
  try {
    const params: IUserListParams = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      status: statusFilter.value,
      role: roleFilter.value || undefined,
    };
    const res = await getUserList(params);
    tableData.value = res.list;
    total.value = res.total;
  } catch (error) {
    console.error('Load users error:', error);
    ElMessage.error('加载用户列表失败');
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
  roleFilter.value = '';
  pagination.page = 1;
  loadData();
};

const handleAdd = () => {
  isEdit.value = false;
  form.id = 0;
  form.username = '';
  form.realName = '';
  form.email = '';
  form.phone = '';
  form.role = 'user';
  form.status = 1;
  dialogVisible.value = true;
};

const handleEdit = (row: IUser) => {
  isEdit.value = true;
  form.id = row.id;
  form.username = row.username;
  form.realName = row.realName;
  form.email = row.email;
  form.phone = row.phone;
  form.role = row.role;
  form.status = row.status;
  dialogVisible.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await deleteUser(id);
    ElMessage.success('删除成功');
    loadData();
  } catch (error) {
    ElMessage.error('删除失败');
  }
};

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    ElMessage.warning('请选择要删除的用户');
    return;
  }
  try {
    for (const id of selectedIds.value) {
      await deleteUser(id);
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
  if (!form.username || !form.realName || !form.email) {
    ElMessage.warning('请填写完整信息');
    return;
  }
  
  try {
    if (isEdit.value) {
      await updateUser(form.id, {
        username: form.username,
        realName: form.realName,
        email: form.email,
        phone: form.phone,
        role: form.role,
        status: form.status,
      });
      ElMessage.success('修改成功');
    } else {
      await createUser({
        username: form.username,
        realName: form.realName,
        email: form.email,
        phone: form.phone,
        role: form.role,
        status: form.status,
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
  <div class="user-page">
    <div class="page-header">
      <div class="search-bar">
        <el-input 
          v-model="searchKeyword"
          placeholder="搜索用户名/姓名"
          class="search-input"
          @keyup.enter="handleSearch"
        >
          <template #suffix><Search @click="handleSearch" /></template>
        </el-input>
        <el-select 
          v-model="roleFilter"
          placeholder="选择角色"
          class="filter-select"
        >
          <el-option label="全部" value="" />
          <el-option v-for="role in roles" :key="role" :label="role" :value="role" />
        </el-select>
        <el-select 
          v-model="statusFilter"
          placeholder="选择状态"
          class="filter-select"
        >
          <el-option label="全部" :value="undefined" />
          <el-option label="正常" :value="1" />
          <el-option label="禁用" :value="0" />
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
          <span>添加用户</span>
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
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="realName" label="真实姓名" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="role" label="角色" />
      <el-table-column 
        prop="status" 
        label="状态"
        :formatter="(row) => row.status === 1 ? '正常' : '禁用'"
      />
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
      :title="isEdit ? '编辑用户' : '添加用户'" 
      :visible="dialogVisible"
      @close="dialogVisible = false"
    >
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="form.realName" placeholder="请输入真实姓名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" type="email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role">
            <el-option v-for="role in roles" :key="role" :label="role" :value="role" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option :label="1" :value="1" />
            <el-option :label="0" :value="0" />
          </el-select>
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
.user-page {
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