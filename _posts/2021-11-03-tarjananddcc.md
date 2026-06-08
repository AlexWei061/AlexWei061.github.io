---
layout: post
title: "Tarjan与无向图的连通性"
date: 2021-11-03
tags: ["GraghTheory", "Tarjan"]
summary: "一、割点与割边"
math: true
---
{% raw %}
# Tarjan与无向图的连通性
## 一、割点与割边
&emsp; 定义：给定无向图 G = (V，E)：如果对于 $x\in V$，从图中删去这一个节点 x 以及所有与它关联的边之后，G 被分成了两个互不相连的子图。则称 x 为图 G 的割点。

&emsp; 对于 $e\in E$，从图中删去这一个边 e之后后，G 被分成了两个互不相连的子图。则称 e 为图 G 的割边（也称为桥）。

----
## 二、Tarjan 求割点与割边
&emsp; 我们在这里：[Tarjan求强连通分量](https://github.com/AlexWei061/OI/blob/main/GraghTheory/TarjanAndSCC.md) 已经说明过关于时间戳（dfn）和追溯值（low）的相关定义。这里就不做赘述了。下面说如何求解追溯值。
### （1）搜索树（~~上一篇偷懒没说qwq~~ ）：

&emsp; 在无向连通图中任意选择一个节点出发进行dfs，每个节点只访问一遍。把所有发生递归的边 (x，y)（也就是说从 x 到 y 是对 y 的第一次访问）连起来构成一棵树，这棵树就是该无向图的搜索树。（如下图）
![在这里插入图片描述](/assets/images/blog/tarjan.png)

### （2）追溯值的计算（~~其实和上一篇里面讲的也差不多~~ ）：
&emsp; 每一次进 dfs 的时候先把 low[x] 赋值为 dfs[x]。然后遍历从 x 出发到达的每一个点 y，如果在搜索树上 x 是 y 的父节点（搜到 x 的时候 y 还没搜过），那么 low[x] = min(low[x], low[y])，否则（边（x, y）不在搜索树中） low[x] = min(low[x], dfn[y])

### 割边的判定法则：
&emsp; 无向边(x，y)是割边，当且仅当搜索树上存在 x 的一个子节点 y，满足：
$$ dfn[x] < low[y] $$

&emsp; 因为如果 dfn[x] < low[y]，就说明从以 y 为根节点的子树中出发，如果不经过 （x，y）这条边，就不可能到达比 x 更早的节点。所以这条边就把整个图分成了两个部分。*证毕。*

&emsp; 在代码的实现中，有几个个细节：
1. 因为是无向图所以每条边可以看成两条成对的有向边，它们是成对存储的，就是说编号为2和3,4和5 $\cdots$ 我们又知道异或的性质：2 xor 1 = 3，3 xor 1 = 2，4 xor 1 = 5，5 xor 1 = 4 $\cdots$，所以我们在标记一条边是不是割边的时候，我们就要标记它的下标和它的下标异或1的下标而且我们的 tot 就应该赋初值为 1
2. 我们求的是无向图中的桥，所以说我们在 dfs 中对于每个 x 总能到达它的父节点 fa，但是 fa 不是 x 的子节点，所以 dfn[fa] 不能用于更新 low[x]。
3. 但是如果我们在 dfs 时只记录 x 的父节点 fa 的话是无法解决重边的，就是说 x 和  fa 之间有多条边，那么边(x，fa) 就肯定不是桥。但是如果用 fa 来判断现在走出去的是不是刚才那条走进来的边就有问题了，因为 x 到 fa 之间有很多边，我们可以从一条边走进来，再从另一条边走出去，但是这些边中只有一条边在搜索树里面，所以我们有重边的时候 dfn[fa] 可以用来更新 low[x]。
4. 我们有一个更好的解决方案，就是说我们记录每次dfs进来的节点的边的编号，边的编号就是在邻接表里的下标。如果我们沿着编号为 e 的便进入了节点 y，那么我们只用忽略掉和 e 成对的边也就是 e xor 1的那条边。

&emsp; 代码如下：

```c
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100
#define MAXM 2 * MAXN

int n = 0; int m = 0;

int tot = 1;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };

void add(int x, int y){
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
}

int num = 0;
int dfn[MAXN] = { 0 };
int low[MAXN] = { 0 };
int bridge[MAXM] = { 0 };

void tarjan(int x, int edge){
	dfn[x] = low[x] = ++num;
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(!dfn[y]){
			tarjan(y, e);
			low[x] = min(low[x], low[y]);
			if(dfn[x] < low[y])
				bridge[e] = bridge[e ^ 1] = true;
		}
		else if(e != (edge ^ 1)){
			low[x] = min(low[x], dfn[y]);
		}
	}
}

int main(){
	scanf("%d%d", &n, &m);
	for(int i = 1; i <= m; i++){
		int x = 0; int y = 0;
		scanf("%d%d", &x, &y);
		add(x, y); add(y, x);
	}
	
	for(int i = 1; i <= n; i++){
		if(!dfn[i]){
			tarjan(i, 0);
		}
	}
	
	for(int i = 2; i < tot; i++){
		if(bridge[i]) printf("bridge : %d %d\n", to[i], to[i ^ 1]);
	}
	return 0;
}
```
### 割点的判定法则
&emsp; 割点的判定和割边的判定很类似。若 x 不是搜索树的根节点，则 x 是割点当且仅当搜索树上存在一个 x 的子节点 y，满足：
$$ dfn[x] \leq low[y] $$

&emsp; 对于搜索树的根节点 x 来说，x 是割点当且仅当搜索树上至少存在两个子节点满足上述条件。证明方法与割边的类似，就不再赘述了。代码如下：

```c
#include<bits/stdc++.h>
using namespace std;

#define MAXN 100100
#define MAXM 2 * MAXN

int n = 0; int m = 0;
int root = 0;

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };

void add(int x,  int y){
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
}

int  dfn[MAXN] = { 0 };
int  low[MAXN] = { 0 };
bool cut[MAXN] = { 0 };
int num = 0;  int cnt = 0;

void tarjan(int x){
	 dfn[x] = low[x] = ++num;
	 int flag = 0;
	 for(int e = first[x]; e; e = nxt[e]){
	 	int y = to[e];
	 	if(!dfn[y]){
	 		tarjan(y);
	 		low[x] = min(low[x], low[y]);
	 		if(dfn[x] <= low[y]){
	 			flag++;
	 			if(x != root or flag > 1){
	 				cut[x] = true;
				}
			}
		}
		else{
			low[x] = min(low[x], dfn[y]);
		}
	}
}

int main(){
	scanf("%d%d", &n, &m);
	tot = 1;
	for(int i = 1; i <= m; i++){
		int x = 0; int y = 0;
		scanf("%d%d", &x, &y);
		if(x == y) continue;
		add(x, y); add(y, x);
	}
	
	for(int i = 1; i <= n; i ++){
		if(!dfn[i]){
			root = i;
			tarjan(i);
		}
	}
	
	for(int i = 1; i <= n; i++){
		if(cut[i]){
			printf("%d ", i);
		}
	}
	printf("are cut-vertexes\n");
	return 0;
}
```
----
## 三、无向图的双连通分量
&emsp; 若一张无向图不存在割点，则称这张图为 "点双连通图"。如果一张无向图不存在割边，则称这张图为 "边双连通图"。

&emsp; 无向图中的极大点双连通子图我们称为 "点双连通分量"，简记为 "v-DCC"。无向图中的极大边双连通子图称为 "边双连通分量"，简记为 "e-DCC"。点双和边双统称为 "双连通分量"，记为 "DCC"。

#### 一个关于点双和边双的定理

&emsp; 一个无向图是点双连通图当且仅当它满足一下两个条件之一
1. 它的定点数不超过 2
2. 图中任意两点同时包含在一个简单环中。

&emsp; 一个无向图是边双连通图当且仅当任意一条边都包含在至少一个简单环中。

&emsp; *证明：（点双的证明）*

&emsp; 先证明充分性：若 $\forall x, y$ 都同时包含在至少一个简单环中，那么 x，y 之间至少有两条不相交的路径，所以这张图中不存在割点，是点双连通图。

&emsp; 在证明必要性，反证法，假设有一张无向图是点双连通图，并且$\exist x，y$他们不同时存在在一个简单环中。
1. 如果 x，y 之间只存在一条路径的话，那这个路径上至少存在一个割点。所以这个图就不是点双，与原命题矛盾。
2. 如果 x，y 之间存在不止一条路径，而且 x，y 又不在一个环上，那么他们之间的所有路径就必然同时有至少一个除了 x，y 之外的交点。我们设交点为 p。很容易知道 p 就是一个割点，与原命题矛盾。

&emsp; 所以不存在这样的图。

&emsp; *证毕。*

&emsp; 证明边双的定理的过程与点双的差不多，就不说了（~~就是懒得写了qwq 请读者自己证吧~~ ）。

----
### 四、Tarjan 求点双和边双（连通分量）
&emsp; 先说边双吧（~~因为这个简单~~ ），我们只需要把图中的割边全都找出来，然后再把割边删了，剩下的图就被分成了好几个联通的部分，这每一个部分就是一个点双。

&emsp; 代码如下：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100
#define MAXM 2 * MAXN

int n = 0; int m = 0;

int tot = 1;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };

