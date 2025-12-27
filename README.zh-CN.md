# 跨境电商AI应用中心

专为跨境电商卖家打造的现代化、轻量级应用平台，提供一套完整的生产力工具，帮助优化运营流程并提升工作效率。

## 项目简介

本项目是一个基于 **Next.js 15** 的完整应用平台，采用 **TypeScript** 和 **Tailwind CSS** 构建，具备以下特点：
- GitHub OAuth 身份验证及白名单控制
- 服务端 n8n webhook 集成
- 模块化应用注册系统
- 最小化依赖的轻量级架构
- 高性能、易扩展

**项目状态**：已从 Vite + React 迁移至 Next.js App Router（需要 Node.js 18+）

## 技术栈

| 技术 | 用途 |
|---|---|
| **Next.js 15** | App Router、服务端组件、API 路由 |
| **React 18** | UI 框架 |
| **TypeScript** | 类型安全 |
| **Tailwind CSS** | 样式管理 |
| **Auth.js 5** | GitHub OAuth 认证 |
| **n8n 集成** | 服务端 Webhook 管理 |
| **Vercel** | 推荐部署平台 |

## 核心功能

### 1. GitHub OAuth 身份验证
- 安全的 GitHub OAuth 2.0 登录
- 灵活的白名单系统：
  - **方案一**：按 GitHub 用户名白名单（支持多个用户）
  - **方案二**：按邮箱域名白名单（如 company.com）
  - **组合模式**：同时使用两种方案以获得最大灵活性

### 2. 应用注册系统
- **单一真相来源**：`src/registry.ts` 统一管理所有应用
- 标准化应用结构：`meta.ts` + `App.tsx`
- 支持 10 个预定义的应用类别：
  - Keyword Research（关键词与词库）
  - PPC Ads（广告投放与结构）
  - Competitor Intel（竞品情报）
  - Listing & SEO（Listing 与转化）
  - Data Tools（数据工具/清洗/导出）
  - Profit & FBA（利润/费用/FBA）
  - Supply Chain（供应链与库存）
  - Compliance（合规/政策）
  - Ops Automation（运营自动化）
  - Other（其他）

### 3. 内置应用

#### 关键词去重工具
- **类别**：Keyword Research（关键词与词库）
- **功能**：输入多行关键词 → 自动去重 → 排序 → 一键复制
- **应用场景**：整理关键词列表、合并多个词库、清理重复数据
- **使用说明**：粘贴多个关键词（每行一个），点击"去重"按钮即可

#### CSV/TSV 转换器
- **类别**：Data Tools（数据工具）
- **功能**：输入 CSV 或 TSV 文本 → 表格预览 → 导出为 CSV
- **应用场景**：快速查看和转换表格数据、数据格式转换
- **支持格式**：CSV、TSV、自定义分隔符

#### 利润计算器
- **类别**：Profit & FBA（利润/费用管理）
- **功能**：输入售价、成本、平台费率、运费 → 快速计算利润与毛利率
- **应用场景**：产品定价分析、利润评估、成本管理
- **计算项目**：毛利、毛利率、物流成本、平台手续费等

#### ASIN → 关键词（DataForSEO）
- **类别**：Keyword Research（关键词研究）
- **功能**：输入 Amazon ASIN → 通过 DataForSEO API 获取该产品的排名关键词列表
- **应用场景**：竞品关键词分析、产品排名研究、关键词数据采集
- **集成方式**：基于 n8n webhook 的服务端后端

## 快速开始

### 前置条件
- **Node.js 18+**（已验证 Node 22 正常运行）
- **npm、yarn 或 pnpm** 包管理器
- GitHub OAuth 应用凭证

### 1. 克隆与安装

```bash
# 克隆仓库
git clone https://github.com/linmaoyi1985-gif/air-filter.git
cd air-filter

# 安装依赖
npm install
# 或使用其他包管理器
# yarn install
# pnpm install
```

### 2. 环境变量配置

复制示例文件并填入你的配置：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入以下配置：

```env
# 身份验证配置
AUTH_SECRET=<使用-openssl-rand-base64-32-生成>
AUTH_GITHUB_ID=<你的-GitHub-OAuth-应用-ID>
AUTH_GITHUB_SECRET=<你的-GitHub-OAuth-应用-Secret>

# 白名单配置（至少选其一）
ALLOWED_GITHUB_LOGINS=username1,username2
# 或
ALLOWED_EMAIL_DOMAINS=company.com,partner.com

# n8n Webhook 配置（可选，用于 ASIN 关键词应用）
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id
N8N_WEBHOOK_SECRET=your-optional-secret
```

