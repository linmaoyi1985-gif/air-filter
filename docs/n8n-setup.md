# n8n 工作流配置指南 - ASIN Keywords

本文档详细说明如何配置 n8n 工作流以支持「ASIN → 关键词」小应用。

## 前置条件

1. **n8n 实例**：已安装并运行的 n8n 实例（自托管或云版本）
2. **DataForSEO 账户**：已注册 DataForSEO 账户并获取 API 凭证
   - 注册地址：https://app.dataforseo.com/register
   - 获取凭证：登录后进入 Dashboard → API Access

## 步骤 1：导入 n8n 工作流

### 1.1 下载工作流文件

从项目仓库下载工作流 JSON 文件：
```
n8n/asin-keywords.workflow.json
```

### 1.2 导入到 n8n

1. 登录你的 n8n 实例
2. 点击左上角 **"+"** 按钮创建新工作流
3. 点击右上角 **"⋮"** 菜单 → 选择 **"Import from File"**
4. 选择下载的 `asin-keywords.workflow.json` 文件
5. 点击 **"Import"** 完成导入

## 步骤 2：配置 DataForSEO 凭证

### 2.1 创建凭证

1. 在 n8n 界面中，点击右上角 **"Credentials"** 图标
2. 点击 **"+ Add Credential"**
3. 搜索并选择 **"HTTP Basic Auth"**
4. 填写以下信息：
   - **Credential Name**: `DataForSEO API`（或任意名称）
   - **User**: 你的 DataForSEO 账户邮箱
   - **Password**: 你的 DataForSEO API 密码
5. 点击 **"Save"** 保存凭证

### 2.2 关联凭证到工作流

1. 打开导入的工作流
2. 点击 **"DataForSEO Request"** 节点
3. 在节点配置中找到 **"Credential for Basic Auth"**
4. 选择刚才创建的 `DataForSEO API` 凭证
5. 点击 **"Save"** 保存节点配置

## 步骤 3：启用 Webhook

### 3.1 激活工作流

1. 在工作流编辑界面，点击右上角 **"Active"** 开关（变为绿色）
2. 工作流激活后，Webhook Trigger 节点会生成一个 URL

### 3.2 获取 Webhook URL

1. 点击 **"Webhook Trigger"** 节点
2. 在节点详情中找到 **"Production URL"**（生产环境 URL）
3. 复制完整的 Webhook URL，格式类似：
   ```
   https://your-n8n-instance.com/webhook/asin-keywords
   ```

### 3.3 测试 Webhook

使用 curl 或 Postman 测试 Webhook 是否正常工作：

```bash
curl -X POST https://your-n8n-instance.com/webhook/asin-keywords \
  -H "Content-Type: application/json" \
  -d '{"asin": "B08N5WRWNW"}'
```

正常返回示例：
```json
{
  "asin": "B08N5WRWNW",
  "keywords": [
    {
      "keyword": "air purifier",
      "rank": 5,
      "search_volume": 135000,
      "cpc": 1.45
    },
    ...
  ]
}
```

## 步骤 4：配置前端环境变量

### 4.1 创建 .env 文件

在项目根目录创建 `.env` 文件（如果不存在）：

```bash
touch .env
```

### 4.2 添加 API URL

编辑 `.env` 文件，添加以下内容：

```env
VITE_ASIN_KEYWORDS_API_URL=https://your-n8n-instance.com/webhook/asin-keywords
```

**注意**：
- 将 URL 替换为你在步骤 3.2 中获取的实际 Webhook URL
- `VITE_` 前缀是 Vite 构建工具的环境变量命名规范

### 4.3 重启开发服务器

修改 `.env` 文件后，需要重启开发服务器：

```bash
npm run dev
```

## 步骤 5：测试小应用

1. 启动开发服务器后，访问：`http://localhost:5173`
2. 在首页找到 **"ASIN → 关键词（DataForSEO）"** 应用
3. 点击进入应用页面
4. 输入一个有效的 Amazon ASIN（例如：`B08N5WRWNW`）
5. 点击 **"查询关键词"** 按钮
6. 验证是否正常返回关键词列表

