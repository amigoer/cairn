<p align="center">
  <img src="https://raw.githubusercontent.com/amigoer/almanac/main/images/readme-banner.svg" alt="Almanac" width="100%" />
</p>

> A minimal, content-rich personal hub theme for Hugo.
> Magazine-style hero · mixed feed · books / movies / projects shelves · friend links · search · dark mode.

<p align="center">
  <a href="./README.zh-CN.md">简体中文</a> · <strong>English</strong>
</p>

An *almanac* is a yearly book — a record of dates, observations and small markers of the year past. This theme aims to be the same: a place to leave traces of what you read, watch, build and write.

---

## Highlights

- **Editorial homepage** — Magazine-style hero with avatar, status pill, social row and tagline; followed by a configurable "recent posts" feed.
- **Built-in shelves** — `/projects/`, `/reading/`, `/watching/` come ready-made; `/douban/` aggregates books + movies behind a tab switcher.
- **Moments** — `/moments/` is a WeChat-Moments-style micro stream: text-only thoughts, photo grids (1 / 2-4 / 5-9 layouts), NetEase Cloud / Spotify embeds, Bilibili / YouTube embeds, grouped by day.
- **Friend links** — `/links/` ships with a categorised friend grid plus a "my info" name-card people can copy when applying.
- **Mixed card system** — `cardSize: feature | standard | compact | note` per-post, with a smart automatic fallback when omitted.
- **Search** — Pagefind-powered ⌘K command palette out of the box.
- **Dark mode** — Single-button cycle (`system → light → dark`) with `localStorage` persistence; no flash on first paint.
- **Mobile drawer** — Profile + nav + links + social, all in a left-side sheet driven by Alpine.js.
- **RSS + a friendly `/feed/` HTML page** — Because Chrome blocks XSL on raw RSS responses anyway.
- **Light tooling** — Tailwind v4 with `@source inline()` for data-driven utilities, Hugo Pipes for the pipeline, Alpine.js for interactivity. No bundlers, no build step beyond `hugo`.

## Stack

- **Hugo** ≥ 0.128 (extended)
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **Alpine.js** 3.x (loaded from a CDN, easily swappable)
- **Pagefind** (optional, for search)

## Quick start

### 1. Add the theme

As a Git submodule (recommended):

```bash
cd your-hugo-site
git submodule add https://github.com/amigoer/almanac.git themes/almanac
```

Or as a Hugo Module (`go.mod`-based):

```bash
hugo mod init github.com/yourname/your-site
hugo mod get github.com/amigoer/almanac
```

Or just clone:

```bash
git clone https://github.com/amigoer/almanac.git themes/almanac
```

### 2. Install build dependencies

```bash
npm install --save-dev tailwindcss @tailwindcss/postcss postcss postcss-cli autoprefixer
```

Add a `postcss.config.js` at the project root:

```js
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};
```

### 3. Configure `hugo.toml`

The fastest way is to copy `themes/almanac/exampleSite/hugo.toml` and edit. The minimum is:

```toml
baseURL = 'https://example.com/'
languageCode = 'zh-cn'
title = "Your Site"
theme = 'almanac'

[params]
  author = "Your Name"
  description = "Your tagline."
  avatar = "/images/avatar.png"
  heroTitle = "Hi, I'm Your Name"
  heroSubtitle = "Short paragraph about the site."

  [[params.socialIcons]]
    name = "github"
    url = "https://github.com/yourname"
```

### 4. Run

```bash
hugo server --bind 0.0.0.0 --port 1313 --buildDrafts
```

Open `http://localhost:1313`.

## Site structure expected by the theme

```
content/
├── _index.md               # Home (uses layouts/index.html)
├── about.md                # layout: about
├── links.md                # layout: links     (data/links.yaml)
├── douban.md               # layout: douban   (aggregates reading + watching)
├── feed.md                 # layout: feed      (RSS overview page)
├── posts/                  # Articles
├── projects/               # GitHub-style project shelf
├── reading/                # Books
├── watching/               # Movies / shows
├── travel/                 # (optional) travel notes
└── moments/                # (optional) Moments — micro stream

data/
└── links.yaml              # Friend links source

static/
├── images/
│   ├── avatar.png
│   └── banner.webp         # (optional) hero background
└── ...
```