void add(int x, int y){
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
}

int num = 0;
int dfn[MAXN] = { 0 };
int low[MAXN] = { 0 };
bool bridge[MAXM] = { 0 };

void tarjan(int x, int edge){
	dfn[x] = low[x] = ++num;
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(!dfn[y]){
			tarjan(y, e);
			low[x] = min(low[x], low[y]);
			if(dfn[x] < low[y]){
				bridge[e] = bridge[e ^ 1] = true;
			}
		}
		else if(e != (edge ^ 1)){
			low[x] = min(low[x], dfn[y]);
		}
	}
}

vector<int> dcc[MAXN];
int c[MAXN] = { 0 };
int cnt = 0;
void dfs(int x){                                // 閬嶅巻姹傜偣鍙?
	dcc[cnt].push_back(x); c[x] = cnt;
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(c[y] or bridge[e]) continue;
		dfs(y);
	}
}

int main(){
	scanf("%d%d", &n, &m);
	for(int i  = 1; i <= m; i++){
		int x, y;
		scanf("%d%d", &x, &y);
		add(x, y); add(y, x);
	}

	for(int i = 1; i <= n; i++){
		if(!dfn[i]) tarjan(i, 0);
	}

	for(int i = 1; i <= tot; i++){
		if(bridge[i]) printf("edge : %d to %d\n", to[i], to[i ^ 1]);
	}

	for(int i = 1; i <= n; i++){
		if(!c[i]){
			cnt++; dfs(i);
		}
	}

	for(int i = 1; i <= cnt; i++){
		printf("the %dth dcc includes : ", i);
		for(int j = 0; j < dcc[i].size(); j++){
			printf("%d ", dcc[i][j]);
		}
		puts("");
	}

	return 0;
}
```

&emsp; 然后是求点双连通分量。我们除了 dfn 和 low 之外，还要额外维护一个栈，每一个点进入 dfs 的时候就把它入栈。之后每次判断当前点是否满足割点的判定法则（dfn[x] $\leq$ low[y]），并且无论 x 是不是根节点，都从栈顶开始不断弹出节点直到 y 为止。弹出的节点和 x 一起构成一个点双。

&emsp; 注意事项：
1. 不同的点双可能会公用一些节点，这些被公用的节点就是割点。也就是说同一个割点可能存在与几个不同的 v-DCC 里面	。
2. 某个孤立的点自己就是一个点双，除了孤立的点之外，每个点双的的大小至少为2。

&emsp; 代码如下：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100
#define MAXM 2 * MAXN

int n = 0; int m = 0;
int root = 0;

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };

void add(int x, int y){
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
}

int dfn[MAXN] = { 0 };
int low[MAXN] = { 0 };

int top = 0;
int Stack[MAXN] = { 0 };

int num = 0; int cnt = 0;
int cut[MAXN] = { 0 };
vector<int> dcc[MAXN];

void tarjan(int x){
	dfn[x] = low[x] = ++num;
	Stack[++top] = x;
	if(x == root and first[x] == 0){            // 瀛ょ珛鐐?
		dcc[++cnt].push_back(x); return;
	}
	int flag = 0;
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(!dfn[y]){
			tarjan(y);
			low[x] = min(low[x], low[y]);
			if(dfn[x] <= low[y]){
				flag++;
				if(x != root or flag > 1)
					cut[x] = true;
				cnt++; int z = 0;
				do{
					z = Stack[top--];
					dcc[cnt].push_back(z);
				}while(z != y);
				dcc[cnt].push_back(x);
			}
		}
		else{
			low[x] = min(low[x], dfn[y]);
		}
	}
}

int main(){
	scanf("%d%d", &n, &m);
	for(int i = 1; i <= m; i++){
		int x, y;
		scanf("%d%d", &x, &y);
		add(x, y); add(y, x);
	}

	for(int i = 1;  i <= n; i++)
		if(!dfn[i]){
			root = i; tarjan(i);
		}

	for(int i = 1; i <= n; i++){
		if(!dfn[i]) tarjan(i);
	}

	for(int i = 1; i <= n; i++){
		if(cut[i])
			printf("%d ", i);
	}
	puts("are cut-vertexes");

	for(int i = 1; i <= cnt; i++){
		printf("the %dth dcc includes : ", i);
		for(int j = 0; j < dcc[i].size(); j++){
			printf("%d ", dcc[i][j]);
		}
		puts("");
	}

	return 0;
}
```
----
参考文章：《算法竞赛进阶指南》
{% endraw %}
