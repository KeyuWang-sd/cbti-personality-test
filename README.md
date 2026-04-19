# CBTI当代大学生沙雕热梗人格测试

## 项目简介
这是一个基于React+TypeScript+Node.js+Express的全栈人格测试项目，包含40道题目，4个维度计分，18种人格类型。

## 功能特性
- ✅ 40道三选项题库（A+1/C0/B-1计分）
- ✅ 4维度计分系统（社交S/学习L/行事D/内心W）
- ✅ 18种人格类型定义及SVG图标
- ✅ 本地答题进度保存
- ✅ 云端数据存储
- ✅ 微信分享功能
- ✅ 移动端适配
- ✅ 答题过渡动画

## 技术栈
- **前端**：React 18 + TypeScript + Parcel
- **后端**：Node.js + Express
- **数据库**：Supabase（云数据库）
- **样式**：CSS3

## 快速开始

### 本地开发
1. 克隆项目
2. 安装依赖：`npm install`
3. 启动前端：`npm start`
4. 启动后端：`npm run dev`
5. 访问：http://localhost:1234

### 部署到Vercel（推荐）

#### 步骤1：准备工作
1. 注册Vercel账号：https://vercel.com/signup
2. 注册Supabase账号：https://supabase.com/
3. 在Supabase中创建一个新的项目
4. 在Supabase中创建`results`表：
   - 字段：`id` (int, primary key, auto increment)
   - 字段：`answers` (text)
   - 字段：`scores` (text)
   - 字段：`personality` (text)
   - 字段：`dimension_results` (text)
   - 字段：`created_at` (timestamp, default now())

#### 步骤2：修改配置
1. 打开 `server/config/dbConnection.js` 文件
2. 将 `supabaseUrl` 和 `supabaseKey` 替换为你自己的Supabase项目信息

#### 步骤3：部署到Vercel
1. 访问：https://vercel.com/new
2. 选择 `Import Git Repository`
3. 输入你的GitHub仓库地址（如果没有，先将项目上传到GitHub）
4. 点击 `Import`
5. 配置项目：
   - Framework Preset：选择 `Other`
   - Build Command：`npm run build`
   - Output Directory：`dist`
   - Install Command：`npm install`
6. 点击 `Deploy`

#### 步骤4：配置环境变量（可选）
如果需要在Vercel中配置环境变量，可以在项目设置中添加：
- `DB_HOST`：数据库主机
- `DB_USER`：数据库用户名
- `DB_PASSWORD`：数据库密码
- `DB_NAME`：数据库名称
- `DB_PORT`：数据库端口

## 项目结构
```
CBTI/
├── dist/              # 构建输出目录
├── server/            # 后端代码
│   ├── config/        # 配置文件
│   ├── controllers/   # 控制器
│   ├── data/          # 数据文件
│   ├── middleware/    # 中间件
│   ├── models/        # 模型
│   ├── routes/        # 路由
│   └── index.js       # 后端入口
├── src/               # 前端代码
│   ├── core/          # 核心逻辑
│   ├── frontend/      # 前端组件
│   └── index.tsx      # 前端入口
├── index.html         # HTML模板
├── package.json       # 项目配置
├── tsconfig.json      # TypeScript配置
└── vercel.json        # Vercel配置
```

## API接口
- `POST /api/submit`：提交测试结果
- `GET /api/statistics`：获取统计数据
- `GET /api/results`：获取所有结果（管理员）

## 注意事项
1. 本项目使用Supabase作为云数据库，无需本地MySQL
2. 部署到Vercel后，API接口会自动映射到 `your-domain.vercel.app/api`
3. 分享功能需要在HTTPS环境下才能正常使用
4. 移动端适配已优化，可在手机浏览器中正常访问

## 许可证
MIT