---
layout: post
title: "严格次小生成树"
archive_title: "严格次小生成树"
section: "OI"
section_slug: "oi"
oi_category: "Graph Theory"
oi_category_slug: "graph"
date: 2022-08-31
tags: ["GraghTheory", "Tree", "kruskal"]
summary: "板子题传送门：luogu P4180"
math: true
---
{% raw %}
# 严格次小生成树

&emsp; 板子题传送门：[luogu P4180](https://www.luogu.com.cn/problem/solution/P4180)

## 定义
&emsp; 严格次小生成树就是说我们设最小生成树选择的边集是 $E_M$，严格次小生成树选择的边集是 $E_S$，那么需要满足（$value(e)$ 表示这个边的边权）：

$$ \sum_{e \in E_M}value(e) < \sum_{e \in E_S}value(e) $$

## 分析
&emsp; 现在就是说现在给定一个无向图，让你求出这个图的次小生成树（严格次小）。很显然我们能想到一个非常朴素的暴力，枚举这张图的所有生成树，比较所有生成树大小就能得出答案了。但是生成树的数量应该是 $O(n^3)$ 级别的（虽然我不会证），所以这样的算法效率显然非常低下。所以我们需要更优秀的算法来解决这个问题。

&emsp; **引理：一定存在一棵严格次小生成树，使得它与某棵最小生成树仅有一条边是不同的。**

&emsp; 现在我们考虑如何证明这个引理，我们考虑反证法：假设存在某一棵严格次小生成树（边权和为 $S_1$）与最小生成树（边权和为 $S$）有 $k$ （$k \geq 2$） 条变的差距。我们如果断开这些边，然后这棵次小生成树树就被拆分成了 $k + 1$ 个不连通的部分。我们再选择其中的 $k$ 个部分用最小生成树中的边将它们连接成一个连通块，此时它就显然与最小生成树只有一条边的差距了。然后再选择次小生成树中的边将这两个连通块相连。

&emsp; 我们可以发现，此时新的生成树的边权和 $S_0$ 应该满足 $S < S_0 < S_1$。这就和次小生成树的定义矛盾了，所以我们就证完了。

&emsp; 这是一个非常有用的引理啊，再知道它之后我们就可以继续优化我们的算法了。我们可以先把最小生成树给建出来，然后枚举所有不属于最小生成树边集的边，找到那个不属于最小生成树但属于次小生成树的边我们就做完了。

&emsp; 具体来说就是枚举非树边 $v \notin E_M$，然后把这条边加入到树中，这时树上就形成了一个环 （设环的边集为 $L$）。然后我们断掉这个换里面最大的边 $u = \max\limits_{e \in L, e \neq v, value(e) \neq value(v)}e$，就能得到含有 $v$ 的生成树中边权最小的生成树了。找到所有这样的生成树将权值取 $\min$ 就是答案。

&emsp; 但是如果我们暴力找需要短那条边那效率还是太低了，所以我们考虑继续优化。采用树上倍增的方法，定义 $1$ 为根节点，处理处一个数组存储每个点向上 $2^i$ 条边的最大值和次大值，在寻找的时候，通过倍增来维护这个数组，这样就能快速找到需要断掉的边了（找环就是求加进去两个点的 $lca$ 然后根据再找值就行了）。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
#define in read()
#define MAXN 400400
#define MAXM 4 * MAXN
#define INFI 0x7f7f7f7f7f7f7f7f

inline int read() {
	int x = 0;
	char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9') {
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };

inline void add(int x, int y, int weight) {
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
	value[tot] = weight;
}

struct Tedge {
	int x, y;
	int val, used;
	bool operator < (const Tedge &rhs) const {
		return val < rhs.val;
	}
} edge[MAXM];

int ans = 0;
int n = 0;
int m = 0;
int fa[MAXN] = { 0 };

int find(int x) {
	if(fa[x] == x) return x;
	return fa[x] = find(fa[x]);
}

void kruskal() {
	for(int i = 1; i <= m; i++) {
		Tedge e = edge[i];
		int x = e.x; int y = e.y;
		int fax = find(x); int fay = find(y);
		if(fax == fay) continue;
		add(x, y, e.val); add(y, x, e.val);
		ans += e.val, edge[i].used = 1, fa[fay] = fax;
	}
}

int f[MAXN][25] = { 0 };           // 祖先
int mx[MAXN][25] = { 0 };          // 最大值
int mm[MAXN][25] = { 0 };          // 次大值
int dep[MAXN] = { 0 };

void dfs(int x) {
	dep[x] = dep[f[x][0]] + 1;
	for(int i = 1; i <= 20; i++) {
		f[x][i] = f[f[x][i - 1]][i - 1];
		if(mx[x][i - 1] == mx[f[x][i - 1]][i - 1]) {
			mx[x][i] = mx[x][i - 1];
			mm[x][i] = max(mm[f[x][i - 1]][i - 1], mm[x][i - 1]);
		}
		if(mx[x][i - 1] > mx[f[x][i - 1]][i - 1]) {
			mx[x][i] = mx[x][i - 1];
			mm[x][i] = max(mx[f[x][i - 1]][i - 1], mm[x][i - 1]);
		}
		if(mx[x][i - 1] < mx[f[x][i - 1]][i - 1]) {
			mx[x][i] = mx[f[x][i - 1]][i - 1];
			mm[x][i] = max(mx[x][i - 1], mm[f[x][i - 1]][i - 1]);
		}
	}
	for(int e = first[x]; e; e = nxt[e]) {
		int y = to[e];
		if(y == f[x][0]) continue;
		f[y][0] = x; mx[y][0] = value[e];
		dfs(y);
	}
}

int queryLca(int x, int y) {
	if(dep[y] > dep[x]) swap(x, y);
	for(int i = 20; i >= 0; i--) {
		if(dep[f[x][i]] >= dep[y]) x = f[x][i];
		if(x == y) return x;
	}
	for(int i = 20; i >= 0; i--) {
		if(f[x][i] != f[y][i])
			x = f[x][i], y = f[y][i];
	}
	return f[x][0];
}

int solve(int x, int y, int w) {
	int lca = queryLca(x, y);
	int numx = 0; int numm = 0;
	for(int i = 20; i >= 0; i--) {
		if(dep[f[x][i]] >= dep[lca]) {
			if(numx == mx[x][i]) numm = max(numm, mm[x][i]);
			if(numx > mx[x][i]) numm = max(numm, mx[x][i]);
			if(numx < mx[x][i]) 
				numx = mx[x][i], numm = max(numm, mm[x][i]);
			x = f[x][i];
		}
		if(dep[f[y][i]] >= dep[lca]) {
			if(numx == mx[y][i]) numm = max(numm, mm[y][i]);
			if(numx > mx[y][i]) numm = max(numm, mx[y][i]);
			if(numx < mx[y][i]) 
				numx = mx[y][i], numm = max(numm, mm[y][i]);
			y = f[y][i];
		}
	}
	if(w != numx) return ans - numx + w;
	else if(numm) return ans - numm + w;
	else return INFI;
}

signed main() {
	n = in; m = in;
	for(int i = 1; i <= m; i++) {
		edge[i].x = in; edge[i].y = in;
		edge[i].val = in; edge[i].used = 0;
	}
	sort(edge + 1, edge + m + 1);
	for(int i = 1; i <= n; i++) fa[i] = i;
	kruskal(); dfs(1);
	int res = INFI;
	for(int i = 1; i <= m; i++) {
		Tedge e = edge[i];
		if(!e.used) res = min(res, solve(e.x, e.y, e.val));
	}
	cout << res << '\n';
	return 0;
}
```
{% endraw %}
