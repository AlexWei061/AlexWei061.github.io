---
layout: post
title: "树的直径"
archive_title: "树的直径"
section: "OI"
section_slug: "oi"
oi_category: "Graph Theory"
oi_category_slug: "graph"
date: 2022-08-31
tags: ["GraghTheory", "Tree", "重心和直径"]
summary: "一、定义"
math: true
---
{% raw %}
# 树的直径

## 一、定义

&emsp;   我们将一棵树T=(V,E)的直径定义为max(u,v) (u,v∈V)，也就是说，树中所有最短路径距离的最大值即为树的直径。（就是树中的最长路径的长度）

------

## 二、求解树德直径

&emsp; 求得树的直径有两种方法，一种是两边 bfs （或者两边dfs）就能搞定的算法。还有一种就是树形DP。我们先来了解第一种，就是两遍dfs（或bfs）的算法。

&emsp; **引理**：对于树上任意一点 P，找到离它最远的节点 Q。在找到离节点 Q 最远的节点 W。路径WQ的长度就是树的直径。

&emsp; 下面我们来证明这个引理。我们将证明分为3种情况。

1. 点 P 本身就在直径上，所以很容易知道 Q 也在直径上且为直径的一个端点。
2. 点 P 不在树的直径上，但假设存在不是 WQ 的树的直径 AB 与路径 PQ有一个交点 C，如下图。反证法：因为 PQ 为最远，所以 PC + CQ > PC + CA 进而可以得到 CQ > CA。不等式两边同时加上BC，得到 CQ + BC > CA + BC = AB。 这个结论与 AB 为直径的假设不符，故假设不成立。 

![](/assets/images/blog/diameterTree.png)

3. 点 P 不在树的直径上，并且假设存树的直径不是 WQ 而是 AB，且 AB 与 PQ 没有交点，如下图。因为 PQ 为最远，所以 NP + NQ > NQ + MN + MB，进而得到 NP > MN + MB。易得 NP + MN > MB。不等式两边同时加上 AM 得 NP + MN + AM > MB + AM = AB。与 AB为树的直径的前提相矛盾。所以假设不成立。

![](/assets/images/blog/dismeterTree2.png)

&emsp; 综上所述，引理成立，证毕。

&emsp;  既然我们已经知道了引理，那么要求出树的直径也就很简单了，两边 dfs（或 bfs）就行了。代码如下：

```c++
#include<bits/stdc++.h>
using namespace std;

#define MAXN 100100
#define MAXM 2 * MAXN

int n = 0; int m = 0;

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };

void add(int x, int y , int weight){
	nxt[++tot] = first[x];
	first[x] = tot; 
	to[tot] = y;
	value[tot] = weight;
}

int p = 0; int ans = 0;
int dis[MAXN] = { 0 };
void dfs(int x, int fa){
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(y == fa){
			continue;
		}
		dis[y] = dis[x] + value[e];
		if(ans < dis[y]){
			ans = dis[y];
			p = y;
		}
		dfs(y, x);
	}
}

int main(){
	scanf("%d%d", &n, &m);
	for(int i = 1; i <= m; i++){
		int x = 0; int y = 0; int w = 0;
		scanf("%d%d%d", &x, &y, &w);
		add(x, y, w);
		add(y, x, w);
	}
	
	ans = 0;
	dis[1] = 0;
	dfs(1, 0);
		
	ans = 0;
	dis[p] = 0;
	dfs(p, 0);
	
	printf("%d\n", ans);
	
	return 0;
}
```

--------

&emsp; 接下来是第二种方法：树形DP:

&emsp; 我们需要俩数组，一个 $f_1[MAXN]$，一个$f_2[MAXN]$。分别表示在以 $i$ 节点为根的子树中，$i$ 到叶节点的距离的最大值和次大值。然后就是显而易见玄学的动归方程了（其中$w[i][j]$ 表示 $i$ 到 $j$ 的边权）：

$$
\begin{aligned}
&if(f1[i] < f1[j] + w[i][j])   f2[i] = f1[i], f1[i] = f1[j] + w[i][j]\\ \\
&else if(f2[i] < f1[j] + w[i][j])   f2[i] = f2[j] + w[i][j]
\end{aligned} 
$$

&emsp; 原理其实很简单（说他玄学是因为不知道是谁那么聪明想出来的这玩意儿）。就是说我们尝试去更新 f1[i] ，如果可以更新，那我们让 f2[i] = f1[i] 刚才的最大值为现在的次大值，然后再更新f1[i]。否则，我们尝试更新 f2[i] 如果能更新，就更新。如果不能，就不管他。

&emsp; 我们得到这俩数组之后，树的直径很显然就是:

$$ \min_{i=1}^{n}\left(f1[i] + f[i]\right) $$

&emsp; 然后是代码：

```c++
#include<bits/stdc++.h>
using namespace std;

#define MAXN 1001000
#define MAXM 2 * MAXN

int n = 0; int m = 0;

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };

void add(int x, int y, int weight){
	nxt[++tot] = first[x];
	first[x] = tot;
	to[tot] = y;
	value[tot] = weight;
}

int ans = 0;
int f1[MAXN] = { 0 };
int f2[MAXN] = { 0 };

void dp(int x, int fa){
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(y == fa){
			continue;
		}
		dp(y, x);
		if(f1[x] < f1[y] + value[e]){
			f2[x] = f1[x];
			f1[x] = f1[y] + value[e];
		}
		else if(f2[x] < f1[y] + value[e]){
			f2[x] = f1[y] + value[e];
		}
		ans = max(ans, f1[x] + f2[x]); 
	}
}

int main(){
	scanf("%d", &n);
	for(int i = 1; i <= n-1; i++){
		int x = 0; int y = 0; int w = 0;
		scanf("%d%d%d", &x, &y, &w);
		add(x, y, w); add(y, x, w);
	}
	
	dp(1, 0);
	
	printf("%d\n", ans);
	
	return 0;
}
```
{% endraw %}
