# KFC后台管理系统

一个基于 Vue 3 + TypeScript + Element Plus 的现代化后台管理系统，为KFC餐厅提供完整的业务管理解决方案。

## 项目简介

本项目是一个功能完善的后台管理系统，采用最新的前端技术栈开发，遵循腾讯 AlloyTeam 前端规范，提供良好的用户体验和开发体验。

## 技术栈

- **框架**: Vue 3.4.19 (Composition API)
- **语言**: TypeScript 5.4.2
- **构建工具**: Vite 5.1.4
- **UI组件库**: Element Plus 2.5.6
- **状态管理**: Pinia 2.1.7
- **路由**: Vue Router 4.3.0
- **HTTP客户端**: Axios 1.6.8
- **工具库**: 
  - Day.js 1.11.10 (日期处理)
  - @vueuse/core 10.9.0 (组合式工具集)
- **样式预处理**: Sass 1.70.0
- **代码规范**:
  - ESLint 8.57.0
  - Prettier 3.2.5
  - Husky 9.0.11
  - Commitlint 18.6.1
  - lint-staged 15.2.2

## 功能特性

### 核心功能

- 用户认证与权限管理
- 数据可视化看板
- 商品管理（增删改查、分类筛选、批量操作）
- 订单管理（状态跟踪、信息查询、批量处理）
- 用户管理（角色分配、状态管理、权限控制）
- 系统设置（主题切换、语言设置、偏好配置）

### 技术特性

- 完整的 TypeScript 类型支持
- 响应式布局设计
- 路由懒加载优化
- 组件自动导入
- 请求拦截与错误处理
- 状态持久化
- 代码规范检查
- Git 提交规范

## 项目结构

```
kfc-admin-system/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API接口封装
│   │   ├── product.ts     # 商品相关接口
│   │   ├── order.ts       # 订单相关接口
│   │   └── user.ts        # 用户相关接口
│   ├── assets/            # 资源文件
│   ├── components/        # 公共组件
│   ├── router/            # 路由配置
│   │   └── index.ts       # 路由定义与守卫
│   ├── stores/            # Pinia状态管理
│   │   ├── app.ts         # 应用状态
│   │   └── user.ts        # 用户状态
│   ├── utils/             # 工具函数
│   │   └── request.ts     # Axios请求封装
│   ├── views/             # 页面组件
│   │   ├── auth/          # 认证相关
│   │   │   └── Login.vue  # 登录页面
│   │   ├── dashboard/     # 数据看板
│   │   │   └── Dashboard.vue
│   │   ├── layout/        # 布局组件
│   │   │   └── Layout.vue
│   │   ├── product/       # 商品管理
│   │   │   └── Product.vue
│   │   ├── order/         # 订单管理
│   │   │   └── Order.vue
│   │   ├── user/          # 用户管理
│   │   │   └── User.vue
│   │   ├── settings/      # 系统设置
│   │   │   └── Settings.vue
│   │   └── error/         # 错误页面
│   │       └── NotFound.vue
│   ├── App.vue            # 根组件
│   └── main.ts            # 应用入口
├── .eslintrc.cjs          # ESLint配置
├── .prettierrc.json       # Prettier配置
├── commitlint.config.cjs  # Commitlint配置
├── index.html             # HTML模板
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript配置
├── tsconfig.app.json      # 应用TypeScript配置
├── tsconfig.node.json     # Node TypeScript配置
└── vite.config.ts         # Vite配置
```

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 pnpm >= 8.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3001](http://localhost:3001) 查看应用

### 构建生产版本

```bash
npm run build
```

构建产物将输出到 `dist` 目录

### 预览生产构建

```bash
npm run preview
```

## 开发指南

### 代码规范

本项目遵循腾讯 AlloyTeam 前端规范：

#### 命名规范

- **变量/函数**: camelCase (小驼峰)
  ```typescript
  const userName = 'admin';
  function getUserInfo() {}
  ```

- **类/接口**: PascalCase (大驼峰)
  ```typescript
  class UserService {}
  interface IUser {}
  ```

- **文件/页面**: kebab-case (短横线)
  ```
  user-management.vue
  product-list.vue
  ```

#### 代码格式

- 使用2空格缩进
- 语句末尾使用分号
- 字符串使用单引号
- 对象和数组最后保留逗号

#### Vue 规范

- 使用 `<script setup lang="ts">` 语法
- 显式声明 Props 和 Emits
- 使用 Composition API
- 组件命名使用 PascalCase

```vue
<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  title: string;
  count?: number;
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
});

const emit = defineEmits<{
  update: [value: number];
}>();
</script>
```

### 组件开发

#### 组件自动导入

项目配置了组件自动导入，无需手动导入常用组件：

```vue
<template>
  <el-button>按钮</el-button>
  <el-input v-model="value" />
</template>
```

#### 图标使用

使用 Element Plus 图标时，通过 slot 方式使用：

```vue
<template>
  <el-button>
    <Edit />
    <span>编辑</span>
  </el-button>
  
  <el-input>
    <template #prefix-icon><Search /></template>
  </el-input>
</template>

<script setup lang="ts">
import { Edit, Search } from '@element-plus/icons-vue';
</script>
```

### 状态管理

使用 Pinia 进行状态管理：

```typescript
// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null,
  }),
  
  actions: {
    async login(username: string, password: string) {
      // 登录逻辑
    },
    
    logout() {
      // 退出登录
    },
  },
  
  persist: true,
});
```

### API 请求

使用封装的 request 工具进行 API 请求：

```typescript
// api/product.ts
import request from '@/utils/request';

export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  status: number;
}

export function getProductList(params: any) {
  return request<IProduct[]>({
    url: '/products',
    method: 'GET',
    params,
  });
}
```

### 路由配置

路由配置在 `src/router/index.ts` 中：

```typescript
const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/layout/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue'),
        meta: { requiresAuth: true, title: '数据看板' },
      },
    ],
  },
];
```

## 可用脚本

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format

# 运行测试
npm run test
```

## 性能优化

项目已实现以下性能优化措施：

- 路由懒加载
- 组件按需导入
- 图片懒加载
- 请求防抖节流
- 虚拟滚动（大数据列表）
- Web Worker（大文件上传）
- ECharts 实例销毁
- 定时器和事件监听器清理

## 浏览器支持

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

示例：
```bash
git commit -m "feat: add product management feature"
git commit -m "fix: resolve login page icon display issue"
```

## 常见问题

### 端口被占用

如果默认端口 3001 被占用，Vite 会自动尝试其他端口。你也可以在 `vite.config.ts` 中修改端口：

```typescript
export default defineConfig({
  server: { 
    port: 3002,
    open: true 
  },
});
```

### 图标显示异常

确保使用正确的图标名称和 slot 方式：

```vue
<template>
  <el-button>
    <Edit />
    <span>编辑</span>
  </el-button>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue';
</script>
```

### TypeScript 类型错误

运行以下命令检查类型：

```bash
npm run build
```

如有类型错误，请检查 `tsconfig.json` 配置和类型定义。

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 Issue
- 发送邮件
- 加入讨论组

## 致谢

感谢以下开源项目：

- [Vue.js](https://vuejs.org/)
- [Element Plus](https://element-plus.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/)

---

**注意**: 本项目为演示项目，生产环境使用前请根据实际需求进行调整和优化。