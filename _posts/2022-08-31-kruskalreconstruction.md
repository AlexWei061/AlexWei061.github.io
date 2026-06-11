---
layout: post
title: "Kruskal 重构树"
archive_title: "kruskalReconstruction"
section: "OI"
section_slug: "oi"
oi_category: "Graph Theory"
oi_category_slug: "graph"
date: 2022-08-31
tags: ["GraghTheory", "Tree", "kruskal"]
summary: "kruskal 最小生成树算法相信大家已经很熟悉了，所以这里就不介绍了。顾名思义 kruskal 重构树就是根据 kruskal 改造一下衍生出来的算法。它能解决下面这样的一个问题："
math: true
---
{% raw %}
# Kruskal 重构树

&emsp; kruskal 最小生成树算法相信大家已经很熟悉了，所以这里就不介绍了。顾名思义 kruskal 重构树就是根据 kruskal 改造一下衍生出来的算法。它能解决下面这样的一个问题：

&emsp; 给定 $n$ 个点 $m$ 条边的无向图，每条边有一个边权为 $d\_i$。现在有 $k$ 个询问，每次查询两点 $x, y$ 之间的所有路径中，最长的边的最小值是多少。（$1\leq n \leq 15000, 1 \leq m \leq 30000, d\_i \leq 1e9, k \leq 15000$）

&emsp; 我们很容易能够想到，$x$ 到 $y$ 的符合题目条件的（也就是说最长边最小的路径）所有边一定在这张图的一颗最小生成树上（这应该很显然吧qwq），然后我们要求的答案就是这颗生成树上两点之间的最长边，如果暴力求生成树然后暴力求生成树上路径最大值的话那么复杂度就应该是 $O(nk + m\log m + m)$，很显然这样的做法不够优秀。

&emsp; 所以我们考虑怎样优化这个做法，我们发现我们没有必要求出这 $n$ 个点的最小生成树，我们只需要求出包含 $x$ 到 $y$ 的路径的最小生成树就行了。所以我们对 kruskal 进行一下改造就能过掉这个题了。具体的流程如下：

1. 将边权从小到大排个序
2. 按边权从小到大依次遍历每一条边，如果边连接两个节点 $u, v$ 不在同一个并查集内，我们就新建一个节点 $p$，令 $u, v$ 分别为 $p$ 的左右儿子。这个点的**点权**就是连接 $u, v$ 这条边的 **边权**。这样构造出来的树我们称为 **kruskal 重构树**。

&emsp; 让我们来画一个图更加形象的展现建树的过程：

![在这里插入图片描述](https://img-blog.csdnimg.cn/41ff808ae0314a21a7aff07e3209be5a.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAbEFXVFls,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

&emsp; 这样的重构树显然满足一下几条性质：

1. 这玩意儿是一颗二叉树
2. 两点 $x, y$ 的最近公共祖先 $lca(x, y)$ 的点权就是原图中 $x, y$ 满足最大边最小的路径上的边的最大值。
3. 任一点的权值大于左右儿子的权值（也就是满足大根堆的性质）
4. kruskal 重构树的根节点就是最后所建的节点
5. 如果原图不连通建树出来就是一个森林，那么遍历每个节点找到并查集的根作文其所在树的根

&emsp; 这样我们就只用建树之后求 $lca$ 就做完了，这样的时间复杂度就应该是 $O(n\log n + m + k\log k) = O(m + n\log n)$ 。这样就能过掉这个题了。

&emsp; 上代码：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define INFI (int)1e9 + (int)1e5
#define MAXN 100100
#define MAXM 100100 * 2
#define ls(x) ch[x][0]
#define rs(x) ch[x][1]

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int cnt = 0;
int n = 0; int m = 0; int k = 0;
struct Tedge{
	int x, y, w;
	bool operator < (const Tedge &rhs) const {
		return w < rhs.w;
	}
}edge[MAXM]; int tot = 0;
inline void add(int x, int y, int w) { edge[++tot] = (Tedge){x, y, w}; }

int fa[MAXN] = { 0 };
void init1(){
	for(int i = 0; i <= n << 1; i++) fa[i] = i;
}
int find(int x){
	if(fa[x] == x) return fa[x];
	else return fa[x] = find(fa[x]);
}

int val[MAXM] = { 0 };
int f[MAXN][21] = { 0 };
int ch[MAXN][2] = { 0 };
void kruskal(){
	sort(edge + 1, edge + tot + 1);
	for(int i = 1; i <= m; i++){
		int x = edge[i].x; int y = edge[i].y;
		int fax = find(x); int fay = find(y);
		if(fax == fay) continue;
		ls(++cnt) = fax; rs(cnt) = fay;
		fa[fa[x]] = fa[fa[y]] = f[fa[x]][0] = f[fa[y]][0] = cnt;
		val[cnt] = edge[i].w;
	}
}

void init2(){
	for(int i = 1; i <= 20; i++)
		for(int j = 1; j <= 2 * n; j++)
			f[j][i] = f[f[j][i - 1]][i - 1];
}

int dep[MAXN] = { 0 };
void prework(int x){
	if(!ls(x) and !rs(x)) return;
	dep[ls(x)] = dep[rs(x)] = dep[x] + 1;
	prework(ls(x)); prework(rs(x));
}

int queryLCA(int x, int y){
	if(dep[x] < dep[y]) swap(x, y);
	for(int i = 20; i >= 0; i--){
		if(dep[f[x][i]] >= dep[y]) x = f[x][i];
		if(x == y) return x;
	}
	for(int i = 20; i >= 0; i--)
		if(f[x][i] != f[y][i]) x = f[x][i], y = f[y][i];
	return f[x][0];
}

int main(){
	cnt = n = in; m = in; k = in;
	for(int i = 1; i <= m; i++){
		int x = in; int y = in; int w = in; add(x, y, w);
	}
	init1(); kruskal();
	dep[cnt] = 1; prework(cnt);
	init2();
	while(k--){
		int x = in; int y = in;
		cout << val[queryLCA(x, y)] << '\n';
	}
	return 0;
}
```

&emsp; 大家写完之后可以去 BZOJ（BZOJ3732） 上交一下看看对不对qwq。
{% endraw %}