### 3. GitHub OAuth 应用创建

#### 步骤 1：创建 OAuth 应用

1. 访问 GitHub 个人设置：https://github.com/settings/developers
2. 进入 **OAuth Apps** 标签
3. 点击 **"New OAuth App"** 按钮
4. 填写以下信息：

| 字段 | 开发环境值 | 生产环境值（Vercel） |
|---|---|---|
| **Application name** | Air Filter 工具中心 | Air Filter 工具中心 |
| **Homepage URL** | `http://localhost:3000` | `https://yourdomain.vercel.app` |
| **Authorization callback URL** | `http://localhost:3000/api/auth/callback/github` | `https://yourdomain.vercel.app/api/auth/callback/github` |

#### 步骤 2：获取凭证

1. 应用创建成功后，你会看到两个关键信息：
   - **Client ID**
   - **Client secrets**（点击"Generate a new client secret"）

2. 将这两个值复制到 `.env.local`：

```env
AUTH_GITHUB_ID=Iv1.你的client_id
AUTH_GITHUB_SECRET=你的client_secret
```

**注意**：
- Client Secret 只会显示一次，请妥善保管
- 不要在版本控制中提交 `.env.local` 文件
- 生产环境中由 Vercel 管理环境变量

### 4. 本地开发

```bash
# 启动开发服务器（默认监听 http://localhost:3000）
npm run dev

# 应用将在以下地址可用：
# http://localhost:3000

# 首次运行时，点击 "Sign in with GitHub" 进行身份验证
```

**开发技巧**：
- 修改代码后自动热重载（HMR）
- 在浏览器打开开发者工具查看任何问题
- 查看终端输出获取详细信息

### 5. 生产构建

```bash
# 构建优化后的生产版本
npm run build

# 本地测试生产构建
npm start

# 应用将在 http://localhost:3000 运行
```

**构建检查**：
- 确保 `npm run build` 没有错误或警告
- 所有新应用必须通过此步骤
- 这是提交 PR 的必要条件

## 部署指南

### Vercel 部署（推荐）

**一键部署**：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Flinmaoyi1985-gif%2Fair-filter&project-name=air-filter&repository-name=air-filter&env=AUTH_SECRET,AUTH_GITHUB_ID,AUTH_GITHUB_SECRET,ALLOWED_GITHUB_LOGINS,N8N_WEBHOOK_URL&envDescription=Required%20environment%20variables%20for%20Air%20Filter&envLink=https%3A%2F%2Fgithub.com%2Flinmaoyi1985-gif%2Fair-filter%2Fblob%2Fmain%2F.env.example)

**手动部署步骤**：

