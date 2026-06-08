---
layout: post
title: "一、互质与欧拉函数"
date: 2021-11-03
tags: ["Math", "NumberTheory"]
summary: "互质："
math: true
---
{% raw %}
# 一、互质与欧拉函数
#### 互质：
&emsp; $\forall a, b \in N$，如果 gcd(a, b) = 1，则称 a, b 互质。

&emsp; 对于三个或以上的数，我们把 gcd(a, b, c) = 1 的情况称为 a, b, c 互质。把 gcd(a, b) = gcd(a, c) = gcd(b, c) = 1 的情况称为 a, b, c 两两互质。

#### 欧拉函数：
&emsp; 1 ~ N 中的与 N 互质的整数的个数叫做欧拉函数 记做 $\varphi(N)$。

&emsp; 在算术基本定理中 $n = p_1^{c_1} \times p_2^{c_2} \times \cdots \times p_m^{c_m}$则：
$$ \varphi(N) = N \times \frac{p_1-1}{p_1} \times \frac{p_2-1}{p_2} \times \cdots \times \frac{p_m-1}{p_m} = N \times \prod_{质数p \mid n}(1-\frac{1}{p}) $$

&emsp;证明：

&emsp; 要求出 $\varphi(N)$，我们只需求出所有与 N 不互质的数的个数，用总数减去它就好了，而与 N 不互质的数一定是 N 的质因数的 k 倍 （$k\in Z$）。所以我们只需要找出 N 的所有质因数及其小于 N 的所有倍数的和就好了。

&emsp; 首先假设 p 是 N 的一个质因数，则 p 的小于 N 的倍数就能表示为：
$$ p,\; 2p,\; 3p,\; \cdots \; (\frac{N}{p} ) \times p $$

&emsp; 很容易看出，这个序列一共有 $\frac{N}{p}$ 个数。同理，我们可以说明另一个 N 的质因数 q 的小于 N  的倍数的总数是 $\frac{N}{q}$ 个。但是，我们发现这些数 中是有重合的部分的。下面这个序列的数就被算了两次：
$$ pq, \; 2pq, \; 3pq, \; \cdots, \; \frac{N}{pq}\times pq $$

&emsp; 这共 $\frac{N}{pq}$ 个数应该被加回来一次。所以我们得到了1 ~ N 中不与， N 含有共同质因子 p, q 的数的个数为:
$$ N-\frac{N}{p} - \frac{N}{q} + \frac{N}{pq} = N\times (1 - \frac{1}{p} - \frac{1}{q} + \frac{1}{pq}) = N(1-\frac{1}{p})(1-\frac{1}{q}) $$

&emsp; 设 $n=\prod p_i^{k_i}$

&emsp; 以此类推，我们就可以得到 $\varphi(n) = \prod_{p\mid N}(1-\frac{1}{p})$。

-----

# 二、同余类与剩余系

&emsp; 对于 $\forall a \in [0, m-1]$，与 a 模 m 同余的集合可以表示成这样：$\lbrace x\mid x = km + a, \; k \in Z \rbrace$。我们称这个集合为模 m 的一个**同余类**。记为 $\bar{a}$

&emsp; 模 m 的同余类一共有 m 个，他们分别是 $\bar{0}, \; \bar{1}, \; \bar{2}, \; \cdots , \; \overline{m-1}$。它们一起构成了模 m 的**完全剩余系**。

&emsp; 1 ~ m 中与 m 互质的数代表的同余类共有 $\varphi(m)$ 个，他们构成了 m 的**简化剩余系**。

&emsp; 简化剩余系有一个重要的性质，就是它对于模 m 乘法封闭。这是因为我们取 $\forall a, b \in [1, m]$ 且 gcd(a, m) = gcd(b, m) = 1。则 ab 不可能与 m 含有相同的质因子，因为 ab 除了 a 和 b 没有其他的质因子了。所以 ab 也和 m 互质。也就是说 ab mod m 也属于简化剩余系。

-----

# 三、费马小定理与欧拉定理：

### 费马小定理
&emsp; 如果 p 是质数，则对于任意整数 a，都有 $a^p \equiv a \pmod p$

### 欧拉定理

&emsp; 若正整数 a, n 互质，则 $a^{\varphi(n)} \equiv 1 \pmod n$ 其中 $\varphi(n)$ 为欧拉函数。

&emsp; 证明：

&emsp; 假设 n 的简化剩余系为 $\lbrace \overline{X_1}, \overline{X_2}, \overline{X_3}, \cdots, \overline{X_{\varphi(n)}} \rbrace$。我们可以证明$\lbrace \overline{aX_1}, \overline{Xa_2}, \overline{aX_3}, \cdots, \overline{aX_{\varphi(n)}} \rbrace$也是 n 的简化剩余系。

&emsp; 反证法，对于 $\forall X_i, X_j$，如果 
$$aX_i \equiv aX_j \pmod n$$

&emsp;则 
$$a(X_i-X_j) \equiv 0 \pmod n$$

&emsp;就是
$$(a \mod n \times (X_i-X_j)\mod n)\mod n = 0$$

&emsp;又因为我们知道 a 与 n 互质，所以 $a\mod n$ 不为0，所以只能是 
$$X_i-X_j \equiv 0 \pmod n$$

&emsp;也就是 
$$X_i \equiv X_j \pmod n$$

&emsp;又因为$X_i$ 和 $X_j$ 在简化剩余系中所以 $X_i \equiv X_j \pmod n$只要在 $X_i \neq X_j$时必定不成立。

&emsp;也就是说这也就说明了当 $X_i \neq X_j$时 一定有 
$$aX_i \mod n \neq aX_j \mod n$$

所以$aX_i$ 和 $aX_j$ 可以作为两个不同的同余类的代表。

&emsp; 又因为我们在上面讲过，简化剩余系对于模 n 乘法封闭，所以 $\overline{aX_i}$也在简化剩余系当中。所以$\lbrace \overline{X_1}, \overline{X_2}, \overline{X_3}, \cdots, \overline{X_{\varphi(n)}} \rbrace$ 和 $\lbrace \overline{aX_1}, \overline{Xa_2}, \overline{aX_3}, \cdots, \overline{aX_{\varphi(n)}} \rbrace$都是 n 的简化剩余系。

&emsp; 综上所述：
$$ a^{\varphi(n)}a_1a_2\cdots a_{\varphi(n)} \equiv (aa_1)(aa_2)\cdots (aa_{\varphi(n)}) \equiv a_1a_2\cdots a_{\varphi(n)} \pmod n $$

&emsp; 因此我们得到了：
$$ a^{\varphi(n)} \equiv 1\pmod n $$

&emsp; 欧拉定理证完了之后我们就可以发现费马小定理其实是欧拉定理的一个特殊情况，当 n 为质数时（后面用 p 表示），$\varphi(p) = p-1$，所以我们得到：
$$ a^{\varphi(p)} \equiv a^{p-1} \equiv 1 \pmod p $$

&emsp; 两边同时乘上 a，得到了：
$$ a^p \equiv a \pmod p $$

&emsp; *证毕*

----

参考资料：《算法竞赛进阶指南》和  [另一个欧拉定理的证明：https://blog.csdn.net/ymzqwq/article/details/96269772](https://blog.csdn.net/ymzqwq/article/details/96269772)
{% endraw %}
