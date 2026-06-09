---
layout: post
title: "拉格朗日插值"
archive_title: "Lagrange'sInterpolation"
section: "OI"
section_slug: "oi"
oi_category: "Math"
oi_category_slug: "math"
date: 2022-02-19
tags: ["Math", "NumberTheory"]
summary: "朴素的拉格朗日插值"
math: true
---
{% raw %}
# 拉格朗日插值

### 朴素的拉格朗日插值

&emsp; 插值就是有 $n$ 个已知的平面直角坐标系中的点，然后求出一个 $n-1$ 次多项式，这个多项式穿过这些点。

$$ \{ x \} : x_0, x_1, x_2, \cdots,  x_n \\ \{ y \} : y_0, y_1, y_2, \cdots,  y_n $$

&emsp; 然后我们要找到一个 $f(x)$ 穿过这些点。拉格朗日插值给出了一种显然的 $O(n^2)$ 的构造方法，也就是：

$$ f(x) = \sum_{k=0}^n \frac{\prod\limits_{i=0, i \neq k}^n (x-x_i)}{\prod\limits_{i=0, i \neq k}^n (x_k - x_i)}y_k $$

&emsp; 正确性非常显然qwq。

## 重心拉格朗日插值

&emsp; 我们观察一下上面的式子，我们发现我们每次求解一个 $f(x)$ 的时间复杂度就是 $O(n^2)$，但是我们如果要求出这个 $n$ 次多项式的各个项的系数的话那么时间复杂度就上升到了 $O(n^3)$。这个时间复杂度就和普通的高斯消元没有区别了。所以，我们要考虑如何优化朴素的拉格朗日插值，这时候就要引出重心拉格朗日插值了。

### 第一个小小的优化

&emsp; 首先我们来看看这个朴素法的式子：

$$ f(k) = \sum_{i=0}^n y_i \prod_{j = 0,j \neq i}^n \frac{k - x_j}{x_i - x_j} $$

&emsp; 我们 ~~很难~~ 发现在 $x$ 的取值是连续（也就是说我们知道 $(1, f(1)), (2, f(2)), (3, f(3)), \cdots$ 的时候）的时候有一种优化时间复杂度的方法。在这种情况下显然有 $x_i = 1, x_j = j$。所以这个式子就可以变成这样：

$$ f(k) = \sum_{i = 0}^ny_i \prod_{j = 0, j \neq i}^n \frac{k - j}{i - j} $$

&emsp; 这样之后我们就可以用一些简单的预处理来做到 $O(n)$ 预处理 $O(1)$ 查询 $\prod\limits_{j=0, j\neq i}^n \frac{k-j}{i-j}$ 这一坨东西。具体可以这样：我破门预处理

$$
\begin{aligned}
& pre_i = \prod_{j=0}^i (k-j) \\
& suf_i = \prod_{j = i}^n (k-j) \\
& fac_i = \prod_{p=1}^i p = i!
\end{aligned}
$$

&emsp; 之后我们就有：

$$ \prod_{j = 0, j \neq i}^n \frac{k-j}{i-j} = \frac{pre_{i-1} \times suf_{i+1}}{fac_{i} \times fac_{n-i} \times (-1)^{n-i}} $$

&emsp; 那么整个式子就变成了：

$$ f(k)  = \sum_{i=0}^n y_i \frac{pre_{i-1} \times suf_{i+1}}{fac_{i} \times fac_{n-i} \times (-1)^{n-i}} $$

&emsp; 这样之后我们就可以在 $O(n)$ 的时间内算出某一个具体的 $f(a)$。但是要知道这个表达式各项的系数还是需要 $O(n^3)$ 的时间才能算出来。

### 正题：重心拉格朗日插值

&emsp; 重心拉格朗日插值能做到比上面的 $O(n^3)$ 快很多的求出一个式子的表达式各项系数，而且还能做到让你新添加一个点然后快速算出新的多项式的表达式，这比前面的东西都要优秀。现在我们来看看这是怎么做到的。

&emsp; 首先我们发现了一件事，就是说在 $\prod\limits_{j=0, j \neq i}^n\frac{k - x_j}{x_i - x_j}$ 这一坨式子里面每个分子都是 $k - x_j$ 然后呢我们就这样：

&emsp; 令：

$$ g(k) = \prod_{i=0}^n (k - x_i) $$

&emsp; 然后：

$$ f(k) = g(k) \sum_{i = 0}^n \frac{y_i}{k - x_i} \prod_{j=0, j\neq i}^n \frac{1}{x_i - x_j} $$

&emsp; 再令：

$$ t_i = \prod_{j = 0, j \neq i}^n \frac{1}{x_i - x_j} $$

&emsp; 那么：

$$ f(k) = g(k)\sum_{i=0}^n \frac{y_it_i}{k-x_i} $$

&emsp; 可以很明显的看出，如果我们多家进去一个点 $(x_{n+1}, y_{n+1})$，我们只需要将每一个 $t_i$ 都除以一个 $x_i - x_{n+1}$，这样就可以 $O(n)$ 的得到新的 $\sum\limits_{i=0}^n\frac{y_it_i}{k - x_i}$。然后再与新的 $g(k)$ 乘起来就得到了新的多项式。总的时间复杂度就是 $O(n)$，非常的快。
{% endraw %}