1. 推送代码到 GitHub
2. 访问 [Vercel 控制面板](https://vercel.cn)
3. 点击 "Add New..." → "Project"
4. 选择 `air-filter` 仓库
5. 配置环境变量（见下面的环境变量部分）
6. 点击 "Deploy" 开始部署

**部署后配置**：

1. 更新 GitHub OAuth 应用的回调 URL：
   - 新的回调地址：`https://yourdomain.vercel.app/api/auth/callback/github`

2. 在 Vercel 控制面板中设置环境变量：
   - `AUTH_SECRET`
   - `AUTH_GITHUB_ID`
   - `AUTH_GITHUB_SECRET`
   - `ALLOWED_GITHUB_LOGINS` 或 `ALLOWED_EMAIL_DOMAINS`
   - `N8N_WEBHOOK_URL`（如果使用 n8n）

3. 触发重新部署以应用新的环境变量

**监控和日志**：
- Vercel 控制面板显示实时部署状态
- 在 "Logs" 标签查看应用日志
- 在 "Deployments" 标签查看部署历史

### Docker 部署

如果你需要在自己的服务器上部署：

```bash
# 构建 Docker 镜像
docker build -t air-filter:latest .

# 运行容器
docker run -p 3000:3000 \
  -e AUTH_SECRET="your-secret" \
  -e AUTH_GITHUB_ID="your-id" \
  -e AUTH_GITHUB_SECRET="your-secret" \
  -e ALLOWED_GITHUB_LOGINS="user1,user2" \
  air-filter:latest
```

### 自托管（服务器部署）

```bash
# 在你的服务器上执行：
git clone https://github.com/linmaoyi1985-gif/air-filter.git
cd air-filter

npm install
npm run build

# 使用 PM2 或 systemd 保持应用运行
npm start
```

## 项目结构

```
air-filter/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── auth/[auth].ts       # Auth.js API 路由
│   ├── page.tsx                 # 首页（应用列表）
│   ├── app/
│   │   └── [slug]/
│   │       └── page.tsx         # 应用详情页
│   ├── layout.tsx               # 根布局
│   └── globals.css              # 全局样式
│
├── src/
│   ├── apps/                    # 所有应用集合
│   │   ├── keyword-dedup/       # 关键词去重工具
│   │   │   ├── App.tsx          # React 组件
│   │   │   └── meta.ts          # 应用元数据
│   │   ├── csv-converter/       # CSV/TSV 转换器
│   │   │   ├── App.tsx
│   │   │   └── meta.ts
│   │   ├── profit-calculator/   # 利润计算器
│   │   │   ├── App.tsx
│   │   │   └── meta.ts
│   │   └── asin-keywords/       # ASIN → 关键词
│   │       ├── App.tsx
│   │       └── meta.ts
│   │
│   ├── components/              # 共享组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── SearchBar.tsx
│   │
│   ├── lib/                     # 工具函数
│   │   ├── auth-utils.ts       # 认证相关工具
│   │   └── validation.ts        # 数据验证
│   │
│   ├── types.ts                 # TypeScript 类型定义
│   └── registry.ts              # 应用注册表（单一真相来源）
│
├── docs/
│   └── n8n-setup.md            # n8n 集成指南
│
├── .env.example                # 环境变量示例
├── auth.config.ts              # Auth.js 配置
├── middleware.ts               # Next.js 中间件
├── next.config.ts              # Next.js 配置
├── tsconfig.json               # TypeScript 配置
├── tailwind.config.ts          # Tailwind 配置
├── postcss.config.mjs          # PostCSS 配置
├── package.json                # 项目依赖
├── CLAUDE.md                   # 应用添加规则（必读）
└── README.zh-CN.md             # 中文文档（本文件）
```

## 如何添加新应用

### 重要提示

所有开发者必须严格遵守 [CLAUDE.md](./CLAUDE.md) 中定义的规则。该文档包含所有硬性规则，违规可能导致 PR 被拒。

### 步骤 1：创建应用目录

创建新应用目录，目录名即为应用的 `slug`（唯一标识）：

```bash
mkdir -p src/apps/my-awesome-app
```

**规则**：
- 使用 kebab-case（全小写，词间用连字符）
  - ✅ 正确：`keyword-dedup`、`csv-converter`
  - ❌ 错误：`KeywordDedup`、`Keyword_Dedup`、`keyword dedup`
- 必须全平台唯一
- 名字要有描述性，避免 `app1`、`test-app` 等无意义名称

### 步骤 2：创建 `meta.ts` 文件

在应用目录下创建 `meta.ts`，定义应用元数据：

```typescript
// src/apps/my-awesome-app/meta.ts
import type { AppMeta } from '../../types';

export const meta: AppMeta = {
  slug: 'my-awesome-app',              // 必须与目录名完全一致
  name: '我的超棒应用',                // 应用中文名称（用户看到）
  description: '简短功能描述...',      // 1-2 句话，清楚说明功能
  category: 'Data Tools',              // 必须来自预定义类目（见下表）
  tags: ['标签1', '标签2', '标签3'],   // 可选，用于应用搜索
  order: 1,                            // 可选，同类目内的排序（数字小靠前）
};
```

**允许的类目列表**（`category` 必须从此列表选择）：
1. `Keyword Research` - 关键词与词库
2. `PPC Ads` - 广告投放与结构
3. `Competitor Intel` - 竞品情报
4. `Listing & SEO` - Listing 与转化
5. `Data Tools` - 数据工具/清洗/导出
6. `Profit & FBA` - 利润/费用/FBA
7. `Supply Chain` - 供应链与库存
8. `Compliance` - 合规/政策
9. `Ops Automation` - 运营自动化
10. `Other` - 其他

如需新增类目，必须先修改 `src/types.ts` 中的 `AppCategory` 类型。

### 步骤 3：创建 `App.tsx` 组件

在应用目录下创建 `App.tsx`，实现应用的用户界面：

```typescript
// src/apps/my-awesome-app/App.tsx
'use client';  // 如果使用交互功能（useState、onClick 等）

import React, { useState } from 'react';

export default function MyAwesomeApp() {
  const [value, setValue] = useState('');

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>我的超棒应用</h2>
      <p>应用功能描述和使用说明</p>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="输入内容..."
        style={{
          padding: '8px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          width: '100%',
          marginBottom: '10px',
        }}
      />

      <button
        onClick={() => alert(value)}
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        处理
      </button>
    </div>
  );
}
```

**规则**：
- 必须使用 `export default` 导出 React 组件
- 组件名建议使用 PascalCase（如 `MyAwesomeApp`）
- 样式优先使用内联 CSS 对象或 Tailwind CSS 类
- **禁止**引入外部 UI 框架（Material-UI、Ant Design、Bootstrap 等）
- 如果需要交互，添加 `'use client'` 指令
- 保持代码整洁、可维护

### 步骤 4：注册应用

编辑 `src/registry.ts`，将新应用添加到注册表：

```typescript
// src/registry.ts
// 1. 导入 meta
import { meta as myAwesomeAppMeta } from './apps/my-awesome-app/meta';

// 2. 添加到 allApps 数组
export const allApps: AppMeta[] = [
  // ... 现有应用
  myAwesomeAppMeta,
];
```

**规则**：
- 导入别名建议使用 `<slug>Meta` 格式（如 `myAwesomeAppMeta`）
- 必须添加到 `allApps` 数组
- 保持文件格式整洁

### 步骤 5：本地测试

```bash
# 启动开发服务器
npm run dev

# 在浏览器打开 http://localhost:3000
# 你的应用应该出现在首页列表中
# 点击进入应用页面进行测试

# 构建测试（必须通过）
npm run build

# 如果构建失败，检查：
# - meta.ts 中的 category 是否有效
# - slug 是否与目录名完全一致
# - 是否在 registry.ts 中正确注册
```

### 步骤 6：提交 Pull Request

1. **Push 分支**：

```bash
git checkout -b feat/my-awesome-app
git add .
git commit -m "feat: add my awesome app"
git push origin feat/my-awesome-app
```

2. **创建 PR**，包含：

**PR 标题格式**：
```
feat: add My Awesome App
```

**PR 描述模板**：
```markdown
## 功能说明
简短描述应用的功能和使用场景

## 所属类目
Data Tools

## 如何测试
1. 运行 npm run dev
2. 访问 http://localhost:3000
3. 找到"我的超棒应用"并点击进入
4. 输入测试数据并验证结果
5. 构建验证：npm run build 应该通过

## 检查清单
- [ ] 本地构建通过（npm run build）
- [ ] 应用在首页正常显示
- [ ] 应用页面可正常访问
- [ ] 代码格式整洁
- [ ] 没有控制台错误或警告
```

## 开发规范

### 必须遵守 ✅

| 项目 | 说明 |
|---|---|
| **目录位置** | 必须在 `src/apps/<slug>/` |
| **slug 一致性** | `meta.ts` 中的 slug 必须与目录名完全一致 |
| **类目有效性** | `category` 必须来自预定义列表 |
| **导出方式** | `App.tsx` 必须使用 `export default` 导出 |
| **注册登记** | 必须在 `src/registry.ts` 中添加 |
| **构建通过** | 必须通过 `npm run build` |
| **提交方式** | 通过 Pull Request 提交，不直接推送到 main |

### 禁止事项 ❌

| 项目 | 说明 |
|---|---|
| **随意创建类目** | 如需新类目，必须先修改 `src/types.ts` |
| **修改他人应用** | 除非有明确维护需求，禁止修改其他应用代码 |
| **引入未批准的依赖** | 禁止随意添加 npm 包（需明确理由并获批) |
| **使用外部 UI 框架** | 禁止使用 Material-UI、Ant Design、Bootstrap 等 |
| **跨应用导入** | 禁止使用相对路径在应用间导入（违反隔离原则） |
| **直接推送 main** | 所有变更必须通过 PR 审核 |
| **未通过构建提交** | 提交的代码必须通过 `npm run build` |

