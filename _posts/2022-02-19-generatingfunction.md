---
layout: post
title: "生成函数"
archive_title: "生成函数"
date: 2022-02-19
tags: ["Math", "Sequence"]
summary: "定义"
math: true
---
{% raw %}
# 生成函数
## 定义
&emsp; 一般来说，对于有限数列
$$ a_0, a_1, a_2, \cdots a_n $$

&emsp; 多项式
$$ f(x) = \sum_{k = 0}^{n}a_kx^k = a_0 + a_1 x + a_2 x ^ 2 + \cdots + a_nx^n $$

&emsp; 称为数列 $\lbrace a_n \rbrace$ 的生成函数。例如：
$$ f(x) = (1 + x)^n = C_n^0 + C_n^1x +C_n^2 x^2 + \cdots + C_n^n x^n $$ 




&emsp; 就是数列：
$$ \lbrace C_n^0, C_n^1, C_n^2, \cdots C_n^n \rbrace $$

&emsp; 的生成函数。

&emsp; 更一般的，对于无穷数列：
$$ a_0, a_1,  a_2, \cdots a_n, \cdots $$

&emsp; 多项式：
$$ f(x) =  \sum_{n=0}^{\infty}a_nx^n = a_0 + a_1x + a_2 x^2 + \cdots $$

&emsp; 就是无穷数列 $\lbrace a_n \rbrace$ 的生成函数，这种生成函数也叫作形式幂级数。对于形式幂级数 $f(x) = \sum\limits_{n=0}^{\infty}a_nx^n$ 和 $g(x) = \sum\limits_{n=0}^{\infty} b_nx^n$ 来说，我们有：
$$
\begin{aligned}
& f(x) = g(x) \quad 当且仅当 \; \; a_n = b_n \;\; ,n = 0, 1, 2, \cdots \\
& f(x) \pm g(x) = \sum_{n=0}^{\infty} (a_n + b_n)x^n \\
& \alpha f(x) = \sum_{n=0}^{\infty} (\alpha a_n)x^n \quad (\alpha 为常数) \\
& f(x)g(x) = \sum_{n=0}^{\infty}c_nx^n，其中 \;\; c_k = \sum_{k=0}^{\infty} a_kb_{n-k}，n=0, 1, 2,\cdots
\end{aligned}
$$

## 一些公式
&emsp; 在利用生成函数解题的时候，需要用到以下一些公式：
$$ 
\begin{aligned}
& (a +b)^n = \sum_{i=0}^{n}C_n^ia^{n-i}b^i \\
& \frac{1}{1-x} = \sum_{n=0}^n x^n \\ 
& (1-x)^{-k} = \sum_{n = 0}^{\infty} C_{n+k-1}^{k-1}x^n
\end{aligned}
$$
&emsp; 注：第三个式子可以由第二个式子两边同时求 k - 1 阶导得到。

## 一个定理
&emsp; 设 $p(x)$，$q(x)$ 是关于 $x$ 的实多项式，且 $\deg p(x) < \deg q(x)$，多项式 $q(x)$ 有 $k$ 重实根 $\alpha$，即 $q(x) = (x-\alpha)^k q_1(x)，q_1(\alpha) \neq 0$。则实数 $\lambda$ 与多项式 $p_1(x)$，$\deg p_1(x) < \deg (x-\alpha)^{k-1}q_1(x)$，成立：
$$ \frac{p(x)}{q(x)} = \frac{\lambda}{(x - \alpha)^k}+\frac{p_1(x)}{(x-\alpha)^{k-1}q_1(x)} $$

&emsp; **证明:** 令 $\lambda = \frac{p(\alpha)}{q(\alpha)}$，则 $x = \alpha$ 是多项式 $p(x) - \lambda q_1(x)$ 的根，设：
$$ p(x) - \lambda q_1(x) = (x - \alpha)p_1(x) \rightarrow p(x) = \lambda q_1(x)+(x-\alpha)p_1(x) $$

&emsp; 就能得到：
$$ \frac{p(x)}{q(x)} = \frac{\lambda q_1(x)+(x-\alpha)p_1(x)}{(x-\alpha)^k q_1(x)} = \frac{\lambda}{(x - \alpha)^k}+\frac{p_1(x)}{(x-\alpha)^{k-1}q_1(x)} $$

