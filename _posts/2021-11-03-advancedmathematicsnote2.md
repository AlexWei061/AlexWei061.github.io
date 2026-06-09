---
layout: post
title: "微分"
archive_title: "微分"
section: "OI"
section_slug: "oi"
date: 2021-11-03
tags: ["Math", "caculus"]
summary: "定义"
math: true
---
{% raw %}
# 微分
## 定义
&emsp; 设函数 $y = f(x)$ 在 x 的领域内有定义， 如果函数的增量 $\Delta y = y(x + \Delta x) - f(x)$  可以表示为：
$$ \Delta y = A \Delta x + \omicron(\Delta x) $$

&emsp; 那么称函数 $f(x)$ 在 $x$ 处可微。且 $A\Delta x$ 称为函数在点 $x$ 相应于因变量增量的微分，记做 $dy$，即 $dy = A \Delta x$。

&emsp; 通常把自变量 $x$ 的增量 $\Delta x$ 称为自变量的微分，记作 $dx$，即 $dx = \Delta x$。于是函数 $y = f(x)$ 的微分又可记作 $dy = f'(x)dx$。函数因变量的微分与自变量的微分之商等于该函数的导数。因此，导数也叫做微商。

## 运算
$$ dy = f'(x)dx $$

----------
# 不定积分
## 定义
&emsp; 设函数 $f$ 和 $F$ 在区间 $I$ 上都有定义，若
$$ F'(x) = f(x) \qquad x \in I $$

&emsp; 则称 $F$ 为 $f$ 的**原函数**

&emsp; 现在已知 $F$ 是 $f$ 的原函数，函数 $f$ 在区间 $I$ 上的全体原函数被称为 $f$ 在 $I$ 上的不定积分，记为：
$$ \int f(x)dx $$

&emsp; 其中 $\int$ 被称为积分符号，$f(x)$ 为被积函数， $f(x)dx$ 为被积表达式，$x$ 为积分变量。根据上面的定义，我们有：

$$ \int f(x)dx = F(x) +C $$
$$ \left[\int f(x)dx\right] = f(x) $$

## 一些常见的积分
$$
\begin{aligned}
& \int 0dx = C \\ 
& \int 1dx = x + C \\ 
& \int x^adx = \frac{x^{a+1}}{a+1} + C (a \neq -1, x > 0)\\
& \int \frac 1 x dx = \ln \mid x \mid + C (x \neq 0)\\
& \int e^x = e^x + C\\
& \int a^x dx = \frac{a^x}{\ln a} + C (a > 0, a \neq 1)\\
& \int \cos ax dx = \frac 1 a \sin ax +C(a \neq 0)\\
& \int \sin ax dx = -\frac 1 a \cos ax + C (a \neq 0) \\
& \int \frac 1{\cos^2 x}dx = \tan x + C \\
& \int \frac 1{\sin^2 x}dx = -\cot x + C \\
& \int \frac{\tan x}{\cos x}dx = \frac{1}{\cos x} + C \\
& \int \frac{\cot x}{\sin x}dx = -\frac{1}{\sin x} +C \\ 
& \int \frac{dx}{\sqrt{1-x^2}} = \arcsin x + C = -\arccos x + C\\
& \int \frac{dx}{1 +x^2} = \arctan x + C = -arccot x + C
\end{aligned}
$$

## 线性运算法则
$$
\begin{aligned}
\int \left[ k_1 f(x) + k_2 g(x) \right]dx = k_1\int f(x)dx + k_2 \int g(x)dx
\end{aligned}
$$

### 题(们)
1.
$$
\begin{aligned}
\int (1 - x + x^3 - \frac 1{\sqrt[3]{x^2}})dx = 0 - \frac12x^2 + \frac 14x^4 - 3\sqrt[3]x + C
\end{aligned}
$$

2.
$$
\begin{aligned}
\int (x - \frac 1 {\sqrt{x}})^2dx = \int (x^2 - 2x^{\frac 12} + x ^{-1})dx = \frac{x^2}3 + \frac 43 x^{\frac 32} + \ln x + C
\end{aligned}
$$

3.
$$
\begin{aligned}
\int \sin^2 x dx = & \frac 12 \int 2\sin^2 xdx = \frac 12\int (1-cos2x)dx \\
 = & \frac 12 (x - \frac{\sin 2x}{2}) + C
\end{aligned}
$$

4.
$$
\begin{aligned}
\int \frac{\cos 2x}{\cos x - \sin x}dx = & \int \frac{\cos^2 x - \sin^2 x}{\cos x - \sin x}dx\\
= & \int \frac{(\cos x + \sin x)(\cos x - \sin x)}{\cos x - \sin x}dx = \int (\cos x +\sin x)dx\\
= & \sin x - \cos x + C
\end{aligned}
$$

