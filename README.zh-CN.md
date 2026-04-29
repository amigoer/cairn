<p align="center">
  <img src="https://raw.githubusercontent.com/amigoer/almanac/main/images/readme-banner.svg" alt="Almanac" width="100%" />
</p>

> 极简、内容向的 Hugo 个人站点主题。
> 杂志风刊头 · 混合 feed · 书 / 影 / 项目 / 友链一应俱全 · 搜索 · 暗色模式。

<p align="center">
  <strong>简体中文</strong> · <a href="./README.md">English</a>
</p>

**Almanac** 在英文里是"年鉴 / 历书"——一本按年份记录天文、节气、农事和生活点滴的小册子。
本主题想做的事差不多：在你的数字花园里留一本顺手的小书，把读 / 看 / 写 / 做按时序整齐地记录下来。

---

## 特性

- **杂志风首页** —— 个人刊头（头像 + 状态 + 社交 + 一句话），紧跟最近文章 feed，整页排得像一本季刊。
- **内置内容架** —— `/projects/`、`/reading/`、`/watching/` 开箱即用；`/douban/` 把书与影聚合在一个 tab 切换页里。
- **动态 / Moments** —— `/moments/` 朋友圈风格的微动态，支持纯文 / 多图九宫格 / 网易云音乐 / B 站 · YouTube 视频，按天分组展示。
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
git submodule add https://github.com/amigoer/almanac.git themes/almanac
```

或作为 Hugo Module：

```bash
hugo mod init github.com/yourname/your-site
hugo mod get github.com/amigoer/almanac
```

或者直接 clone：

```bash
git clone https://github.com/amigoer/almanac.git themes/almanac
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

最快的方式：拷贝 `themes/almanac/exampleSite/hugo.toml` 改改即可。最小可运行配置：

```toml
baseURL = 'https://example.com/'
languageCode = 'zh-cn'
title = "你的站点"
theme = 'almanac'

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
├── travel/                 # （可选）旅行
└── moments/                # （可选）动态 · 朋友圈风格微动态

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

主题自带 `archetypes/`，配好 `theme = 'almanac'` 之后，`hugo new posts/foo.md` 会自动套对应的模板。

| Section      | Frontmatter 关键字段                                           |
| ------------ | -------------------------------------------------------------- |
| `posts/`     | `title`, `date`, `summary`, `cover`, `tags`, `cardSize?`        |
| `projects/`  | `title`, `date`, `status`, `summary`, `tech[]`, `repo`, `homepage?` |
| `reading/`   | `title`, `date`, `status`, `author`, `cover`, `rating`, `summary` |
| `watching/`  | `title`, `date`, `status`, `director`, `poster`, `rating`, `summary` |
| `moments/`   | `date`, `mood?`, `location?`, `device?`, `images?[]`, `music?`, `video?`, `comments?` |

`status` 取值：
- `projects`：`active` · `maintained` · `experimental` · `archived`
- `reading`：`reading` · `finished` · `wishlist` · `abandoned`
- `watching`：`watching` · `watched` · `wishlist` · `abandoned`

## 动态 / Moments

`/moments/` 是朋友圈风格的轻动态流，每条 = 一个 markdown 文件（或 page bundle 目录）。
**有内容时**导航会自动出现「动态」入口，没有就隐藏。

新建一条：

```bash
# 纯文字 / 单文件
hugo new moments/2026-04-30-coffee.md

