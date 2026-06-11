---
layout: post
title: "数论函数"
archive_title: "数论函数"
section: "OI"
section_slug: "oi"
oi_category: "Math"
oi_category_slug: "math"
date: 2021-11-05
tags: ["Math", "NumberTheory"]
summary: "定义在整数域上的实值或复值函数叫做数论函数"
math: true
---
{% raw %}
## 数论函数
&emsp; 定义在整数域上的实值或复值函数叫做数论函数

## 积性函数
&emsp; 一个数论函数如果满足 $gcd(p, q) = 1$（也就是 p, q 互质）的时候有 $f(pq) = f(p)f(q)$，那么这个函数叫做积性函数。

&emsp; 几个是积性函数的例子：


$$
\begin{aligned}
& I(n) = 1 \qquad \qquad 不变的函数 \\
& id(n) = n \qquad \qquad 单位函数 \\
& I_k(n) =n^k \qquad \qquad 幂函数 \\
& \varepsilon(n) = [n = 1] = \begin{cases} 1 \quad (n = 1) \\ 0 \quad otherwise \end{cases} \qquad 原函数
\end{aligned}
$$



### 除数函数
&emsp; 这是几个很显然是积性函数的例子，还有一些数论函数是积性的就不是那么显然了。比如这个：



$$
\sigma_k(n) = \sum_{d \mid n}d^k
$$



&emsp; 我们现在来证明一下这个函数是积性函数：我们首先考虑把这个 n 分解质因数：$n = \prod\limits\_{i=1}^r p\_i^{\alpha\_i}$，然后我们再考虑将每个 n 的因数分解质因数：$d = \prod\limits\_{i=1}^r p\_i^{\beta\_i}$，很显然 $\beta \in [0, \alpha]$。要不然 d 就不是 n 的因数了。

&emsp; 观察上面的函数表达式我们可以知道，每个质数对函数值的贡献是独立的，并且它们的贡献是用乘积来表达。我们在上面又知道每一个 $\beta\_i \in [0, \alpha\_i]$ 所以 $\beta\_i$ 可能的取值就有 $\alpha\_i + 1$ 个。那么所有 $\beta$ 贡献的乘积就是：



$$
(\alpha_1 + 1)(\alpha_2 + 1)\cdots(\alpha_r + 1) = \prod_{i = 1}^r (\alpha_i + 1)
$$



&emsp; 大家可以发现这个式子其实就等于 $\sigma\_0(n)$ 也就是所有因数的个数。很显然我们就证出了，$\sigma\_0(n)$ 是积性的（因为所有质因子贡献独立且是乘积形式）。而对于其他的 k 来说道理也是一样的，只不过对于每一项的 $(\alpha\_i + 1)$ 应该写成另一种形式。比如对于 $\sigma\_1(n)$ 来说，他计算的是 n 的所有因数的和（因为 $\sigma\_1(n) = \sum\limits\_{d\mid n}d^1 = \sum\limits\_{d\mid n}d$）。又因为我们上面的推导，我们知道一个质因子的贡献就是 $\sum\limits\_{i=0}^{\alpha\_i}p\_k^i$（应该很好理解吧 qwq）。然后我们把所有的这玩意儿乘起来就得到了 $\sigma\_1(n)$：



$$
\sigma_1(n) = \prod_{i=1}^r \sum_{j=0}^{\alpha_i}p_i^j
$$



&emsp; 显然这玩意儿也是积性的了。而对于更大的 $k$ 来说，我们也可以写成这样：



$$
\sigma_k(n) = \prod_{i=1}^r \sum_{j = 0}^{\alpha_i}\left(p_i^j\right)^k = \prod_{i=1}^r \sum_{j = 0}^{\alpha_i}p_i^{jk}
$$



&emsp; ~~这个东西应该也很显然吧(逃)~~ 所以 $\sigma\_k(n)$ 都是积性函数。

### 欧拉函数
&emsp; 还有一个积性函数的例子就是欧拉函数了。它的定义式长这样：