&emsp; 证毕。

## 题(们)
1. 求下列数列的通项 $\lbrace a_n \rbrace$
&emsp; (1) $a_0 = 2，a_1 = 5，a_{n+2} = 3a_{n+1} - 2a_n，n=0, 1, 2, \cdots$
&emsp; (2) $a_0 = 4，a_1 = 3，a_{n+2} = a_{n+1} + 6a_n - 12，n=0, 1, 2, \cdots$

&emsp; (1)：

&emsp; 设原数列的生成函数为 $f(x)$：
$$
\begin{aligned}
f(x) & = a_0 + a_1x + \;\;\; a_2x^2 + \; a_3 x ^3  + \; a_4 x ^4 + \cdots \\
-3xf(x) & = \quad  -3a_0x - 3a_1x^2 - 3a_2x^3 - 3a_3 x^4 - \cdots \\
2x^2f(x) & = \qquad \qquad \ \;\;\;2a_0x^2 + 2a_1 x^3 + 2a_2 x^4 + \cdots
\end{aligned}
$$
&emsp; 三式相加得到：
$$ (1-3x+2x^2)f(x) = (a_0 + a_1x - 3a_0x) + (2a_0-3a_1+a_2)x^2 + (2a_0-3a_1+a_2)x^3  + \cdots$$

&emsp; 又因为 $a_{n+2} = 3a_{n+1} - 2a_n \rightarrow 2a_n - 3a_{n+1} + a_{n+2} = 0$，所以从 $x^2$ 项之后都是 0。所以：
$$ (1-3x+2x^2)f(x) = (a_0 + a_1x - 3a_0x) = (2+5x-6x) = 2-x $$

&emsp; 所以：
$$ f(x) = \frac{2-x}{1-3x+2x^2} $$

&emsp; 有根据上面那个定理，我们可以对这个式子进行拆分：
$$
\begin{aligned}
f(x) = & \frac{2-x}{1-3x+2x^2} = \frac{2-x}{(2x-1)(x-1)} = \frac{A}{(2x-1)} + \frac{B}{(x-1)}
\end{aligned}
$$

&emsp; 对于最后一个等号，我们将等式两边同时乘上 $(2x-1)(x-1)$，得到：
$$ 2-x = A(x-1) + B(2x-1) $$

&emsp; 令 $x = \frac 12$，得：
$$ 2 - \frac 12 = (\frac 12 - 1) A + (2\cdot\frac 12 -1)B \rightarrow A = -3 $$

&emsp; 令 $x = 1$，得：
$$ 2 - 1 = (1 - 1)A +(2 \cdot 1 - 1)B \rightarrow B = 1 $$

&emsp; 所以：
$$
\begin{aligned}
f(x) = &  \frac{A}{(2x-1)} + \frac{B}{(x-1)} \\
= & \frac{3}{1-2x}-\frac{1}{1-x} = 3\sum_{n=0}^{\infty}(2x)^n - \sum_{n=0}^{\infty}x^n = \sum_{n=0}^n (3\cdot 2^n - 1)x^n
\end{aligned}
$$

&emsp; 所以这个数列的通项就是：
$$ a_n = 3 \cdot 2^n - 1 $$

&emsp; (2)：

&emsp; 这原数列的生成函数为 $f(x)$：
$$
\begin{aligned}
6f(x) = & 6a_0 + 6a_1x + 6a_2x^2 + 6a_3x^3 + 6a_4x^4 + \cdots \\
xf(x) = & \quad \; \qquad a_0x + \; a_1x^2 + \;\; a_2x^3 + \;\; a_3 x^4 +\cdots \\
x^2f(x) = & \qquad \qquad \qquad \; a_0x^2 + \;\; a_1x^3 + \;\; a_2x^4 + \cdots \\
\frac{12}{1-x} = & 12 + \quad 12x + \; 12x^2 + \; 12x^3 + \;\; 12x^4 + \cdots
\end{aligned}
$$

