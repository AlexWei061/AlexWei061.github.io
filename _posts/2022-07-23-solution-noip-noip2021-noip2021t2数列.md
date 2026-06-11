---
layout: post
title: "题目大意"
archive_title: "NOIP2021T2数列"
section: "OI"
section_slug: "oi"
oi_category: "Solutions"
oi_category_slug: "solutions"
date: 2022-07-23
tags: ["Solution", "NOIP", "NOIP2021"]
summary: "传送门：NOIP2021 T2 数列"
math: true
---
{% raw %}
&emsp; 传送门：[NOIP2021 T2 数列](https://www.luogu.com.cn/problem/P7961)

## 题目大意

&emsp; 给定整数 $n, m, k$，和一个长度为 $m + 1$ 的正整数数组 $v\_0, v\_1, \ldots, v\_m$。

&emsp; 对于一个长度为 $n$，下标从 $1$ 开始且每个元素均不超过 $m$ 的非负整数序列 $\{a\_i\}$，我们定义它的权值为 $v\_{a\_1} \times v\_{a\_2} \times \cdots \times v\_{a\_n}$。

&emsp; 当这样的序列 $\{a\_i\}$ 满足整数 $S = 2^{a\_1} + 2^{a\_2} + \cdots + 2^{a\_n}$ 的二进制表示中 $1$ 的个数不超过 $k$ 时，我们认为 $\{a\_i\}$ 是一个合法序列。

&emsp; 计算所有合法序列 $\{a\_i\}$ 的权值和对 $998244353$ 取模的结果。

## 分析

&emsp; 我还依稀记得考场上打的最暴力的暴力... ~~测下来一分没有qwq~~

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MOD 998244353
#define MAXN 202

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int k = 0;
int v[MAXN] = { 0 };
int n = 0; int m = 0;

inline int lowbit(int x){
	return x & -x;
}

int ans = 0;
int a[MAXN] = { 0 };
void work(){
	int S = 0;
	for(int i = 1; i <= n; i++) S += pow(2, a[i]);
	int cnt1 = 0;
	while(S){
		S -= lowbit(S); cnt1++;
		if(cnt1 > k) return;
	}
	int temp = 1;
	for(int i = 1; i <= n; i++)
		temp = (1ll * temp * v[a[i]]) % MOD;
	ans = (1ll * ans + temp) % MOD;
}

void dfs(int now){
	if(now > n){ work(); return; }
	for(int i = 0; i <= m; i++){
		a[now] = i;
		dfs(now + 1);
		a[now] = 0;
	}
}

int main(){
	n =  in; m = in; k = in;
	for(int i = 0; i <= m; i++) v[i] = in;
	dfs(1);
	cout << ans << endl;
	return 0;
}
```

&emsp; 好了，现在来看看正常的解法。

&emsp; 看看这个数据范围， $n, m$ 都比较小，所以应该不是计数，那就考虑 $dp$。设 $f\_{i, j, k, l}$ 表示当前处理第 $i$ 位，已经用了 $j$ 个数，前 $i$ 位中一共有 $k$ 个 "$1$"，且在第 $i$ 为进位了 $l$ 次。

&emsp; 那么根据这些信息我们再枚举当前在 $i$ 位置上放 $x$ 个 "$1$"。我们就能知道第 $i + 1$ 位是 $0$ 还是 $1$。具体来说，我们在 $i$ 位进位了 $l$ 次，那么 $i + 1$ 位就进位了 $\frac l2$ 次。并且我们又放了 $x$ 个 $1$，那么第 $i + 1$ 位就总共进位 $\lfloor \frac {l+x}2 \rfloor$ 次。那么我们就能从：



$$
f_{i, j, k, l}
$$



&emsp; 转移到：



$$
f_{i + 1, j + x, k + (\lfloor \frac {l + x}2 \rfloor \land 1), \lfloor\frac {l + x}2 \rfloor}
$$



&emsp; 就是这样转移：



$$
f_{i, j, k, l} \to f_{i + 1, j + x, k + (\lfloor \frac {l + x}2 \rfloor \land 1), \lfloor\frac {l + x}2 \rfloor}
$$



&emsp; 显然这是不能直接硬往上加的，前面还有些系数。首先显然的一个系数就是 $v\_{i}^x$ 这个就是我在第 $i$ 位加 $x$ 个 $i$ 对答案的贡献，然后还有一个系数就是方案数，也就是说还剩 $n - j$ 个数里面选出 $x$ 个为 $i$ 的方案数就是 $\begin{pmatrix} n - j \\ x \end{pmatrix}$。所以转移方程应该就是：



$$
f_{i + 1, j + x, k + (\lfloor \frac {l + x}2 \rfloor \land 1), \lfloor\frac l2 \rfloor + x} = \sum f_{i, j, k, l} \times v_i^x \times \begin{pmatrix} n - j \\ x \end{pmatrix}
$$



&emsp; 然后我们预处理一下组合数就可以快乐的 $dp$ 啦。答案就是：



$$
ans = \sum_{i = 0}^n\sum_{j = 0}^k [j + popcnt(i) \leq k]f_{m, n, j, i}
$$



&emsp; 完结撒花！！！

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 50
#define MAXM 505
#define MOD 998244353

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int K = 0;
int n = 0; int m = 0;
int v[MAXM][MAXN] = { 0 };                     // v[i][j] = v_i^j
int c[MAXN][MAXN] = { 0 };
int f[MAXM][MAXN][MAXN][MAXN] = { 0 };

int popcnt(int x){
	int ans = 0;
	while(x) ans += (x & 1), x >>= 1;
	return ans; 
} 

int main(){
	n = in; m = in; K = in; int ans = 0;
	for(int i = 0; i <= m; i++){
		v[i][0] = 1; v[i][1] = in;
		for(int j = 2; j <= n; j++)
			v[i][j] = 1ll * v[i][j - 1] * v[i][1] % MOD;
	}
	c[0][0] = 1;
	for(int i = 1; i <= n; i++){
		c[i][0] = 1;
		for(int j = 1; j <= i; j++)
			c[i][j] = (c[i - 1][j] + c[i - 1][j - 1]) % MOD;
	}
	f[0][0][0][0] = 1;
	for(int i = 0; i <= m; i++)
		for(int j = 0; j <= n; j++)
			for(int k = 0; k <= K; k++)
				for(int l = 0; l <= n >> 1; l++)
					for(int x = 0; x <= n - j; x++)
						f[i + 1][j + x][k + (l + x & 1)][l + x >> 1] = (f[i + 1][j + x][k + (l + x & 1)][l + x >> 1] + 1ll * f[i][j][k][l] * v[i][x] % MOD * c[n - j][x] % MOD) % MOD;
     for(int j = 0; j <= K; j++)
	 	for(int i = 0; i <= n >> 1; i++)
	 		if(j + popcnt(i) <= K) ans = (ans + f[m + 1][n][j][i]) % MOD;
    cout << ans << '\n';
	return 0;
} 
```
{% endraw %}
