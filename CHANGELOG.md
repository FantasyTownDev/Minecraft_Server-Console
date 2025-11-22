# Changelog

本文件按 **Keep a Changelog** 与 **Semantic Versioning** 规范维护。

---

## [Unreleased] - 待定
### 新增
- 占位

### 变更
- 占位

### 修复
- 占位

---

## [0.1.0] - 2025-11-23
### 新增
- Index：新增加载页，支持定时跳转，预留 Cookie 认证与导航逻辑入口
- _Layout：引入 Bootstrap 实现界面现代化
- 全局 UI：使用 Bootstrap 现代化整体布局
- CI/CD：新增 GitHub Actions 多平台持续集成/部署流程

### 变更
- 所有文件编码由 GBK 统一改为 UTF-8（含 BOM）
- README：更新版权与许可证信息
- 全面清理并移除模板残留的 CSS/JS 内容

### 修复
- 构建：恢复被 .gitignore 误忽略的 wwwroot\lib 目录及文件
- _Layout.cshtml：修正页面标题、外链 CSS 路径，并去除重复版权年份

---

## [0.1.0] - 2025-11-22
### 新增
- 初始化 ASP.NET Core Razor Pages 项目
- 删除模板默认 lib（jquery/bootstrap）并精简 _ViewImports.cshtml
- 添加最小化 site.css 与占位 site.js

### 变更
- 无

### 修复
- 无

---

## 版本号规则
- 主版本（Major）：不兼容的 API 修改
- 次版本（Minor）：向下兼容的功能新增
- 修订号（Patch）：向下兼容的问题修正
