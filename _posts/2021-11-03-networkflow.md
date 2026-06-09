---
layout: post
title: "网络流"
archive_title: "networkFlow"
date: 2021-11-03
tags: ["GraghTheory", "NetworkFlow"]
summary: "一些定义"
math: true
---
{% raw %}
# 网络流

## 一些定义
### 网络
&emsp; 一个网络 $G = (V,E)$ 是一张有向图，图中每条有向边 $(x, y) \in E$ 都有一个给定的权值 $c(x,y)$ 表示这条边的**容量**。图中有两个特殊的点 $S$ 和 $T$ ，分别称为 **源点** 和 **汇点**。

&emsp; 定义一个网络的流函数，它是一个定义在二元组上上的实数函数，他满足以下一些性质：
$$
\begin{aligned}
& f(x, y) \leq c(x, y) \qquad 容量限制 \\
& f(x, y) = -f(y, x) \qquad 斜对称 \\ 
& \forall x \neq s， x \neq t，\sum_{(u,x)\in E}f(u, x) = \sum_{(x,v)\in E}f(x, v)  \quad 流量守恒
\end{aligned}
$$

&emsp; 对于 $(x,y) \in E$ ，$f(x,y)$ 称为这个边的 **流量**，$c(x,y) - f(x,y)$ 称为这条边的**剩余容量**。$\sum_{(s,v)\in E}f(s,v)$ 表示整个网络的**流量**，其中 s 表示源点。

### 最大流
&emsp; 对于一个网络来说，合法的流函数有很多。其中使得整个网络流量 $\sum_{(s,v)\in E}f(s,v)$ 最大的流函数称为这个网络的**最大流**，网络最大流时的流量成为网络的最大流量。

### 最小割
&emsp; 给定一个网络 $G = (V,E)$，源点 S，汇点 T。如果一个边集 $E' \subseteq E$ 被删去之后，源点与汇点不在连通，则称这个边集为这个网络的割。边的容量之和最小的割被称为网络的最小割。

### 费用流
&emsp; 给定一个网络 $G = (V,E)$，每条边除了有一个容量限制，还有给定的单位费用 $w(x,y)$。当这条边的流量为 $f(x,y)$ 的时候，就需要花费 $w(x,y) \times f(x,y)$。这个网络中总花费足校的最大流称为 **最小费用最大流**，总花费最大的最大流称为 **最大费用最大流**。统称费用流。

### 增广路
&emsp; 如果一条路径，从源点出发，到汇点结束并且该路径上的各个边的剩余容量都大于 0，则称这条路径为一条 **增广路**。

-------

## 求解最大流
### Edmods-Krap
&emsp; 用一个 bfs 在网络上一直寻找增广路，显然对于每一条增广路来说，它都可以让整个网络的流量增大，所以我们把所有的增广路都找出来，让整个网络的流量不可能再增大，那么这个流量就是整个网络的最大流了。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100
#define MAXM 2 * MAXN
#define INFI 1 << 30
#define int long long

int maxflow = 0;
int n = 0; int m = 0;
int s = 0; int t = 0;

int tot = 1;
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

int vis[MAXN] = { 0 };
int inf[MAXN] = { 0 };
int pre[MAXN] = { 0 };

bool bfs(){
	memset(vis, 0, sizeof(vis));
	queue<int> q;
	inf[s] = INFI;
	vis[s] = 1; q.push(s);
	while(!q.empty()){
		int x = q.front(); q.pop();
		for(int e = first[x]; e; e = nxt[e])
			if(value[e]){
				int y = to[e];
				if(vis[y]) continue;
				inf[y] = min(inf[x], value[e]);
				pre[y] = e;
				vis[y] = 1; q.push(y);
				if(y == t) return true;
			}
	}
	return false;
}

void update(){
	int x = t;
	while(x != s){
		int e = pre[x];
		value[e] -= inf[t];
		value[e ^ 1] += inf[t];
		x = to[e ^ 1];
	}
	maxflow += inf[t];
}

