---
layout: post
title: "关于斐波那契数列"
date: 2022-02-19
tags: ["Math", "Sequence"]
summary: "友情提醒：由于本人很蒻，所以文章中的一些推导会有一些不严谨，大家看着就当图个乐qwq。（ 好像也没人会看这个东西来图个乐哈 ）"
math: true
---
{% raw %}
# 关于斐波那契数列
&emsp; 友情提醒：由于本人很蒻，所以文章中的一些推导会有一些不严谨，大家看着就当图个乐qwq。（~~好像也没人会看这个东西来图个乐哈~~ ）
### 一、斐波那契数列的生成函数
&emsp; 在说这个玩意儿之前，我们先讲一下什么是生成函数。
>生成函数即母函数，是组合数学中尤其是计数方面的一个重要理论和工具。最早提出母函数的人是法国数学家LaplaceP.S.在其1812年出版的《概率的分析理论》中明确提出。 生成函数有普通型生成函数和指数型生成函数两种，其中普通型用的比较多。 生成函数的应用简单来说在于研究未知（通项）数列规律，用这种方法在给出递推式的情况下求出数列的通项，生成函数是推导Fibonacci数列的通项公式方法之一。 另外生成函数也广泛应用于编程与算法设计、分析上，运用这种数学方法往往对程序效率与速度有很大改进。

>对于任意数列a0,a1,a2...an 即用如下方法与一个函数联系起来：
>$G(x) = a_0 + a_1x^1 + a_2x^2 + a_3x^3+\cdots$
>则称G(x)是数列的生成函数(generating function)。

（以上内容来自百度）
&emsp; 现在我们知道了生成函数是什么东西，我们就来看一下斐波那契数列的生成函数怎么写。

&emsp; 众所周知：斐波那契数列的递推式长这样：
$$ f_0 = 0, \;\; f_1 = 1,\;\; f_n = f_{n-1} + f_{n-2} (n \geq 2) $$

&emsp; 根据生成函数的定义，我们知道斐波那契的生成函数可以写成这样：
$$ F(x) = f_0x^0 + f_1x^1 + f_2x^2 + f_3x^3 + \cdots $$

&emsp; 然后我们再等式两边同时乘上x 和 $x^2$，就得到了：
$$
\begin{aligned}
F(x) = f_0x^0 + f_1x^1 + &f_2x^2 + f_3x^3 + \cdots  \qquad \qquad \qquad \,\,①  \\
xF(x) = \;\;\;\;\;\;\;\;\;f_0x^1 + &f_1x^2 + f_2x^3 + f_3x^4 + \cdots \qquad \quad \;② \\
x^2F(x) = \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; &f_0x^2 + f_1x^3 + f_2x^4 + f_3x^5 + \cdots \,③
\end{aligned}
$$

&emsp; 由 ①  - (② + ③) 得：

$$ (1-x-x^2)F(x) = f_0x^0 + (f_1 - f_0)x^1 + [f_2 - (f_1+f_0)]x^2 + [f_3-(f_2+f_1)]x^3 + \cdots$$

&emsp; 又由我们的通项公式得到：

$$ f_0 = 0, \; f_1 = 1, \;f_2 - (f_1+f_0) = 0, \; f_3-(f_1+f_2) = 0, \cdots $$
&emsp; 所以：
$$ (1-x-x^2)F(x) = x \rightarrow F(x) = \frac{x}{1-x-x^2} $$

&emsp; 这样，我们就得到了斐波那契数列的生成函数 $F(x) = \frac{x}{1-x-x^2}$

----
### 二、斐波那契数列的通项公式

&emsp; 首先我们先直接给出斐波那契数列的通项公式：
$$f_n = \frac{1}{\sqrt{5}}\Big[ (1 + \frac{\sqrt{5}}{2})^n + (1 - \frac{\sqrt{5}}{2})^n \Big]$$

&emsp; 下面是证明：（~~玄学的构造法~~ ）。我们知道递推式（又要写一遍）：
$$ f_n = f_{n-1} + f_{n-2} (n \geq 2) $$

&emsp; 然后开始玄学构造，令：
$$ f_n - \lambda f_{n-1} = \mu (f_{n-1} - \lambda f_{n-2}) \rightarrow f_n = (\lambda + \mu) f_{n-1} - \mu \lambda f_{n-2} $$

&emsp; 所以我们得到了：
$$
\begin{cases}
\lambda + \mu = 1 \\
\lambda \mu = -1
\end{cases}
$$

