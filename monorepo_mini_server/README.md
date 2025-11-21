# MDX Preview Application (Monorepo)

一个基于 React + NestJS 的 MDX 预览应用，采用 monorepo 架构，支持实时编辑和预览 MDX 内容。

## 项目结构

```
studio-doc-preview/
├── apps/
│   ├── web/              # React 前端应用
│   └── server/           # NestJS 后端 API
├── packages/
│   ├── types/            # 共享类型定义
│   └── database/         # 数据库相关功能
├── package.json          # 根目录构建脚本
├── turbo.json            # Turbo 构建配置
├── pnpm-workspace.yaml   # pnpm workspace 配置
└── README.md
```

## 功能特性

- 🎨 **Monaco Editor**：支持MDX语法高亮和代码补全
- 🔄 **实时预览**：编辑器内容变化时自动更新预览
- 💾 **自动保存**：本地存储用户编辑内容
- 🌐 **全栈部署**：后端服务同时托管前端应用和API
- 📚 **API文档**：集成Swagger文档
- 🏗️ **Monorepo架构**：统一管理前后端和共享包

## 开发环境

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
# 启动前端开发服务器 (端口 3023)
pnpm run dev:web

# 启动后端开发服务器 (端口 3001)
pnpm run dev:server

# 同时启动前后端
pnpm run dev
```

访问：

- 前端应用：http://localhost:3023
- 后端API：http://localhost:3001
- API文档：http://localhost:3001/api/docs

## 生产环境部署

### 构建和启动生产服务器

```bash
# 一键构建并启动生产服务器
pnpm run preview
```

或者分步骤：

```bash
# 1. 构建所有包
pnpm run build:full

# 2. 启动生产服务器
pnpm run start:server
```

### 生产环境访问

生产环境下，后端服务器同时提供前端应用和API服务：

- **前端应用**：http://localhost:3001/
- **健康检查**：http://localhost:3001/health
- **MDX API**：http://localhost:3001/api/mdx
- **API文档**：http://localhost:3001/api/docs

## 可用脚本

| 脚本                      | 说明                 |
| ------------------------- | -------------------- |
| `pnpm install`            | 安装所有依赖         |
| `pnpm run dev:web`        | 启动前端开发服务器   |
| `pnpm run dev:server`     | 启动后端开发服务器   |
| `pnpm run dev`            | 启动所有开发服务器   |
| `pnpm run build:web`      | 构建前端生产版本     |
| `pnpm run build:server`   | 构建后端生产版本     |
| `pnpm run build:types`    | 构建类型定义包       |
| `pnpm run build:database` | 构建数据库包         |
| `pnpm run build:full`     | 完整构建流程         |
| `pnpm run preview`        | 构建并启动生产服务器 |
| `pnpm run clean`          | 清理构建文件和依赖   |

## 包结构说明

### @apps/web

- React 18 + TypeScript 前端应用
- Monaco Editor MDX 编辑器
- 实时预览面板
- 文件上传组件

### @apps/server

- NestJS 后端 API 服务
- 文件上传处理
- 静态文件托管
- Swagger API 文档

### @packages/types

- 共享类型定义
- API 响应类型
- 文件上传类型
- 通用接口定义

### @packages/database

- 数据库连接配置
- 文件存储服务
- 数据访问层

## 技术栈

### 前端

- React 18
- TypeScript
- Monaco Editor
- Create React App

### 后端

- NestJS
- TypeScript
- Swagger/OpenAPI
- Express Static

### 构建工具

- Turbo
- pnpm Workspaces
- TypeScript
- tsup

## 部署注意事项

1. **环境变量**：确保在生产环境中设置正确的 `PORT` 环境变量
2. **文件权限**：确保 `uploads/` 目录有适当的读写权限
3. **API前缀**：所有API路由都有 `/api` 前缀，避免与前端路由冲突
4. **路由处理**：后端正确处理SPA路由，非API请求都返回前端应用
5. **Monorepo构建**：使用 `pnpm run build:full` 确保所有包按正确顺序构建

# Studio Doc Preview

## API 调用示例

### 获取当前用户信息

```bash
# 使用Cookie中的token（推荐）
curl --location --request GET 'http://127.0.0.1:3001/api/user/self' \
--header 'Content-Type: application/json' \
--cookie 'token=YOUR_JWT_TOKEN_HERE'

# 使用Authorization头（Bearer token）
curl --location --request GET 'http://127.0.0.1:1:3001/api/user/self' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer YOUR_JWT_TOKEN_HERE'
```

### 注意事项

1. **Token格式**：确保Cookie中只有一个有效的JWT token
2. **请求头**：GET请求不需要body数据
3. **Cookie格式**：使用 `--cookie` 参数而不是 `--header 'Cookie:'`
4. **Token有效期**：确保JWT token没有过期

### 常见问题排查

- **401错误**：检查JWT token是否有效、是否过期、JWT_SECRET是否正确
- **Cookie问题**：确保服务器正确配置了cookie-parser中间件
- **CORS问题**：确保前端域名在CORS配置中