**详细规则**：请参考 [CLAUDE.md](./CLAUDE.md)

## 参考应用

### 1. 关键词去重工具 `keyword-dedup`

```typescript
// src/apps/keyword-dedup/meta.ts
export const meta = {
  slug: 'keyword-dedup',
  name: '关键词去重工具',
  description: '输入多行关键词，自动去重、排序，一键复制结果',
  category: 'Keyword Research',
  tags: ['关键词', '去重', '排序', '工具'],
  order: 1,
};
```

**核心逻辑**：
- 接收多行关键词输入
- 使用 Set 数据结构去重
- 按字母顺序排序
- 提供一键复制功能

### 2. CSV 转换器 `csv-converter`

```typescript
// src/apps/csv-converter/meta.ts
export const meta = {
  slug: 'csv-converter',
  name: 'CSV/TSV转换器',
  description: '输入CSV或TSV文本，预览表格数据，导出为CSV',
  category: 'Data Tools',
  tags: ['CSV', 'TSV', '数据', '转换', '导出'],
  order: 1,
};
```

**核心逻辑**：
- 识别分隔符（逗号、制表符、其他自定义）
- 解析数据为表格
- 表格预览
- 导出为指定格式

### 3. 利润计算器 `profit-calculator`

```typescript
// src/apps/profit-calculator/meta.ts
export const meta = {
  slug: 'profit-calculator',
  name: '利润计算器',
  description: '输入售价、成本、平台费率和运费，快速计算利润与毛利率',
  category: 'Profit & FBA',
  tags: ['利润', '计算器', 'FBA', '成本'],
  order: 1,
};
```

