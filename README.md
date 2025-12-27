# 跨境电商AI应用（App Hub）

一个专为跨境电商卖家打造的工具集合平台，提供多个实用的小应用，帮助卖家提升运营效率。

## 功能特性

- 📦 **多应用集成**：一个平台集成多个小工具
- 🗂️ **分类管理**：按业务类目组织应用
- 🔍 **快速搜索**：支持按名称、描述、标签搜索
- 🎨 **简洁界面**：无需复杂UI框架，快速加载
- 🚀 **易于扩展**：标准化的应用添加流程

## 技术栈

- ⚡ Vite - 快速构建工具
- ⚛️ React 18 - UI 框架
- 📘 TypeScript - 类型安全
- 🎨 原生 CSS - 轻量级样式

## 快速开始

### 安装依赖

```bash
npm ci
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

构建产物位于 `dist/` 目录。

### 预览生产版本

```bash
npm run preview
```

## 应用类目

目前支持以下类目：

1. **Keyword Research** - 关键词与词库
2. **PPC Ads** - 广告投放与结构
3. **Competitor Intel** - 竞品情报
4. **Listing & SEO** - Listing与转化
5. **Data Tools** - 数据工具/清洗/导出
6. **Profit & FBA** - 利润/费用/FBA
7. **Supply Chain** - 供应链与库存
8. **Compliance** - 合规/政策
9. **Ops Automation** - 运营自动化
10. **Other** - 其他

## 内置应用

### 关键词去重工具
- **类目**: Keyword Research
- **功能**: 输入多行关键词，自动去重并排序，一键复制结果
- **使用场景**: 整理关键词列表、合并多个词库

### CSV/TSV转换器
- **类目**: Data Tools
- **功能**: 输入CSV或TSV文本，预览表格，导出为CSV文件
- **使用场景**: 快速查看和转换表格数据

### 利润计算器
- **类目**: Profit & FBA
- **功能**: 输入售价、成本、平台费率、运费，快速计算利润和毛利率
- **使用场景**: 产品定价、利润分析

## 如何添加新应用

### 步骤 1: 创建应用目录

在 `src/apps/` 下创建新目录，目录名即为应用的 `slug`：

```bash
mkdir src/apps/my-app
```

**注意**：
- slug 必须全小写，用连字符分隔（如 `my-app`）
- slug 必须唯一且具有描述性

### 步骤 2: 创建 meta.ts

在应用目录下创建 `meta.ts`：

```typescript
// src/apps/my-app/meta.ts
import type { AppMeta } from '../../types';

export const meta: AppMeta = {
  slug: 'my-app',                    // 必须与目录名一致
  name: '我的应用',                   // 显示名称
  description: '应用功能描述',        // 简短描述
  category: 'Data Tools',            // 必须来自预定义类目
  tags: ['标签1', '标签2'],           // 可选，用于搜索
  order: 1,                          // 可选，同类目内排序
};
```

### 步骤 3: 创建 App.tsx

在应用目录下创建 `App.tsx`：

```typescript
// src/apps/my-app/App.tsx
export default function MyApp() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>我的应用</h2>
      <p>应用内容...</p>
    </div>
  );
}
```

### 步骤 4: 注册到 registry

编辑 `src/registry.ts`，添加新应用：

```typescript
// 1. 导入 meta
import { meta as myAppMeta } from './apps/my-app/meta';

// 2. 添加到 allApps 数组
export const allApps: AppMeta[] = [
  // ... 现有应用
  myAppMeta,
];
```

### 步骤 5: 测试

```bash
# 开发模式测试
npm run dev

# 构建测试（必须通过）
npm run build
```

### 步骤 6: 提交 PR

创建 Pull Request，包含：
- PR 标题：`feat: add <应用名称> app`
- PR 描述：应用功能、所属类目、测试步骤
- 确保构建通过

## 开发规范

### 必须遵守

✅ **必须**：
- 应用目录必须放在 `src/apps/<slug>/`
- `meta.ts` 中的 `slug` 必须与目录名一致
- `category` 必须来自预定义类目（见 `src/types.ts`）
- `App.tsx` 必须使用 `export default` 导出组件
- 所有应用必须在 `src/registry.ts` 中注册
- 代码必须通过 `npm run build`
- 通过 PR 方式提交

### 禁止行为

❌ **禁止**：
- 随意创建新类目（必须先修改 `src/types.ts`）
- 修改无关应用的代码
- 引入未经批准的第三方依赖
- 使用外部 UI 框架（Material-UI、Ant Design 等）
- 直接推送到 main 分支

## 项目结构

```
air-filter/
├── src/
│   ├── apps/                    # 所有小应用
│   │   ├── keyword-dedup/       # 关键词去重工具
│   │   │   ├── App.tsx
│   │   │   └── meta.ts
│   │   ├── csv-converter/       # CSV转换器
│   │   └── profit-calculator/   # 利润计算器
│   ├── pages/                   # 页面组件
│   │   ├── HomePage.tsx         # 主页
│   │   ├── AppPage.tsx          # 应用页
│   │   └── NotFoundPage.tsx     # 404页
│   ├── App.tsx                  # 根组件
│   ├── main.tsx                 # 入口文件
│   ├── registry.ts              # 应用注册表（单一真相来源）
│   ├── types.ts                 # 类型定义
│   └── index.css                # 全局样式
├── index.html                   # HTML模板
├── package.json                 # 依赖配置
├── tsconfig.json                # TypeScript配置
├── vite.config.ts               # Vite配置
├── CLAUDE.md                    # 应用添加规则（必读）
└── README.md                    # 项目文档
```

## 路由说明

- `/` - 主页（应用列表）
- `/app/<slug>` - 应用详情页
- 其他 - 404 页面

## 部署

项目支持部署到 GitHub Pages。推送到 `main` 分支会自动触发部署。

## 故障排查

### 构建失败

1. 检查 `meta.ts` 中的 `category` 是否有效
2. 检查 `slug` 是否与目录名一致
3. 检查是否在 `registry.ts` 中注册

### 应用不显示

1. 清除浏览器缓存
2. 检查 `registry.ts` 导入路径
3. 检查 `allApps` 数组是否包含新应用

### 404 错误

1. 检查 URL 格式：`/app/<slug>`
2. 检查 `slug` 拼写

## 贡献指南

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feat/my-app`)
3. 按照规范添加应用
4. 提交变更 (`git commit -m 'feat: add my app'`)
5. 推送分支 (`git push origin feat/my-app`)
6. 创建 Pull Request

详细规则请参考 [CLAUDE.md](./CLAUDE.md)。

## License

MIT License

## 联系方式

如有问题或建议，请提交 Issue。