5.
$$
\begin{aligned}
\int \frac{\cos 2x}{\cos^2 x \cdot \sin^2 x}dx = & \int \frac{\cos^2 x - \sin^2 x}{\cos^2 x \cdot \sin^2x}dx\\
= & \int \left( \frac{1}{\sin^2 x} - \frac{1}{\cos^2 x} \right)dx \\
= & -\cot x - \tan x + C
\end{aligned}
$$

## 换元积分
&emsp; 设 $g(u)$ 在 $[\alpha, \beta]$ 上有定义，$u = \varphi(x)$ 在 $[a, b]$ 上可导，且 $\alpha \leq \varphi(x) \leq \beta$，$x \in [a, b]$，并记：

$$ f(x) = g(\varphi(x))\varphi'(x)，x \in [a, b] $$

1. 如果 $g(u)$ 在 $[\alpha, \beta]$ 上存在原函数 $G(u)$，则 $f(x)$ 在 $[a, b]$ 上也存在原函数 $F(x)$，$F(x) = G(\varphi(x)) + C$，即：
$$ \int f(x)dx = \int g(\varphi(x))\varphi'(x)dx = \int g(u)du = G(u) + C = G(\varphi(x)) + C $$

2. 如果 $\varphi(x) \neq 0$，$x \in [a, b]$，则上述命题可逆。即当 $f(x)$ 在 $[a, b]$ 上存在原函数 $F(x)$ 时，$g(u)$ 在 $[\alpha, \beta]$ 上也存在原函数 $G(u)$，且 $G(u) = F(\varphi^{-1}(u)) + C$，即：
$$ \int g(u)du = \int g(\varphi(x))\varphi'(x) = \int f(x)dx = F(x) + C = F(\varphi^{-1}(u)) + C $$

&emsp; 证明：复合函数求导法则：
$$ \frac d{dx}G(\varphi(x)) = G'(\varphi(x))\varphi'(x) = g(\varphi(x))\varphi'(x) = f(x) $$
&emsp; 所以 $f(x)$ 以 $G(\varphi(x))$ 为其原函数，第一条成立。

&emsp; 在 $\varphi'(x) \neq 0$ 的时候，$u = \varphi(x)$ 存在反函数 $x = \varphi^{-1}(u)$，且：
$$ \frac{dx}{du} = \frac{1}{\varphi'(x)}\bigg|_{x = \varphi^{-1}(u)} $$
&emsp; 于是：
$$
\begin{aligned}
\frac{d}{du}F(\varphi^{-1}(u)) = &F'(x) \cdot \frac{1}{\varphi'(x)} = f(x) \cdot \frac{1}{\varphi'(x)} \\
= & g(\varphi(x))\varphi'(x) \cdot \frac{1}{\varphi'(x)}\\
= & g(\varphi(x)) = g(u)
\end{aligned}
$$
&emsp; 所以第二条成立。
&emsp; 证毕。

 ### 题(们)
 1.
$$
\begin{aligned}
\int \tan x dx = & \int \frac{\sin x}{\cos x}dx = -\int \frac 1{\cos x}d(\cos x) = -\ln \mid \cos x \mid + C
\end{aligned}
$$

2.
$$ \int \cos (3x+4)dx = \frac 13 \int \cos (3x+4)d(3x+4) = \frac 13 \sin(3x+4) + C $$

3.
$$
\begin{aligned}
\int xe^{2x^2}dx = & \frac 14\int e^{2x^2}4xdx = \frac 14 \int e^{2x^2}d(2x^2) = \frac 14 e^{2x^2} + C
\end{aligned}
$$

4.
$$
\begin{aligned}
\int 2^{2x+3}dx = \frac 12\int 2^{2x+3}d(2x+3) = \frac 12 \frac{2^{2x+3}}{\ln 2} + C
\end{aligned}
$$

## 分步积分
&emsp; 若 $u(x)$ 和 $v(x)$ 可导，不定积分 $\int u'(x)v(x)dx$ 存在，则：
$$ \int u(x)v'(x)dx = u(x)v(x)  - \int u'(x)v(x)dx$$

&emsp; 简记为
$$ \int udv = uv - \int vdu $$

&emsp; 证明：由：
$$ \left[ u(x)v(x) \right]' = u'(x)v(x) + u(x)v'(x) $$
&emsp; 得到：
$$ u(x)v'(x) = [u(x)v(x)]' - u'(x)v(x) $$
&emsp; 两边同时取不定积分得：
$$ \int u(x)v'(x)dx = u(x)v(x)  - \int u'(x)v(x)dx$$
&emsp; 证毕。