# 带图片：建议用 page bundle，方便就近放图
mkdir -p content/moments/2026-04-30-walk
hugo new moments/2026-04-30-walk/index.md
# 把图片直接拷到这个目录里
cp ~/Pictures/*.jpg content/moments/2026-04-30-walk/
```

Frontmatter：

```yaml
---
date: 2026-04-30T10:00:00+08:00
mood: "☕️"                    # 可选 · emoji 或一两个字
location: "杭州 · 西溪"        # 可选
device: "MacBook Pro"         # 可选 · 发布设备小尾巴（自由文本，自动匹配图标）
images:                       # 可选，page bundle 内的文件名
  - 1.jpg
  - 2.jpg
music:                        # 可选 · 网易云 / Spotify
  platform: "163"             # 163 | spotify
  id: "1974443814"
  type: "song"                # song | playlist | album（仅 163 用）
video:                        # 可选 · B 站 / YouTube
  platform: "bilibili"        # bilibili | youtube
  id: "BV1uv411q7Mv"
comments: true                # 可选，默认开（继承全站 Waline 配置）
---

正文支持 Markdown。
```

**图片网格规则**（朋友圈式）：

| 张数 | 布局      |
| ---- | --------- |
| 1    | 单图大图  |
| 2 / 4 | 2 列     |
| 3, 5–9 | 3 列    |

**`device` 设备小尾巴**：会在卡片右上角显示，带自动选择的图标。识别规则：

| 字段值含 | 图标 |
| --- | --- |
| `iphone` / `android` / `phone` / `pixel` / `huawei` / `xiaomi` / `oneplus` | smartphone（手机） |
| `ipad` | tablet（平板） |
| `macbook` / `laptop` / `thinkpad` / `framework` | laptop（笔记本） |
| 其它（包含 `web` / 自定义文字） | monitor（屏幕，兜底） |

**正文里也能用 shortcode**（适合一条多媒体或穿插在文字中）：

```text
{{</* music-163 id="2147051091" */>}}
{{</* music-163 id="123456" type="playlist" */>}}
{{</* video-bilibili id="BV1uv411q7Mv" */>}}
{{</* video-youtube id="dQw4w9WgXcQ" */>}}
```

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

Almanac 用 Tailwind v4 的 `@source inline()` 显式声明那些"模板里出现不了、但运行时会用到"的 class（比如动态的 `grid-cols-*`）。如果你新加了类似的动态 utility，把名字添到 `assets/css/main.css` 的 `@source inline()` 列表里。

### 品牌资产

主题自带一整套 SVG 品牌资产，作为开箱默认值；你可以在自己的站点里覆盖。

| 文件                                  | 位置                              | 用途                                                                |
| ------------------------------------- | --------------------------------- | ------------------------------------------------------------------- |
| `static/favicon.svg`                  | 站点根 `/favicon.svg`             | 主 favicon · `currentColor`，浅深模式自适配                         |
| `static/apple-touch-icon.svg`         | 站点根 `/apple-touch-icon.svg`    | 180×180 iOS 主屏图标（赤陶橙底）                                    |
| `static/safari-pinned-tab.svg`        | 站点根 `/safari-pinned-tab.svg`   | Safari 钉选标签 · 单色                                              |
| `static/og-image.svg`                 | 站点根 `/og-image.svg`            | 1200×630 社交卡 · 建议转 PNG 后通过 `params.ogImage` 配置           |
| `assets/icons/almanac.svg`            | Hugo Pipes 资源                   | 页脚小图标                                                          |
| `assets/icons/logo-horizontal.svg`    | Hugo Pipes 资源                   | 240×60 横版 logo · 导航 / inline 品牌                               |
| `assets/icons/logo-stacked.svg`       | Hugo Pipes 资源                   | 200×140 竖版 logo · hero / about                                    |
| `assets/icons/wordmark.svg`           | Hugo Pipes 资源                   | 纯文字 wordmark                                                     |
| `images/readme-banner.svg`            | 仅仓库                            | 1280×400 GitHub README 横幅                                         |

favicon / apple-touch / pinned-tab 已经在 `layouts/partials/head.html` 里接入。两种覆盖方式：

1. **同名文件覆盖** —— 把替代文件放进你自己 site 的 `static/`，Hugo 会优先用项目级的。
2. **`hugo.toml` 改路径** —— 文件在别处时，用 `[params.icons]` 重新指：

```toml
[params.icons]
  favicon        = "/favicon.svg"            # 主 favicon · currentColor 自适配深浅
  faviconIco     = "/favicon.ico"            # 老浏览器 ICO 兜底
  appleTouchIcon = "/apple-touch-icon.svg"   # iOS 主屏
  maskIcon       = "/safari-pinned-tab.svg"  # Safari 钉选标签（单色）
  maskIconColor  = "#c0764e"                 # mask-icon 填充色
```

每个键都可选，不写就用主题默认值。

Open Graph 图：把 `static/og-image.svg` 转成 PNG（推荐 [realfavicongenerator.net](https://realfavicongenerator.net/) 或 `rsvg-convert`），然后配置：

```toml
[params]
  ogImage = "/og-image.png"
```

## 搜索

⌘K 命令面板由 Pagefind 提供。`hugo --gc --minify` 出 `public/` 之后，跑：

```bash
npx pagefind --site public
```

`head.html` 里的脚本会按需加载 `/pagefind/pagefind-ui.js` 并绑定 ⌘K / Ctrl+K。

## 评论

Almanac 集成 Waline。在 `hugo.toml` 配置 `params.waline.serverURL` 即可启用文章页评论。

## 浏览器支持

主流现代浏览器。用了 CSS `clamp()` / `:where()` 等较新特性。macOS 的过度滚动回弹颜色已通过 `html { background: hsl(var(--background)) }` 锁定为主题底色。

## 协议

MIT © Amigoer

## 致谢

- 视觉语言受 [shadcn/ui](https://ui.shadcn.com)、Notion、Linear 启发。
- mono 小标签 / 表格化排版 / 编辑感来自纸媒杂志。
- `cardSize` 这一概念参考了 NetNewsWire 等阅读器的 feed 排版风格。
