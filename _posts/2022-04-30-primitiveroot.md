---
layout: post
title: "阶和原根"
archive_title: "PrimitiveRoot"
section: "OI"
section_slug: "oi"
date: 2022-04-30
tags: ["Math", "NumberTheory"]
summary: "阶"
math: true
---
{% raw %}
# 阶和原根

## 阶

### 定义

&emsp; $m > 1, m \in Z, gcd(a, m) = 1, \exist r \in[1, m - 1]$ 使得 $a^{r} \equiv 1 \pmod m$，满足条件的 $r$ 中最小的一个就是 $a$ 模 $m$ 的阶


### 一些性质

&emsp; 因为 $gcd(a, m) = 1$ 所以 $a^0, a^1, a^2, \cdots, a^{m -1}$ 都与 $m$ 互质（这里有 $m$ 个数）。又因为：

$$
\begin{cases}
a^0 \mod m \\
a^1 \mod m \\
a^2 \mod m \\
\vdots \\
a^{m -1} \mod m
\end{cases}
$$

&emsp; 这些数一共有 $m - 1$ 种取值（因为都互质），所以一定 $\exist i \leq j \in [0, m - 1]$，使得 $a^i \equiv a^j \pmod m$ 也就是 $a^{i - j} \equiv 1 \pmod m$，所以 $r = i - j, r \in[1, m - 1]$，有了这个我们就可以在 $O(m\log m)$ 的时间内求出 $r$ 了。

&emsp; 根据原根的定义我们可以知道如果 $a^N \equiv 1 \pmod m$ 那么 $r &#124; N$。又因为欧拉定理长这样：

$$ a^{\varphi(m)} \equiv 1 \pmod m $$

&emsp; 所以我们又能知道一定有 $r &#124; \varphi(m)$。

&emsp; 除了这个根据 $a^N \equiv 1 \pmod m$ 那么 $r &#124; N$，我们还可以推出：

1. $\forall u, v \in Z, a^u \equiv a^v \pmod m$ 这个式子的充要条件是 $u \equiv v \pmod r$（很显然吧）。
2. $a^1, a^2, a^3, \cdots , a^r$ 模 $m$ 是以 $r$ 为周期且它们模 $r$ 互不相同（由上一个性质很容易看出来吧）

## 原根

### 定义

&emsp; $gcd(g, m) = 1, g$ 模 $m$ 的阶为 $\varphi(m)$，就称 $g$ 是模 $m$ 的一个原根 （其实就是 $g^{\varphi(m)} \equiv 1 \pmod m$）

### 一些性质

&emsp; 根据上面的定义我们知道：

$$ g^{\varphi(m)} \equiv 1 \pmod m $$

&emsp; 又因为 $r &#124; \varphi(m)$，所以 $r = \varphi(m)$。那么显然 $\{g^1, g^2, g^3, \cdots, g^{\varphi(m)} \}$ 就是一个简化剩余系。
{% endraw %}