### 题(们)
1.
$$
\begin{aligned}
\int x\cos xdx = & \int xd(\sin x)\\
= & x \sin x - \int \sin x dx = x \sin x - \cos x + C                                                                                                                                                      
\end{aligned}
$$

2.
$$
\begin{aligned}
\int \ln x dx = & x \ln x - \int x d(\ln x) = x \ln x - \int x \cdot \frac 1x dx = x \ln x - x + C
\end{aligned}
$$

3.
$$
\begin{aligned}
\int x^2 \cos x dx = & \int x ^ 2d(\sin x)\\
= & x^2 \sin x - \int \sin x d(x^2)\\
= & x^2 \sin x - 2 \int x\sin x dx = x^2\sin x + 2\int xd(\cos x) \\
= & x^2 \sin x + 2 \left( x \cos x - \int \cos x dx \right) \\
 = & x ^ 2 \sin x + 2x \cos x - 2\sin x + C
\end{aligned}
$$

4.
$$
\begin{aligned}
\int \frac{\ln x}{x^3}dx= & \int \frac 1{x^3}d(x\ln x - x)\\
= & \frac{x\ln x - x}{x^3} - \int (x\ln x - x)d\left(\frac{1}{x^3}\right) \\
= & \frac{x \ln x - x}{x^3} - \int (x \ln x - x) \left(-\frac{3}{x^4}\right)dx \\
= & \frac{\ln x - 1}{x^2} + 3\int \frac{\ln x - 1}{x^3}dx\\
= & \frac{\ln x - 1}{x^2} + 3\int \frac{\ln x}{x^3}dx - 3 \int \frac{1}{x^3}dx = \frac{\ln x - 1}{x^2} + 3\int \frac{\ln x  - 1}{x^3} + \frac{3}{2x^2}
\end{aligned}
$$
&emsp; 设 $f(x) = \int \frac{\ln x}{x^3}dx$，就有：
$$
\begin{aligned}
f(x) &= \frac{\ln x - 1}{x^2} + 3f(x) + \frac{3}{2x^2} \\
-2f(x) &= \frac{\ln x - 1}{x^2} + \frac{3}{2x^2}\\
\therefore f(x) &= -\frac{3}{4x^2} - \frac{\ln x - 1}{2x^2}
\end{aligned}
$$
&emsp; 即：
$$ \int \frac{\ln x}{x^3} = -\frac{3}{4x^2} - \frac{\ln x - 1}{2x^2} +C $$


## 题(们)

1.
$$
\int \frac{dx}{\sqrt{2gx}} = \frac{1}{\sqrt{2g}}\int x^{-\frac12}dx = \frac{1}{\sqrt{2g}}2 x^{\frac 12} + C = \sqrt{\frac{2x}{g}} + C
$$

2.
$$ \int (2^x +3^x)^2 dx = \int (4^x + 2 \times 6 ^ x + 9^x)dx = \frac{4^x}{\ln 4} + \frac{9^x}{\ln 9} + 2\frac{6^x}{\ln 6} + C $$


3.
$$ \int \tan^2 xdx = \int \frac{\sin^2 x}{\cos^2 x}dx = \int \left( \frac{1}{\cos^2 x} - 1 \right)dx = \tan x - x + C $$

4.
$$
\begin{aligned}
\int \sqrt{x\sqrt{x\sqrt{x}}}dx = &\int \sqrt{x\sqrt{x \cdot x^{\frac12}}}dx = \int \sqrt{x\sqrt{x^{\frac 32}}}dx \\
= & \int \sqrt{x\cdot \left(x^{\frac{3}{2}}\right)^{\frac12}}dx = \int \sqrt{x \cdot x^{\frac 34}}dx\\
= & \int \left(x^{\frac 78}\right)^{\frac12} dx = \int x^{\frac {7}{16}}dx = \frac{16}{23}x^{\frac{23}{16}} + C
\end{aligned}
$$

5.
$$ \int 10^t \cdot 3^{2t}dt = \int 10^t \cdot 9 ^ t dt = \int 90 ^ t dt = \frac{90^t}{\ln 90} + C $$


6. 
$$ \int \left( \sqrt{\frac{1+x}{1-x}} + \sqrt{\frac{1-x}{1+x}} \right)dx =  $$

7.
$$ \int \frac{x^2}{3(1+x^2)}dx = \frac 13 \int \frac{x^2}{1+x^2}dx = \frac 13 \int \left( 1-\frac{1}{1+x^2} \right)dx = \frac 13 \left( x - \arctan x \right) +C  $$

------------
# 定积分

$$ \int_a ^b f(x)dx = F(x)\bigg|_a^b = F(b) - F(a) $$
{% endraw %}
