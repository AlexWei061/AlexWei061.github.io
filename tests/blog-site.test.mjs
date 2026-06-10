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

function countMatches(value, pattern) {
  return Array.from(value.matchAll(pattern)).length;
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
assert.match(index, /section-directory/, "homepage should render section directory links");
assert.match(index, /where:\s*"section_slug",\s*"oi"/, "homepage should count OI posts by section");
assert.match(index, /where:\s*"section_slug",\s*"math"/, "homepage should count Math posts by section");
assert.match(index, /where:\s*"section_slug",\s*"machine-learning"/, "homepage should count Machine Learning posts by section");
assert.match(index, /href="{{ '\/oi\/' \| relative_url }}"/, "homepage should link to the OI archive");
assert.match(index, /href="{{ '\/math\/' \| relative_url }}"/, "homepage should link to the Math archive");
assert.match(index, /href="{{ '\/machine-learning\/' \| relative_url }}"/, "homepage should link to the Machine Learning archive");
assert.doesNotMatch(index, /id="blog-search"/, "homepage should not directly render archive search");
assert.doesNotMatch(index, /class="post-card"/, "homepage should not directly render post cards");
for (const legacyLabel of ["My Codes", "Study", "Games", "Collections", "My Tour Plan"]) {
  assert.doesNotMatch(index, new RegExp(legacyLabel), `homepage should not show ${legacyLabel}`);
}

const config = await read("_config.yml");
assert.match(config, /title:\s+Alex's Blog/, "_config.yml should define the blog title");
assert.match(config, /permalink:\s+\/posts\/:title\//, "_config.yml should define post permalinks");
assert.match(config, /excerpt_separator:\s+"<!-- excerpt -->"/, "_config.yml should avoid Liquid raw excerpt warnings");
assert.match(config, /exclude:[\s\S]*-\s+tests\//, "_config.yml should not publish source tests");
assert.match(config, /exclude:[\s\S]*-\s+tools\//, "_config.yml should not publish migration tooling");

await assertExists("_includes/archive.html");
await assertExists("_layouts/default.html");
await assertExists("_layouts/post.html");
await assertExists("assets/css/main.css");
await assertExists("assets/js/search.js");
await assertExists("oi.html");
await assertExists("oi/data-structures.html");
await assertExists("oi/dp.html");
await assertExists("oi/graph.html");
await assertExists("oi/math.html");
await assertExists("oi/optimization.html");
await assertExists("oi/solutions.html");
await assertExists("oi/sort.html");
await assertExists("oi/string.html");
await assertExists("machine-learning.html");
await assertExists("math.html");
await assertExists("math/real-analysis.html");
await assertExists("math/real-analysis/ch0.html");
await assertExists("math/real-analysis/ch1.html");
await assertExists("math/real-analysis/ch2.html");
await assertExists("math/real-analysis/ch3.html");
await assertExists("search.json");
await assertExists("static/favicon.ico");
await assertMissing("oi/algorithm.html");

const archiveInclude = await read("_includes/archive.html");
assert.match(archiveInclude, /where:\s*"section_slug",\s*include\.section_slug/, "archive include should filter posts by section");
assert.match(archiveInclude, /if include\.oi_category_slug/, "archive include should optionally filter OI posts by category");
assert.match(archiveInclude, /where:\s*"oi_category_slug",\s*include\.oi_category_slug/, "archive include should filter posts by OI category when requested");
assert.match(archiveInclude, /if include\.math_category_slug/, "archive include should optionally filter Math posts by category");
assert.match(archiveInclude, /where:\s*"math_category_slug",\s*include\.math_category_slug/, "archive include should filter posts by Math category when requested");
assert.match(archiveInclude, /if include\.math_chapter_slug/, "archive include should optionally filter Math posts by chapter");
assert.match(archiveInclude, /where:\s*"math_chapter_slug",\s*include\.math_chapter_slug/, "archive include should filter posts by Math chapter when requested");
assert.match(archiveInclude, /sort:\s*"series_order"/, "archive include should support course-order sorting");
assert.match(archiveInclude, /assign archive_posts = category_posts/, "archive include should render category-filtered posts");
assert.match(archiveInclude, /id="blog-search"/, "archive include should include search input");
assert.match(archiveInclude, /id="tag-filters"/, "archive include should include tag filters");
assert.match(archiveInclude, /id="post-list"/, "archive include should include a post list");
assert.match(archiveInclude, /assign archive_title = post\.archive_title \| default: post\.title/, "archive include should use archive titles when available");
assert.match(archiveInclude, /data-title="{{ archive_title \| downcase \| escape }}"/, "archive include search metadata should use archive titles");
assert.match(archiveInclude, /{{ archive_title \| escape }}/, "archive include post cards should render archive titles");

const oiPage = await read("oi.html");
assert.match(oiPage, /permalink:\s+\/oi\//, "OI category directory should live at /oi/");
assert.match(oiPage, /section-directory/, "OI page should render category directory links");
assert.equal(countMatches(oiPage, /class="directory-card"/g), 8, "OI page should link to eight category archives");
assert.doesNotMatch(oiPage, /include archive\.html/, "OI page should not directly render the full archive");
assert.doesNotMatch(oiPage, /id="blog-search"/, "OI page should not directly render archive search");
for (const category of [
  ["DP", "dp", "/oi/dp/"],
  ["Graph Theory", "graph", "/oi/graph/"],
  ["Data Structures", "data-structures", "/oi/data-structures/"],
  ["Math", "math", "/oi/math/"],
  ["Optimization", "optimization", "/oi/optimization/"],
  ["String", "string", "/oi/string/"],
  ["Solutions", "solutions", "/oi/solutions/"],
  ["Sort", "sort", "/oi/sort/"],
]) {
  const [label, slug, url] = category;
  assert.match(oiPage, new RegExp(`where:\\s*"oi_category_slug",\\s*"${slug}"`), `OI page should count ${label} posts`);
  assert.match(oiPage, new RegExp(`href="{{ '${url}' \\| relative_url }}"`), `OI page should link to ${label}`);
}

for (const categoryPage of [
  ["oi/dp.html", "DP", "dp", "/oi/dp/"],
  ["oi/graph.html", "Graph Theory", "graph", "/oi/graph/"],
  ["oi/data-structures.html", "Data Structures", "data-structures", "/oi/data-structures/"],
  ["oi/math.html", "Math", "math", "/oi/math/"],
  ["oi/optimization.html", "Optimization", "optimization", "/oi/optimization/"],
  ["oi/string.html", "String", "string", "/oi/string/"],
  ["oi/solutions.html", "Solutions", "solutions", "/oi/solutions/"],
  ["oi/sort.html", "Sort", "sort", "/oi/sort/"],
]) {
  const [file, label, slug, permalink] = categoryPage;
  const page = await read(file);
  assert.match(page, new RegExp(`permalink:\\s+${permalink.replaceAll("/", "\\/")}`), `${label} archive should live at ${permalink}`);
  assert.match(page, /include archive\.html[\s\S]*section_slug="oi"/, `${label} archive should use the shared archive include`);
  assert.match(page, new RegExp(`oi_category_slug="${slug}"`), `${label} archive should filter by category slug`);
}

const mathPage = await read("math.html");
assert.match(mathPage, /permalink:\s+\/math\//, "Math archive should live at /math/");
assert.match(mathPage, /section-directory/, "Math page should render category directory links");
assert.match(mathPage, /where:\s*"math_category_slug",\s*"real-analysis"/, "Math page should count Real Analysis posts");
assert.match(mathPage, /href="{{ '\/math\/real-analysis\/' \| relative_url }}"/, "Math page should link to Real Analysis");

const realAnalysisPage = await read("math/real-analysis.html");
assert.match(realAnalysisPage, /permalink:\s+\/math\/real-analysis\//, "Real Analysis category should live at /math/real-analysis/");
assert.match(realAnalysisPage, /section-directory/, "Real Analysis page should render chapter directory links");
assert.equal(countMatches(realAnalysisPage, /class="directory-card"/g), 4, "Real Analysis should show four chapter entries");
for (const chapter of [
  ["Chapter 0", "ch0", "/math/real-analysis/ch0/"],
  ["Chapter 1", "ch1", "/math/real-analysis/ch1/"],
  ["Chapter 2", "ch2", "/math/real-analysis/ch2/"],
  ["Chapter 3", "ch3", "/math/real-analysis/ch3/"],
]) {
  const [label, slug, url] = chapter;
  assert.match(realAnalysisPage, new RegExp(`where:\\s*"math_chapter_slug",\\s*"${slug}"`), `Real Analysis should count ${label} posts`);
  assert.match(realAnalysisPage, new RegExp(`href="{{ '${url}' \\| relative_url }}"`), `Real Analysis should link to ${label}`);
}

for (const chapterPage of [
  ["math/real-analysis/ch0.html", "Chapter 0", "ch0", "/math/real-analysis/ch0/"],
  ["math/real-analysis/ch1.html", "Chapter 1", "ch1", "/math/real-analysis/ch1/"],
  ["math/real-analysis/ch2.html", "Chapter 2", "ch2", "/math/real-analysis/ch2/"],
  ["math/real-analysis/ch3.html", "Chapter 3", "ch3", "/math/real-analysis/ch3/"],
]) {
  const [file, label, slug, permalink] = chapterPage;
  const page = await read(file);
  assert.match(page, new RegExp(`permalink:\\s+${permalink.replaceAll("/", "\\/")}`), `${label} archive should live at ${permalink}`);
  assert.match(page, /include archive\.html[\s\S]*section_slug="math"/, `${label} archive should use the shared archive include`);
  assert.match(page, /math_category_slug="real-analysis"/, `${label} archive should filter by Real Analysis category`);
  assert.match(page, new RegExp(`math_chapter_slug="${slug}"`), `${label} archive should filter by chapter slug`);
  assert.match(page, /sort_by="series_order"/, `${label} archive should use course-order sorting`);
}

const machineLearningPage = await read("machine-learning.html");
assert.match(machineLearningPage, /permalink:\s+\/machine-learning\//, "Machine Learning archive should live at /machine-learning/");
assert.match(machineLearningPage, /include archive\.html[\s\S]*section_slug="machine-learning"/, "Machine Learning archive should use the shared archive include");
assert.match(machineLearningPage, /sort_by="series_order"/, "Machine Learning archive should use course-order sorting");

const defaultLayout = await read("_layouts/default.html");
assert.match(defaultLayout, /assign asset_version = site\.time \| date:\s*"%s"/, "default layout should derive an asset cache-busting version from the Jekyll build time");
assert.match(defaultLayout, /href="{{ '\/assets\/css\/main\.css' \| relative_url }}\?v={{ asset_version }}"/, "stylesheet URL should include the asset version");
assert.match(defaultLayout, /src="{{ '\/assets\/js\/search\.js' \| relative_url }}\?v={{ asset_version }}"/, "search script URL should include the asset version");
assert.match(defaultLayout, /href="{{ '\/' \| relative_url }}">Home<\/a>/, "header should link to Home");
assert.match(defaultLayout, /href="{{ '\/oi\/' \| relative_url }}">OI<\/a>/, "header should link to OI");
assert.match(defaultLayout, /href="{{ '\/math\/' \| relative_url }}">Math<\/a>/, "header should link to Math");
assert.match(defaultLayout, /href="{{ '\/machine-learning\/' \| relative_url }}">Machine Learning<\/a>/, "header should link to Machine Learning");

const postLayout = await read("_layouts/post.html");
assert.match(postLayout, /page\.section_slug \| default:\s*"oi"/, "post layout should derive its archive return link from section_slug");
assert.match(postLayout, /page\.oi_category_slug/, "post layout should prefer OI category return links when available");
assert.match(postLayout, /page\.math_chapter_slug/, "post layout should prefer Math chapter return links when available");
assert.match(postLayout, /page\.math_category_slug/, "post layout should support Math category return links");
assert.match(postLayout, /Back to {{ archive_label }}/, "post layout should label the return link with the resolved archive label");
assert.match(postLayout, /\[tex\]\/color/, "MathJax should load color support for migrated textcolor formulas");
assert.match(postLayout, /packages:[\s\S]*color/, "MathJax tex packages should include color support");

const css = await read("assets/css/main.css");
assert.match(css, /overflow-x:\s*hidden/, "layout should prevent accidental mobile horizontal scrolling");
assert.match(css, /width:\s*calc\(100% - 28px\)/, "mobile shell should use a valid calc width");
assert.match(css, /\.section-directory/, "homepage section directory should be styled");
assert.match(css, /\.directory-card/, "homepage directory cards should be styled");
assert.match(css, /\.tag-chip,[\s\S]*?max-width:\s*100%/, "long tag chips should stay within the mobile viewport");
assert.match(css, /overflow-wrap:\s*anywhere/, "long migrated text and tags should be allowed to wrap");

const postFiles = await listFiles("_posts");
assert.equal(postFiles.filter((file) => file.endsWith(".md")).length, 176, "all migrated blog posts should be present");
assert.equal(postFiles.includes("2021-11-13-fft.md"), false, "old FFT migration artifact should be replaced");
assert.equal(postFiles.includes("2021-11-10-fft.md"), true, "FFT should keep the old blog history date and /posts/fft/ slug");

const sectionIssues = [];
const categoryIssues = [];
const categoryCounts = {};
const sectionCounts = {};
const mathCategoryCounts = {};
const mathChapterCounts = {};
for (const file of postFiles.filter((item) => item.endsWith(".md"))) {
  const content = await read(`_posts/${file}`);
  const section = content.match(/^section:\s+"(.+)"$/m)?.[1];
  const sectionSlug = content.match(/^section_slug:\s+"(.+)"$/m)?.[1];
  if (!section || !sectionSlug) {
    sectionIssues.push(file);
  } else {
    sectionCounts[sectionSlug] = (sectionCounts[sectionSlug] || 0) + 1;
  }
  if (sectionSlug === "oi") {
    const category = content.match(/^oi_category:\s+"(.+)"$/m)?.[1];
    const categorySlug = content.match(/^oi_category_slug:\s+"(.+)"$/m)?.[1];
    if (!category || !categorySlug) {
      categoryIssues.push(file);
    } else {
      categoryCounts[categorySlug] = (categoryCounts[categorySlug] || 0) + 1;
    }
  }
  if (sectionSlug === "math") {
    const mathCategorySlug = content.match(/^math_category_slug:\s+"(.+)"$/m)?.[1];
    const mathChapterSlug = content.match(/^math_chapter_slug:\s+"(.+)"$/m)?.[1];
    if (mathCategorySlug) {
      mathCategoryCounts[mathCategorySlug] = (mathCategoryCounts[mathCategorySlug] || 0) + 1;
    }
    if (mathChapterSlug) {
      mathChapterCounts[mathChapterSlug] = (mathChapterCounts[mathChapterSlug] || 0) + 1;
    }
  }
}
assert.deepEqual(sectionIssues, [], "all migrated posts should include root section metadata");
assert.deepEqual(sectionCounts, { oi: 156, "machine-learning": 9, math: 11 }, "migrated posts should be split into the expected notebooks");
assert.deepEqual(categoryIssues, [], "all migrated OI posts should include an OI category");
assert.deepEqual(
  categoryCounts,
  {
    "data-structures": 14,
    dp: 13,
    graph: 22,
    math: 37,
    optimization: 2,
    solutions: 62,
    sort: 1,
    string: 5,
  },
  "migrated OI posts should be distributed into the expected categories",
);
assert.deepEqual(mathCategoryCounts, { "real-analysis": 11 }, "Math posts should currently all belong to Real Analysis");
assert.deepEqual(mathChapterCounts, { ch0: 5, ch1: 6 }, "Real Analysis posts should be distributed into existing chapters");

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

const machineLearningImages = await listFiles("assets/images/machine-learning");
assert.equal(machineLearningImages.length, 23, "all Machine Learning images should be copied");
assert.equal(machineLearningImages.includes("SupervisedLearning/pic/LR1.png"), true, "Machine Learning images should preserve source directories");
assert.equal(machineLearningImages.includes("SupervisedLearning/Nets/pic/LN1.png"), true, "nested Machine Learning images should preserve source directories");

const realAnalysisImages = await listFiles("assets/images/real-analysis");
assert.equal(realAnalysisImages.length, 9, "all Real Analysis images should be copied");
assert.equal(realAnalysisImages.includes("CH1--测度理论/pic/1.png"), true, "Real Analysis images should preserve source directories");

const post = await read("_posts/2021-11-10-fft.md");
assert.match(post, /^---[\s\S]*layout:\s+post[\s\S]*---/, "FFT post should have post layout front matter");
assert.match(post, /^---[\s\S]*title:\s+"FFT"[\s\S]*---/, "FFT post should keep its title");
assert.match(post, /^---[\s\S]*oi_category:\s+"Math"[\s\S]*oi_category_slug:\s+"math"[\s\S]*---/, "FFT should be categorized under OI math");
assert.match(post, /^---[\s\S]*date:\s+2021-11-10[\s\S]*---/, "FFT post should use the old blog history date");
assert.match(post, /^---[\s\S]*tags:\s+\["Math",\s*"caculus"\][\s\S]*---/, "FFT post should use folder-derived tags");
assert.match(post, /^---[\s\S]*math:\s+true[\s\S]*---/, "FFT post should enable math rendering");
assert.match(post, /# FFT/, "FFT content should be preserved");
assert.match(post, /快速傅里叶变换/, "Chinese FFT article text should be preserved");
assert.match(post, /\$O\(n \\log n\)\$/, "math notation should be preserved");

const bstPostName = postFiles.find((file) => file.endsWith("-bst.md"));
assert.ok(bstPostName, "BST post should be generated");
const bstPost = await read(`_posts/${bstPostName}`);
assert.match(bstPost, /^---[\s\S]*oi_category:\s+"Data Structures"[\s\S]*oi_category_slug:\s+"data-structures"[\s\S]*---/, "BST should be categorized under OI data structures");
assert.match(bstPost, /tags:\s+\["DS",\s*"Tree",\s*"平衡树"\]/, "BST post should include all folder-level tags");
assert.match(bstPost, /\/assets\/images\/blog\/BST1\.png/, "BST local images should be rewritten to blog assets");

const mosPost = await read("_posts/2022-02-19-mosalgorithm.md");
assert.match(mosPost, /^---[\s\S]*oi_category:\s+"Data Structures"[\s\S]*oi_category_slug:\s+"data-structures"[\s\S]*---/, "Mo's algorithm should be categorized under OI data structures");

const inspiringMergePost = await read("_posts/2022-04-11-inspiringmerge.md");
assert.match(inspiringMergePost, /^---[\s\S]*archive_title:\s+"启发式合并"[\s\S]*---/, "inspiring merge archive title should stay localized");
assert.match(inspiringMergePost, /^---[\s\S]*oi_category:\s+"Data Structures"[\s\S]*oi_category_slug:\s+"data-structures"[\s\S]*---/, "inspiring merge should be categorized under OI data structures");

const simulatedAnnealingPost = await read("_posts/2021-11-16-simulatedannealing.md");
assert.match(simulatedAnnealingPost, /^---[\s\S]*archive_title:\s+"模拟退火"[\s\S]*---/, "simulated annealing archive title should stay localized");
assert.match(simulatedAnnealingPost, /^---[\s\S]*oi_category:\s+"Optimization"[\s\S]*oi_category_slug:\s+"optimization"[\s\S]*---/, "simulated annealing should be categorized under OI optimization");

const simulatedAnnealing2Post = await read("_posts/2022-08-29-simulatedannealing2.md");
assert.match(simulatedAnnealing2Post, /^---[\s\S]*archive_title:\s+"模拟退火2"[\s\S]*---/, "simulatedAnnealing2 archive title should be localized");
assert.match(simulatedAnnealing2Post, /^---[\s\S]*oi_category:\s+"Optimization"[\s\S]*oi_category_slug:\s+"optimization"[\s\S]*---/, "simulated annealing 2 should be categorized under OI optimization");

const sortPost = await read("_posts/2021-10-29-sort.md");
assert.match(sortPost, /^---[\s\S]*oi_category:\s+"Sort"[\s\S]*oi_category_slug:\s+"sort"[\s\S]*---/, "sort should be categorized under OI sort");

const dsTriePost = await read("_posts/2022-08-31-ds-tree-trie-trie.md");
assert.match(dsTriePost, /^---[\s\S]*oi_category:\s+"String"[\s\S]*oi_category_slug:\s+"string"[\s\S]*---/, "DS Trie should be categorized under OI string");

const trieCodePost = await read("_posts/2022-08-31-triecode.md");
assert.match(trieCodePost, /^---[\s\S]*oi_category:\s+"String"[\s\S]*oi_category_slug:\s+"string"[\s\S]*---/, "TrieCode should be categorized under OI string");

const kmpPostName = postFiles.find((file) => file.endsWith("-kmp.md"));
assert.ok(kmpPostName, "KMP post should be generated");
const kmpPost = await read(`_posts/${kmpPostName}`);
assert.match(kmpPost, /^---[\s\S]*title:\s+"KMP 详解"[\s\S]*---/, "KMP post page title should keep its Markdown heading-derived title");
assert.match(kmpPost, /^---[\s\S]*archive_title:\s+"KMP"[\s\S]*---/, "KMP archive title should use the original source filename");
assert.match(kmpPost, /^---[\s\S]*oi_category:\s+"String"[\s\S]*oi_category_slug:\s+"string"[\s\S]*---/, "KMP should be categorized under OI string");
assert.match(kmpPost, /\/assets\/images\/blog\/KMP\.png/, "KMP local image should be rewritten to blog assets");

const fftPost = await read("_posts/2021-11-10-fft.md");
assert.match(fftPost, /^---[\s\S]*archive_title:\s+"FFT"[\s\S]*---/, "FFT archive title should keep the standard acronym");

const centroidPost = await read("_posts/2022-08-31-centroidoftree.md");
assert.match(centroidPost, /^---[\s\S]*title:\s+"关于树的重心"[\s\S]*---/, "centroid post page title should keep the Markdown heading-derived title");
assert.match(centroidPost, /^---[\s\S]*archive_title:\s+"树的重心"[\s\S]*---/, "centroid archive title should be localized for homepage display");
assert.match(centroidPost, /^---[\s\S]*oi_category:\s+"Graph Theory"[\s\S]*oi_category_slug:\s+"graph"[\s\S]*---/, "centroid should be categorized under OI graph theory");

const linearRegressionPostName = postFiles.find((file) => file.endsWith("-linearregression.md"));
assert.ok(linearRegressionPostName, "LinearRegression post should be generated");
const linearRegressionPost = await read(`_posts/${linearRegressionPostName}`);
assert.match(linearRegressionPost, /^---[\s\S]*title:\s+"线性回归"[\s\S]*archive_title:\s+"线性回归"[\s\S]*section:\s+"Machine Learning"[\s\S]*section_slug:\s+"machine-learning"[\s\S]*series_order:\s+1[\s\S]*---/, "LinearRegression should use the ML notebook metadata and Chinese title");
assert.match(linearRegressionPost, /tags:\s+\["SupervisedLearning"\]/, "Machine Learning tags should come from source folders");
assert.match(linearRegressionPost, /\/assets\/images\/machine-learning\/SupervisedLearning\/pic\/LR1\.png/, "LinearRegression image LR1 should be rewritten");
assert.match(linearRegressionPost, /\/assets\/images\/machine-learning\/SupervisedLearning\/pic\/LR2\.png/, "LinearRegression image LR2 should be rewritten");

const realAnalysisOnePostName = postFiles.find((file) => file.includes("实分析入门-1-皮亚诺和自然数"));
assert.ok(realAnalysisOnePostName, "Real Analysis chapter 0 first post should be generated");
const realAnalysisOnePost = await read(`_posts/${realAnalysisOnePostName}`);
assert.match(realAnalysisOnePost, /^---[\s\S]*title:\s+"实分析入门（1）--皮亚诺和自然数"[\s\S]*archive_title:\s+"实分析入门（1）--皮亚诺和自然数"[\s\S]*section:\s+"Math"[\s\S]*section_slug:\s+"math"[\s\S]*math_category:\s+"Real Analysis"[\s\S]*math_category_slug:\s+"real-analysis"[\s\S]*math_chapter:\s+"Chapter 0"[\s\S]*math_chapter_slug:\s+"ch0"[\s\S]*series_order:\s+1[\s\S]*---/, "Real Analysis first post should belong to Math / Real Analysis / Chapter 0");

const realAnalysisSevenPostName = postFiles.find((file) => file.includes("实分析入门-7-σ代数"));
assert.ok(realAnalysisSevenPostName, "Real Analysis chapter 1 seventh post should be generated");
const realAnalysisSevenPost = await read(`_posts/${realAnalysisSevenPostName}`);
assert.match(realAnalysisSevenPost, /^---[\s\S]*math_chapter:\s+"Chapter 1"[\s\S]*math_chapter_slug:\s+"ch1"[\s\S]*series_order:\s+7[\s\S]*---/, "Real Analysis seventh post should belong to Chapter 1 with course order");

const realAnalysisSixPostName = postFiles.find((file) => file.includes("实分析入门-6-可数-不可数"));
assert.ok(realAnalysisSixPostName, "Real Analysis chapter 1 sixth post should be generated");
const realAnalysisSixPost = await read(`_posts/${realAnalysisSixPostName}`);
assert.match(realAnalysisSixPost, /\/assets\/images\/real-analysis\/CH1--%E6%B5%8B%E5%BA%A6%E7%90%86%E8%AE%BA\/pic\/1\.png/, "Real Analysis local image 1.png should be rewritten");

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
assert.match(searchJson, /"title":\s*{{ post\.archive_title \| default: post\.title \| jsonify }}/, "search index titles should use archive titles");
assert.match(searchJson, /"post_title":\s*{{ post\.title \| jsonify }}/, "search index should retain post page titles");
assert.match(searchJson, /"section":\s*{{ post\.section \| default:\s*"OI" \| jsonify }}/, "search index should expose root sections");
assert.match(searchJson, /"section_slug":\s*{{ post\.section_slug \| default:\s*"oi" \| jsonify }}/, "search index should expose root section slugs");
assert.match(searchJson, /"oi_category":\s*{{ post\.oi_category \| default:\s*"" \| jsonify }}/, "search index should expose OI categories");
assert.match(searchJson, /"oi_category_slug":\s*{{ post\.oi_category_slug \| default:\s*"" \| jsonify }}/, "search index should expose OI category slugs");
assert.match(searchJson, /"math_category":\s*{{ post\.math_category \| default:\s*"" \| jsonify }}/, "search index should expose Math categories");
assert.match(searchJson, /"math_category_slug":\s*{{ post\.math_category_slug \| default:\s*"" \| jsonify }}/, "search index should expose Math category slugs");
assert.match(searchJson, /"math_chapter":\s*{{ post\.math_chapter \| default:\s*"" \| jsonify }}/, "search index should expose Math chapters");
assert.match(searchJson, /"math_chapter_slug":\s*{{ post\.math_chapter_slug \| default:\s*"" \| jsonify }}/, "search index should expose Math chapter slugs");
assert.match(searchJson, /"series_order":\s*{{ post\.series_order \| default:\s*0 \| jsonify }}/, "search index should expose course-order metadata");
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
