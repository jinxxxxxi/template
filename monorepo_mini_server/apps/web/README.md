# Studio 租户后台管理系统 (Next.js版本)

这是一个基于 **Next.js 15** + **TypeScript** + **Arco Design** + **Zustand** 的现代化租户后台管理系统。

## 🚀 技术特性

### 前端框架

- **Next.js 15**: 最新的App Router架构，支持SSR/SSG
- **React 19**: 最新的React版本，性能更优
- **TypeScript**: 完整的类型支持
- **Tailwind CSS**: 原子化CSS框架

### UI组件库

- **Arco Design**: 字节跳动出品的企业级UI组件库
- **响应式设计**: 支持各种屏幕尺寸
- **现代化界面**: 美观的侧边栏导航和卡片布局

### 状态管理

- **Zustand**: 轻量级状态管理库
- **模块化状态**: 分离认证状态和用户管理状态
- **持久化**: 支持localStorage存储

### 路由系统

- **App Router**: Next.js 13+的新路由系统
- **动态路由**: 支持动态页面生成
- **中间件**: 自动认证检查和重定向

## 🏗️ 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── login/             # 登录页面
│   ├── users/             # 用户管理页面
│   ├── preview/           # 文档预览页面
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 仪表盘页面
├── components/             # 通用组件
│   ├── Layout.tsx         # 主布局组件
│   └── AuthGuard.tsx      # 认证守卫组件
├── lib/                    # 工具库
│   ├── api/               # API接口
│   │   ├── auth.ts        # 认证API
│   │   └── user.ts        # 用户API
│   └── http-client.ts     # HTTP客户端
├── stores/                 # 状态管理
│   ├── authStore.ts       # 认证状态
│   ├── userStore.ts       # 用户状态
│   └── index.ts           # 统一导出
└── middleware.ts           # Next.js中间件
```

## ✨ 功能特性

### 🔐 认证系统

- 用户登录/登出
- JWT Token管理
- 自动401重定向
- 路由保护

### 👥 用户管理

- 用户列表查看
- 用户信息编辑/删除
- 基于角色的权限控制
- 搜索和分页

### 📝 文档预览

- MDX编辑器
- 实时预览
- 自动保存
- 本地存储

### 🎨 现代化UI

- 侧边栏导航
- 顶部用户信息
- 响应式布局
- 美观的卡片设计

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm 8+

### 安装依赖

```bash
cd apps/web-next
pnpm install
```

### 环境配置

创建 `.env.local` 文件：

```bash
# API配置
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# 应用配置
NEXT_PUBLIC_APP_NAME=Stepfun博客
NEXT_PUBLIC_APP_VERSION=1.0.0
```

### 开发模式

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build
pnpm start
```

## 🔧 开发指南

### 添加新页面

1. 在 `src/app/` 下创建新目录
2. 添加 `page.tsx` 文件
3. 使用 `LayoutComponent` 包装内容

### 添加新API

1. 在 `src/lib/api/` 下创建新文件
2. 使用 `httpClient` 发送请求
3. 在 `stores` 中添加状态管理

### 添加新组件

1. 在 `src/components/` 下创建组件
2. 使用 `'use client'` 指令（如果需要客户端交互）
3. 导入Arco Design组件

## 🌟 主要优势

### 相比原React版本

1. **性能提升**: Next.js的SSR/SSG支持
2. **开发体验**: 更好的热重载和错误提示
3. **SEO友好**: 服务端渲染支持
4. **路由系统**: 文件系统路由，更直观
5. **中间件**: 服务端认证检查
6. **构建优化**: 自动代码分割和优化

### 架构改进

1. **App Router**: 最新的Next.js路由架构
2. **服务端组件**: 更好的性能和SEO
3. **中间件**: 统一的请求处理
4. **类型安全**: 完整的TypeScript支持

## 📱 响应式支持

- **桌面端**: 完整的侧边栏导航
- **平板端**: 可折叠的侧边栏
- **移动端**: 移动优先的响应式设计

## 🔒 安全特性

- **JWT认证**: 安全的token管理
- **路由保护**: 自动认证检查
- **权限控制**: 基于角色的访问控制
- **中间件**: 服务端安全验证

## 🚀 部署

### Vercel部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 其他平台

支持部署到任何支持Node.js的平台：

- Netlify
- Railway
- Heroku
- 自建服务器

## �� 许可证

MIT License
