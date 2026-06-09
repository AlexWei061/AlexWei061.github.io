#!/usr/bin/env python3
from __future__ import annotations

import hashlib
import html
import re
import shutil
import subprocess
import unicodedata
from datetime import datetime
from pathlib import Path
from urllib.parse import quote, unquote, urlsplit


SOURCE_ROOT = Path("/Users/alex/Alex/NOIP/blog")
REPO_ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = REPO_ROOT / "_posts"
IMAGE_DIR = REPO_ROOT / "assets" / "images" / "blog"
GIT_DIR = SOURCE_ROOT / ".git_disabled"

EXTRA_IMAGES = [
    Path("/Users/alex/Alex/NOIP/practice/2021/August2021/20210802/TrieEg.png"),
    Path("/Users/alex/Alex/NOIP/practice/2021/August2021/20210809/binaryIndexTreeExample.png"),
]

GENERIC_TITLES = re.compile(
    r"^(?:t\d+|day\s*-?\d+|\d+\s*pts|100pts|50pts|40pts)$",
    re.IGNORECASE,
)

PERSONAL_CSDN_ARTICLE_URLS = {
    "120826541": "/posts/mobiusinversion/",
    "121114692": "/posts/bst/",
    "121165070": "/posts/arithmeticfunction/",
    "121363052": "/posts/simulatedannealing/",
    "123307876": "/posts/splay1/",
    "123446811": "/posts/kruskalreconstruction/",
    "124514022": "/posts/primitiveroot/",
}

GITHUB_PATH_URL_ALIASES = {
    "ds/tree/splay.md": "/posts/splay1/",
}

# Homepage/search display names for old English source filenames.
ARCHIVE_TITLE_OVERRIDES = {
    "Algorithm/Mo'sAlgorithm.md": "莫队",
    "Algorithm/inspiringMerge.md": "启发式合并",
    "Algorithm/simulatedAnnealing.md": "模拟退火",
    "Algorithm/sort.md": "插入排序",
    "DP/linearDp/LongestIncreasingSubsequence.md": "最长上升子序列",
    "DP/linearDp/classicModel.md": "线性 DP",
    "DP/linearDp/knapsack.md": "背包问题",
    "DP/optmization/monotonousQueue.md": "单调队列优化",
    "DP/stateOfCompressionDp/stateOfCompression.md": "状压 DP",
    "DP/treeDp/treeDinamicProgramming.md": "树形 DP",
    "DS/Table/RMQST.md": "ST 表",
    "DS/Tree/disjointSet.md": "并查集",
    "DS/Tree/树状数组/binaryIndexTree.md": "树状数组",
    "DS/Tree/线段树/durableSegTree.md": "主席树",
    "DS/Tree/线段树/segmentTreeCode.md": "线段树",
    "GraghTheory/NetworkFlow/aboutBipartiteGragh.md": "二分图",
    "GraghTheory/NetworkFlow/networkFlow.md": "网络流",
    "GraghTheory/NetworkFlow/networkFlow2.md": "网络流 2",
    "GraghTheory/Tarjan/TarjanAndDCC.md": "Tarjan 与无向图连通性",
    "GraghTheory/Tarjan/TarjanAndSCC.md": "Tarjan 求强连通分量",
    "GraghTheory/Tree/kruskal/second-bestMinSpanningTree.md": "严格次小生成树",
    "GraghTheory/Tree/lca/leastCommonAncestor.md": "最近公共祖先",
    "GraghTheory/Tree/树链剖分/heavyPathDecomposition.md": "树链剖分",
    "GraghTheory/Tree/重心和直径/centroidOfTree.md": "树的重心",
    "GraghTheory/Tree/重心和直径/diameterOfTree.md": "树的直径",
    "GraghTheory/topSort.md": "拓扑排序",
    "Math/CombinatiorialEnmeration/CombinatiorialEnumeration.md": "组合计数",
    "Math/GameTheory/GameTheory.md": "博弈论",
    "Math/LinearAlgebra/GuasElimination.md": "高斯消元",
    "Math/LinearAlgebra/linearAlgebra.md": "线性代数",
    "Math/NumberTheory/EulerTheorem.md": "欧拉定理",
    "Math/NumberTheory/MobiusInversion.md": "莫比乌斯反演",
    "Math/NumberTheory/NumberTheory.md": "数论",
    "Math/NumberTheory/arithmeticFunction.md": "数论函数",
    "Math/NumberTheory/extendEuclid.md": "扩展欧几里得",
    "Math/NumberTheory/inverseModule.md": "乘法逆元",
    "Math/ProbabilityExpectation/Possibility&expectation.md": "概率与期望",
    "Math/Sequence/FibonacciSequence.md": "斐波那契数列",
    "Math/Sequence/generatingFunction.md": "生成函数",
    "Math/caculus/TaylorExpansion.md": "泰勒展开",
    "Math/caculus/aboutPi.md": "圆周率",
    "Math/caculus/advancedMathematicsNote1.md": "极限",
    "Math/caculus/advancedMathematicsNote2.md": "微分",
    "String/SurfixArray.md": "后缀数组",
}


