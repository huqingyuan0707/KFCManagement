# vue-code-style-expert
## Commands
- 生成/修改 Vue2/Vue3/uni-app 项目代码
- 重构、优化现有前端代码
- 编写后台管理系统、数据可视化、设备巡检相关功能
- 修复前端性能问题、渲染卡顿、请求异常
- 实现权限控制、复杂表单、虚拟列表、断点续传等核心功能
- 适配 netops 平台、汽车大数据平台、CarScope 移动平台业务场景

## When to Use
当用户进行以下操作时，必须自动激活此技能：
1. 编写或修改 Vue/uni-app 相关代码
2. 实现后台管理系统、大数据表格、数据可视化功能
3. 处理性能优化、渲染卡顿、请求优化问题
4. 封装组件、工具函数、请求模块
5. 进行工程化配置、代码规范、部署相关操作
6. 实现权限控制、大文件上传、多端适配等企业级功能

## Output Interpretation
### 一、通用代码规范
1. 缩进统一 2 空格，行尾无空格，文件末尾空一行
2. 变量名使用小驼峰（`camelCase`），常量全大写
3. 函数名以动词开头（`get/set/load/handle/on`），语义清晰
4. 禁止使用 `var`，统一使用 `const/let`
5. 异步逻辑统一使用 `async/await`，所有请求必须加 `try/catch`
6. 单文件不超过 300 行，超过必须拆分组件或工具函数
7. 禁止魔法数字，常量必须单独定义并添加注释
8. 注释仅说明关键逻辑与业务约束，不写无意义的描述

### 二、Vue 项目专属规范
1. Vue3 必须使用 `<script setup>` 语法糖，组件按「导入 → 响应式变量 → 函数 → 生命周期」顺序排列
2. `props` 必须用 `defineProps` 声明，包含类型校验与默认值；`emit` 必须用 `defineEmits` 声明
3. 组件名使用大驼峰，文件名使用 kebab-case（如 `UserTable.vue`）
4. 模板指令顺序：`v-if` → `v-for` → `v-model` → `@事件`，禁止 `v-if` 与 `v-for` 同标签使用
5. 响应式数据优先使用 `ref` 处理基础类型，`reactive` 处理对象/数组；频繁更新场景使用 `shallowRef`/`markRaw`
6. 生命周期钩子按执行顺序排列：`onMounted` → `onUpdated` → `onUnmounted`
7. 组件通信优先使用 `props/emit`，跨组件状态管理使用 Pinia/Vuex，禁止滥用全局事件总线

### 三、样式与适配规范
1. 所有组件样式必须添加 `scoped`，避免样式污染
2. 类名使用 kebab-case（如 `table-container`），层级不超过 3 层
3. uni-app 项目必须使用 `rpx` 单位，禁止直接写 `px`；大屏适配使用 `scale` 自适应方案
4. 公共样式、变量、混合宏抽离至全局文件，避免重复定义
5. 禁止滥用 `!important`，必须使用时需添加注释说明业务场景与必要性

### 四、请求与数据处理规范
1. 必须使用统一封装的请求方法，禁止在页面内直接写 `axios/uni.request`
2. 所有请求必须添加 `loading` 状态、错误提示与重试机制，避免重复提交
3. 频繁请求必须添加防抖/节流，减少无效请求
4. 大数据场景优先使用分页加载、虚拟列表、数据分片策略，避免一次性渲染全部数据
5. 大文件上传必须使用 Web Worker + 动态切片 + IndexedDB 断点续传方案

### 五、后台管理系统规范
1. 权限控制遵循「用户→角色→菜单→按钮→数据」五级体系，通过路由守卫、自定义指令实现权限校验
2. 表格必须支持分页、搜索、多选、导出功能，大数据场景默认启用虚拟列表
3. 表单必须支持实时校验、重置、提交防重，复杂表单使用配置化渲染方案
4. ECharts 图表按需引入，监听窗口 resize 事件，组件销毁时必须销毁实例

### 六、简历项目场景适配规范
#### 场景1：服务器数据采集与管控 平台（服务器数据采集与管控）
- 监控看板：使用 ECharts 实现飞线图、实时数据更新，添加防抖刷新逻辑
- 大文件上传：Web Worker 计算 MD5，切片大小 2MB，并发数根据网络自适应调节，支持断点续传
- 权限管控：通过自定义指令实现按钮级权限控制，动态路由过滤无权限页面，权限数据持久化存储

#### 场景2：汽车大数据平台
- 十万级数据表格：实现虚拟列表，仅渲染可视区域数据，配合数据分片加载与缓存策略
- 配置化开发：通过 JSON 配置渲染表单、表格、查询条件，无需修改页面代码即可适配多业务形态
- 数据导出：支持 Excel 批量导出，单次处理数据量不低于 10000 条，添加加载状态与进度提示

#### 场景3：CarScope 移动平台（设备巡检）
- 复杂表单：实现 12 套设备巡检表单的配置化渲染，支持文本、数字、单选、拍照、签名等多类型数据录入
- 多端适配：使用 rpx 单位 + 媒体查询，覆盖 30+ 主流机型，弱网环境下支持表单数据本地缓存，网络恢复后自动提交
- 请求优化：通过节流控制下拉刷新请求频率，减少冗余请求，降低服务器压力

### 七、输出格式要求
1. 先说明实现思路与业务背景，再给出完整可运行代码
2. 代码中关键位置添加注释，解释核心逻辑与业务约束
3. 提供遇到的坑与优化建议，适配真实项目场景
4. 涉及性能优化的代码，必须标注优化前后的量化效果（如加载速度提升比例、请求减少数量）

## Examples
### 示例1：Vue3 后台表格组件
```vue
<template>
  <div class="table-container">
    <div class="search-bar">
      <el-input v-model="searchKeyword" placeholder="请输入设备名称" clearable />
      <el-button type="primary" @click="loadTableData">查询</el-button>
    </div>
    <el-table 
      v-loading="loading" 
      :data="tableData" 
      border 
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="设备ID" prop="deviceId" width="120" />
      <el-table-column label="设备名称" prop="deviceName" />
      <el-table-column label="状态" prop="status">
        <template #default="{ row }">
          <el-tag :type="row.status === 'online' ? 'success' : 'danger'">
            {{ row.status === 'online' ? '在线' : '离线' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button v-auth="'system:device:edit'" size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button v-auth="'system:device:delete'" size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="loadTableData"
      @current-change="loadTableData"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getDeviceList, deleteDevice } from '@/api/device'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const loading = ref(false)
const tableData = ref([])
const searchKeyword = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedRows = ref([])

const loadTableData = async () => {
  try {
    loading.value = true
    const res = await getDeviceList({
      page: currentPage.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value
    })
    tableData.value = res.data.list || []
    total.value = res.data.total || 0
  } catch (err) {
    ElMessage.error('加载设备列表失败')
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleSelectionChange = (val) => {
  selectedRows.value = val
}

const handleEdit = (row) => {
  console.log('编辑设备', row)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定删除该设备吗？')
    await deleteDevice(row.deviceId)
    ElMessage.success('删除成功')
    loadTableData()
  } catch (err) {
    if (err !== 'cancel') {
      ElMessage.error('删除失败')
      console.error(err)
    }
  }
}

onMounted(() => {
  loadTableData()
})
</script>

<style lang="scss" scoped>
.table-container {
  padding: 20px;
  .search-bar {
    margin-bottom: 16px;
    display: flex;
    gap: 12px;
    align-items: center;
  }
}
</style>