signed main(){
	scanf("%lld%lld%lld%lld", &n, &m, &s, &t);
	for(int i = 1; i <= m; i++){
		int x = 0; int y = 0; int w = 0;
		scanf("%lld%lld%lld", &x, &y, &w);
		add(x, y, w); add(y, x, 0);
	}
	
	while(bfs()) update();
	printf("%lld\n", maxflow);
	
	return 0;
}
```

### Dinic
&emsp; 在上面的 EK 算法中，每次我们遍历一遍整个残余网络，但是只找出一条增广路。还有优化的空间，我们可以考虑在每次遍历时找出多条增广路。于是我们就有了 dinic 算法。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100
#define MAXM 2 * MAXN
#define INFI 1 << 30

int maxflow = 0;
int n = 0; int m = 0;
int s = 0; int t = 0;

int tot = 1;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };

inline void add(int x, int y, int weight){
	nxt[++tot] = first[x];
	first[x] = tot;
	to[tot] = y;
	value[tot] = weight;
}

int dep[MAXN] = { 0 };
int now[MAXM] = { 0 };
queue<int> q;

bool bfs(){
	memset(dep, 0, sizeof(dep));
	while(!q.empty()) q.pop();
	q.push(s); dep[s] = 1; now[s] = first[s];
	while(!q.empty()){
		int x = q.front(); q.pop();
		for(int e = first[x]; e; e = nxt[e]){
			int y = to[e];
			if(value[e] and !dep[y]){
				q.push(y); now[y] = first[y];
				dep[y] = dep[x] + 1;
				if(y == t) return true;
			}
		}
	}
	return false;
}

int dinic(int x, int flow){
	if(x == t) return flow;
	int rest = flow; int e = 0;
	for(e = now[x]; e and rest; e = nxt[e]){
		int y = to[e];
		if(value[e] and dep[y] == dep[x] + 1){
			int k = dinic(y, min(rest, value[e]));
			if(!k) dep[y] = 0;
			value[e] -= k;
			value[e ^ 1] += k;
			rest -= k;
		}
	}
	now[x] = e;
	return flow - rest;
}

int main(){
	scanf("%d%d%d%d", &n, &m, &s, &t);
	for(int i = 1; i <= m; i++){
		int x, y, w;
		scanf("%d%d%d", &x, &y, &w);
		add(x, y, w); add(y, x, 0);
	}
	int flow = 0;
	while(bfs()){
		while(flow = dinic(s, INFI)) maxflow += flow;
	}
	printf("%d\n", maxflow);
	return 0;
} 
```

---------

## 最大流最小割定理
&emsp; 任何一个网络中的最大流等于最小割中边的容量之和，简记为 "最大流" = "最小割"。

&emsp; 假设 "最大流" < "最小割"，那么在割去这些边之后，因为网络的流量还没有最大化，所以一定能找到一条增广路，与 S T 不连通矛盾。所以 "最大流" $\geq$ "最小割"。如果我们能找到一个 "最大流" = "最小割" 的构造方案就能证明这个定理。

&emsp; 在求出最大流之后，从源点开始 bfs 标记能够到达的点，$E$ 中所有的 "已标记的点 x" 和 "未标记的点 y" 组成的边 $(x,y)$ 组成了这个网络的最小割。

-----------

## 求解费用流
&emsp; 在 Edonds-Krap 算法求解最大流的基础之上，把 "用 bfs 找一条增广路" 改成 "用 SPFA  找一条单位费用之和最小的增广路"就能求出最小费用最大流。最大费用最大流同理。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100
#define MAXM 2 * MAXN
#define INFI 1 << 30

int ans = 0;
int maxflow = 0;
int n = 0; int m = 0;
int s = 0; int t = 0;

int tot = 1;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };
int  cost[MAXM] = { 0 };

inline void add(int x, int y, int w, int c){
	nxt[++tot] = first[x];
	first[x] = tot;
	to[tot] = y;
	value[tot] = w; cost[tot] = c;
}

int dis[MAXN] = { 0 };
int inf[MAXN] = { 0 };
int pre[MAXN] = { 0 };
int vis[MAXN] = { 0 };

bool SPFA(){
	queue<int> q;
	memset(dis, 0x3f, sizeof(dis));
	memset(vis, 0, sizeof(vis));
	q.push(s); dis[s] = 0; vis[s] = 1;
	inf[s] = INFI;
	while(!q.empty()){
		int x = q.front(); vis[x] = 0; q.pop();
		for(int e = first[x]; e; e = nxt[e]){
			if(!value[e]) continue;
			int y = to[e];
			if(dis[y] > dis[x] + cost[e]){
				dis[y] = dis[x] + cost[e];
				inf[y] = min(inf[x], value[e]);
				pre[y] = e;
				if(!vis[y]){ vis[y] = 1; q.push(y); }
			}
		}
	}
	if(dis[t] == 0x3f3f3f3f) return false;
	else return true;
}

void update(){
	int x = t;
	while(x != s){
		int e = pre[x];
		value[e] -= inf[t];
		value[e ^ 1] += inf[t];
		x = to[e ^ 1];
	}
	maxflow += inf[t];
	ans += dis[t] * inf[t];
}

int main(){
	scanf("%d%d%d%d", &n, &m, &s, &t);
	for(int i = 1; i <= m; i++){
		int x, y, w, c;
		scanf("%d%d%d%d", &x, &y, &w, &c);
		add(x, y, w, c); add(y, x, 0, -c);
	}
	while(SPFA()) update();
	printf("%d %d\n", maxflow, ans);
	return 0;
}
```
{% endraw %}
