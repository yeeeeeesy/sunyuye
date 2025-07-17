# GitHub Pages 部署指南

## 快速开始

您的个人简历网站现在已经准备好部署到GitHub Pages！请按照以下步骤操作：

### 1. 创建GitHub仓库

```bash
# 初始化git（如果还没有的话）
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始化个人简历网站"

# 添加您的GitHub仓库
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 推送到main分支
git push -u origin main
```

### 2. 启用GitHub Pages

1. 进入您的GitHub仓库设置
2. 滚动到 **Pages** 部分
3. 在 **Source** 下选择 **Deploy from a branch**
4. 选择分支: **main**
5. 选择文件夹: **/ docs**
6. 点击 **Save**

### 3. 访问您的网站

您的简历网站将在以下地址上线：
```
https://您的用户名.github.io/您的仓库名
```

## 功能特性

### ✅ 完整功能
- **完整简历展示**: 所有部分包括教育背景、工作经历、项目经验
- **双语支持**: 完整的中英文切换功能
- **深色模式**: 完整的主题切换功能  
- **AI聊天助手**: 关于您背景和经验的智能回复
- **简历下载**: PDF下载功能
- **响应式设计**: 适配所有设备
- **SEO优化**: 完整的搜索引擎优化

### 🔄 自动回退机制
- **API调用**: 当没有服务器时优雅回退到静态数据
- **聊天回复**: 预配置的关于您背景的智能回复
- **资源服务**: 图片和简历从静态文件提供

## 本地测试

要在本地测试GitHub Pages构建：

```bash
# 构建GitHub Pages版本
./build-github-pages.sh

# 本地测试（选择一种方法）
cd docs && python3 -m http.server 8000
# 或者
cd docs && python -m SimpleHTTPServer 8000

# 访问 http://localhost:8000
```

## 自定义配置

### 更新个人信息
1. **翻译内容**: 编辑 `client/src/lib/translations.ts`
2. **静态回复**: 修改 `client/src/lib/static-data.ts`  
3. **简历文件**: 替换 `attached_assets/resume_1752651300851.pdf`
4. **头像照片**: 替换 `attached_assets/1_1752651304739.jpg`

### 手动部署步骤

如果您想手动部署到docs文件夹：

```bash
# 1. 构建静态文件到docs文件夹
./build-github-pages.sh

# 2. 提交docs文件夹到git
git add docs/
git commit -m "部署到GitHub Pages"
git push

# 3. 在GitHub仓库设置中启用Pages，选择main分支的docs文件夹
```

## 故障排除

### 构建失败
- 检查 `package.json` 中的所有依赖项
- 确保Node.js版本兼容（查看workflow文件）

### 刷新页面出现404错误
- 工作流会自动处理单页应用路由
- 确保404.html重定向脚本正常工作

### 资源加载失败
- 验证文件在 `attached_assets/` 目录中
- 检查构建脚本是否将它们复制到 `client/public/`

## 文件结构

```
docs/                    # GitHub Pages发布文件夹
├── index.html          # 主页面
├── 404.html            # 单页应用路由支持
└── assets/             # 构建后的CSS、JS和图片文件

client/
├── src/                # React源代码
└── public/             # 静态资源

.github/workflows/      # 自动部署配置
build-github-pages.sh   # 手动构建脚本
```

## 自动部署 vs 手动部署

### 选项1: 自动部署（推荐）
- 修改配置使用GitHub Actions自动构建
- 每次推送代码都会自动更新网站
- 需要在仓库设置中选择"GitHub Actions"作为Pages源

### 选项2: 手动部署（当前配置）
- 使用 `./build-github-pages.sh` 手动构建到docs文件夹
- 推送docs文件夹到GitHub
- 在Pages设置中选择"main分支的docs文件夹"

## 支持

网站会自动检测GitHub Pages环境并切换到静态模式。开发环境（服务器模式）和生产环境（GitHub Pages静态模式）都完全支持。