---
layout: post
title: "一些公式"
archive_title: "概率与期望"
date: 2021-11-03
tags: ["Math", "ProbabilityExpectation"]
summary: "概率"
math: true
---
{% raw %}
# 一些公式
## 概率
$$
\begin{aligned}
& P(A\cup B) = P(A) + P(B) - P(A \cap B) \\
& P(B-A) = P(B) - P(A) \qquad (P(A) \leq P(B)) \\
& P(B-A) = P(B) - P(A \cap B) \qquad (\forall A, B) \\
& P(A\mid B) = \frac{P(A \cap B)}{P(B)} \\
& P(AB) = P(A) \times P(B\mid A) = P(B) \times P(A\mid B) \quad (A,B 有关联) \\ 
\end{aligned}
$$

### 全概率公式
$$ P(A) = \sum_{i=1}^n P(A\mid H_i) \times P(H_i) $$

### 贝叶斯定理
$$ P(A\mid B) = \frac{P(A)P(B\mid A)}{P(B)} $$

## 期望
$$
\begin{aligned}
& E(x) = \sum_i p_ix_i \\
& E(C) = C \quad E(Cx) = CE(x) \quad E(x+y) = E(x) + E(y) \\ 
& E(xy) = E(x)E(y) \qquad (x,y相互独立)
\end{aligned}
$$

### 全期望公式
$$ E(Y) = E(E(Y \mid X)) = \sum_i P(x=x_i)E(Y \mid X = x_i) $$

