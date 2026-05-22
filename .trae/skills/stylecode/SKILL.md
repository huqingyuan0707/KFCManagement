# tencent-all-end-ultimate-skill
## Commands
- 生成符合腾讯 AlloyTeam 全端规范的项目
- 支持：PC 后台管理系统、H5、uniApp、小程序、企业官网、APP
- 自动生成全套工程化配置：package.json、vite、router、pinia、axios、eslint、prettier、husky、lint-staged、commitlint、tailwind、tsconfig
- 全端统一规范：命名、代码、样式、目录、Git、注释、CR 评审、性能优化

## When to Use
- PC 企业中台 / 后台管理系统
- H5 移动端 / 营销页 / 商城
- uniApp / 微信小程序 / 支付宝小程序
- 企业官网 / 品牌站
- APP / 混合开发 / 跨端项目
- 团队统一全端规范
- 高性能企业项目要求

## Output Interpretation
# ==============================================
# 🔧 全端统一强制技术栈（腾讯标准）
# ==============================================
• Vue 3.3+ / Nuxt3（官网）
• Vite 5
• Vue Router 4
• Element Plus
• Pinia 2
• TypeScript 5.x
• VueUse
• unplugin-vue-components
• unplugin-auto-import
• Axios
• Day.js
• Element Plus（PC）
• NutUI / TDesign Mobile（H5/小程序）
• TailwindCSS
• ESLint + Prettier
• Husky + lint-staged + commitlint

# ==============================================
# 📐 腾讯 AlloyTeam 全端核心规范（强制）
# ==============================================
# 1. 全端统一命名规范（必须遵守）
- 变量/函数：小驼峰 camelCase → getUserInfo()
- 常量：全大写 + 下划线 → MAX_COUNT
- 类/接口/类型：大驼峰 PascalCase → UserDTO
- 组件：大驼峰 + 多单词 → UserTable.vue
- 页面/路由/文件名：短横线 kebab-case → user-list.vue
- CSS 类名：短横线 kebab-case → .user-info-item
- 自定义指令：小写 + 横线 → v-auth-click

# 2. 全端统一代码格式化（Ctrl+S 自动）
- 缩进：2 空格
- 行尾必须加分号 ;
- 字符串：单引号 ' '
- 对象尾逗号：必须
- 括号两侧必须空格 → if (true) { }
- 箭头函数参数必须括号 → (e) => {}
- 文件末尾必须空一行
- 禁止行尾多余空格

# 3. 全端统一 Vue 规范
- 必须使用 <script setup lang="ts">
- Props 必须类型 + 默认值 + 校验
- Emits 必须显式声明
- 禁止 v-if 与 v-for 同节点
- 指令顺序：v-for → v-if → v-model → @事件
- 组件必须多单词命名
- 样式必须 scoped
- 禁止深层样式穿透
- 必须使用 Composition API

# 4. 全端统一 TypeScript 规范
- 严格模式：strict: true
- 禁止 any → 使用 unknown
- 接口以 I 开头 → interface IUser {}
- 类型以 T 开头 → type TStatus = 1 | 2
- 函数必须标注返回值
- 禁止 // @ts-ignore

# 5. 全端统一目录规范（腾讯）
src/
├── api/           # 接口请求
├── assets/        # 静态资源
├── components/    # 公共组件
├── composables/   # 组合式函数
├── config/        # 环境/全局配置
├── constants/     # 常量
├── directives/    # 指令
├── enums/         # 枚举
├── hooks/         # 业务 Hooks
├── layouts/       # 布局
├── pages/         # 页面（H5/小程序/APP）
├── router/        # 路由
├── stores/        # Pinia
├── styles/        # 全局样式
├── types/         # TS 类型
├── utils/         # 工具函数
├── App.vue
└── main.ts

