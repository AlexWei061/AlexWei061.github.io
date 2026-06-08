---
layout: post
title: "二进制翻转"
date: 2021-11-13
tags: ["DP", "dijitalDp"]
summary: "一道题"
math: true
---
{% raw %}
# 二进制翻转
## 一道题

&emsp; 今天在看关于数位 DP 的东西的时候看到这这道题：[luogu P2235 Kathy 函数](https://www.luogu.com.cn/problem/P2235)。在这道题里面给出了一个神秘的函数（就是 Kathy 函数啦），它长这样：
$$
\begin{cases}
	\begin{aligned}
		&f(1) = 1 \\ 
		&f(3) = 3\\
		&f(2n) = f(n)\\
		&f(4n+1) = 2f(2n+1) - f(n)\\
		&f(4n+3) = 3f(2n+1) - 2f(n)
	\end{aligned}
\end{cases}
$$

&emsp; 就光看它的这个样子就长得不像什么正常函数。然后我就在那里研究这玩意儿的性质，搞了可能有一个多小时，发现自己啥都没研究出来（我太蒻了），就只是找到了一堆像题目中说的那种 $f(n) = n$ 的数（打表打出来的，程序放在下面）。比如 0 ~ 100 的这种数有： 1，3，5，7，9，15，17，21，27，31，33，45，51， 63，65，73，85，93， 99。前几个数看起来还可能有点规律，但是后面的数就开始越来越奇怪了。

&emsp; 打表代码：

```c
#include<bits/stdc++.h>
using namespace std;

int kathy(int x){
	if(x == 1 or x == 3) return x;
	if(x % 2 == 0) return kathy(x / 2);
	if(x % 4 == 1){
		int n = x / 4;
		return 2 * kathy(2 * n + 1) - kathy(n);
	}
	if(x % 4 == 3){
		int n = x / 4;
		return 3 * kathy(2 * n + 1) - 2 * kathy(n);
	}
}

int main(){
	for(int i = 1; i <= 100; i++){
		if(i == kathy(i)) printf("%d\n", i);
	}
	return 0;
}
```

&emsp; 然后我就又把 1000 之内的这些数给打出来了：

$$
\begin{aligned}
&1, 3, 5, 7, 9, 15, 17, 21, 27, 31, 33, 45, 51, 63, 65, 73, 85, 93, 99, 107, 119, 127 ,129, 153, 165, 189\\
&195, 219, 231, 255, 257, 273, 297, 313, 325, 341, 365, 381, 387, 403, 427, 443, 455, 471, 495, 511\\
&513, 561, 585, 633, 645, 693, 717, 765, 771, 819, 843, 891, 903, 951, 975
\end{aligned}
$$

&emsp; 很好，更没有规律了。我唯一看出来的就是他们都是奇数，而且时不时就来两个相邻的奇数比如前面的 $(1, 3, 5, 7, 9)$；$(15, 17)$；$(31, 33)$；$(63， 65)$；等等... 再之后就啥都看不出来了（我太蒻了）。

&emsp; 于是我去看了题解然后就有了这篇文章。

### 一个证明

&emsp; 看了题解之后我整个人都不好了，基本上每一篇题解都会说到这个函数就是完成二进制翻转的函数，但是好像都没有给出证明。

&emsp; 二进制翻转就是说把这个数的二进制反过来再转成 10 进制，就比如说这样：4 的二进制是 $4 = (100)_2$，然后把它的二进制颠倒过来变成 $(001)_2$ 然后再转化成 10 进制就是 1.所以 4 的二进制翻转就是 1。

&emsp; 因为都没有证明，所以我就想代几个数进去看看能不能自己想办法证出来。结果代了好几个数之后只是确认了他就是完成二进制翻转的函数，然而没有提供任何思路给我。然后我又在网上继续翻，然后就找到了洛谷上的一片题解证明了这个函数的作用（~~虽然不知道这玩意儿是咋构造出来的，但起码知道了他为啥能这样用了~~）。下面是我用我的理解写出的证明过程，原文传送门在此：[Kathy 函数的题解之一](https://www.luogu.com.cn/blog/user29936/solution-p2235)。
### 证明过程

&emsp; 约定：$n'$ 表示数字 $n$	 翻转之后的结果。比如 $n = 4$，$n'$ 就等于 1。

&emsp; 首先 $f(1) = 1，f(2) = f(1) = 1，f(3) = 3$ 显然成立。

&emsp; 然后对于第一个递推式： $f(2n) = f(n)$ 来说，我们假设：
$$n = (\overline{a_1a_2a_3\cdots a_n})_2$$

&emsp; 那么 2n 的意思就是将 n 左移 1 位：
$$2n = (\overline{a_1a_2a_3\cdots a_n0})_2$$

&emsp; 所以此时显然有 $n' = (2n)'$（去掉前导0）。也就是说**在 $f(n) = n'$ 的时候就有 $f(2n) = f(n) = n' = (2n)'$。**

---

&emsp; 然后对于第二个递推式：$f(4n+1) = 2f(2n+1)-f(n)$，同样的我们还是设:
$$n = (\overline{a_1a_2a_3\cdots a_n})_2$$

&emsp; 则 $2n+1$是把 n 左移 1 为并在末位加 1，$4n+1$ 是把 n 左移两位并在末位加 1：
$$ 2n+1 = \overline{a_1a_2a_2\cdots a_n1}，4n+1 = \overline{a_1a_2a_3\cdots a_n01} $$

&emsp; 我们就可以得到：
$$ n' = \overline{a_na_{n-1}\cdots a_2a_1}\\\\(2n+1)' = \overline{1a_na_{n-1}\cdots a_1}，(4n+1)' = \overline{10a_na_{n-1}\cdots a_1} $$

&emsp; 则：
$$
\begin{aligned}
2(2n+1)' - n'  = &\overline{1a_na_{n-1}\cdots a_10} - \overline{a_na_{n-1}\cdots a_2a_1}\\
= &\overline{1a_na_{n-1}\cdots a_1} + \Big(\overline{1a_na_{n-1}\cdots a_1} -  \overline{a_na_{n-1}\cdots a_2a_1}\Big)\\
= &\overline{1a_na_{n-1}\cdots a_1} + \overline{1000\cdots 0}\qquad\qquad (n-1个0)\\
= &\overline{10a_na_{n-1}\cdots a_1} = (4n+1)'
\end{aligned}
$$

&emsp; **所以只要当 $f(2n+1) = (2n+1)'$ 且 $f(n) = n'$ 的时候，就有 $f(4n+1) = (4n+1)'$。**

---

&emsp; 最后是第三个递推式：$f(4n+3) = 3f(2n+1) - 2f(n)$。同样的我们设：
$$ n = \overline{a_1a_2a_3\cdots a_n} $$

&emsp; 于是我们有：
$$
2n = \overline{a_1a_2a_3\cdots a_n0}，2n+1 = \overline{a_1a_2a_3\cdots a_n1}\\
4n+3 =\overline{a_1a_2a_3\cdots a_n11}
$$
$$
2\times n' = \overline{a_na_{n-1}\cdots a_10} \\
(2n+1)' = \overline{1a_na_{n-1}\cdots a_1} ， (4n+3)' = \overline{11a_na_{n-1}\cdots a_1}
$$

&emsp; 然后我们可以得到：
$$
\begin{aligned}
3(2n+1)' - 2n' = &\overline{1a_na_{n-1}\cdots a_1} + \Big(\overline{1a_na_{n-1}\cdots a_1} + \overline{1a_na_{n-1}\cdots a_1}\Big) - \overline{a_na_{n-1}\cdots a_10}\\
= &\overline{1a_na_{n-1}\cdots a_1} + \Big(\overline{1a_na_{n-1}\cdots a_10} - \overline{a_na_{n-1}\cdots a_10}\Big)\\
= &\overline{1a_na_{n-1}\cdots a_1} + \overline{1000\cdots 0} \qquad \qquad \qquad （n+1个0）\\
= &\overline{11a_na_{n-1}\cdots a_1} = (4n+3)'
\end{aligned}
$$

&emsp; **所以只要 $f(2n+1)=(2n+1)'$ 且 $f(n) = n'$，那么就有 $f(4n+3)=(4n+3)'$。**

&emsp; 综上所述，经过数学归纳法归纳得到，对于任意一个 $n \geq 1$ 都有 $f(n) = n'$

&emsp; 证毕啦！


-------
## 剩下的内容

&emsp; 后面是这道题完整的题解。

&emsp; 知道了这个函数是完成二进制翻转之后，我们可以得出 $f(n) = n$ 当且仅当 $n = n'$ 即 n 的二进制串回文的。然后我们就可以用二进制的数位 DP 来解决这道题。具体的操作如下。

&emsp; 我们设 $g(i)$ 表示数字 i 的二进制的位数。现在我们就是要求出小于等于 m 的数中满足 $f(x) = x$ 的数的个数。那么我们可以把这个任务拆成两个子任务：
1. 对于所有的 $g(i) < g(m)$ 的数 i 中满足 $f(i) = i$ 的个数。
2. 对于所有的 $g(i) = g(m) 且 i \leq m$ 的数 i 中满足 $f(i) = i$ 的个数。

&emsp; 首先第一种，设数字 x 的位数为 $g(x) = n \; 且 \; n < g(m)$，则我们可以知道如果 i 是回文串的话，那么它的两段必定都是 1，像这样：$i = \overline{10\cdots01}$，那么我们只需要考虑中间的位数。要想让这个串是回文的，我们可以先把前半部分任意添上 0 和 1，然后后半部分把前半部分倒着抄一遍就行了。那么我们找的回文串的数量也就是前半部分的所有可能出现的数。

&emsp; 对于 n 为偶数的时候，前面就有 $\frac{n}{2}-1$ 个数位能够随意地填写 0 或 1，所以回文串的个数为：$2^{\frac{n}{2}-1}$。对于 n 为奇数的时候，同理得到回文串的个数为：$2^{\frac{x-1}{2}}$ 个。归纳一下，就是二进制长度为 $l$ 的数的回文数的个数也就是 $2^{\lfloor\frac{x-1}{2}\rfloor}$

&emsp; 所以所有的 $g(i) < g(m)$ 的数 i 中满足 $f(i) = i$ 的个数为：
$$ \sum_{i=1}^{p(m)-1}2^{\lfloor \frac{i-1}{2} \rfloor} $$

&emsp; 计算这个的时间复杂度是 $o(logm\cdot logm)$ 的，能过 $10^{100}$

&emsp;

&emsp; 然第二种情况，对于所有的 $g(i) = g(m) 且 i \leq m$ 的数 i 中满足 $f(i) = i$ 的个数。与前面同理，首位和末位肯定都是 1，所以我们只考虑中间。这里有一个很讨厌的地方就是我们找的时候要考虑不能超过数字 m。所以我们这样操作：首先找到数字 m 的第一个非首位 1，然后记录它的位数（设为 第 k 位）。如果我们把这一位设为 0 那么后面的所有位数不管怎样排列都不会超过 m，所以我们从这一位开始一直到中间任意取 0 或 1，就有 $2^{\lfloor \frac{p(m)-1}{2} \rfloor - k}$ 中取法。然后再加上如果第 k 为取 1 的时候的可能就好了。如果第 k 为取 1，那么参考前面的做法，找到第三个一的位数然后分两种情况，一是这一位取 1，二是这一位取 0。然后再继续递归下去，直到所有位数都取 0 为止。
{% endraw %}
