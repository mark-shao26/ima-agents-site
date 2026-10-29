
# AICFO｜邵奇 AI 财务总监与企业智能体矩阵

**官方网站：** https://mark-shao26.github.io/ima-agents-site/

AICFO 是面向企业财务决策、经营风险分析与内部控制诊断的专业 AI 智能体体系，由具有多年财务管理和 CFO 实战经验的邵奇发起建设。

项目结合财务专业知识库、业务规则、案例验证及人工复核方法，为企业管理者、财务负责人和专业人员提供决策辅助。

## 核心产品与应用场景

| 产品方向 | 主要应用 |
| --- | --- |
| AICFO AI 财务总监 | 财务分析、现金流管理、经营风险识别、投融资决策辅助 |
| 灯塔计划·内部控制诊断 | 内控风险识别、证据核验、诊断报告与改进建议 |
| 银行内部控制诊断 | 银行业务风险、内部控制缺陷识别与同业风险比较 |
| 餐饮行业智能体 | 餐饮成本、现金流、经营分析与财税合规 |
| 电商行业智能体 | 净收入、退货退款、投放经济性与财税法务分析 |
| 民办学校智能体 | 招生经营、财务分析与合规风险辅助 |

## 项目特点

- **专业知识驱动：** 将财务、内控及行业知识与 AI 分析结合。
- **规则与证据约束：** 对关键财务口径、风险识别及证据来源建立明确要求。
- **案例测试验证：** 通过实际业务案例和多模型对比，持续检验输出质量。
- **人工复核机制：** 对重要判断保留专业人员核查和最终决策责任。

## 使用入口

- **AICFO 官方展示网站：** https://mark-shao26.github.io/ima-agents-site/
- **GitHub 项目仓库：** https://github.com/mark-shao26/ima-agents-site
- **智能体体验入口：** 请访问官方网站中的智能体产品介绍及相关链接。

## 开源与知识产权说明

本 GitHub 仓库用于公开展示 AICFO 产品矩阵及官方网站前端代码。

AICFO 核心专业知识库、内部控制诊断规则、测试案例底稿及其他未公开的方法论资料，不因本展示网站公开而自动开放使用或授权。

本项目提供专业决策辅助，不替代法定审计、法律意见及企业管理者的最终判断。

---

## 网站技术与部署说明

以下保留网站原有的技术说明。
  

## 目录结构

```
├── index.html            # 站点主页面（语义化单页：概览 / 智能体 / 演示 / FAQ / 联系）
├── css/style.css         # 全部样式（深色主题 + 清华紫主色，响应式）
├── js/main.js            # 交互（移动菜单、导航高亮、滚动动画）
├── assets/screenshots/   # Agent 对话截图目录（当前为占位）
└── README.md             # 本文件
```

## 本地预览

无需任何构建，直接双击打开 `index.html` 即可；也可起一个本地服务器：

```bash
cd ima-agents-site
python -m http.server 8000
# 浏览器访问 http://localhost:8000
```

## 上线前需要替换的内容

1. **Agent 入口链接**：在 `index.html` 中搜索 `待替换`，将 6 个 Agent 卡片的 `href="#"`
   替换为各自在 ima 平台的分享链接。
2. **联系方式**：搜索 `待填写` / `your-email@example.com`，替换为真实微信号、邮箱、ima 主页链接。
3. **演示截图**：把截图放入 `assets/screenshots/`，按该目录内 README.txt 的说明替换占位块。

## 部署到 GitHub Pages

### 1. 创建仓库并推送

```bash
cd ima-agents-site
git init
git add .
git commit -m "Initial commit: ima agents showcase site"
git branch -M main
git remote add origin https://github.com/<你的用户名>/<仓库名>.git
git push -u origin main
```

### 2. 开启 Pages

进入仓库 **Settings → Pages**：

- **Source**：选择 `Deploy from a branch`
- **Branch**：选择 `main`，目录选择 `/ (root)`，点击 Save

等待约 1 分钟，站点即可通过以下地址访问：

```
https://<你的用户名>.github.io/<仓库名>/
```

### 3. 自定义域名（可选）

1. 在仓库根目录新建文件 `CNAME`，内容为一行你的域名，例如：`agents.example.com`
2. 到域名 DNS 服务商处添加记录：
   - 子域名：添加 `CNAME` 记录，指向 `<你的用户名>.github.io`
   - 根域名：添加 `A` 记录，指向 GitHub Pages 的 IP（185.199.108.153 等 4 个，见 GitHub 文档）
3. 回到 **Settings → Pages**，在 Custom domain 中填写域名并勾选 **Enforce HTTPS**

## 技术说明

- 无任何第三方依赖与 CDN 引用，断网 / 未构建环境下也能正常访问
- 语义化 HTML5（`header` / `nav` / `main` / `section` / `article` / `figure` / `footer`）
- 响应式断点：900px / 640px，适配桌面、平板与手机
- 尊重 `prefers-reduced-motion`，对动效敏感用户自动关闭动画