See [`exampleSite/`](./exampleSite/) for a fully working scaffold.

## Per-section frontmatter

Almanac provides `archetypes/` for the four custom sections. After `theme = 'almanac'` is set, `hugo new posts/foo.md` will pick the right shape automatically.

| Section      | Frontmatter (key fields)                                       |
| ------------ | -------------------------------------------------------------- |
| `posts/`     | `title`, `date`, `summary`, `cover`, `tags`, `cardSize?`        |
| `projects/`  | `title`, `date`, `status`, `summary`, `tech[]`, `repo`, `homepage?` |
| `reading/`   | `title`, `date`, `status`, `author`, `cover`, `rating`, `summary` |
| `watching/`  | `title`, `date`, `status`, `director`, `poster`, `rating`, `summary` |
| `moments/`   | `date`, `mood?`, `location?`, `device?`, `images?[]`, `music?`, `video?`, `comments?` |

Status values:
- `projects`: `active` · `maintained` · `experimental` · `archived`
- `reading`: `reading` · `finished` · `wishlist` · `abandoned`
- `watching`: `watching` · `watched` · `wishlist` · `abandoned`

## Moments

`/moments/` is a WeChat-Moments-style micro stream where each entry is one markdown file (or page bundle).
The "Moments" nav link **appears automatically** when the section has at least one entry, and disappears otherwise.

Create one:

```bash
# Plain text · single file
hugo new moments/2026-04-30-coffee.md

# With images · use a page bundle so files live next to the post
mkdir -p content/moments/2026-04-30-walk
hugo new moments/2026-04-30-walk/index.md
cp ~/Pictures/*.jpg content/moments/2026-04-30-walk/
```

Frontmatter:

```yaml
---
date: 2026-04-30T10:00:00+08:00
mood: "☕️"                    # optional · emoji or short tag
location: "Hangzhou · Xixi"   # optional
device: "MacBook Pro"         # optional · "posted from" badge (free text, icon auto-detected)
images:                       # optional · file names inside the page bundle
  - 1.jpg
  - 2.jpg
music:                        # optional · NetEase Cloud / Spotify
  platform: "163"             # 163 | spotify
  id: "1974443814"
  type: "song"                # song | playlist | album (163 only)
video:                        # optional · Bilibili / YouTube
  platform: "bilibili"        # bilibili | youtube
  id: "BV1uv411q7Mv"
comments: true                # optional, defaults to true (uses site Waline)
---

Body text supports Markdown.
```

**Image grid layout** (WeChat-style):

| Count | Layout         |
| ----- | -------------- |
| 1     | Single hero    |
| 2 / 4 | 2 columns      |
| 3, 5–9 | 3 columns     |

**`device` badge** appears at the top-right of the card with an auto-picked icon:

| Field contains | Icon |
| --- | --- |
| `iphone` / `android` / `phone` / `pixel` / `huawei` / `xiaomi` / `oneplus` | smartphone |
| `ipad` | tablet |
| `macbook` / `laptop` / `thinkpad` / `framework` | laptop |
| anything else (incl. `web` / custom strings) | monitor (fallback) |

**Shortcodes for embeds inline in the body** (useful for multi-media moments or media interleaved with text):

```text
{{</* music-163 id="2147051091" */>}}
{{</* music-163 id="123456" type="playlist" */>}}
{{</* video-bilibili id="BV1uv411q7Mv" */>}}
{{</* video-youtube id="dQw4w9WgXcQ" */>}}
```

## Customisation

### Card sizes

In a post's frontmatter, set `cardSize` to control how it appears in the homepage feed:

- `feature` — full-width hero card (cover image + title + summary)
- `standard` — wide cover + meta block
- `compact` — text-only with summary
- `note` — minimal one-liner

