# 幻梦 Minecraft 服务器 Web 控制台  

**裸仓库初始化完成，当前仅包含精简后的 ASP.NET Core Razor Pages 模板，后续功能将逐步迭代。**  

## 快速开始  
1. 安装 `.NET 10 SDK`（含 `dotnet` 命令）。  
2. 克隆仓库：  
   ```bash
   git clone https://github.com/FantasyTownDev/Minecraft_Server-Console.git
   cd Minecraft_Server-Console/
   ```  
3. 运行：  
   ```bash
   dotnet restore
   dotnet watch run
   ```  
   浏览器应自动打开 `https://localhost:5001`，且仅显示占位首页。  

## 开发分支规范  
| 分支名 | 用途 | 保护规则 | 合并方式 |
| --- | --- | --- | --- |
| `main` | 可部署稳定版 | 禁止直接推送 | 仅通过 PR + 1 人审核 |
| `dev` | 日常集成 | 禁止直接推送 | PR + 快速审核即可 |
| `feat/功能名` | 新功能开发 | 无，开发者自有 | PR 到 `dev` |
| `fix/问题简述` | 线上缺陷热修 | 无 | PR 到 `main` 与 `dev` |
| `chore/任务名` | 构建、依赖、文档 | 无 | PR 到 `dev` |

**命名示例**：  
- `feat/start-stop-server`  
- `fix/log-duplicate-lines`  
- `chore/update-dotnet9`  

## 提交消息格式（Conventional Commits）  
```
<type>(<scope>): <subject>
```  
常用 `type`：`feat`、`fix`、`chore`、`docs`、`style`、`refactor`、`test`。  

## 目录说明  
```
├─ Pages/                                     Razor 页面  
├─ wwwroot/                                   静态资源（已删 lib，仅留 site.css & site.js）  
├─ Services/                                  待添加：Minecraft 进程守护服务  
├─ Hub/                                       待添加：SignalR 集线器  
└─ Fantasy.MinecraftServerConsole.csproj      项目文件  
```

## 技术栈  
- ASP.NET Core Razor Pages  
- SignalR（实时日志）  
- 无前端框架，纯原生 JS + CSS  

## 贡献流程  
1. 基于最新 `dev` 创建个人功能分支。  
2. 推送至远端并发起 Pull Request，**必须关联对应 Issue**。  
3. PR 标题与提交消息遵循上述规范，CI 绿灯后由维护者合并。  

## 待办清单（To Do List）  
- [ ] 创建 `Services/ServerService.cs`：封装 `java -jar server.jar` 启停  
- [ ] 创建 `Hubs/LogHub.cs`：SignalR 推送控制台日志  
- [ ] 修改 `Index.cshtml`：添加启动/停止按钮与 `<pre id="log">` 面板  
- [ ] 日志滚动与前端命令输入框  
- [ ] 实现用户创建与登录
- [ ] 玩家在线列表接口  
- [ ] GitHub Actions 自动构建 & 单元测试  
- [ ] 发布 Release 并上传二进制包  

> 功能完成后请在 To Do List 对应项打勾，并在 CHANGELOG.md 追加记录。

## 开源许可证
源代码遵循 [GUN General Public License v3.0](https://github.com/FantasyTownDev/Minecraft_Server-Console/blob/main/LICENSE) 协议 

Copyright ©2025 FantasyTownDev.
