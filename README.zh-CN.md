<p align="center">
  <img src="./images/favicon.svg" alt="Cairn" width="72" />
</p>

# Cairn

> 极简、内容向的 Hugo 个人站点主题。
> 杂志风刊头 · 混合 feed · 书 / 影 / 项目 / 友链一应俱全 · 搜索 · 暗色模式。

简体中文 · [English](./README.md)

**Cairn** 在英文里是"路径上的石堆"—— 一种用石块堆出来的、提示走过此地的标记。
本主题想做的事差不多：在你的数字花园里堆几块顺手的石头，把读 / 看 / 写 / 做留下痕迹。

---

## 特性

- **杂志风首页** —— 个人刊头（头像 + 状态 + 社交 + 一句话），紧跟最近文章 feed，整页排得像一本季刊。
- **内置内容架** —— `/projects/`、`/reading/`、`/watching/` 开箱即用；`/douban/` 把书与影聚合在一个 tab 切换页里。
- **友链页** —— `/links/` 自带分类的友链网格 + 一张可一键复制的"我的名片"，方便对方申请时直接抄走。
- **混合卡片系统** —— 文章 frontmatter 加一行 `cardSize: feature | standard | compact | note` 即可指定卡片样式，不写时智能推断。
- **搜索** —— 内置 Pagefind 的 ⌘K 命令面板。
- **暗色模式** —— 一键循环 `跟随系统 → 浅色 → 深色`，`localStorage` 持久化，首屏无闪烁。
- **移动端抽屉** —— 头像 + 主导航 + 链接 + 社交 + 版权，全部在左侧 sheet 里，Alpine.js 驱动。
- **RSS + 友好的 `/feed/` 页** —— 因为 Chrome 已经不让 RSS 直接套 XSL，单独做一个人类友好的订阅页。
- **轻工具链** —— Tailwind v4 + `@source inline()` 处理数据驱动的 utility，Hugo Pipes 出 CSS / JS，Alpine.js 处理交互。除了 `hugo` 和 `npm install`，没有别的步骤。

## 技术栈

- **Hugo** ≥ 0.128（extended）
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Alpine.js** 3.x（CDN 引入，可换）
- **Pagefind**（可选，用于搜索）

## 快速开始

### 1. 安装主题

作为 Git 子模块（推荐）：

```bash
cd your-hugo-site
git submodule add https://github.com/amigoer/cairn.git themes/cairn
```

或作为 Hugo Module：

```bash
hugo mod init github.com/yourname/your-site
hugo mod get github.com/amigoer/cairn
```

或者直接 clone：

```bash
git clone https://github.com/amigoer/cairn.git themes/cairn
```

### 2. 安装构建依赖

```bash
npm install --save-dev tailwindcss @tailwindcss/postcss postcss postcss-cli autoprefixer
```

在项目根目录加一个 `postcss.config.js`：

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

### 3. 配置 `hugo.toml`

最快的方式：拷贝 `themes/cairn/exampleSite/hugo.toml` 改改即可。最小可运行配置：

```toml
baseURL = 'https://example.com/'
languageCode = 'zh-cn'
title = "你的站点"
theme = 'cairn'

[params]
  author = "你的名字"
  description = "一句话简介。"
  avatar = "/images/avatar.png"
  heroTitle = "Hi, 我是 你的名字"
  heroSubtitle = "稍长一点的介绍。"

  [[params.socialIcons]]
    name = "github"
    url = "https://github.com/yourname"
```

### 4. 跑起来

```bash
hugo server --bind 0.0.0.0 --port 1313 --buildDrafts
```

打开 `http://localhost:1313`。

## 站点结构

```
content/
├── _index.md               # 首页（用 layouts/index.html）
├── about.md                # layout: about
├── links.md                # layout: links     （读 data/links.yaml）
├── douban.md               # layout: douban   （聚合 reading + watching）
├── feed.md                 # layout: feed      （RSS 订阅说明页）
├── posts/                  # 文章
├── projects/               # 项目
├── reading/                # 书
├── watching/               # 影
└── travel/                 # （可选）旅行

data/
└── links.yaml              # 友链数据源

static/
├── images/
│   ├── avatar.png
│   └── banner.webp         # （可选）顶部 banner
└── ...
```

完整可运行示例见 [`exampleSite/`](./exampleSite/)。

## 各 section 的 frontmatter

主题自带 `archetypes/`，配好 `theme = 'cairn'` 之后，`hugo new posts/foo.md` 会自动套对应的模板。

| Section      | Frontmatter 关键字段                                           |
| ------------ | -------------------------------------------------------------- |
| `posts/`     | `title`, `date`, `summary`, `cover`, `tags`, `cardSize?`        |
| `projects/`  | `title`, `date`, `status`, `summary`, `tech[]`, `repo`, `homepage?` |
| `reading/`   | `title`, `date`, `status`, `author`, `cover`, `rating`, `summary` |
| `watching/`  | `title`, `date`, `status`, `director`, `poster`, `rating`, `summary` |

`status` 取值：
- `projects`：`active` · `maintained` · `experimental` · `archived`
- `reading`：`reading` · `finished` · `wishlist` · `abandoned`
- `watching`：`watching` · `watched` · `wishlist` · `abandoned`

## 自定义

### 卡片尺寸

在文章 frontmatter 里写 `cardSize` 来控制它在首页 feed 的样式：

- `feature` —— 通栏大卡（封面 + 标题 + 摘要）
- `standard` —— 宽封面 + 元信息
- `compact` —— 纯文本卡（标题 + 摘要）
- `note` —— 单行小条

不写时：有 `cover` 的文章默认 `standard`，没有的默认 `note`；项目类（`projects/`）默认始终是 `note`，可被覆盖。

### 主题色

品牌色 / 表面色都在 `assets/css/main.css` 的 `@theme inline { ... }` 里以 CSS 变量声明。默认调色取自 shadcn 的 "Claude" 主题（米色底 + 赤陶橙）。在你自己站点的 CSS 里覆盖即可换肤。

### 数据驱动的 utility

Cairn 用 Tailwind v4 的 `@source inline()` 显式声明那些"模板里出现不了、但运行时会用到"的 class（比如动态的 `grid-cols-*`）。如果你新加了类似的动态 utility，把名字添到 `assets/css/main.css` 的 `@source inline()` 列表里。

## 搜索

⌘K 命令面板由 Pagefind 提供。`hugo --gc --minify` 出 `public/` 之后，跑：

```bash
npx pagefind --site public
```

`head.html` 里的脚本会按需加载 `/pagefind/pagefind-ui.js` 并绑定 ⌘K / Ctrl+K。

## 评论

Cairn 集成 Waline。在 `hugo.toml` 配置 `params.waline.serverURL` 即可启用文章页评论。

## 浏览器支持

主流现代浏览器。用了 CSS `clamp()` / `:where()` 等较新特性。macOS 的过度滚动回弹颜色已通过 `html { background: hsl(var(--background)) }` 锁定为主题底色。

## 协议

MIT © Amigoer

## 致谢

- 视觉语言受 [shadcn/ui](https://ui.shadcn.com)、Notion、Linear 启发。
- mono 小标签 / 表格化排版 / 编辑感来自纸媒杂志。
- `cardSize` 这一概念参考了 NetNewsWire 等阅读器的 feed 排版风格。