## 工作流逻辑说明

工作流包含以下节点：

1. **Webhook Trigger**：接收前端 POST 请求
2. **Validate ASIN**：校验 ASIN 格式（10位字母数字）
3. **Error Response**：ASIN 无效时返回错误信息
4. **DataForSEO Request**：调用 DataForSEO API 获取关键词数据
   - Endpoint: `/v3/dataforseo_labs/amazon/ranked_keywords/live`
   - 参数：
     - `asin`: 用户输入的 ASIN
     - `location_code`: 2840（美国）
     - `language_code`: en（英语）
     - `limit`: 200（最多返回 200 个关键词）
5. **Parse Response**：解析 DataForSEO 响应，提取关键字段
6. **Success Response**：返回统一格式的 JSON 数据

## 常见问题

### Q1: 工作流导入后无法保存？
**A**: 确保 DataForSEO 凭证已正确创建并关联到 "DataForSEO Request" 节点。

### Q2: 前端提示 "未配置 API URL"？
**A**: 检查 `.env` 文件是否存在，且配置项名称为 `VITE_ASIN_KEYWORDS_API_URL`。修改后需重启开发服务器。

### Q3: 前端请求失败，显示 CORS 错误？
**A**: 确保 n8n 实例允许跨域请求。如果是自托管 n8n，可以在环境变量中设置：
```bash
N8N_CORS_ALLOW_ORIGIN="*"
```

### Q4: DataForSEO API 返回 401 错误？
**A**: 检查 DataForSEO 凭证是否正确，确认邮箱和密码无误。

### Q5: 某些 ASIN 查询返回空结果？
**A**: 这是正常现象。DataForSEO 数据库可能没有该 ASIN 的关键词数据，或该产品排名较低。

### Q6: 如何限制 Webhook 访问权限？
**A**: 在 n8n 工作流的 Webhook Trigger 节点中，可以配置：
- **Authentication**: 选择 Basic Auth 或 Header Auth
- **IP Whitelist**: 限制只允许特定 IP 访问

## 数据字段说明

返回的 JSON 数据结构：

```typescript
{
  asin: string;           // 查询的 ASIN
  keywords: [
    {
      keyword: string;       // 关键词文本
      rank: number | null;   // 该 ASIN 在此关键词下的排名（1-based）
      search_volume: number | null;  // 月搜索量
      cpc: number | null;    // 每次点击成本（美元）
    }
  ]
}
```

## DataForSEO API 成本参考

- **DataForSEO Labs Amazon Ranked Keywords**：每次请求消耗 **2.5 API 积分**
- **免费套餐**：注册后赠送 $1（约 400 积分），可测试约 160 次
- **付费套餐**：按需充值，详见 https://dataforseo.com/pricing

## 生产环境部署建议

### 1. 保护 Webhook
- 启用身份验证（Basic Auth 或自定义 Header）
- 限制请求频率（使用 n8n 的 Rate Limit 节点）
- 记录请求日志

### 2. 错误处理
- 添加 Error Trigger 节点捕获异常
- 配置错误通知（邮件/Slack/Discord）

### 3. 缓存优化
- 对于相同 ASIN，可添加缓存节点（使用 Redis 或 n8n 内置缓存）
- 设置合理的缓存过期时间（例如：24小时）

### 4. 监控告警
- 使用 n8n 的 Workflow Execution History 监控成功率
- 配置 DataForSEO API 配额告警

## 相关资源

- **DataForSEO 文档**: https://docs.dataforseo.com/v3/dataforseo_labs/amazon/ranked_keywords/live/
- **n8n 官方文档**: https://docs.n8n.io/
- **项目仓库**: https://github.com/linmaoyi1985-gif/air-filter

---

**维护者**: Claude Code
**最后更新**: 2025-12-27