$$
\varphi(n) = \sum_{i=1}^{n}[gcd(i, n) = 1]
$$



&emsp; 它表达的意思就是小于等于 n 的数中与 n 互质的数的个数，这玩意儿也是一个积性函数，神不神奇qwq。因为在我的另一篇文章里面也写了一些关于这个函数的一些性质，这里我就直接把那边的内容搬过来吗，然后再添加一些其它的东西。

&emsp; 现在我们来证明欧拉函数是一个积性函数，首先我们看这样一个引理：

&emsp; **在算术基本定理中 $n = p\_1^{c\_1} \times p\_2^{c\_2} \times \cdots \times p\_m^{c\_m}$则**：


$$
\varphi(N) = N \times \frac{p_1-1}{p_1} \times \frac{p_2-1}{p_2} \times \cdots \times \frac{p_m-1}{p_m} = N \times \prod_{质数p \mid n}(1-\frac{1}{p})
$$


&emsp;证明：

&emsp; 要求出 $\varphi(N)$，我们只需求出所有与 N 不互质的数的个数，用总数减去它就好了，而与 N 不互质的数一定是 N 的质因数的 k 倍 （$k\in Z$）。所以我们只需要找出 N 的所有质因数及其小于 N 的所有倍数的和就好了。

&emsp; 首先假设 p 是 N 的一个质因数，则 p 的小于 N 的倍数就能表示为：


$$
p,\; 2p,\; 3p,\; \cdots \; (\frac{N}{p} ) \times p
$$



&emsp; 很容易看出，这个序列一共有 $\frac{N}{p}$ 个数。同理，我们可以说明另一个 N 的质因数 q 的小于 N  的倍数的总数是 $\frac{N}{q}$ 个。但是，我们发现这些数 中是有重合的部分的。下面这个序列的数就被算了两次：


$$
pq, \; 2pq, \; 3pq, \; \cdots, \; \frac{N}{pq}\times pq
$$



&emsp; 这共 $\frac{N}{pq}$ 个数应该被加回来一次。所以我们得到了1 ~ N 中不与， N 含有共同质因子 p, q 的数的个数为:


$$
N-\frac{N}{p} - \frac{N}{q} + \frac{N}{pq} = N\times (1 - \frac{1}{p} - \frac{1}{q} + \frac{1}{pq}) = N(1-\frac{1}{p})(1-\frac{1}{q})
$$



&emsp; 设 $n=n\prod p\_i^{k\_i}$

&emsp; 以此类推，我们就可以得到 $\varphi(n) = \prod\limits\_{p\mid N}(1-\frac{1}{p})$。

&emsp; 然后根据这个计算式，对 两个互质的数 a， b 分解质因数，就直接可以证明欧拉函数是积性函数：



$$
\begin{aligned}
& a = \prod_{i = 1}^{r_1}p_i^{\alpha_i} \qquad b = \prod_{i = 1}^{r_2}q_i^{\beta_i} \\
& \varphi(a) = a\prod_{p \mid a}\left(1-\frac 1p\right) \quad \varphi(b) = b\prod_{q \mid b}\left(1-\frac 1q\right) \\
& ab = \left( \prod_{i = 1}^{r_1}p_i^{\alpha_i} \right) \left( \prod_{i = 1}^{r_2}q_i^{\beta_i} \right) = \prod_{i =1}^{r_3}z_i^{\gamma_i} \\
& \varphi(ab) = ab\prod_{z \mid ab}\left( 1 - \frac1z \right) = a\prod_{p \mid a}\left( 1 - \frac 1p \right) b \prod_{q \mid b}\left( 1 - \frac 1q \right) = \varphi(a)\varphi(b)
\end{aligned}
$$



&emsp; 注：最后倒数第二个等式成立因为 a, b 互质。

### 莫比乌斯函数
&emsp; 又是一个积性函数，定义式是这样的：