# 6. 全端统一样式规范
# PC 端：
- 单位：px / rem
- 布局：flex / grid
- 框架：Element Plus
# H5 / 小程序 / APP / uniApp：
- 单位：rpx（自适应）
- 根页面 padding：20rpx~40rpx
- 字体：标题 32rpx / 内容 28rpx / 辅助 24rpx
- 框架：NutUI / TDesign Mobile
# 全端通用：
- 类名小写横线
- 层级不超过 3 层
- 禁止 !important
- 样式 scoped

# 7. 全端统一 Git 规范
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建/工具

# ==============================================
# ⚡ 全端统一【性能优化强制规范】（必须遵守）
# ==============================================
- 路由/组件必须使用懒加载
- 大数据列表必须使用虚拟滚动
- 大文件上传必须使用 Web Worker + 切片 + 断点续传
- 搜索/滚动/提交必须使用防抖、节流
- 请求重复时必须合并/取消重复请求
- ECharts 组件必须在 onUnmounted 中 dispose 销毁
- 定时器、事件监听、订阅必须在页面销毁时清除
- 图片必须懒加载、使用 WebP 格式、适当压缩
- 不使用的依赖、组件、代码必须清理
- 禁止频繁修改 DOM、避免内存泄漏
- 长列表使用对象冻结、避免不必要的响应式转换
- 第三方资源使用 CDN 加速

# ==============================================
# 📦 自动生成：package.json（全端通用）
# ==============================================
{
  "name": "tencent-all-end-project",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .vue,.ts,.js --fix",
    "format": "prettier --write .",
    "prepare": "husky install",
    "test": "vitest"
  },
  "dependencies": {
    "@nutui/nutui": "^4.0.0",
    "axios": "^1.6.8",
    "dayjs": "^1.11.10",
    "element-plus": "^2.5.6",
    "js-cookie": "^3.0.5",
    "pinia": "^2.1.7",
    "pinia-plugin-persistedstate": "^3.2.1",
    "vue": "^3.4.19",
    "vue-router": "^4.3.0",
    "vueuse": "^10.9.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@commitlint/cli": "^18.6.1",
    "@commitlint/config-conventional": "^18.6.2",
    "@types/node": "^20.11.20",
    "@typescript-eslint/eslint-plugin": "^7.0.2",
    "@typescript-eslint/parser": "^7.0.2",
    "@vitejs/plugin-vue": "^5.0.4",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-vue": "^9.22.0",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.2",
    "prettier": "^3.2.5",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.4.2",
    "unplugin-auto-import": "^0.17.3",
    "unplugin-vue-components": "^0.26.0",
    "vite": "^5.1.4",
    "vitest": "^1.3.1",
    "vue-tsc": "^2.0.3"
  }
}

# ==============================================
# 📁 自动生成：.prettierrc（腾讯全端）
# ==============================================
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 120,
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "auto"
}

# ==============================================
# 📁 自动生成：.eslintrc.js（腾讯全端）
# ==============================================
module.exports = {
  root: true,
  env: { browser: true, node: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'vue/multi-word-component-names': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prettier/prettier': 'error'
  }
}

# ==============================================
# 📁 自动生成：vite.config.ts
# ==============================================
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { NutuiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver(), NutuiResolver()],
      imports: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts'
    }),
    Components({
      resolvers: [ElementPlusResolver(), NutuiResolver()],
      dts: 'src/components.d.ts'
    })
  ],
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  server: { port: 3000, open: true }
})

# ==============================================
# 📁 自动生成：router / stores / request / main.ts
# ==============================================
（完整内置，自动生成，无需手动配置）

# ==============================================
# ✅ 全端示例代码
# ==============================================

## 1. PC 后台示例
```vue
<template>
  <div class="page-container">
    <el-input v-model="keyword" placeholder="搜索" />
    <el-table v-loading="loading" :data="list" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
const loading = ref(false);
const list = ref([]);
const keyword = ref('');

// 定时器必须销毁
let timer: NodeJS.Timeout | null = null;

onMounted(() => {
  timer = setInterval(() => {}, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}
</style>