&emsp; 由此，我们可以构造出一个一元二次方程：$x^2 - x - 1 = 0$，使得 $\lambda$ 和 $\mu$ 是这个方程的两个根。解得：
$$
\begin{cases}
\lambda = \frac{1-\sqrt{5}}{2}  \qquad 或 \qquad \lambda = \frac{1+\sqrt{5}}{2} \\
\mu = \frac{1+\sqrt{5}}{2} \qquad 或 \qquad \mu = \frac{1-\sqrt{5}}{2}
\end{cases}
$$

&emsp; 我们把这俩玩意儿代入回原式，得：

$$
\begin{cases}
f_n - \frac{1-\sqrt{5}}{2}f_{n-1} = \frac{1+\sqrt{5}}{2}(f_{n-1} - \frac{1-\sqrt{5}}{2}f_{n-2}) \\
f_n - \frac{1+\sqrt{5}}{2}f_{n-1} = \frac{1-\sqrt{5}}{2}(f_{n-1} - \frac{1+\sqrt{5}}{2}f_{n-2})
\end{cases}
$$

&emsp; 这时候我们发现如果令 $a_n = f_n - \frac{1-\sqrt{5}}{2}f_{n-1}$， $b_n = f_n - \frac{1+\sqrt{5}}{2}f_{n-1}$，我们就得到了两个等比数列：

$$
\begin{cases}
a_n = \frac{1+\sqrt{5}}{2}a_{n-1} \\
b_n = \frac{1-\sqrt{5}}{2}b_{n-1}
\end{cases}
$$

&emsp; 由等比数列的通项公式（$a_n = a_1r^{n-1}$ (这里的 r 是公
比)）我们可以得到：
$$
\begin{cases}
a_n = a_1 \times (\frac{1+\sqrt{5}}{2})^{n-1} \\
b_n = b_1 \times (\frac{1-\sqrt{5}}{2})^{n-1}
\end{cases}

$$

&emsp; 进一步得到：

$$
\begin{cases}
f_n - \frac{1-\sqrt{5}}{2}f_{n-1} = (f_1 - \frac{1-\sqrt{5}}{2}f_{0}) \times (\frac{1+\sqrt{5}}{2})^{n-1} ...... ① \\
f_n - \frac{1+\sqrt{5}}{2}f_{n-1} = (f_1 - \frac{1+\sqrt{5}}{2}f_{0}) \times (\frac{1-\sqrt{5}}{2})^{n-1} ...... ② \\
\end{cases}
$$

&emsp; 由 $\frac{1+\sqrt{5}}{2}$① -  $\frac{1-\sqrt{5}}{2}$② 得：

$$ 
\begin{aligned}
 (\frac{1+\sqrt{5}}{2})^{n} - (\frac{1-\sqrt{5}}{2})^n &= \Big[ \frac{1+\sqrt{5}}{2}f_n - (\frac{1+\sqrt{5}}{2} \times \frac{1-\sqrt{5}}{2})f_{n-1} \Big] - \Big[ \frac{1-\sqrt{5}}{2}f_n - (\frac{1-\sqrt{5}}{2} \times \frac{1+\sqrt{5}}{2})f_{n-1} \Big] \\
 (\frac{1+\sqrt{5}}{2})^n - (\frac{1-\sqrt{5}}{2})^n &= \frac{1+\sqrt{5}}{2} f_n - \frac{1-\sqrt{5}}{2} f_n + f_{n-1} - f_{n-1} \\
\sqrt{5}f_n &= (\frac{1+\sqrt{5}}{2})^n - (\frac{1-\sqrt{5}}{2})^n\\
f_n &=  \frac{1}{\sqrt{5}}\Big[(\frac{1+\sqrt{5}}{2})^n - (\frac{1-\sqrt{5}}{2})^n\Big]
\end{aligned}
$$

&emsp; 然后就愉快的证毕啦。

----
### 三、求斐波那契数列
&emsp; 正常的计算斐波那契数列的方法就是弄一个数组然后根据递推式从前往后算，就像这样：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100

int n = 0;
int fib[MAXN] = { 0 };