When omitted: posts with a `cover` get `standard`, otherwise `note`. Projects are always `note` unless overridden.

### Theme tokens

Brand color and surfaces are controlled by CSS variables defined in `assets/css/main.css` under `@theme inline { ... }`. Default palette is the shadcn "Claude" theme (cream + terracotta orange). Override in your own site's CSS to re-skin.

### Tailwind utilities not auto-detected

Almanac uses `@source inline()` to ensure data-driven utilities (e.g. dynamic `grid-cols-*`) are always generated, since Tailwind v4 only emits classes it can find in templates. Extend the inline list in `assets/css/main.css` if you add new dynamic utilities.

### Brand assets

The theme ships a set of SVG brand assets — drop-in defaults that your site can override.

| File                                  | Where it lives                  | Purpose                                                                 |
| ------------------------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| `static/favicon.svg`                  | served at `/favicon.svg`        | Main favicon · `currentColor`, auto-adapts to light/dark                |
| `static/apple-touch-icon.svg`         | served at `/apple-touch-icon.svg` | 180×180 iOS home-screen icon (terracotta tile)                        |
| `static/safari-pinned-tab.svg`        | served at `/safari-pinned-tab.svg` | Safari pinned-tab mask icon · single-color                            |
| `static/og-image.svg`                 | served at `/og-image.svg`       | 1200×630 social card · convert to PNG and set `params.ogImage`          |
| `assets/icons/almanac.svg`            | Hugo Pipes resource             | Inline footer mark (small)                                              |
| `assets/icons/logo-horizontal.svg`    | Hugo Pipes resource             | 240×60 horizontal logo · navigation / inline brand                      |
| `assets/icons/logo-stacked.svg`       | Hugo Pipes resource             | 200×140 stacked logo · hero / about                                     |
| `assets/icons/wordmark.svg`           | Hugo Pipes resource             | Pure text wordmark                                                      |
| `images/readme-banner.svg`            | repo only                       | 1280×400 GitHub README banner                                           |

Favicon, apple-touch and pinned-tab links are wired in `layouts/partials/head.html`. Two ways to override:

1. **Drop in a file with the same name** under your site's `static/` — Hugo prefers project-level files over theme-level ones.
2. **Repoint via `hugo.toml`** if your file lives at a different path:

```toml
[params.icons]
  favicon        = "/favicon.svg"            # SVG · currentColor, auto light/dark
  faviconIco     = "/favicon.ico"            # legacy ICO fallback
  appleTouchIcon = "/apple-touch-icon.svg"   # iOS home screen
  maskIcon       = "/safari-pinned-tab.svg"  # Safari pinned tab (single-color)
  maskIconColor  = "#c0764e"                 # mask-icon fill colour
```

Each key is optional — omit any to keep the theme default.

For Open Graph: convert `static/og-image.svg` to PNG (e.g. via [realfavicongenerator.net](https://realfavicongenerator.net/) or `rsvg-convert`) and set:

```toml
[params]
  ogImage = "/og-image.png"
```

## Search

Pagefind powers the `⌘K` palette. After `hugo --gc --minify` produces `public/`, run:

```bash
npx pagefind --site public
```

The bundled `<script>` in `head.html` lazily loads `/pagefind/pagefind-ui.js` and binds `⌘K` / `Ctrl+K`.

## Comments

Almanac ships Waline integration. Set `params.waline.serverURL` in `hugo.toml` to enable comments on posts.

## Browser support

Modern evergreen browsers. Uses CSS `clamp()`, `:where()`, container queries-friendly markup. macOS overscroll bounce is themed by setting `html { background: hsl(var(--background)) }`.

## License

MIT © Amigoer

## Acknowledgements

- Visual language inspired by [shadcn/ui](https://ui.shadcn.com), Notion, and Linear.
- Tabular layout, mono labels and editorial feel borrowed from print magazines.
- The `cardSize` mental model owes a debt to feed-style readers like NetNewsWire.
