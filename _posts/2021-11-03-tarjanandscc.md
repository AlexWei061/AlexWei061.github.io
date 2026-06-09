---
layout: post
title: "Tarjan 求强连通分量"
archive_title: "Tarjan 求强连通分量"
section: "OI"
section_slug: "oi"
oi_category: "Graph Theory"
oi_category_slug: "graph"
date: 2021-11-03
tags: ["GraghTheory", "Tarjan"]
summary: "强连通分量"
math: false
---
{% raw %}
# Tarjan 求强连通分量
## 强连通分量
&emsp; 定义：给定有向图，如果对于图中任意两点 x, y，既存在从 x 到 y 的路径，也存在从 y 到 x 的路径，就称该有向图是一个强连通图。

&emsp; 在一个有向图中，它的极大强连通子图被称为强连通分量。

----

## 求解强连通分量
### 首先有一些重要的数组：
1. dfn[MAXN] : dfs序，也就是时间戳
2. low[MAXN] : low[x] 表示的是 x 能够追溯到的栈中节点的最小时间戳，也称追溯值。
3. Stack[MAXN]：我们维护的一个栈，每个节点进去 dfs 的时候就把它入栈。

&emsp; 初始化的时候 dfn[x] = low[x]，在下方 dfs 的时候如果连接到的点 y 如果没有被 dfs 过，那就先进去dfs 然后在更新low[x] = min(low[x], low[y])。如果 y 已经在栈里了，那就直接更新 low[x] = min(low[x], dfn[y])。

##### 强联通分量的判定法则：
&emsp; 如果我们遇到一个 x 有 dfn[x] = low[x]。说明这个 x 不能再向前追溯，也就说明现在栈中从栈顶到节点 x 一起组成了一个强连通分量。我们就把他们依次弹出来放到一个数组中。
```cpp
#include<bits/stdc++.h>
using namespace std;

#define MAXN 100100
#define MAXM 2 * MAXN

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };

void add(int x, int y){
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
}

int   dfn[MAXN] = { 0 };
int   low[MAXN] = { 0 };

int Stack[MAXN] = { 0 };
int ins[MAXN] = { 0 };
int c[MAXN] = { 0 };
vector<int> scc[MAXN];

int n = 0; int m = 0;
int num = 0; int top = 0; int cnt = 0;

void tarjan(int x){
	dfn[x] = low[x] = ++num;
	Stack[++top] = x; ins[x] = 1;
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(!dfn[y]){
			tarjan(y);
			low[x] = min(low[x], low[y]);
		}
		else if(ins[y]){
			low[x] = min(low[x], dfn[y]);
		}
	}
	if(dfn[x] == low[x]){
		cnt++; int y = 0;
		do{
			y = Stack[top--]; ins[y] = 0;
			c[y] = cnt; scc[cnt].push_back(y);
		}while(x != y);
	}
}

int main(){
	scanf("%d%d", &n, &m);
	
	for(int i = 1; i <= m; i++){
		int x = 0; int y = 0;
		scanf("%d%d", &x, &y);
		add(x, y);
	}
	
	for(int i = 1; i <= n; i++){
		if(!dfn[i]){
			tarjan(i);
		}
	}
	
	for(int i = 1; i <= cnt; i++){
		printf("the %dth scc includes : ", i);
		for(int j = 0; j < scc[i].size(); j++){
			printf("%d ", scc[i][j]);
		}
		puts("");
	}
	
	return 0;
}

```
{% endraw %}