&emsp; 与 (1) 同理，得：
$$
\begin{aligned}
& (1-x-6x^2)f(x) + \frac{12}{1-x} = 16 + 11x\\
& f(x) = \frac{11x+16 - \frac{12}{1-x}}{1-x-6x^2} = \frac{\frac{-11x^2-5x+4}{1-x}}{(1-3x)(1+2x)} = \frac{-11x^2-5x+4}{(1-x)(1-3x)(1+2x)}
\end{aligned}
$$

&emsp; 还是根据那个定理：
$$
f(x) = \frac{-11x^2-5x+4}{(1-x)(1-3x)(1+2x)} = \frac{A}{1-x} + \frac{B}{1-3x} + \frac{C}{1+2x}
$$

&emsp; 还是和 (1) 同理：$A = 2，B = C = 1$，所以：
$$
\begin{aligned}
f(x)  = & \frac{2}{1-x} + \frac{1}{1-3x} + \frac{1}{1+2x} \\
= & 2\sum_{n=0}^{\infty}x^n + \sum_{n=0}^{\infty}(3x)^n + \sum_{n=0}^{\infty}(-2x)^n = \sum_{n=0}^{\infty} [2 + 3^n + (-2)^n]x^n
\end{aligned}
$$

&emsp; 所以原数列的通项就是：
$$ a_n = 2 + 3^n + (-2)^n $$

-------
2. 证明： $\sum\limits_{k=0}^n (C_n^k)^2(1+x)^{2n-2k}(1-x)^{2k}$ 的展开式中 $x$ 的奇数次幂不出现。

&emsp; 我们可以构造一个式子：
$$ \left[ y + (1+x)^2 \right]^n\left[ y +(1-x)^2 \right]^n $$

&emsp; 使得这个式子的 $y^n$ 项前面的系数为：
$$ C_n^{n-k}[(1+x)^2]^{n-k} \cdot C_n^k[(1-x)^2]^k = (C_n^k)^2(1+x)^{2n-2k}(1-x)^{2k} $$

&emsp; 也就是原来的式子中求和里的项。我们现在考虑把我们构造出来的式子展开：
$$
\begin{aligned}
& \left[ y + (1+x)^2 \right]^n\left[ y +(1-x)^2 \right]^n \\
= & (y+1+x^2+2x)^n(y+1+x^2-2x)^n \\
= & [(y+1+x^2)^2 - 4x^2]^n
\end{aligned}
$$

&emsp; 很显然，这里面 $y_n$ 的系数中肯定没有 $x$ 的奇数次幂。所以原式在每个求和项中都没有 $x$ 的奇数次幂，所以原式没有 $x$ 的奇数次幂。

&emsp; 证毕。

---------
3. 证明：对一切正整数 $n$， $\sum\limits_{k=0}^{\left[\frac{n+1}{2}\right]} (-1)^k C_{n+1}^k C_{2n-2k-1}^n = \frac 12 n(n + 1)$

&emsp; 我们考虑 $(1+x)^{n+1}$ 中 $x^{n-1}$ 的系数：

&emsp; 一方面：$C_{n+1}^2 = \frac 12 n(n-1)$

&emsp; 另一方面：
$$(1+x)^{n+1} = \frac{(1-x^2)^{n+1}}{(1-x)^{n+1}} = \sum_{k=0}^{n+1}C_n^k(-x^2)^k\sum_{i=0}^{\infty}C_{i+n}^nx^i$$

&emsp; 在这个式子里面，前半部分，即 $\sum\limits_{k=0}^{n+1}C_n^k(-x^2)^k$ 对 $x^{n-1}$ 项的系数的贡献是 $2k$，要想凑出 $n-1$，那么后面的贡献就应该是 $n-2k-1$，也就是说后面的 $i = n-2k-1$ 的时候的值就是它的贡献。所以总贡献就是：
$$ \sum_{k=0}^{\left[\frac{n+1}{2}\right]}(-1)^kC_{n+1}^kC_{2n-2k-1}^n $$

&emsp; 所以：
$$ \sum_{k=0}^{\left[\frac{n+1}{2}\right]}(-1)^kC_{n+1}^kC_{2n-2k-1}^n = \frac 12 n (n-1) $$

&emsp; 证毕。
{% endraw %}
