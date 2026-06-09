---
layout: post
title: "廊桥分配"
archive_title: "CSP2021T1廊桥分配"
date: 2022-07-21
tags: ["Solution", "simulation"]
summary: "传送门：CSP2021 T1 廊桥分配"
math: true
---
{% raw %}
# 廊桥分配

&emsp; 传送门：[CSP2021 T1 廊桥分配](https://www.luogu.com.cn/problem/P7913)

## 题目大意

&emsp; 现在有 $n$ 个廊桥，$m_1$ 个国内航班和 $m_2$ 个国际航班。每一个航班包含一个进入机场的时间和一个离开机场的时间。且国内的航班只能停靠在国内区的廊桥或者遥远的停机位，国际航班同理。所有飞机优先停靠在廊桥上。

&emsp; 现在让你分配所有廊桥给国际区和国内区，让能停靠在廊桥的飞机的总数最大，并输出这个最大值。

## 分析

&emsp; 我们令 $f[x]$ 表示国内区第 $x$ 个廊桥停靠过的飞机总数，$g[x]$ 表示国际区第 $x$ 个廊桥停靠过的飞机总数。那么答案显然就是：

$$ ans = \max_{i = 0}^n \{ \sum_{x = 1}^i f[x] + \sum_{x = i}^{n - i}g[x] \} $$

&emsp; 那么我们现在就要考虑的就是怎样快速求出 $f$ 和 $g$ 这两个数组。方法也很简单，我们每次给到达的飞机安排目前编号最小的廊桥来停靠，这样就能很简单的解决廊桥个数限制的问题。就是说分配到第 $n$ 个廊桥之后再分配 $n + 1$ 时就相当于直接分配到遥远的停机位了，不需要做其他更多的处理。

&emsp; 剩下的就是模拟了。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 100100
typedef pair<int , int> pii;                               // 第一位是离开时间 第二位是廊桥编号 

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int n = 0;
int m1 = 0; int m2 = 0;
struct Tplane{
	int l, r;
	bool operator < (const Tplane &rhs) const { return l < rhs.l; }
}a[MAXN], b[MAXN];
int ans1[MAXN] = { 0 };
int ans2[MAXN] = { 0 };

void solve(Tplane *p, int m, int *ans){
	priority_queue<pii, vector<pii>, greater<pii>> lq;
	priority_queue<int, vector<int>, greater<int>> wq;
	for(int i = 1; i <= n; i++) wq.push(i);
	for(int i = 1; i <= m; i++){
		while(!lq.empty() and p[i].l >= lq.top().first)
			wq.push(lq.top().second), lq.pop();
		if(wq.empty()) continue;
		int des = wq.top(); wq.pop();
		ans[des]++;
		lq.push(make_pair(p[i].r, des)); 
	}
	for(int i = 1; i <= n; i++) ans[i] += ans[i - 1];
}

int main(){
	n = in; m1 = in; m2 = in; int ans = 0;
	for(int i = 1; i <= m1; i++) a[i].l = in, a[i].r = in;
	for(int i = 1; i <= m2; i++) b[i].l = in, b[i].r = in;
	sort(a + 1, a + m1 + 1); sort(b + 1, b + m2 + 1);
	solve(a, m1, ans1); solve(b, m2, ans2);
	for(int i = 0; i <= n; i++) ans = max(ans, ans1[i] + ans2[n - i]);
	cout << ans << '\n';
	return 0;
}
```
{% endraw %}
