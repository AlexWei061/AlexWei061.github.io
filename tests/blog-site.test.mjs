import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
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

async function assertExists(relativePath) {
  assert.equal(await exists(relativePath), true, `${relativePath} should exist`);
}

async function assertMissing(relativePath) {
  assert.equal(await exists(relativePath), false, `${relativePath} should be removed`);
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

await assertExists("_layouts/default.html");
await assertExists("_layouts/post.html");
await assertExists("assets/css/main.css");
await assertExists("assets/js/search.js");
await assertExists("search.json");
await assertExists("static/favicon.ico");

const post = await read("_posts/2021-11-13-fft.md");
assert.match(post, /^---[\s\S]*layout:\s+post[\s\S]*---/, "FFT post should have post layout front matter");
assert.match(post, /^---[\s\S]*title:\s+FFT[\s\S]*---/, "FFT post should keep its title");
assert.match(post, /^---[\s\S]*date:\s+2021-11-13[\s\S]*---/, "FFT post should keep the original date");
assert.match(post, /^---[\s\S]*tags:\s+\[algorithm,\s*fft\][\s\S]*---/, "FFT post should include algorithm and fft tags");
assert.match(post, /^---[\s\S]*math:\s+true[\s\S]*---/, "FFT post should enable math rendering");
assert.match(post, /# FFT/, "FFT content should be preserved");
assert.match(post, /快速傅里叶变换/, "Chinese FFT article text should be preserved");
assert.match(post, /\$O\(n \\log n\)\$/, "math notation should be preserved");

const searchJson = await read("search.json");
assert.match(searchJson, /site\.posts/, "search index should be generated from Jekyll posts");
assert.match(searchJson, /strip_html/, "search index should strip post HTML");

const searchJs = await read("assets/js/search.js");
assert.match(searchJs, /blog-search/, "search script should bind the search input");
assert.match(searchJs, /tag-filters/, "search script should bind tag filters");
assert.match(searchJs, /fetch\(["']\/search\.json["']\)/, "search script should load the generated search index");

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