# 题(们)
## 一、百事世界杯之旅
&emsp; [P1291【SHOI2002】百事世界杯之旅](https://www.luogu.com.cn/problem/P1291)

&emsp; 设 $E_{i, j}$ 表示总共有 i 个，还有 j 个没有抽到的期望。,我们考虑下一次抽取：有 $\frac k n$ 的概率抽到我们还没有的，有 $\frac{n-k}n$ 的概率抽到我们已经抽到的，于是我们可以得到以下的递推式：
$$ E_{n, k} = \frac k n E_{n,k-1} + \frac{n-k}n E_{n, k} + 1 $$

&emsp; 然后稍微移项化简一下，就会变成这样：
$$
\begin{aligned}
& E_{n, k} = \frac k n E_{n,k-1} + \frac{n-k}n E_{n, k} + 1 \\
& E_{n, k} - \frac{n-k}n E_{n, k} = \frac k n E_{n,k} = \frac k n E_{n,k-1} + 1 \\ 
& E_{n, k} = E_{n, k-1} + \frac n k
\end{aligned}
$$

&emsp; 又因为我们知道 $E_{1,1} = 1$,，所以我们得到通项公式：
$$ E(x) = n\sum_{i=1}^n\frac 1 i $$

&emsp; 代码：
```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long

ll n; ll z;
ll p; ll q = 1;

ll gcd(ll a, ll b){	
	return b ? gcd(b, a % b) : a;
}

ll countDigit(ll x){	
	ll ans = 0;
	while(x != 0){	
		ans++; x /= 10;
	}
	return ans;
}

void reduction(){
	for(ll i = 1; i <= n; i++){
		p = p * i + q;
		q = i * q;
		ll d = gcd(min(q, p), max(q, p));
		q /= d; p /= d;
	}
	p *= n;
	z = p / q;
	p %= q;
	ll d = gcd(min(q, p), max(q, p));
	q /= d; p /= d;
}

void print(){
	if(p == 0){	
		printf("%lld", z);
		return;
	}
	for(int i = 1; i <= countDigit(z); i++) printf(" ");
	printf("%lld\n", p);
	printf("%lld", z);
	for(int i = 1;i <= countDigit(q); i++) printf("-");
	printf("\n");
	for(int i = 1; i <= countDigit(z); i++) printf(" ");
	printf("%lld", q);
}

int main(){	
	scanf("%lld", &n);
	reduction();
	print();
}
```

------
## 二、骰子
&emsp; 题目大意：一个骰子，扔 n 次的点数之和大于 x 的概率。

&emsp; 首先我们考虑算出扔 n 次点数之和大于 x 的方案数，最后再除以 $6^n$ 即可。我们设 $f_{i, j}$ 表示扔了 i 次，点数之和为 j 的方案数。我们就有：
$$ f_{i, j} = \sum_{k=1}^6 f_{i-1,j-k} $$

&emsp; 所以整个算法就是先 DP 然后最后的答案就是：

$$ ans = \frac{\sum_{i = x}^{6n}f_{n,i}}{6^n} $$

```cpp
#include<bits/stdc++.h>
using namespace std;
#define ll long long

int n = 0; int x = 0;

ll gcd(ll a, ll b){
	return b ? gcd(b, a % b) : a;
}

ll tot = 1; ll ans = 0;
ll f[30][200] = { 0 };
void dp(){
	f[0][0] = 1;
	for(int i = 1; i <= n; i++){
		tot *= 6;
	    for(int j = 1; j <= 6 * i; j++)
		    for(int k = 1; k <= 6; k++)
		        if(j - k >= 0) f[i][j] += f[i-1][j-k];
	}
}

int main(){
	scanf("%d%d", &n, &x);
	dp();
	for(int i = x; i <= 6 * n; i ++) ans += f[n][i];
	ll d = gcd(tot, ans);
	if(ans / d == 0) printf("0\n");
	else if(tot / d == 1) printf("%lld\n", ans / d);
	else printf("%lld/%lld\n", ans / d, tot / d);
	return 0;
}
```

--------
## 三、OX 序列

&emsp; 给定序列，每个位置是 $o$ 的概率为 $p_i$，为 $x$ 的概率是 $1 - p_i$。对于一个 $ox$ 序列，连续 $a$ 长度的 $o$ 会得到 $a^3$ 的收益，问最终得到的 $ox$ 序列的期望收益是多少。

&emsp; 我们设 $f_i$ 为某一种具体的放置方法中已经放到第 $i$ 位的收益。$x_i$ 表示某一种具体的放置方法中从最后一位开始连续的 $o$ 的长度。那么我么需要求解的就是 $E(f_n)$。首先我们很容易知道一个关于 $f$ 的递推式：

$$ f_i = f_{i-1} + (x_{i-1} + 1)^3 - x_{i-1}^3 = f_{i-1} + 3x_{i-1}^2 + 3x_{i-1} + 1
 $$

&emsp; 那么：

$$ E(f_i) = E(f_{i-1}) + 3E(x_{i-1}^2) + 3E(x_{i-1}) + 1 $$

&emsp; 化成这样之后，我们就可以发先如果我们求出 $3E(x_{i-1}^2) + 3E(x_{i-1})$，这就是一个关于 $E(f)$ 的递推式。就可以直接求出来。所以我们考虑怎样求出 $E(x_{i})$ 和 $E(x_{i}^2)$。首先处理一个简单一点的：

$$
\begin{aligned}
E(x_{i}) = ?
\end{aligned}
$$

&emsp; 要知道这个我们首先需要知道 $x_i$ 的递推式：

$$
\begin{cases}
第i位o, \; 概率为p_i, \; x_i = x_{i-1}+1 \\ 第i位x, \; 概率为1-p_i, \; x_i = 0
\end{cases}
$$

&emsp; 那么：

$$
\begin{aligned}
E(x_i) = p_i \times E(x_{i-1} + 1
) + E(1-p_i) \times 0 = p_iE(x_{i-1}) + p_i
\end{aligned}
$$

&emsp; 这样之后我们也可以用递推解决 $E(x_i)$ 的值。然后考虑 $E(x_i^2)$ 的值。首先：


$$
\begin{cases}
第i位o, \; 概率为p_i, \; x_i^2 = (x_{i-1}+1)^2 = x_{i-1}^2 + 2x_{i-1} + 1 \\ 第i位x, \; 概率为1-p_i, \; x_i^2 = 0
\end{cases}
$$

&emsp; 那么：

$$
\begin{aligned}
E(x_i^2) = & p_iE(x_{i-1}^2 + 2x_{i-1} + 1) + (1-p_i) \times 0 \\
= & p_i E(x_{i-1}^2) + 2p_iE(x_{i-1}
) + p_i
\end{aligned}
$$

&emsp; 显然这也是一个递推式，那我们就可以 $O(n)$ 求出最终答案了。

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100

int n = 0;

int main(){
    cin >> n;
    double p; double Ef = 0;
    double Ex = 0; double Exx = 0;
    for(int i = 1; i <= n; i++){
        cin >> p;
        Ef += (3 * Exx + 3 * Ex + 1) * p;
        Exx = (Exx + 2 * Ex + 1) * p;
        Ex = (Ex + 1) * p;
    }
    printf("%lf\n", Ef);
    return 0;
}
```
{% endraw %}
