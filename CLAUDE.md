# Claude 新增小应用规则

本文档定义了向「跨境电商AI应用」App Hub 添加新小应用的**硬性规则**，所有开发者必须严格遵守。

## 核心原则

1. **单一真相来源**：所有应用通过 `src/registry.ts` 统一注册
2. **类目固定**：category 必须来自预定义类目体系，不得随意新增
3. **目录结构标准化**：每个应用必须按照固定目录结构组织
4. **最小依赖**：不得随意引入第三方依赖
5. **构建通过**：所有变更必须通过 `npm run build`

## 类目体系（AppCategory）

以下是**唯一允许**的 category 值（定义于 `src/types.ts`）：

1. `Keyword Research` - 关键词与词库
2. `PPC Ads` - 广告投放与结构
3. `Competitor Intel` - 竞品情报
4. `Listing & SEO` - Listing与转化
5. `Data Tools` - 数据工具/清洗/导出
6. `Profit & FBA` - 利润/费用/FBA
7. `Supply Chain` - 供应链与库存
8. `Compliance` - 合规/政策
9. `Ops Automation` - 运营自动化
10. `Other` - 其他

**重要**：如需新增类目，必须先修改 `src/types.ts` 中的 `AppCategory` 类型定义。

## 新增小应用步骤

### 1. 创建应用目录

在 `src/apps/` 下创建新目录，目录名即为 `slug`：

```
src/apps/<slug>/
```

**规则**：
- slug 必须全小写，用连字符分隔（kebab-case）
- slug 在整个 App Hub 中必须唯一
- slug 必须具有描述性（如 `keyword-dedup`，而非 `app1`）

### 2. 创建 meta.ts

在应用目录下创建 `meta.ts`，定义应用元数据：

```typescript
import type { AppMeta } from '../../types';

export const meta: AppMeta = {
  slug: '<slug>',              // 必须与目录名完全一致
  name: '应用中文名称',         // 用于展示的名称
  description: '应用功能描述',  // 简短描述（1-2句话）
  category: 'Data Tools',      // 必须来自类目体系
  tags: ['标签1', '标签2'],     // 可选，用于搜索
  order: 1,                    // 可选，同类目内排序（数字越小越靠前）
};
```

**规则**：
- `slug` 必须与目录名完全一致
- `category` 必须来自上述类目体系
- `name` 和 `description` 必填
- `tags` 和 `order` 可选

### 3. 创建 App.tsx

在应用目录下创建 `App.tsx`，实现应用逻辑：

```typescript
export default function MyApp() {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>应用标题</h2>
      <p>应用内容...</p>
    </div>
  );
}
```

**规则**：
- 必须使用 `export default` 导出 React 组件
- 组件名称建议使用 PascalCase
- 样式使用内联 CSS 或最小化 CSS 类
- 不得引入外部 UI 框架（Material-UI、Ant Design 等）

### 4. 更新 registry.ts

在 `src/registry.ts` 中注册新应用：

```typescript
// 1. 导入 meta
import { meta as myAppMeta } from './apps/<slug>/meta';

// 2. 添加到 allApps 数组
export const allApps: AppMeta[] = [
  // ... 现有应用
  myAppMeta,
];
```

**规则**：
- 必须在 `allApps` 数组中添加新应用
- 导入别名建议使用 `<slug>Meta` 格式
- 保持数组格式整洁

### 5. 本地测试

```bash
# 安装依赖（首次）
npm ci

# 启动开发服务器
npm run dev

# 构建生产版本（必须通过）
npm run build
```

**规则**：
- 必须本地验证 `npm run build` 通过
- 必须测试应用在主页显示正常
- 必须测试应用页面可正常访问

### 6. 提交 PR

**规则**：
- 必须以 PR 方式提交，不得直接推送到 main
- PR 标题格式：`feat: add <应用名称> app`
- PR 描述必须包含：
  - 应用功能说明
  - 所属类目
  - 如何测试（操作步骤）
- PR 必须通过构建检查

## 禁止事项

❌ **不允许**：
- 随意创建新类目（必须先修改 `src/types.ts`）
- 修改其他应用的代码（除非明确维护需求）
- 引入新的 npm 依赖（除非有明确理由并经过批准）
- 使用外部 UI 框架（保持项目轻量）
- 在 `src/` 外创建应用目录
- 使用相对路径导入跨应用资源
- 提交未通过构建的代码

## 示例应用

参考现有应用实现：

1. **关键词去重工具** (`src/apps/keyword-dedup/`)
   - Category: Keyword Research
   - 功能：输入多行关键词 → 去重排序 → 一键复制

2. **CSV/TSV转换器** (`src/apps/csv-converter/`)
   - Category: Data Tools
   - 功能：输入CSV/TSV文本 → 表格预览 → 导出CSV

3. **利润计算器** (`src/apps/profit-calculator/`)
   - Category: Profit & FBA
   - 功能：输入售价/成本/费率/运费 → 计算利润与毛利率

## 故障排查

### 构建失败
- 检查 `meta.ts` 中的 `category` 是否来自类目体系
- 检查 `slug` 是否与目录名一致
- 检查是否在 `registry.ts` 中注册

### 应用不显示
- 检查 `registry.ts` 导入路径是否正确
- 检查是否添加到 `allApps` 数组
- 清除浏览器缓存

### 404 错误
- 检查 URL 格式：`/app/<slug>`
- 检查 `slug` 拼写是否正确

## 维护指南

- 定期检查 `registry.ts` 保持整洁
- 定期清理未使用的应用
- 保持代码风格一致
- 及时更新文档

---

**最后提醒**：遵守规则是保证项目可维护性的关键。如有疑问，请先参考现有应用实现。