int main(){
	scanf("%d", &n);
	fib[0] = 0; fib[1] = 1;
	for(int i = 2; i <= n; i++){
		fib[i] = fib[i-1] + fib[i-2];
	}
	printf("fib[%d] = %d\n", n, fib[n]);
	return 0;
}
```
&emsp; 这样的时间复杂度显然是 O(n)。如果 n 超过了 $10^9$ 那么在某些题中就过不了时间限制，那我们有没有办法降低时间复杂度呢？答案显然是有。

&emsp; 我们设 F(n) 表示一个 1 $\times$ 2 的矩阵：$[fib_n \quad fib_{n+1}]$。然后我们再设另一个矩阵 A，我们希望 $F(n-1) \times A = F(n)$。那我们该如何设计这个矩阵呢，我们所希望得到的矩阵的第一个数是原矩阵的第二个数，而第二个数是原矩阵的两数之和。所以我们的 A 矩阵应该是一个 $2 \times 2$ 的矩阵，它长这样：
$$
A = 
\begin{bmatrix}
0 && 1 \\
1 && 1
\end{bmatrix}
$$

&emsp; 读者可以自行验算以下式子：

$$
F(n) =  F(n-1) \times A = \begin{bmatrix} fib_{n-1} & fib_n \end{bmatrix} \times \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix} = \begin{bmatrix} fib_n & fib_{n+1} \end{bmatrix}
$$
&emsp; 于是我们得到了一个矩阵乘法递推式，又因为矩阵乘法符合结合律，我们就可以得到一个用 $O(2^3logn)$ 的时间复杂度计算斐波那契数列的方法。首先我们设初始矩阵 F(0) = $[0 \quad 1]$。目标就是 F(n) = F(0) $\times A^n$。得到的矩阵的第一列的数就是 $fib_n$ 了。
&emsp; 代码如下：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100

int n = 0;
int f[2] = { 0, 1 };
int a[2][2] = { { 0, 1 }, { 1, 1 } };

void mul(int f[2], int a[2][2]){
	int c[2]; memset(c, 0, sizeof(c));
	for(int j = 0; j < 2; j++)
		for(int k = 0; k < 2; k++)
			c[j] += f[k] * a[k][j];
	memcpy(f, c, sizeof(c));
}

void matrixMul(int a[2][2]){
	int c[2][2]; memset(c, 0, sizeof(c));
	for(int i = 0; i < 2; i++)
		for(int j = 0; j < 2; j++)
			for(int k = 0; k < 2; k++)
				c[i][j] += a[i][k] * a[k][j];
	memcpy(a, c, sizeof(c));
}

void quickPower(int n, int f[2], int a[2][2]){
	for(; n; n >>= 1){
		if(n & 1)
			mul(f, a);
		matrixMul(a);
	}
}

int main(){
	scanf("%d", &n);
	quickPower(n, f, a);
	printf("fib[%d] = %d\n", n, f[0]);
	return 0;
}
```
----
### 四、斐波那契数列与黄金分割
&emsp; 众所周知，黄金分割是 $\frac{\sqrt{5}-1}{2}$，约等于 0.61803....。而斐波那契数列与黄金分割有着很大的关系。
>有趣的是，这样一个完全是自然数的数列，通项公式却是用无理数来表达的。而且当趋向于无穷大时，前一项与后一项的比值越来越逼近黄金分割0.618（或者说后一项与前一项的比值小数部分越来越逼近 0.618）。

&emsp; (以上内容来自百度)

&emsp; 你看，这个性质它是不是非常神奇qwq。现在我们来考虑证明它，我们又要写一遍递推公式了：
$$ f_n + f_{n+1} = f_{n+2} $$
&emsp; 两边同时除以一个 $f_{n+1}$，得到：
$$ \frac{f_n}{f_{n+1}} + 1 = \frac{f_{n+2}}{f_{n+1}} $$
&emsp; 我们假设 $\frac{f_n}{f_{n+1}}$存在极限，且极限为 x。那么有：
$$\lim_{n\rightarrow \infty}\frac{f_n}{f_{n+1}} = \lim_{n\rightarrow \infty}\frac{f_{n+2}}{f_{n+1}} = x \rightarrow \therefore x + 1 = \frac{1}{x} $$
&emsp; 又因为 x > 0 所以我们解得：
$$ x = \frac{\sqrt{5} - 1}{2} $$
&emsp; 所以极限是就是黄金分割了。证毕。

&emsp; 当然，如果你愿意，你也可以用我们上面给出的通项公式把 n = n 和 n = n - 1 带入然后两式相除，除完了再取个极限，也能得出一样的结果。当然，前提得是你的计算水平巨好而且你愿意去算这个玩意儿qwq。

----
以上部分内容参考了《算法竞赛进阶指南》和 [https://www.cnblogs.com/lzxzy-blog/p/12961585.html](https://www.cnblogs.com/lzxzy-blog/p/12961585.html)
{% endraw %}
