---
layout: post
title: "1. 倍增求 LCA"
archive_title: "最近公共祖先"
section: "OI"
section_slug: "oi"
oi_category: "Graph Theory"
oi_category_slug: "graph"
date: 2022-08-31
tags: ["GraghTheory", "Tree", "lca"]
summary: "设 f {i, j} 表示节点 i 向上的 2^j 辈祖先，我们就能得到： f {i, j} = f {f{i, j-1}, j-1} 我们据此来初始化一个 f，如果节点x, y 在 2^j 辈中有公共祖先那么我们就可以用 O(j) （j一般来说取30就够用了） 的复杂度求出 LCA(x, y)。"
math: true
---
{% raw %}
# 1. 倍增求 LCA
&emsp; 设 $f_{i, j}$ 表示节点 i 向上的 $2^j$ 辈祖先，我们就能得到：$f_{i, j} = f_{f{i, j-1}, j-1}$我们据此来初始化一个 f，如果节点x, y 在 $2^j$ 辈中有公共祖先那么我们就可以用 $O(j)$（j一般来说取30就够用了） 的复杂度求出 LCA(x, y)。
```cpp
#include<bits/stdc++.h>
using namespace std;

#define SIZE 
#define MAXN 100100
#define MAXM 2 * MAXN

int n = 0; int m = 0;

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };

void add(int x, int y){
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
}

int dep[MAXN] = { 0 };
int f[MAXN][35] = { 0 };

/* f[x][i] = f[f[x][i-1]][i-1], f[x][i] --> x 向上 2^i 辈的祖先 */ 
void prework(int u, int fa){
	dep[u] = dep[fa] + 1;
	for(int i = 0; i <= 30; i++){
		f[u][i + 1] = f[f[u][i]][i];
	}
	for(int e = first[u]; e; e = nxt[e]){
		int v = to[e];
		if(v != fa){
			f[v][0] = u;
			prework(v, u);
		}
	}
}

int queryLCA(int x, int y){
	if(dep[x] < dep[y]){
		swap(x, y);
	}
	for(int i = 30; i >= 0; i--){
		if(dep[f[x][i]] >= dep[y]){
			x = f[x][i];
		}
		if(x == y){
			return x;
		}
	}
	for(int i = 30; i >= 0; i--){
		if(f[x][i] != f[y][i]){
			x = f[x][i];
			y = f[y][i];
		}
	}
	return f[x][0];
}

int main(){
	scanf("%d%d", &n, &m);
	for(int i = 1; i <= m; i++){
		int x = 0; int y = 0;
		scanf("%d%d", &x, &y);
		add(x, y);
	}
	
	prework(1, 0);
	
	printf("%d\n", queryLCA(4, 7));
	
	return 0;
}

```
{% endraw %}
