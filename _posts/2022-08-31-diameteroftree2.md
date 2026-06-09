---
layout: post
title: "树的直径"
archive_title: "diameterOfTree2"
section: "OI"
section_slug: "oi"
oi_category: "Graph Theory"
oi_category_slug: "graph"
date: 2022-08-31
tags: ["GraghTheory", "Tree", "重心和直径"]
summary: "设 d x 表示以 x 为根节点到这棵树中最远的距离，显然有："
math: true
---
{% raw %}
# 树的直径

&emsp; 设 $d_x$ 表示以 $x$ 为根节点到这棵树中最远的距离，显然有：

$$ d_x = \max_{e_{x \; to \; y_i} \in E_x} \{ d_{y_i} + value(e) \} $$

&emsp; 设 $f_x$ 表示经过 $x$ 的最长链的长度，我们可以发现他就可以拆成四个部分：

1. $x \; to \; y_i$
2. $y_i$ 到以 $y_i$ 为根的最长距离
3. $x \; to \; y_j$
4. $y_j$ 到以 $y_j$ 为根的最长距离

&emsp; 那么就有：

$$ f_x = \max_{e_{i_{x \; to \; y_i}} \in E, e_{j_{x \; to \;y_j}} \in E} \{ d_{y_i} + d_{y_j} + value(e_i) + value(e_j) \} $$

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 500500
#define MAXM 4 * MAXN

inline int read(){
	int x = 0; int f = 1; char c = getchar();
	while(c < '0' or c > '9'){
		if(c == '-') f = -1; c = getchar();
	}
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return f * x;
}

int tot = 0;
int first[MAXN] = { 0 };
int   nxt[MAXM] = { 0 };
int    to[MAXM] = { 0 };
int value[MAXM] = { 0 };

inline void add(int x, int y, int weight){
	nxt[++tot] = first[x];
	first[x] = tot; to[tot] = y;
	value[tot] = weight;
}

int n = 0;
int v[MAXN] = { 0 };
int d[MAXN] = { 0 };
int ans = 0;
void dp(int x){
	v[x] = 1;
	for(int e = first[x]; e; e = nxt[e]){
		int y = to[e];
		if(v[y]) continue;
		dp(y);
		ans = max(ans, d[x] + d[y] + value[e]);
		d[x] = max(d[x], d[y] + value[e]);
	}
}

int main(){
	n = in;
	for(int i = 1; i < n; i++){
		int x = in, y = in, w = in;
		add(x, y, w); add(y, x, w);
	}
	dp(1);
	cout << ans << '\n';
	return 0;
}
```
{% endraw %}
