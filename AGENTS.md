# AGENTS.md

本文件是给后续 coding agent 使用的项目操作手册。处理这个仓库时，优先遵守这里的约定；如果用户在当前对话里给出更新指令，以用户最新指令为准。

## 项目定位

- 这是 `AlexWei061/AlexWei061.github.io` 的 GitHub Pages / Jekyll 技术博客。
- 站点是轻量静态博客，不使用 React、Vite、Astro 或后端服务。
- 内容按根 notebook 组织：`OI`、`Math`、`Machine Learning`。
- 已迁移文章主要来自三个源目录：
  - OI: `/Users/alex/Alex/NOIP/blog`
  - Machine Learning: `/Users/alex/Blog/Machine learning`
  - Real Analysis: `/Users/alex/Blog/RealAnalysis`
- 迁移源目录不是废文件。不要删除、移动或重命名这些目录，除非用户明确要求。

## 目录职责

- `_posts/`: Jekyll 文章输出目录。大部分文件由 `tools/migrate_noip_blog.py` 生成。
- `_includes/archive.html`: archive 列表、搜索、tag 筛选的复用模板。
- `_layouts/default.html`: 全站基础布局、导航、CSS/JS 引用。
- `_layouts/post.html`: 文章页布局、返回链接、MathJax 配置。
- `assets/css/main.css`: 全站样式。
- `assets/js/search.js`: archive 页本地搜索和 tag 筛选逻辑。
- `assets/images/blog/`: OI 文章图片。
- `assets/images/machine-learning/`: Machine Learning 文章图片，保留源相对目录结构。
- `assets/images/real-analysis/`: Real Analysis 文章图片，保留源相对目录结构。
- `tools/migrate_noip_blog.py`: 多来源迁移脚本，也是旧文标题、分类、图片、链接和 LaTeX 规范化规则的主要来源。
- `tests/blog-site.test.mjs`: 源码级回归测试，覆盖文章数量、分类、图片、链接、LaTeX 规范化和搜索索引。
- `_site/`, `.jekyll-cache/`, `.sass-cache/`: 本地生成物和缓存，不提交。

## 命名规范

- Jekyll 文章文件名使用 `_posts/YYYY-MM-DD-slug.md`。
- 文章 URL 使用 `_config.yml` 中的 `permalink: /posts/:title/`，因此 slug 来自文件名日期后的部分。
- 迁移生成的旧文章 URL 应保持稳定；不要为了显示标题改 slug。
- 首页和 archive 列表标题优先使用 front matter 中的 `archive_title`。
- 文章详情页标题使用 front matter 中的 `title`。
- 根 notebook 字段：
  - `section: "OI"` / `section_slug: "oi"`
  - `section: "Math"` / `section_slug: "math"`
  - `section: "Machine Learning"` / `section_slug: "machine-learning"`
- OI 分类字段使用英文显示名和 slug，例如：
  - `oi_category: "Data Structures"` / `oi_category_slug: "data-structures"`
  - `oi_category: "Graph Theory"` / `oi_category_slug: "graph"`
  - `oi_category: "Optimization"` / `oi_category_slug: "optimization"`
- Math / Real Analysis 字段：
  - `math_category: "Real Analysis"` / `math_category_slug: "real-analysis"`
  - `math_chapter: "Chapter 0"` / `math_chapter_slug: "ch0"`
- 图片路径写成站内绝对路径，例如 `/assets/images/blog/KMP.png`。
- 页面路径使用现有结构：
  - `/`
  - `/oi/`
  - `/oi/<category>/`
  - `/math/`
  - `/math/real-analysis/`
  - `/math/real-analysis/ch0/`
  - `/machine-learning/`
  - `/posts/<slug>/`

## 内容规范

- 对迁移生成文章的批量规则，优先修改 `tools/migrate_noip_blog.py`，然后重新迁移；不要逐篇手改会被脚本覆盖的内容。
- 新增单篇手写文章时，可以直接添加 `_posts/YYYY-MM-DD-slug.md`，但要补齐必要 front matter。
- 文章 front matter 至少应包含：

```yaml
---
layout: post
title: "Article Title"
archive_title: "List Title"
date: YYYY-MM-DD
section: "Math"
section_slug: "math"
tags: ["tag-one", "tag-two"]
summary: "Short article summary."
math: true
---
```

- 含 LaTeX 的文章设置 `math: true`。
- LaTeX 兼容和 Markdown 冲突修复应集中在迁移脚本和 `_layouts/post.html` 的 MathJax 配置中维护。
- 搜索索引使用 `search.json`，应保持摘录长度受控，不要把大段全文无限制写入索引。
- 旧文内链指向已迁移博客内容时，应重写到 `/posts/<slug>/`；外部题面、官方文档、非本站文章链接保留外链。

## 操作规范

- 先读代码再改动。常用入口是 `_config.yml`、`_includes/archive.html`、`_layouts/default.html`、`_layouts/post.html`、`tools/migrate_noip_blog.py`、`tests/blog-site.test.mjs`。
- 搜索文件或文本优先用 `rg` / `rg --files`。
- 手工编辑文件使用 `apply_patch`。
- 不要回滚用户或其他 agent 已经做出的未提交改动。
- 不要删除迁移源目录：
  - `/Users/alex/Alex/NOIP/blog`
  - `/Users/alex/Blog/Machine learning`
  - `/Users/alex/Blog/RealAnalysis`
- 不要提交或依赖这些本地生成物：
  - `_site/`
  - `.jekyll-cache/`
  - `.sass-cache/`
  - `.DS_Store`
- 用户通常已经手动启动 Jekyll 服务在 `http://127.0.0.1:4000`。不要主动再开新的 `jekyll serve`，除非用户明确要求。
- 可以运行 `jekyll build --destination /private/tmp/<name> --disable-disk-cache` 做构建验证。
- 修改迁移逻辑后，通常需要运行 `python3 tools/migrate_noip_blog.py` 刷新 `_posts/` 和图片资源。

## 验证规范

常规验证顺序：

```bash
python3 tools/migrate_noip_blog.py
node --test tests/blog-site.test.mjs
jekyll build --destination /private/tmp/blog-check --disable-disk-cache
```

- 只改布局、CSS 或 JS 时，可以不跑迁移脚本，但必须跑 Node 测试和 Jekyll build。
- 修改图片迁移或资源清理时，检查文章中的 `/assets/images/...` 引用是否都存在。
- 修改 LaTeX 规则时，除了源码测试，还应使用浏览器抽查代表文章；必要时遍历 `/posts/<slug>/` 检查 `mjx-merror`。
- 不要用 `_site/` 的内容作为源码修改对象；它是构建输出。
- 构建后如果 `_site/` 又出现，通常是本地 Jekyll 服务自动生成，保持 ignored 即可。

## Git 规范

- 开始前运行 `git status --short`，了解已有 dirty worktree。
- 提交前说明本次变更范围，不把无关文件混进同一次提交。
- 当前仓库可能已有未提交迁移输出或清理变更；不要用 `git reset --hard`、`git checkout --` 等命令覆盖。
- 如果用户要求 push，先确认测试和构建结果，再提交并推送。