$$
\mu(n) =
\begin{cases}
1，\qquad \qquad n = 1 \\
(-1)^k \qquad \quad 当 n = \prod_{i=1}^{k}p_i，p_i 是互不相同的质数时 \\
0，\qquad \qquad 当 n 质因数分解时分解出的质因子的次数大于一时
\end{cases}
$$


&emsp; 显然是积性的，不想证明 qwq。

## 狄利克雷卷积


$$
h(n) = \sum_{d \mid n}f(d)g\left( \frac nd \right)
$$



&emsp; 如果读者有生成函数的 "前置芝士" 的话就很好理解这个玩意儿了 （逃）。如果不理解的话，帮你们百度一下：[狄利克雷卷积](https://baike.baidu.com/item/%E7%8B%84%E5%88%A9%E5%85%8B%E9%9B%B7%E4%B9%98%E7%A7%AF/18903903)

### 几个积性函数互相卷
&emsp; 下面我们用 * 来表示两个函数的狄利克雷卷积。首先写两个很好懂的卷积：


$$
\begin{aligned}
& I * I = \sum_{d \mid n} 1 = \sigma_0(n) \\ 
& I * id = \sum_{d \mid n} d = \sigma_1(n) \\
\end{aligned}
$$


&emsp; 然后还有几个比较难懂的（其实也挺好懂的qwq）。


$$
\begin{aligned}
& \varepsilon * f = f \\
& \mu * id = \varphi \\
& I * \varphi = id = n \\
\end{aligned}
$$



&emsp; 我们先假设这几个是对的，那我们就很自然地能推导出莫比乌斯反演也就是这样：


$$
\begin{aligned}
\mu * id = \varphi \rightarrow I * \mu * id = I * \varphi = id  \rightarrow I * \mu = \varepsilon
\end{aligned}
$$


&emsp; 也就是$\mu$ 是 $I$ 的逆，即 $\mu = I^{-1}$。

&emsp; 所以我们就能知道如果有一个函数 $f$，它满足：


$$
f * I = g
$$



&emsp; 那就有：


$$
g * \mu = f
$$



&emsp; 这也就是莫比乌斯反演了。那如果我们证明了前面那几个神奇的互卷的函数表达式是对的，那我们也就证明了莫比乌斯反演的正确性。

### 证明：
#### $\varepsilon \* f = f$
&emsp; 首先我们看看第一个卷积 $\varepsilon \* f = f$。我们来证明这个玩意儿，根据定义：


$$
\begin{aligned}
\varepsilon(n) * f(n) = & \sum_{d \mid n}f(d)\varepsilon\left( \frac nd \right) \\
 = & \sum_{d \mid n}f(d) \left[\frac nd = 1 \right]
\end{aligned}
$$



&emsp; 显然后面那个表达式只有在 $d = n$ 的时候有值且为 1。所以显然就有：


$$
\sum_{d \mid n}f(d) \left[\frac nd = 1 \right] = \sum_{d \mid n}f(d)[n=d] = f(n) \rightarrow \varepsilon * f = f
$$



#### $\varphi \* I = id = n$
&emsp; 然后再看第三个卷 $I \* \varphi = id$，我们来证明一下这玩意儿为什么是正确的的。首先还是根据狄利克雷卷积的定义式：


$$
\begin{aligned}
\varphi(n) * I(n) = & \sum_{d \mid n}\varphi(d)I\left( \frac nd \right) \\
= & \sum_{d \mid n}\varphi(d)
\end{aligned}
$$



&emsp; 但是我们看到这里应该还是不知道该怎么证这个东西的，这里我们给出一个比较神奇的证明方法，首先我们来看分母为 18 的所有分数（别问我为什么要看，先看下去再说qwq），我们把它们列出来是这样的：



$$
\begin{aligned}
& \frac {1}{18}, \frac{2}{18}, \frac{3}{18}, \frac{4}{18},  \frac{5}{18}, \frac{6}{18}\\ \\
& \frac{7}{18}, \frac{8}{18}, \frac{9}{18}, \frac{10}{18}, \frac{11}{18}, \frac{12}{18}\\ \\ 
& \frac{13}{18}, \frac{14}{18}, \frac{15}{18}, \frac{16}{18}, \frac{17}{18}, \frac{18}{18}
\end{aligned}
$$




&emsp; 我们把他们能约分的约分一下：


$$
\begin{aligned}
& \frac {1}{18}, \frac{1}{9}, \frac{1}{6}, \frac{2}{9},  \frac{5}{18}, \frac{1}{3}\\ \\
& \frac{7}{18}, \frac{2}{9}, \frac{1}{2}, \frac{5}{9}, \frac{11}{18}, \frac{2}{3}\\ \\ 
& \frac{13}{18}, \frac{7}{9}, \frac{5}{6}, \frac{8}{9}, \frac{17}{18}, \frac{1}{1}
\end{aligned}
$$



&emsp; ~~然后我们会发现上面那个玩意儿显然成立qwq。~~ 因为分数已经被化成最简了，所以 $gcd(分子, 分母) = 1$ 显然成立，所以在这里面分母为 i 的数的个数显然是 $\varphi(i)$ 个。而且所有的这里面存在的所有分母都肯定是 18 的约数，而且所有 18 的约数都出现过（挺显然的对吧）。所以这里面的分数的个数就可以写成：


$$
\varphi(1) + \varphi(2) + \varphi(3) + \varphi(6) + \varphi(9) + \varphi(18)
$$



&emsp; 很显然，这个式子就是：


$$
\varphi(1) + \varphi(2) + \varphi(3) + \varphi(6) + \varphi(9) + \varphi(18) = \sum_{d\mid 18}\varphi(i)
$$



&emsp; 而且显然这里的分数的个数是 18 个也就是说：


$$
\sum_{d \mid 18} \varphi(18) = 18
$$



&emsp; 我们对所有的数都进行同样的操作，运用归纳法，就证明完毕了qwq。

#### $\mu \* id = \varphi$
&emsp; 现在终于到最后一个式子了，还是根据定义：


$$
\mu(n) * id(n) = \sum_{d \mid n}\mu(d)\frac nd
$$



&emsp; 很好，根据这个式子还是看不出来怎么证。所以我们还是考虑一种神奇证法。我很考虑一种利用容斥原理计算 $\varphi(n)$ 的方法。我们已 $\varphi(60)$ 为例：

&emsp; 具体来说，$60 = 2^2 \times 3 \times 5$，然后我们要计算的是与 60 除了 1 没有公因数的数的个数，那么我们就可以用与 60 有 1 个质因数的数的个数减去与 60 有 2 个不同的质因数的数的个数再加上与 60 有 3 个不同质因数的数的个数。更具体地说，就是总数 60 减去 60 以内 2 的倍数 30 个 减去 60 以内 3 的倍数 20 个 再减去 60 以内 5 的倍数 12 个。再加上 60 以内 6 的倍数 10 个，加上 60 以内 10 的倍数 6 个。最后再减去 60 以内 30 的倍数的个数 2 个，也就是下面这个式子：


$$
\varphi(60) = 60 - 30 - 20 - 12 + 10 + 6 + 4 - 2 = 16
$$



&emsp; 这个式子又可以写成这样：



$$
\begin{aligned}
&\varphi(60) \\
= & 60 - 30 - 20 - 12 + 10 + 6 + 4 - 2 \\
= & \frac {60}{1} \times (-1)^0 + \left( \frac{60}{2} + \frac{60}{3} + \frac{60}{5} \right) \times (-1)^1 + \left( \frac{60}{2\times3} + \frac{60}{2\times5} + \frac{60}{3\times5} \right) \times (-1)^2 + \frac{60}{2 \times 3 \times 5} \times (-1)^3 \\
= & \sum_{d \mid 60}\mu(d)\left(\frac nd\right)
\end{aligned}
$$



&emsp; 我们对每个数也可以做同样的操作，所以我们就证完了。
{% endraw %}
