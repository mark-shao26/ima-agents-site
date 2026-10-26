# 邵奇 AICFO · ima Agents 展示站点

纯静态单页站点（HTML + CSS + 原生 JS），无构建步骤、无框架依赖，可直接通过 GitHub Pages 发布。

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
