---
layout: post
title: "题目大意"
archive_title: "NOIP2021T3方差"
section: "OI"
section_slug: "oi"
oi_category: "Solutions"
oi_category_slug: "solutions"
date: 2022-07-23
tags: ["Solution", "dp"]
summary: "传送门：NOIP2021 T3"
math: true
---
{% raw %}
&emsp; 传送门：[NOIP2021 T3](https://www.luogu.com.cn/problem/P7962)

~~作者是一个考场上没做出来的蒟蒻~~

## 题目大意
&emsp; 给你一个长度为 $n$ 的数组 $a\_1, a\_2, a\_3, \cdots, a\_n$，这个数列是非严格单调递增的。然后我们可以对这个数组进行一种神奇的操作：选择一个数 $a\_i$，然后 $a\_i = a\_{i+1} + a{i-1} - a\_i$。问进行若干次（随便多少次）操作之后这个数列的方差的最小值是多少

## 分析
&emsp; 看题，贪心？算出每一次操作对方差的贡献，然后每次取贡献最小的来操作。反正不知道怎么证明正确性，先打出来再说。然后一测样例，很好，错的。

&emsp; 然后怎么办呢，考场上我就没想出来了。等考完之后，我听机房里的几个大佬在讨论的时候说这个玩意儿的差分有一些神秘的性质，然后我下来就试着分析了一下，然后居然真的有一些神秘的性质。

&emsp; 首先很显然，因为这个 $a$ 数组是非严格单调递增的，所以差分数组中（差分记为 $c$）$\forall c\_i \geq 0$。然后我们考虑对 $a$ 数组进行一次操作，也就是改变一个数：



$$
a_{i-1}, a_{i}, a_{i+1} \to a_{i-1}, a_{i-1} + a_{i+1} - a_i, a_{i+1}
$$



&emsp; 然后这三个位置的差分数组就会发生变化，首先原来的差分数组是这样：



$$
c_{i-1} = a_{i-1} - a_{i-2}\\ c_{i} = a_{i} - a_{i-1}\\ c_{i+1} = a_{i+1} - a_{i}
$$



&emsp; 所以这三个位置的差分就是：



$$
a_{i-1} - a_{i-2}, a_{i} - a_{i-1}, a_{i+1} - a_{i}
$$



&emsp; 进行操作之后就有：



$$
c'_{i-1} = a'_{i-1} - a'_{i-2} = a_{i-1} - a_{i-2} = c_{i-1}\\ c'_{i} = a'_{i} - a'_{i-1} = a_{i-1} + a_{i+1} - a_i - a_{i-1} = a_{i+1} - a_i = c_{i+1}\\ c'_{i+1} = a'_{i+1} - a'_{i} = a_{i+1} - (a_{i-1} + a_{i+1} - a_i) = a_i - a_{i-1} = c_i
$$



&emsp; 也就是说，新的差分数组就是这样：



$$
c_{i-1}, c_{i+1}, c_i
$$



&emsp; 然后就会发现，现在的差分数组就是在原差分数组的基础上交换了 $i$ 和 $i+1$ 两个位置的数。也就是说，每一次操作只会改变差分数组的排列顺序，不会在差分数组里产生原来没有出现过的数。那么我们根据这一点，就能很容易想到一种 $O(n \cdot (n-1)!)$ 的暴力算法，就是先把原数组的差分数组算出来，然后对 $2 \sim n$ 的位置求全排列（差分数组的第一个位置始终不变），然后再对每一个差分数组的原数组求出方差再取最小值就可以了。

&emsp; 当然，我们可以对方差的计算公式稍微简化一下：


$$
\begin{aligned}
\sigma^2 = & \frac 1n\sum_{i=1}^n (a_i - \overline{a})^2, \quad \overline{a} = \frac 1n\sum_{i=1}^n a_i \\
= & \frac 1n\sum_{i=1}^na_i^2 + \frac 1n\sum_{i=1}^n\overline{a}^2 - \frac 1n\sum_{i=1}^na_i\overline{a} \\
= & \frac 1n\sum_{i=1}^n a_i^2 + \overline{a}^2 -2\overline{a}^2 \\
= & \frac 1n\sum_{i=1}^n a_i ^ 2 - \overline{a}^2 = \frac 1n\sum_{i=1}^n a_i^2 - (\frac 1n\sum_{i=1}^n a_i)^2 \\
\end{aligned}
$$



&emsp; 题目要求的答案也就是：


$$
ans = n^2 \sigma^2 = n\sum_{i=1}^n a_i^2 - (\sum_{i=1}^n a_i)^2
$$



&emsp; 用这种暴力的方法可以得 20 分。

&emsp; 如果想要得到更高的分数那么我们可以考虑找一找方差数组在最优解中都有没有一些神秘的规律。首先题目的要求是让我们弄出来的数组的方差是最小的，于是我们根据方差的一些性质就能知道我们要求把数组中每个数之间的 "差异度" 调到最小（因为数组的方差就是数组离散程度的度量嘛）。如果要满足数组中数的差异最小，方差会长成什么样子呢？

&emsp; 别忘了我们这个数组还有一个性质，也就是它非严格单调递增也就是 $a\_1 \leq a\_2 \leq \cdots \leq a\_n$。所以对于这个数组的方差来说 $\forall c\_i \geq 0$。因此就有一种很显然的构造方法就是让差分数组是一个 **"单谷数列"**。什么意思呢，就是说 $c\_1 \geq c\_2 \geq \cdots \geq c\_i \leq c\_{i+1} \leq \cdots \leq c\_n$。因为如果你把这个数列的各个点在平面直角坐标系里画出来，再用平滑曲线连接各个点就会得到一个像山谷一样的图像，所以就叫它 **单谷数列**。

&emsp; 这个性质的证明也很简单，假设现在方差已经是一个单谷数列了，那么我们在这个方差的谷底的右侧（左侧同理）施加一个扰动，使得这个方差数组不再是单谷数列，也就是选择一个下标 $i$，并且交换 $c\_i$ 和 $c\_{i+1}$ 在差分数组中的位置。那么我们会发现这次由这个差分所对应的原数组从位置 $i$ 开始就一定比由单谷的差分对应的原数组中的数要大（因为 $c\_{i+1} \geq c\_{i}$）。所以新的数组的 "差异度" 就比之前的那个要大，所以方差也就比原来的数组大。

&emsp; 所以只有差分是单谷数列的时候才能做到方差最小。

&emsp; 那么我们就比较容易找到一种更优秀的做法。

&emsp; 我们设差分数组为 $\{d\_i\}$，这个差分对应的原数组为 $\{a\_i\}$。我们把 $d$ 数组从小到大排序，然后考虑从小到大依次加入。**因为我们知道我们要构造的东西是单谷的，所以我们只用考虑每次加在已经有的序列的两端。** 然后又考虑到刚才我们弄出来的差分的式子要最小化：



$$
ans = n\sum_{i=1}^n a_i^2 - (\sum_{i=1}^n a_i)^2
$$



&emsp; 答案最小化就是要在最小化 $n\sum\limits\_{i=1}^n a\_i^2$ 的同时最大化 $(\sum\limits\_{i=1}^n a\_i)^2$，所以我们考虑这样设置 $dp$ 的状态，设 $f\_{i, x}$ 表示当前考虑加入第 $i$ 个差分，现在的 $\sum\limits\_ia\_i = x$ 的最小的平方和。那么就只有两种情况：

1. 加在左边，那么现在的所有数都要加上 $d\_i$，所以对答案的贡献就是 $2xd\_i + id\_i^2$，并且转移到 $f\_{i + 1, x + id\_i}$。



$$
f_{i, x} + 2xd_i + id_i^2 \to f_{i + 1, x + id_i}
$$



2. 加在右边，现有的数不会变，令 $s\_i = \sum\limits\_{k = 1}^i d\_k$，那么贡献就是 $s\_i^2$，并且转移到 $f\_{i + 1, x + s\_i}$



$$
f_{i, x} + s_i^2 \to f_{i + 1, x + s_i}
$$



&emsp; 初始化就是 $f\_{1, 0} = 0, f\_{i, x} = INFI$，答案就是：



$$
ans = \min_{x = 0}^{mx} \{ nf_{n, x} - x^2 \}
$$



&emsp; 其中 $mx$ 是 $dp$ 过程中记录的最大的 $\sum\limits\_{i}a\_i$。

## 代码
&emsp; 全排列暴力 20 分：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 100100
#define INFI 1 << 30
#define endl '\n'

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int n = 0;
int a[MAXN] = { 0 };
int c[MAXN] = { 0 };

int ans = INFI;
int na[MAXN] = { 0 };
int nc[MAXN] = { 0 };
int vis[MAXN] = { 0 };

void work(){
	for(int i = 1; i <= n; i++) na[i] = na[i-1] + nc[i];
	int res = 0; int sum = 0;
	for(int i = 1; i <= n; i++){
		res += na[i] * na[i]; sum += na[i];
	}
	res *= n; res -= sum * sum;
	ans = min(ans, res);
}

void dfs(int now){
	if(now > n){ work(); return; }
	for(int i = 1; i <= n; i++){
		if(!vis[i] and ((now == 1 and i == 1) or (now != 1 and i != 1))	){
			nc[now] = c[i]; vis[i] = 1;
			dfs(now + 1);
			nc[now] = 0; vis[i] = 0;
		}
	}
}

int main(){
	n = in;
	for(int i = 1; i <= n; i++) a[i] = in;
	for(int i = 1; i <= n; i++) c[i] = a[i] - a[i-1];
	dfs(1);
	cout << ans << endl;
	return 0;
}
```

&emsp; $100 pts$ 的 $dp$。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 10010
#define MAXM 500500
#define INFI 1 << 30

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int n = 0;
int a[MAXN] = { 0 };
int d[MAXN] = { 0 };
int s[MAXN] = { 0 };
int f[MAXM] = { 0 }; 

int main(){
	n = in; int maxa = 0, mx = 0, ans = INFI;
	for(int i = 1; i <= n; i++) a[i] = in, maxa = max(maxa, a[i]);
	for(int i = 1; i <= n; i++) d[i] = a[i + 1] - a[i];
	for(int i = 1; i <= n * maxa; i++) f[i] = INFI; f[0] = 0; 
	sort(d + 1, d + n);
	for(int i = 1; i < n; i++){
		s[i] = s[i - 1] + d[i];
		if(d[i] == 0) continue;
		for(int x = mx; x >= 0; x--){
	   		if (f[x] == INFI) continue;
			f[x + i * d[i]] = min(f[x + i * d[i]], f[x] + 2 * x * d[i] + i * d[i] * d[i]);
			f[x + s[i]] = min(f[x+ s[i]], f[x] + s[i] * s[i]);
	   		mx = max(mx, max(x + i * d[i], x + s[i]));
	   		f[x] = INFI;
   		}
	}
	for(int i = 0; i <= mx; i++)
		if(f[i] < INFI) ans = min(ans, n * f[i] - i * i);
	cout << ans << '\n';
	return 0;
} 
```
{% endraw %}
