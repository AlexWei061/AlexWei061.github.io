---
layout: post
title: "Flow Network"
archive_title: "网络流 2"
section: "OI"
section_slug: "oi"
oi_category: "Graph Theory"
oi_category_slug: "graph"
date: 2022-09-02
tags: ["GraghTheory", "NetworkFlow"]
summary: "几个概念"
math: true
---
{% raw %}
# Flow Network

## 几个概念

1. 网络：其实就是一张有向图：$G = (V, E)$
2. 容量：对于 $\forall (x, y) \in E$ 有一个权值 $c(x, y)$ 表示边的容量，特别的如果 $(x, y) \notin E$，那么 $c(x, y) = 0$
3. 源点：通常记作 $S$，并且 $S \in V$
4. 汇点：通常记作 $T$，并且 $T \in V$
5. 流函数：$f(x, y)$ 为定义在二元组 $(x \in V, y \in V)$ 上的实数函数，这个函数满足以下三个性质：



$$
\begin{aligned}
f(x, y) \leq & c(x, y) & 容量限制 \\ 
f(x, y) = & -f(y, x) & 斜对称 \\
\forall x \neq S, x \neq T, \sum_{(u, x) \in E}f(u, x) = & \sum_{(x, v) \in E}f(x, v) & 流量守恒
\end{aligned}
$$



6. 边的流量： 对于 $(x, y) \in E$，$f(x, y)$ 称为边 $(x, y)$ 的流量，$c\_f(x, y) = c(x, y) - f(x, y)$ 称为边的剩余流量
7. 残量网络：对于一个网络 $G = (V, E)$ 和一个流函数 $f$，会对应产生一个剩余容量函数 $c\_f(x, y)$，网络 $G$ 中所有节点和 **剩余容量大于零** 的边所构成的子图就叫做残量网络，即 $G\_f = (V\_f = V, E\_f = \{ (x, y) \in E \mid c\_f(x, y) > 0 \})$
8. 网络的流量：$\sum\limits\_{(S, v) \in E} f(S, v)$ 称为整个网络的流量，她的值也等于 $\sum\limits\_{(u, T) \in E}f(u, T)$

## 最大流

&emsp; 在给定的一个网络中，合法的流函数 $f$ 有很多，其中使得整个网络的流量最大的流函数被称为网络的最大流，这个流函数的网络的流量被常委网络的最大流量。

### 增广路

&emsp; 在讲解如何求出最大流之前还要介绍一个概念叫做增广路。

&emsp; 在一个网络上，一条从源点到汇点的所有边的剩余流量都大于零的路径叫做一条增广路。

&emsp; 这里很显然，如果我们找到一条增广路，那么我们就可以沿着这条增广路找到这条路径上剩余容量的最小值 $minf$，并且将增大这个网络的流量，增量就是 $minf$。那么很自然的，如果我们找不到增广路了，那么现在就没有办法增大这个网络的流量，那么现在的整个网络的流量也就是最大流了。

### EK

&emsp; $EK$ 算法的核心思路其实就是上面提到的，不断寻找增广路以增加网络流量。

&emsp; 但是需要注意一点，一条边的流量 $f(x, y) > 0$ 的时候，根据斜对称性质，那么都会有 $f(y, x) < 0$，此时就必定有 $f(y, x) < c(y, x)$，那么此时的 $c\_f(y, x) > 0$，那么就可以通过这条边来增加流量，所以除了原本的边的集合之外，我们还应该考虑每一条边的反向边。

&emsp; 那么这里就要运用到一个技巧，就是对于一个偶数 $a$，$a \oplus 1 = a + 1$，对于一个奇数 $b$，$b \oplus 1 = b - 1$，那么我们可以从下标 $2$ 开始存边，每次存两条，分别问正向和反向，那么一条正向边 $e$ 的反向边就是 $e \oplus 1$ 了。

&emsp; 这个算法的复杂度为 $O(nm^2)$，但是一般是跑不满这个上界的，在实际应用中一般可以处理 $1e3 \sim 1e4$ 的网络。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
#define in read()
#define MAXN 100100
#define MAXM MAXN << 2
#define INFI 1 << 30

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9')
		x = x * 10 + c - '0', c = getchar();
	return x;
}

int maxflow = 0;
int n = 0, m = 0;
int s = 0, t = 0;

