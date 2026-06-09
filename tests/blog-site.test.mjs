import assert from "node:assert/strict";
import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function read(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

async function listFiles(relativePath) {
  const base = path.join(root, relativePath);
  const entries = await readdir(base, { recursive: true, withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(entry.parentPath || entry.path, entry.name))
    .map((filePath) => path.relative(base, filePath).replaceAll(path.sep, "/"))
    .sort();
}

async function assertExists(relativePath) {
  assert.equal(await exists(relativePath), true, `${relativePath} should exist`);
}

async function assertMissing(relativePath) {
  assert.equal(await exists(relativePath), false, `${relativePath} should be removed`);
}

function isEscaped(value, index) {
  let slashes = 0;
  for (let cursor = index - 1; cursor >= 0 && value[cursor] === "\\"; cursor--) {
    slashes += 1;
  }
  return slashes % 2 === 1;
}

function stripCodeContent(value) {
  return value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]*`/g, "");
}

function inlineMathSegments(value) {
  const segments = [];
  for (let index = 0; index < value.length; index += 1) {
    if (value.startsWith("$$", index) && !isEscaped(value, index)) {
      const end = value.indexOf("$$", index + 2);
      index = end === -1 ? value.length : end + 1;
      continue;
    }

    if (value[index] === "$" && !isEscaped(value, index)) {
      const end = (() => {
        for (let cursor = index + 1; cursor < value.length; cursor += 1) {
          if (value[cursor] === "$" && !isEscaped(value, cursor)) {
            return cursor;
          }
        }
        return -1;
      })();
      if (end !== -1) {
        segments.push(value.slice(index + 1, end));
        index = end;
      }
      continue;
    }

    if (value.startsWith("\\(", index) && !isEscaped(value, index)) {
      const end = value.indexOf("\\)", index + 2);
      if (end !== -1) {
        segments.push(value.slice(index + 2, end));
        index = end + 1;
      }
    }
  }
  return segments;
}

const index = await read("index.html");
assert.match(index, /Alex's Blog/, "homepage should use the new site identity");
assert.match(index, /id="blog-search"/, "homepage should include search input");
assert.match(index, /id="tag-filters"/, "homepage should include tag filters");
assert.match(index, /id="post-list"/, "homepage should include a post list");
for (const legacyLabel of ["My Codes", "Study", "Games", "Collections", "My Tour Plan"]) {
  assert.doesNotMatch(index, new RegExp(legacyLabel), `homepage should not show ${legacyLabel}`);
}

const config = await read("_config.yml");
assert.match(config, /title:\s+Alex's Blog/, "_config.yml should define the blog title");
assert.match(config, /permalink:\s+\/posts\/:title\//, "_config.yml should define post permalinks");
assert.match(config, /excerpt_separator:\s+"<!-- excerpt -->"/, "_config.yml should avoid Liquid raw excerpt warnings");
assert.match(config, /exclude:[\s\S]*-\s+tests\//, "_config.yml should not publish source tests");
assert.match(config, /exclude:[\s\S]*-\s+tools\//, "_config.yml should not publish migration tooling");

await assertExists("_layouts/default.html");
await assertExists("_layouts/post.html");
await assertExists("assets/css/main.css");
await assertExists("assets/js/search.js");
await assertExists("search.json");
await assertExists("static/favicon.ico");

const postLayout = await read("_layouts/post.html");
assert.match(postLayout, /\[tex\]\/color/, "MathJax should load color support for migrated textcolor formulas");
assert.match(postLayout, /packages:[\s\S]*color/, "MathJax tex packages should include color support");

const css = await read("assets/css/main.css");
assert.match(css, /overflow-x:\s*hidden/, "layout should prevent accidental mobile horizontal scrolling");
assert.match(css, /width:\s*calc\(100% - 28px\)/, "mobile shell should use a valid calc width");
assert.match(css, /\.tag-chip,[\s\S]*?max-width:\s*100%/, "long tag chips should stay within the mobile viewport");
assert.match(css, /overflow-wrap:\s*anywhere/, "long migrated text and tags should be allowed to wrap");

const postFiles = await listFiles("_posts");
assert.equal(postFiles.filter((file) => file.endsWith(".md")).length, 156, "all migrated NOIP blog posts should be present");
assert.equal(postFiles.includes("2021-11-13-fft.md"), false, "old FFT migration artifact should be replaced");
assert.equal(postFiles.includes("2021-11-10-fft.md"), true, "FFT should keep the old blog history date and /posts/fft/ slug");

const inlineMathPipeIssues = [];
for (const file of postFiles.filter((item) => item.endsWith(".md"))) {
  const content = stripCodeContent(await read(`_posts/${file}`));
  for (const segment of inlineMathSegments(content)) {
    if (segment.includes("|")) {
      inlineMathPipeIssues.push(`${file}: ${segment.replace(/\s+/g, " ").trim().slice(0, 100)}`);
    }
  }
}
assert.deepEqual(
  inlineMathPipeIssues,
  [],
  "inline math should not contain raw | characters because kramdown can parse them as table separators",
);

const blogImages = await listFiles("assets/images/blog");
assert.equal(blogImages.length, 92, "all blog images plus two external practice images should be copied");
for (const imagePath of [
  "BST1.png",
  "KMP.png",
  "MQDP1.png",
  "TreeDE.png",
  "TrieEg.png",
  "binaryIndexTreeExample.png",
]) {
  assert.equal(blogImages.includes(imagePath), true, `${imagePath} should be available to posts`);
}

const post = await read("_posts/2021-11-10-fft.md");
assert.match(post, /^---[\s\S]*layout:\s+post[\s\S]*---/, "FFT post should have post layout front matter");
assert.match(post, /^---[\s\S]*title:\s+"FFT"[\s\S]*---/, "FFT post should keep its title");
assert.match(post, /^---[\s\S]*date:\s+2021-11-10[\s\S]*---/, "FFT post should use the old blog history date");
assert.match(post, /^---[\s\S]*tags:\s+\["Math",\s*"caculus"\][\s\S]*---/, "FFT post should use folder-derived tags");
assert.match(post, /^---[\s\S]*math:\s+true[\s\S]*---/, "FFT post should enable math rendering");
assert.match(post, /# FFT/, "FFT content should be preserved");
assert.match(post, /快速傅里叶变换/, "Chinese FFT article text should be preserved");
assert.match(post, /\$O\(n \\log n\)\$/, "math notation should be preserved");

const bstPostName = postFiles.find((file) => file.endsWith("-bst.md"));
assert.ok(bstPostName, "BST post should be generated");
const bstPost = await read(`_posts/${bstPostName}`);
assert.match(bstPost, /tags:\s+\["DS",\s*"Tree",\s*"平衡树"\]/, "BST post should include all folder-level tags");
assert.match(bstPost, /\/assets\/images\/blog\/BST1\.png/, "BST local images should be rewritten to blog assets");

const kmpPostName = postFiles.find((file) => file.endsWith("-kmp.md"));
assert.ok(kmpPostName, "KMP post should be generated");
const kmpPost = await read(`_posts/${kmpPostName}`);
assert.match(kmpPost, /\/assets\/images\/blog\/KMP\.png/, "KMP local image should be rewritten to blog assets");

const tarjanDccPost = await read("_posts/2021-11-03-tarjananddcc.md");
assert.match(tarjanDccPost, /\[Tarjan求强连通分量\]\(\/posts\/tarjanandscc\/\)/, "old GitHub OI links should point at migrated posts");

const spfaPost = await read("_posts/2021-11-03-spfa.md");
assert.match(spfaPost, /\(\/posts\/dijkstra\/\)/, "moved old GitHub article paths should resolve by migrated article identity");

const inversePost = await read("_posts/2021-11-03-inversemodule.md");
assert.match(inversePost, /\[扩展欧几里得算法\]\(\/posts\/extendeuclid\/\)/, "old GitHub Math links should point at migrated posts");

const linkCutTreePost = await read("_posts/2022-08-31-link-cut-tree.md");
assert.match(linkCutTreePost, /\[树链剖分~~~\]\(\/posts\/heavypathdecomposition\/\)/, "old heavy path decomposition links should point at migrated posts");
assert.match(linkCutTreePost, /\[Splay\]\(\/posts\/splay1\/\)/, "old generic Splay links should point at the first migrated Splay article");

const quadraticResiduePost = await read("_posts/2022-05-21-quadraticresidue.md");
assert.match(quadraticResiduePost, /\[原根和阶的口胡笔记\]\(\/posts\/primitiveroot\/\)/, "old personal CSDN links should point at migrated posts");
assert.match(quadraticResiduePost, /https:\/\/www\.luogu\.com\.cn\/problem\/P5491/, "problem links should remain external");

const splayPost = await read("_posts/2022-08-31-splay1.md");
assert.match(splayPost, /\[关于二叉查找树\]\(\/posts\/bst\/\)/, "old personal CSDN prerequisite links should point at migrated posts");

const noiReturnPost = await read("_posts/2022-05-28-noi2018day1t1return.md");
assert.match(noiReturnPost, /\[kruskal 重构树\]\(\/posts\/kruskalreconstruction\/\)/, "old personal CSDN technique links should point at migrated posts");

const numberTheoryExercisePost = await read("_posts/2021-11-08-数论函数-题.md");
assert.match(numberTheoryExercisePost, /\[数论函数学习笔记\]\(\/posts\/arithmeticfunction\/\)/, "old personal CSDN note links should point at migrated posts");

const allPostText = await Promise.all(postFiles.filter((file) => file.endsWith(".md")).map((file) => read(`_posts/${file}`)));
const joinedPosts = allPostText.join("\n");
assert.doesNotMatch(joinedPosts, /https:\/\/github\.com\/AlexWei061\/OI\/blob\/main\//, "old GitHub OI blog links should not remain in migrated posts");
assert.doesNotMatch(joinedPosts, /https:\/\/blog\.csdn\.net\/ID246783\/article\/details\//, "old personal CSDN blog links should not remain in migrated posts");
assert.match(joinedPosts, /https:\/\/www\.luogu\.com\.cn\/problem\/P3803/, "external problem links should not be rewritten");

const liquidUnsafePost = await read("_posts/2021-11-17-勾股数组.md");
assert.match(liquidUnsafePost, /\{\{k'_i\}/, "sample post should preserve Liquid-looking math text");
assert.match(liquidUnsafePost, /^---[\s\S]*---\n\{% raw %\}/, "post body should be protected from Liquid parsing");
assert.match(liquidUnsafePost, /\{% endraw %\}\s*$/, "post body should close Liquid raw protection");

const searchJson = await read("search.json");
assert.match(searchJson, /site\.posts/, "search index should be generated from Jekyll posts");
assert.match(searchJson, /strip_html/, "search index should strip post HTML");
assert.match(searchJson, /"excerpt":/, "search index should expose bounded excerpts");
assert.match(searchJson, /truncate:\s*800/, "search index should keep migrated search data bounded");
assert.doesNotMatch(searchJson, /"content":/, "search index should not include unbounded full post content");

const searchJs = await read("assets/js/search.js");
assert.match(searchJs, /blog-search/, "search script should bind the search input");
assert.match(searchJs, /tag-filters/, "search script should bind tag filters");
assert.match(searchJs, /fetch\(["']\/search\.json["']\)/, "search script should load the generated search index");
assert.match(searchJs, /indexed\.excerpt/, "search script should query bounded excerpts");

{
  const input = {
    value: "fft",
    addEventListener() {}
  };
  const tagButton = {
    classList: { toggle() {} },
    dataset: { tag: "" }
  };
  const tagFilters = {
    addEventListener() {},
    querySelectorAll() {
      return [tagButton];
    }
  };
  const card = {
    dataset: {
      url: "/posts/fft/",
      tags: "algorithm fft"
    },
    textContent: "FFT fast Fourier transform 傅里叶",
    hidden: false
  };
  const emptyState = { hidden: false };
  const context = {
    document: {
      getElementById(id) {
        return {
          "blog-search": input,
          "tag-filters": tagFilters,
          "no-results": emptyState
        }[id];
      },
      querySelectorAll(selector) {
        return selector === ".post-card" ? [card] : [];
      }
    },
    fetch() {
      return Promise.reject(new Error("offline"));
    },
    Error,
    Map,
    Array,
    RegExp,
    String
  };
  vm.runInNewContext(searchJs, context);
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(card.hidden, false, "search should still filter DOM cards if search.json fails");
  assert.equal(emptyState.hidden, true, "empty state should stay hidden when fallback finds a match");
}

for (const legacyPath of [
  "templates/my_collections",
  "templates/my_games",
  "templates/my_codes",
  "templates/my_plans",
  "templates/my_study",
  "templates/my_blogs",
  "templates/mycodes.html",
  "static/cols",
  "static/games",
  "static/jquery-3.4.1.js",
  "static/style.css",
  "static/tailwind.min.css",
  "static/translate.js",
]) {
  await assertMissing(legacyPath);
}

console.log("Blog site source checks passed");