def run_git(path: Path) -> list[str]:
    if not GIT_DIR.exists():
        return []
    rel = path.relative_to(SOURCE_ROOT).as_posix()
    result = subprocess.run(
        [
            "git",
            f"--git-dir={GIT_DIR}",
            f"--work-tree={SOURCE_ROOT}",
            "log",
            "--follow",
            "--reverse",
            "--format=%ad",
            "--date=short",
            "--",
            rel,
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        return []
    return [line.strip() for line in result.stdout.splitlines() if line.strip()]


def date_from_filename(path: Path) -> str | None:
    text = path.stem
    patterns = [
        r"(?P<y>20\d{2})[.\-_](?P<m>\d{1,2})[.\-_](?P<d>\d{1,2})",
        r"(?P<y>20\d{2})(?P<m>\d{2})(?P<d>\d{2})",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if not match:
            continue
        try:
            return datetime(
                int(match.group("y")),
                int(match.group("m")),
                int(match.group("d")),
            ).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None


def post_date(path: Path) -> str:
    history = run_git(path)
    if history:
        return history[0]
    named_date = date_from_filename(path)
    if named_date:
        return named_date
    return datetime.fromtimestamp(path.stat().st_mtime).strftime("%Y-%m-%d")


def clean_title(value: str) -> str:
    value = value.strip()
    value = re.sub(r"^#+\s*", "", value)
    value = re.sub(r"^[*_~`]+|[*_~`]+$", "", value)
    value = re.sub(r"\s+", " ", value)
    return value.strip()


def title_from_content(path: Path, content: str) -> str:
    for line in content.splitlines():
        match = re.match(r"^\s{0,3}#{1,6}\s+(.+?)\s*$", line)
        if not match:
            continue
        title = clean_title(match.group(1))
        if title and not GENERIC_TITLES.match(title):
            return title
    return clean_title(path.stem) or path.stem


def archive_title_for(path: Path) -> str:
    rel = path.relative_to(SOURCE_ROOT).as_posix()
    return ARCHIVE_TITLE_OVERRIDES.get(rel, path.stem)


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKC", value).lower()
    value = value.replace("&", " and ").replace("+", " plus ")
    value = value.replace("'", "")
    chars: list[str] = []
    for char in value:
        if char.isalnum():
            chars.append(char)
        else:
            chars.append("-")
    slug = re.sub(r"-+", "-", "".join(chars)).strip("-")
    return slug


def unique_slugs(paths: list[Path]) -> dict[Path, str]:
    base_slugs: dict[Path, str] = {}
    counts: dict[str, int] = {}
    for path in paths:
        base = slugify(path.stem)
        if not base:
            base = "post-" + hashlib.sha1(path.as_posix().encode()).hexdigest()[:8]
        base_slugs[path] = base
        counts[base] = counts.get(base, 0) + 1

    used: set[str] = set()
    slugs: dict[Path, str] = {}
    for path in paths:
        slug = base_slugs[path]
        if counts[slug] > 1:
            rel_without_suffix = path.relative_to(SOURCE_ROOT).with_suffix("").as_posix()
            slug = slugify(rel_without_suffix)
        if not slug:
            slug = "post-" + hashlib.sha1(path.as_posix().encode()).hexdigest()[:8]
        candidate = slug
        suffix = 2
        while candidate in used:
            candidate = f"{slug}-{suffix}"
            suffix += 1
        used.add(candidate)
        slugs[path] = candidate
    return slugs


def yaml_string(value: str) -> str:
    value = value.replace("\r", " ").replace("\n", " ")
    value = re.sub(r"\s+", " ", value).strip()
    value = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{value}"'


def strip_markdown(value: str) -> str:
    value = html.unescape(value)
    value = value.replace("&emsp;", " ").replace("&nbsp;", " ")
    value = re.sub(r"!\[[^\]]*\]\([^)]+\)", " ", value)
    value = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", value)
    value = re.sub(r"`([^`]+)`", r"\1", value)
    value = re.sub(r"<[^>]+>", " ", value)
    value = value.replace("$", " ")
    value = re.sub(r"[*_~#>]+", " ", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def summary_for(content: str, title: str) -> str:
    in_code = False
    for line in content.splitlines():
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code = not in_code
            continue
        if in_code or not stripped:
            continue
        if re.match(r"^\s*[-=]{3,}\s*$", stripped):
            continue
        if re.match(r"^\s*!\[[^\]]*\]\([^)]+\)\s*$", stripped):
            continue
        plain = strip_markdown(stripped)
        if not plain or plain == title or GENERIC_TITLES.match(plain):
            continue
        if len(plain) > 180:
            return plain[:177].rstrip() + "..."
        return plain
    return f"{title} 的算法笔记。"


def has_math(content: str) -> bool:
    if "$$" in content:
        return True
    return bool(re.search(r"(?<!\\)\$(?!\s)(?s:.+?)(?<!\s)(?<!\\)\$", content))


def is_escaped(value: str, index: int) -> bool:
    slashes = 0
    cursor = index - 1
    while cursor >= 0 and value[cursor] == "\\":
        slashes += 1
        cursor -= 1
    return slashes % 2 == 1


def find_unescaped(value: str, needle: str, start: int) -> int:
    cursor = start
    while True:
        index = value.find(needle, cursor)
        if index == -1 or not is_escaped(value, index):
            return index
        cursor = index + len(needle)


def normalize_inline_math(content: str) -> str:
    result: list[str] = []
    index = 0
    while index < len(content):
        if content.startswith("```", index):
            end = content.find("```", index + 3)
            if end == -1:
                result.append(content[index:])
                break
            result.append(content[index : end + 3])
            index = end + 3
            continue

        if content[index] == "`":
            end = content.find("`", index + 1)
            if end == -1:
                result.append(content[index:])
                break
            result.append(content[index : end + 1])
            index = end + 1
            continue

        if content.startswith("$$", index) and not is_escaped(content, index):
            end = find_unescaped(content, "$$", index + 2)
            if end == -1:
                result.append(content[index:])
                break
            result.append(content[index : end + 2])
            index = end + 2
            continue

        if content.startswith("\\[", index) and not is_escaped(content, index):
            end = find_unescaped(content, "\\]", index + 2)
            if end == -1:
                result.append(content[index:])
                break
            result.append(content[index : end + 2])
            index = end + 2
            continue

        if content[index] == "$" and not is_escaped(content, index):
            end = find_unescaped(content, "$", index + 1)
            if end == -1:
                result.append(content[index])
                index += 1
                continue
            result.append("$")
            result.append(content[index + 1 : end].replace("|", "&#124;"))
            result.append("$")
            index = end + 1
            continue

        if content.startswith("\\(", index) and not is_escaped(content, index):
            end = find_unescaped(content, "\\)", index + 2)
            if end == -1:
                result.append(content[index])
                index += 1
                continue
            result.append("\\(")
            result.append(content[index + 2 : end].replace("|", "&#124;"))
            result.append("\\)")
            index = end + 2
            continue

        result.append(content[index])
        index += 1
    return "".join(result)


def collect_images() -> dict[str, str]:
    if IMAGE_DIR.exists():
        shutil.rmtree(IMAGE_DIR)
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)

    image_sources = list((SOURCE_ROOT / "pic").iterdir()) + EXTRA_IMAGES
    copied: dict[str, str] = {}
    for source in image_sources:
        if not source.is_file():
            continue
        target = IMAGE_DIR / source.name
        shutil.copy2(source, target)
        copied[source.name.lower()] = source.name
    return copied


def is_external_url(url: str) -> bool:
    scheme = urlsplit(url).scheme.lower()
    return scheme in {"http", "https", "data", "mailto"}


def image_asset_url(filename: str) -> str:
    return "/assets/images/blog/" + quote(filename, safe="._-()")


def post_url(slug: str) -> str:
    return f"/posts/{slug}/"


def normalized_article_path(value: str) -> str:
    value = unicodedata.normalize("NFKC", unquote(value)).replace("\\", "/")
    value = re.sub(r"/+", "/", value).strip("/")
    return value.lower()


def build_article_url_map(markdown_paths: list[Path], slugs: dict[Path, str]) -> dict[str, str]:
    article_urls: dict[str, str] = {}
    basename_counts: dict[str, int] = {}
    for path in markdown_paths:
        basename = normalized_article_path(path.name)
        basename_counts[basename] = basename_counts.get(basename, 0) + 1

    for path in markdown_paths:
        url = post_url(slugs[path])
        rel = path.relative_to(SOURCE_ROOT).as_posix()
        article_urls[normalized_article_path(rel)] = url
        basename = normalized_article_path(path.name)
        if basename_counts[basename] == 1:
            article_urls[basename] = url

    article_urls.update(GITHUB_PATH_URL_ALIASES)
    return article_urls


def resolve_internal_article_url(url: str, article_urls: dict[str, str]) -> str | None:
    stripped = url.strip()
    if not stripped:
        return None

    parsed = urlsplit(stripped)
    host = parsed.netloc.lower()
    path = unquote(parsed.path)

    if host == "github.com" and path.lower().startswith("/alexwei061/oi/blob/main/"):
        rel = path[len("/AlexWei061/OI/blob/main/") :]
        target = article_urls.get(normalized_article_path(rel))
        if not target:
            target = article_urls.get(normalized_article_path(Path(rel).name))
        if target and parsed.fragment:
            return target + "#" + parsed.fragment
        return target

    if host == "blog.csdn.net" and path.lower().startswith("/id246783/article/details/"):
        article_id = path.rstrip("/").split("/")[-1]
        return PERSONAL_CSDN_ARTICLE_URLS.get(article_id)

    return None


def rewrite_article_links(content: str, article_urls: dict[str, str]) -> str:
    def markdown_replacer(match: re.Match[str]) -> str:
        label = match.group(1)
        url = match.group(2)
        rewritten = resolve_internal_article_url(url, article_urls)
        if not rewritten:
            return match.group(0)
        return f"[{label.replace(url, rewritten)}]({rewritten})"

    content = re.sub(r"(?<!!)\[([^\]]+)\]\(([^)\n]+)\)", markdown_replacer, content)

    def html_replacer(match: re.Match[str]) -> str:
        rewritten = resolve_internal_article_url(match.group(2), article_urls)
        if not rewritten:
            return match.group(0)
        return f"{match.group(1)}{rewritten}{match.group(3)}"

    return re.sub(r'(<a\b[^>]*\bhref=["\'])([^"\']+)(["\'][^>]*>)', html_replacer, content, flags=re.IGNORECASE)


def rewrite_image_url(url: str, image_map: dict[str, str], missing: set[str]) -> str:
    url = url.strip()
    if not url or is_external_url(url) or url.startswith("#"):
        return url
    clean_url = urlsplit(url).path
    filename = Path(unquote(clean_url)).name
    mapped = image_map.get(filename.lower())
    if not mapped:
        missing.add(url)
        return url
    return image_asset_url(mapped)


def rewrite_images(content: str, image_map: dict[str, str], missing: set[str]) -> str:
    def markdown_replacer(match: re.Match[str]) -> str:
        return f"{match.group(1)}{rewrite_image_url(match.group(2), image_map, missing)}{match.group(3)}"

    content = re.sub(r"(!\[[^\]]*\]\()([^)]+)(\))", markdown_replacer, content)

    def html_replacer(match: re.Match[str]) -> str:
        return f'{match.group(1)}{rewrite_image_url(match.group(2), image_map, missing)}{match.group(3)}'

    return re.sub(r'(<img\b[^>]*\bsrc=["\'])([^"\']+)(["\'])', html_replacer, content, flags=re.IGNORECASE)


def migrate() -> None:
    if not SOURCE_ROOT.exists():
        raise SystemExit(f"Source blog directory not found: {SOURCE_ROOT}")

    markdown_paths = sorted(
        path
        for path in SOURCE_ROOT.rglob("*.md")
        if ".git_disabled" not in path.parts and "pic" not in path.parts
    )
    slugs = unique_slugs(markdown_paths)
    article_urls = build_article_url_map(markdown_paths, slugs)
    image_map = collect_images()

    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    for existing in POSTS_DIR.glob("*.md"):
        existing.unlink()

    missing_images: set[str] = set()
    for source_path in markdown_paths:
        rel = source_path.relative_to(SOURCE_ROOT)
        raw_content = source_path.read_text(encoding="utf-8-sig").replace("\r\n", "\n").replace("\r", "\n")
        content = rewrite_images(raw_content, image_map, missing_images)
        content = rewrite_article_links(content, article_urls)
        content = normalize_inline_math(content)
        title = title_from_content(source_path, content)
        date = post_date(source_path)
        tags = [part for part in rel.parent.parts if part and part != "."]
        slug = slugs[source_path]
        summary = summary_for(content, title)
        front_matter = "\n".join(
            [
                "---",
                "layout: post",
                f"title: {yaml_string(title)}",
                f"archive_title: {yaml_string(archive_title_for(source_path))}",
                f"date: {date}",
                "tags: [" + ", ".join(yaml_string(tag) for tag in tags) + "]",
                f"summary: {yaml_string(summary)}",
                f"math: {'true' if has_math(content) else 'false'}",
                "---",
                "",
            ]
        )
        body = "{% raw %}\n" + content.lstrip().rstrip() + "\n{% endraw %}\n"
        target = POSTS_DIR / f"{date}-{slug}.md"
        target.write_text(front_matter + body, encoding="utf-8")

    print(f"Migrated {len(markdown_paths)} posts")
    print(f"Copied {len(list(IMAGE_DIR.iterdir()))} images")
    if missing_images:
        print("Missing local images:")
        for item in sorted(missing_images):
            print(f"- {item}")


if __name__ == "__main__":
    migrate()