int tot = 1;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };
inline void add(int x, int y, int weight){
	nxt[++tot] = first[x];
	first[x] = tot, to[tot] = y;
	value[tot] = weight;
}

int vis[MAXN] = { 0 };
int inf[MAXN] = { 0 };
int pre[MAXN] = { 0 };
bool bfs(){
	memset(vis, 0, sizeof vis);
	queue<int> q;
	q.push(s), vis[s] = 1, inf[s] = INFI;
	while(!q.empty()){
		int x = q.front(); q.pop();
		for(int e = first[x]; e; e = nxt[e]){
			int y = to[e];
			if(!value[e] or vis[y]) continue;
			inf[y] = min(inf[x], value[e]);
			pre[y] = e;
			q.push(y), vis[y] = 1;
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
	n = in, m = in, s = in, t = in;
	for(int i = 1; i <= m; i++){
		int x = in, y = in, w = in;
		add(x, y, w), add(y, x, 0);
	}
	while(bfs()) update();
	cout << maxflow << '\n';
	return 0;
} 
```

### dinic

&emsp; $dinic$ 算法可以被认为是 $EK$ 的一种神秘优化。

&emsp; 我们根据上面堆 $EK$ 的算法分析和代码可以看出来在每一次 $bfs()$ 的时候我们都要遍历一遍残量网络并且只找出一条增广路，有没有一种可能，一次 $bfs()$ 可以求出多条增广路呢？？？

&emsp; 这时候就要用到 $dinic$ 算法了。

&emsp; 这里需要引入一个新的 $trick$，就是分层图了：我们弄一个 $dep[x]$ 数组，表示 $S$ 到 $x$ 最少需要经过的边数，那么在残量网络中满足 $dep[y] = dep[x] + 1$ 的边 $(x, y)$ 构成的子图就叫分层图，即分层图 $G\_c = (V\_c = V\_f, E\_c = \{ (x, y) \in E\_f \mid dep[y] = dep[x] + 1 \})$。

&emsp; 显然这里的分层图是一张有向无环图。

&emsp; $dinic$ 算法的核心就是不断重复以下步骤，直到在残量网络中 $S$ 不能再到达 $T$ 为止：

1. 在残量网络上 $bfs()$ 求出 $dep$，构造分层图
2. 在分层图上 $dfs()$ 找增广路，回溯的时候更新剩余容量

&emsp; 在此基础上还有若干剪枝，剪枝都比较好懂，具体的看代码吧。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
#define in read()
#define MAXN 100100
#define MAXM MAXN << 2
#define INFI 1 << 30 

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9')
		x = x * 10 + c - '0', c = getchar();
	return x;
}

int maxflow = 0;
int n = 0, m = 0;
int s = 0, t = 0;

int tot = 1;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };
inline void add(int x, int y, int weight){
	nxt[++tot] = first[x];
	first[x] = tot, to[tot] = y;
	value[tot] = weight;
} 

int dep[MAXN] = { 0 };
int now[MAXN] = { 0 };                                        // 当前弧优化剪枝 
bool bfs(){
	memset(dep, 0, sizeof dep);
	queue<int> q;
	q.push(s), dep[s] = 1, now[s] = first[s];
	while(!q.empty()){
		int x = q.front(); q.pop();
		for(int e = first[x]; e; e = nxt[e]){
			int y = to[e];
			if(!value[e] or dep[y]) continue;
			q.push(y), now[y] = first[y];
			dep[y] = dep[x] + 1;
			if(y == t) return true;
		}
	}
	return false;
}

int dinic(int x, int flow){
	if(x == t) return flow;
	int rest = flow, e = 0;
	for(e = now[x]; e and rest; e = nxt[e]){
		int y = to[e];
		if(!value[e] or dep[y] != dep[x] + 1) continue;
		int k = dinic(y, min(rest, value[e]));
		if(!k) dep[y] = 0;                                    // 剪枝，去掉已经增广过的点
		value[e] -= k, value[e ^ 1] += k, rest -= k; 
	}
	now[x] = e;                                               // 当前弧优化 (避免重复便利从 x 出发不可扩展的边)
	return flow - rest; 
}

signed main(){
	n = in, m = in, s = in, t = in;
	for(int i = 1; i <= m; i++){
		int x = in, y = in, w = in;
		add(x, y, w), add(y, x, 0);
	}
	int flow = 0;
	while(bfs()) while(flow = dinic(s, INFI)) maxflow += flow;
	cout << maxflow << '\n';
	return 0;
} 
```

&emsp; 这里，$dinic$ 算法的时间复杂度是 $O(n^2m)$，看起来和 $EK$ 差不了多少，但是实际运用中也是远远达不到这个上界的，一般处理 $1e4 \sim 1e5$ 的网络不成问题，看得出来是要比 $EK$ 要优秀不少的。

## 最小割

&emsp; 给定一个网络 $G = (V, E)$，源点为 $S$，汇点为 $T$。如果一个边集 $E' \in E$ 被删去之后。源点 $S$ 和 汇点 $T$ 不再联通，那么则称这个边集 $E'$ 为这个网络的一个割，边的容量之和最小的割称为网络的最小割。

### 最大流最小割定理

&emsp; 任何一个网络的最大流量等于最小割中的边的容量和，简记为 "最大流" $=$ "最小割"，即：



$$
\max_{f(x, y)}\{ \sum_{(S, v) \in E }f(S, v)\} = \min_{E'}\{ \sum_{(x, y) \in E'}c(x, y) \}
$$



&emsp; 接下来考虑证明这个定理：

&emsp; 用反证法的思想，假设 "最小割” $<$ "最大流"，那么显然歌曲这些边之后网络流量尚未最大化，所以必定能找到增广路，那么 $S$ 和 $T$ 就依然联通，与割的定义矛盾，所以不成立。

&emsp; 所以 "最小割" $\geq$ 最大流，这里如果我们能找到一个构造 "最大流" $=$ "最小割" 的方案的话那么最大流最小割定理就成立了。

&emsp; 考虑求出最大流之后，从源点开始沿着残量网络 $bfs$，标记能够到达的点，$E'$ 的一个构造方案就是连接 "标记的点" 和 $未标记的点$ 的点对 $(x, y)$，且 $(x, y) \in E$。那么这个就显然是一组割，构造完毕。

&emsp; 证毕。

&emsp; 于是，在题目中要求求解最小割或者模型可以转化为最小割的时候我们就可以考虑直接跑一个最大流就搞定了。

## 费用流

&emsp; 给定一个网络 $G = (V, E)$，每条边除了上面说的容量 $c(x, y)$ 之外还有一个给定值，叫做费用 $w(x, y)$，当这条边的流量为 $f(x, y)$ 时就要花费 $f(x, y) \times w(x, y)$ 的费用。

&emsp; 我们可以知道，合法的流函数 $f$ 有很多个，其中流量最大的流函数叫做网络的最大流，很显然，最大的流函数也可以有很多个，所以我们把这个网络中花费最小的最大流叫做 "最小费用最大流"，花费最大的最大流叫做 "最大费用最大流"。二者共同称为 "费用流" 模型。

&emsp; 这里需要注意的是，讨论费用流的前提是最大流，其次再考虑费用问题。

### EK

&emsp; 在用 $EK$ 解决最大流的基础上，把 "每次 $bfs()$ 找到一条增广路“ 改成 "每次 $SPFA()$ 找到一条单位费用最小的增广路" 即可。

&emsp; 具体来说，把 $w(x, y)$ 当作边权，在残量网络上跑 $SPFA()$ 就好了。这里要注意的是，一条边 $(x, y)$ 的费用为 $w(x, y)$，那么她的反向边的费用就应该是 $w(y, x) = -w(x, y)$。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 100100
#define MAXM MAXN << 2
#define INFI 1 << 30

inline int read(){
	int x = 0, f = 1; char c = getchar();
	while(c < '0' or c > '9'){
		if(c == '-') f = 0; c = getchar(); }
	while('0' <= c and c <= '9')
		x = x * 10 + c - '0', c = getchar();
	return f ? x : -x;
}

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
	n = in, m = in, s = in, t = in;
	for(int i = 1; i <= m; i++){
		int x = in, y = in, w = in, c = in;
		add(x, y, w, c); add(y, x, 0, -c);
	}
	while(SPFA()) update();
	cout << maxflow << ' ' << ans << '\n';
	return 0;
}
```
{% endraw %}
