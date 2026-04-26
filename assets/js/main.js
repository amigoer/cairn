// 主题切换：read prefers from localStorage 或 system，写入 <html>.dark
(function () {
  const KEY = "amigoer-theme";
  function apply(theme) {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  }
  const saved = localStorage.getItem(KEY) || "system";
  apply(saved);
  window.__amigoerTheme = {
    get: () => localStorage.getItem(KEY) || "system",
    set: (theme) => {
      localStorage.setItem(KEY, theme);
      apply(theme);
      window.dispatchEvent(new CustomEvent("amigoer:theme", { detail: theme }));
    },
  };
  // 监听系统暗色变化
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if ((localStorage.getItem(KEY) || "system") === "system")
        apply("system");
    });
})();

// Alpine.js 全局组件初始化
document.addEventListener("alpine:init", () => {
  // 主题切换器：单击循环 light → dark → system
  Alpine.data("themeSwitcher", () => ({
    current: window.__amigoerTheme.get(),
    cycle() {
      const next =
        this.current === "light"
          ? "dark"
          : this.current === "dark"
            ? "system"
            : "light";
      this.current = next;
      window.__amigoerTheme.set(next);
    },
    icon() {
      const t = this.current;
      if (t === "system") return "monitor";
      return t === "dark" ? "moon" : "sun";
    },
    label() {
      const t = this.current;
      if (t === "system") return "跟随系统";
      return t === "dark" ? "深色" : "浅色";
    },
  }));

  // 移动端侧栏抽屉（store 共享，trigger 与 drawer 跨 partial）
  Alpine.store("sheet", {
    open: false,
    toggle() {
      this.open = !this.open;
      document.body.style.overflow = this.open ? "hidden" : "";
    },
    close() {
      this.open = false;
      document.body.style.overflow = "";
    },
  });

  // ⌘K 命令面板搜索
  Alpine.store("search", {
    open: false,
    initialized: false,
    failed: false,
    toggle() {
      this.open = !this.open;
      document.body.style.overflow = this.open ? "hidden" : "";
      if (this.open) this._mount();
    },
    close() {
      this.open = false;
      document.body.style.overflow = "";
    },
    async _mount() {
      if (this.initialized || this.failed) return;
      const root = document.getElementById("cmdk-search");
      if (!root) return;
      try {
        if (typeof PagefindUI === "undefined") {
          await new Promise((resolve, reject) => {
            const css = document.createElement("link");
            css.rel = "stylesheet";
            css.href = "/pagefind/pagefind-ui.css";
            css.onerror = () => reject(new Error("css fail"));
            document.head.appendChild(css);
            const s = document.createElement("script");
            s.src = "/pagefind/pagefind-ui.js";
            s.onload = resolve;
            s.onerror = () => reject(new Error("js fail"));
            document.head.appendChild(s);
          });
        }
        new PagefindUI({
          element: root,
          showSubResults: true,
          showImages: false,
          resetStyles: false,
          translations: {
            placeholder: "搜索文章 / 项目 / 书评 / 影评…",
            clear_search: "清除",
            load_more: "加载更多",
            search_label: "搜索",
            zero_results: "未找到「[SEARCH_TERM]」相关结果",
            many_results: "找到 [COUNT] 个结果",
            one_result: "找到 1 个结果",
            searching: "搜索中…",
          },
        });
        this.initialized = true;
        setTimeout(() => {
          const input = root.querySelector("input");
          if (input) input.focus();
        }, 50);
      } catch (e) {
        this.failed = true;
        root.innerHTML =
          '<div class="p-6 text-sm text-muted-foreground space-y-2"><p>搜索索引尚未生成。</p><p class="text-xs">运行 <code class="rounded bg-muted px-1.5 py-0.5 border border-border font-mono">npm run build</code> 后即可使用。</p><p class="text-xs">或直接前往 <a href="/search/" class="text-brand hover:underline">完整搜索页</a>。</p></div>';
      }
    },
  });

  // ⌘K 全局键盘快捷键
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      Alpine.store("search").toggle();
    } else if (e.key === "Escape" && Alpine.store("search").open) {
      Alpine.store("search").close();
    }
  });

  // TOC scroll-spy + 滚动状态（用于错开 banner）
  Alpine.data("tocSpy", () => ({
    activeId: "",
    scrolled: false,
    init() {
      // 滚动状态：超过 banner 高度后让 TOC 上移到 top-24
      const onScroll = () => {
        this.scrolled = window.scrollY > 200;
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // 当前章节高亮
      const headings = document.querySelectorAll(
        ".prose-amigoer h2, .prose-amigoer h3, .prose-amigoer h4"
      );
      if (!headings.length) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              this.activeId = entry.target.id;
              break;
            }
          }
        },
        { rootMargin: "-80px 0px -70% 0px" }
      );
      headings.forEach((h) => observer.observe(h));
    },
    isActive(id) {
      return this.activeId === id;
    },
  }));
});