**计算公式**：
- 毛利 = 售价 - 成本 - 平台费 - 运费
- 毛利率 = (毛利 / 售价) × 100%
- ROI = (毛利 / 成本) × 100%

## n8n 集成指南

对于需要调用外部 API 的应用（如 ASIN Keywords），使用 n8n webhook 进行服务端集成。

### 基本流程

1. **创建 n8n 工作流**
   - 添加 Webhook Trigger 节点
   - 配置数据处理逻辑
   - 启用并复制 Webhook URL

2. **配置前端应用**
   - 将 Webhook URL 存储在环境变量 `.env.local`
   - 在应用组件中调用 Webhook

3. **服务端处理**
   - n8n 接收请求 → 处理数据 → 返回结果

### 示例：从应用调用 n8n

```typescript
// src/apps/asin-keywords/App.tsx
'use client';

import { useState } from 'react';

export default function ASINKeywordsApp() {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!asin.trim()) {
      alert('请输入 ASIN');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ asin }),
        }
      );

      if (!response.ok) throw new Error('API 请求失败');

      const data = await response.json();
      setResults(data.keywords || []);
    } catch (error) {
      alert('查询失败，请检查网络连接或 ASIN 有效性');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>ASIN → 关键词</h2>
      <p>输入 Amazon ASIN，获取该产品的排名关键词</p>

      <input
        type="text"
        value={asin}
        onChange={(e) => setAsin(e.target.value)}
        placeholder="例：B08N5WRWNW"
        disabled={loading}
        style={{
          padding: '10px',
          marginRight: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? '查询中...' : '查询关键词'}
      </button>

      {results.length > 0 && (
        <table style={{ width: '100%', marginTop: '20px' }}>
          <thead>
            <tr>
              <th>关键词</th>
              <th>排名</th>
              <th>搜索量</th>
              <th>CPC</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, idx) => (
              <tr key={idx}>
                <td>{item.keyword}</td>
                <td>{item.rank || '-'}</td>
                <td>{item.search_volume || '-'}</td>
                <td>${item.cpc || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

### 完整 n8n 设置指南

详见 [docs/n8n-setup.md](./docs/n8n-setup.md)

主要步骤：
1. 导入 n8n 工作流文件
2. 配置 DataForSEO 凭证
3. 启用 Webhook 并获取 URL
4. 将 URL 添加到 `.env.local`：

```env
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/asin-keywords
```

## 环境变量完整参考

| 变量 | 必需 | 说明 | 示例值 |
|---|---|---|---|
| `AUTH_SECRET` | 是 | Session 加密密钥 | `openssl rand -base64 32` 输出 |
| `AUTH_GITHUB_ID` | 是 | GitHub OAuth 应用 ID | `Iv1.1234abcd5678...` |
| `AUTH_GITHUB_SECRET` | 是 | GitHub OAuth 应用密钥 | `ghp_xxxx...` |
| `ALLOWED_GITHUB_LOGINS` | 是* | 允许的 GitHub 用户名（逗号分隔） | `alice,bob,charlie` |
| `ALLOWED_EMAIL_DOMAINS` | 是* | 允许的邮箱域名（逗号分隔） | `company.com,partner.com` |
| `N8N_WEBHOOK_URL` | 否 | n8n webhook 地址 | `https://n8n.example.com/webhook/...` |
| `N8N_WEBHOOK_SECRET` | 否 | n8n webhook 密钥（可选） | `secret123` |

*注：至少需要配置 `ALLOWED_GITHUB_LOGINS` 或 `ALLOWED_EMAIL_DOMAINS` 之一

## 故障排查

### 1. 构建失败

**症状**：`npm run build` 报错

**排查步骤**：
```bash
# 检查 meta.ts 中的 category
grep -r "category" src/apps/*/meta.ts

# 验证 slug 是否与目录名一致
ls -la src/apps/

# 检查是否在 registry.ts 中注册
grep -n "allApps" src/registry.ts
```

### 2. 应用不显示在首页

**症状**：应用存在但未显示在应用列表

**排查步骤**：
1. 清除浏览器缓存（Ctrl+Shift+Delete）
2. 检查浏览器控制台是否有 JavaScript 错误
3. 确认 `registry.ts` 中的导入路径正确
4. 确认应用已添加到 `allApps` 数组

### 3. 404 错误

**症状**：访问应用页面时显示 404

**排查步骤**：
- URL 格式：`http://localhost:3000/app/<slug>`
  - ✅ 正确：`/app/keyword-dedup`
  - ❌ 错误：`/apps/keyword-dedup` 或 `/app/KeywordDedup`
- 检查 slug 大小写（必须全小写）
- 确认 slug 拼写无误

### 4. GitHub 认证失败

**症状**：点击"Sign in with GitHub"后无反应或错误

**排查步骤**：
1. 重新生成 `AUTH_SECRET`：
   ```bash
   openssl rand -base64 32
   ```
2. 验证 GitHub OAuth 凭证无误
3. 确认 callback URL 与 GitHub 应用设置一致
4. 检查浏览器控制台的具体错误信息
5. 清除浏览器 Cookie

### 5. 白名单不生效

**症状**：未授权用户仍能登录

**原因和解决**：
- 确保至少配置了一个白名单（用户名或域名）
- 检查拼写（用户名区分大小写，但配置不区分）
- 如修改了白名单，需重启应用才生效
- 已登录的旧 session 可能需要清除 Cookie

### 6. n8n Webhook 连接失败

**症状**：调用 n8n 返回错误

**排查步骤**：
1. 测试 Webhook URL 可访问性：
   ```bash
   curl -X GET https://your-n8n-instance.com/webhook/asin-keywords
   ```
2. 检查 n8n 工作流是否已激活
3. 确认环境变量中的 URL 与 n8n 实际 URL 一致
4. 查看 n8n 执行历史查看具体错误
5. 检查是否有网络/防火墙限制

## 性能优化

### 已实现的优化

- **Next.js 15 App Router**：利用最新的服务端组件
- **Streaming**：支持流式渲染
- **静态生成**：首页等静态内容预生成
- **Image 优化**：自动图片优化和懒加载
- **CSS 优化**：Tailwind CSS 生产构建去除未使用样式

### 建议

- 应用组件使用 `'use client'` 指令最小化客户端 JS
- 避免在应用中引入大型库
- 对频繁调用的数据添加缓存
- 使用 React.memo 优化组件重渲染

## 安全最佳实践

- OAuth 2.0：GitHub 认证，避免明文密码
- 环境变量：敏感信息存储在 `.env.local`，不提交到版本控制
- CSRF 保护：Auth.js 内置支持
- 白名单控制：限制应用访问权限
- n8n Webhook：支持身份验证和速率限制

## 贡献指南

### Fork & PR 流程

```bash
# 1. Fork 仓库
# https://github.com/linmaoyi1985-gif/air-filter

# 2. Clone 到本地
git clone https://github.com/your-username/air-filter.git
cd air-filter

# 3. 创建功能分支
git checkout -b feat/my-awesome-app

# 4. 按照规范添加应用（见上文）

# 5. 本地测试通过
npm run build

# 6. 提交变更
git add .
git commit -m "feat: add my awesome app"

# 7. 推送分支
git push origin feat/my-awesome-app

# 8. 在 GitHub 创建 Pull Request
# https://github.com/linmaoyi1985-gif/air-filter/pulls
```

### PR 审核标准

你的 PR 会根据以下标准审核：

- ✅ 遵守 [CLAUDE.md](./CLAUDE.md) 中的所有规则
- ✅ `npm run build` 通过（无错误或警告）
- ✅ 代码风格一致
- ✅ 应用在首页正常显示
- ✅ 应用页面可访问且功能正常
- ✅ PR 描述清晰完整

## API 路由

| 端点 | 方法 | 说明 |
|---|---|---|
| `/api/auth/signin` | GET | 重定向到 GitHub OAuth |
| `/api/auth/callback/github` | GET | OAuth 回调处理（由 Auth.js 管理） |
| `/api/auth/signout` | POST | 登出 |
| `/api/auth/session` | GET | 获取当前 session |

## 监控与调试

```bash
# 检查 TypeScript 错误（不构建）
npx tsc --noEmit

# Lint 检查
npm run lint

# 生产构建测试
npm run build && npm start

# 开发模式调试
npm run dev
# 打开 Chrome DevTools (F12)
```

## 常见问题 (FAQ)

### Q: 我需要修改 CLAUDE.md 吗？
**A**: 仅当添加新的应用**类目**时才需要。对于新应用，直接遵循现有规则即可。

### Q: 可以使用其他 npm 包吗？
**A**: 可以，但需要明确理由并经过批准。项目优先轻量级依赖，避免不必要的包膨胀。

### Q: 如何本地测试 GitHub 认证？
**A**:
1. 创建开发用的 GitHub OAuth 应用
2. 在 `.env.local` 中配置凭证
3. 确保 callback URL 为 `http://localhost:3000/api/auth/callback/github`
4. 运行 `npm run dev` 并点击登录按钮

### Q: 可以使用 Tailwind CSS 以外的样式方案吗？
**A**: Tailwind 是推荐方案，也支持内联 CSS。避免使用 CSS-in-JS 库（styled-components）或外部 UI 框架。

### Q: 如何报告安全问题？
**A**: 请勿在公开 Issue 中透露安全漏洞。直接联系维护者处理。

### Q: 应用可以使用数据库吗？
**A**: 当前不提供内置数据库。如需数据存储，考虑使用 n8n 后端处理。

### Q: 如何追踪应用使用统计？
**A**: 可在 Vercel 控制面板查看基础分析。详细统计需自行集成分析工具（如 Google Analytics）。

## 相关资源

### 官方文档
- [Next.js 文档](https://nextjs.org/docs)
- [Auth.js 文档](https://authjs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
- [n8n 文档](https://docs.n8n.io/)

### 参考链接
- [GitHub OAuth 文档](https://docs.github.com/cn/developers/apps/building-oauth-apps)
- [Vercel 部署指南](https://vercel.com/docs)
- [项目仓库](https://github.com/linmaoyi1985-gif/air-filter)

## 联系与支持

- **问题反馈**：[GitHub Issues](https://github.com/linmaoyi1985-gif/air-filter/issues)
- **讨论交流**：[GitHub Discussions](https://github.com/linmaoyi1985-gif/air-filter/discussions)
- **维护者**：Claude Code

## License

MIT License - 详见 LICENSE 文件

---

**最后更新**: 2025 年 12 月
**版本**: 2.0 (Next.js 迁移版)
**状态**: 生产就绪

## 更新日志

### v2.0 - 2025-12-27 (Next.js 迁移)
- 从 Vite + React 迁移到 Next.js 15
- 引入 Auth.js 进行 GitHub OAuth 认证
- 实现白名单控制系统
- 添加 n8n webhook 集成支持
- 改进服务端性能和安全性

### v1.0 - 早期版本
- 初始 Vite + React 架构
- 基础应用注册系统
- 内置 4 个工具应用
