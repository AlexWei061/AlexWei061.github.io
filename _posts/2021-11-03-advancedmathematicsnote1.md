---
layout: post
title: "关于极限"
archive_title: "极限"
date: 2021-11-03
tags: ["Math", "caculus"]
summary: "二项式定理"
math: true
---
{% raw %}
## 关于极限

#### 二项式定理
$$ (a + b)^n = C_n^0a^n + C_n^1a^{n-1}b + C_n^2a^{n-2}b^2 + \cdots + C_n^{n-1}ab^{n-1} + C_n^nb^n = \sum_{i=0}^{n}C_n^i a^{n-i}b^i $$

------
#### 极限运算法则(们)
$$
\begin{aligned}
& \lim_{n\to \infty}(x_n+y_n) = \lim_{n\to \infty}x_n + \lim_{n\to \infty} y_n \\ \\
& \lim_{n\to \infty}(x_ny_n) = \lim_{n\to \infty}x_n \cdot \lim_{n\to \infty}y_n\\ \\
& \lim_{n\to \infty}\left( \frac{x_n}{y_n} \right) = \frac{\lim_{n\to \infty}x_n}{\lim_{n\to \infty}y_n} \\ \\
&\lim_{n\to \infty}x_n^{y_n} = \left(\lim_{n\to \infty}x_n\right)^{\lim_{n\to \infty}y_n}
\end{aligned}
$$


----
#### Stolz 定理
两个数列 $\lbrace x_n \rbrace$ 和 $\lbrace y_n \rbrace$，其中 $y_n$ 是无穷大量。如果：
$$ \lim_{n\to \infty}\frac{x_n - x_{n-1}}{y_n-y_{n-1}} = a $$
则：
$$ \lim_{n\to \infty} \frac{x_n}{y_n} = a $$

-----



#### 夹逼定理
三个数列 $\lbrace x_n \rbrace$ , $\lbrace y_n \rbrace$ 和 $\lbrace z_n \rbrace$。若：
$$ x_n \leq y_n \leq z_n \qquad 且 \qquad \lim_{n\to \infty}x_n = \lim_{n\to \infty}z_n = a $$
则：
$$ \lim_{n\to \infty}y_n = a $$

----


#### 题(们)

2.
（1）
$$\lim_{n\to \infty}(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{n})^{\frac{1}{n}} \leq \lim_{n\to \infty}n^{\frac{1}{n}} = 1  $$
$$ \lim_{n\to \infty}(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{n})^{\frac{1}{n}} \geq \lim_{n\to \infty}1^{\frac{1}{n}} = 1 $$
$$ \therefore \lim_{n\to \infty}(1 + \frac{1}{2} + \frac{1}{3} + \cdots + \frac{1}{n})^{\frac{1}{n}} = 1 $$

----





（2）
$$ \lim_{n\to \infty}(\frac{1}{n + \sqrt{1}} + \frac{1}{n + \sqrt{2}} + \cdots +\frac{1}{n + \sqrt{n}}) \leq \lim_{n\to \infty} \frac{n}{n + \sqrt{n}} = \lim_{n\to \infty}\frac{1}{1+\frac{1}{\sqrt{n}}} = 1 $$
$$ \lim_{n\to \infty}({\frac{n}{n +\sqrt{1}} + \frac{n}{n +\sqrt{2}} +\cdots+ \frac{n}{n +\sqrt{n}}}) \geq \lim_{n\to \infty}\frac{n}{n+1} = \frac{1}{1+\frac{1}{n}} = 1 $$
$$ \therefore \lim_{n\to \infty}(\frac{1}{n+\sqrt{1}} + \frac{1}{n +\sqrt{2}} + \cdots + \frac{1}{n +\sqrt{n}}) = 1 $$





------
（3）
$$ \lim_{n\to \infty}\sum_{k = n^2}^{(n+1)^2}\frac{1}{\sqrt{k}} \leq \lim_{n\to \infty}\frac{(n+1)^2-n^2+1}{n+1} = \lim_{n\to \infty}2 = 2 $$
$$ \lim_{n\to \infty}\sum_{k = n^2}^{(n+1)^2}\frac{1}{\sqrt{k}} \geq \frac{(n+1)^2-n^2+1}{n} = 2\lim_{n\to \infty}\frac{n}{n+1} = 2\lim_{n\to \infty}\frac{1}{1+\frac{1}{n}} = 2 $$

-----
（4）
$$ \lim_{n\to \infty}\frac{1\cdot 3\cdot 5 \cdots (2n-1)}{2 \cdot 4 \cdot 6 \cdots (2n)} \geq \lim_{n\to \infty}(\frac{1}{2})^n = 0 $$
 $$ 令 G = \prod_{i=1}^{n}\frac{2i-1}{2i}，P = \prod_{i=1}^{n}\frac{2i}{2i+1} $$
 $$ G < P 且 GP = \frac{1}{2n+1} \therefore G < \frac{1}{\sqrt{2n+1}} \rightarrow \lim_{n\to \infty}G \leq \lim_{n\to \infty}\frac{1}{\sqrt{2n+1}} = 0 $$
 $$ \lim_{n\to \infty}\frac{1\cdot 3\cdot 5 \cdots (2n-1)}{2 \cdot 4 \cdot 6 \cdots (2n)} = 0 $$









-----
3.
（1）
$$ \lim_{n\to \infty}\frac{3n^2+4n-1}{n^2+1} = 3 + \lim_{n\to \infty}\frac{n-1}{n^2+1} = 3 + \lim_{n\to \infty}\frac{1-\frac{1}{n}}{n+\frac{1}{n}} = 3 $$


----
（2）
$$ \lim_{n\to \infty}\frac{n^3+2n^2-3n+1}{2n^3-n+3} = \lim_{n\to \infty}\frac{1 + \frac{2}{n} + \frac{3}{n^2} + \frac{1}{n^3}}{2 - \frac{1}{n} + \frac{1}{n^3}} = \frac{1}{2} $$

----

（3）
$$ \lim_{n\to \infty}\frac{3^n + n^3}{3^{n+1}+(n+1)^3} = \lim_{n\to \infty}\frac{1+\frac{n^3}{3^n}}{3 + \frac{(n+1)^3}{3^n}} = \frac{1}{3} （\lim_{n\to \infty}\frac{n^k}{a^n} = 0 证明见 8）$$

-----

（4）
$$ \lim_{n\to \infty}(\sqrt[n]{n^2+1}-1)sin\frac{n\pi}{2} = \Bigg[\Big(\lim_{n\to \infty}\sqrt[n]{n^2+1}\Big)-1\Bigg]\lim_{n\to \infty}sin\frac{n\pi}{2} = 0 $$


-----
（5）
$$
\begin{aligned} 
&\lim_{n\to \infty}\sqrt{n}(\sqrt{n+1} - \sqrt{n}) = \lim_{n\to \infty}\frac{(\sqrt{n^2+n}-n)(\sqrt{n^2+n} + n)}{\sqrt{n^2+n}+n}\\
= &\lim_{n\to \infty}\frac{n}{\sqrt{n^2+n}+n} = \lim_{n\to \infty}\frac{1}{1 + \sqrt{1+\frac{1}{n}}} = \frac{1}{2}
\end{aligned}
$$

----
（6）
$$ 
\begin{aligned}
&\lim_{n\to \infty}  (1-\frac{1}{2^2})(1-\frac{1}{3^2})\cdots (1-\frac{1}{n^2})\\
= & \lim_{n\to \infty}\frac{2^2-1}{2^2} \cdot \frac{3^2-1}{3^2} \cdot \frac{4^2-1}{4^2} \cdots \frac{n^2-1}{n^2}\\
= &\lim_{n\to \infty}\frac{(2+1)(2-1)(3+1)(3-1)(4+1)(4-1) \cdots (n+1)(n-1)}{2^2\cdot3^2\cdot4^2\cdots n^2} \\
= &\lim_{n\to \infty}\frac{n+1}{2n} = \lim_{n\to \infty}\frac{1+\frac{1}{n}}{2} = \frac{1}{2}
\end{aligned}
$$

-------

（7）
$$ 
\begin{aligned}
& \lim_{n\to \infty}\sqrt{n}(\sqrt[4]{n^2+1}- \sqrt{n+1})\\ 
= & \lim_{n\to \infty}\sqrt{n}{\sqrt[4]{n^2+1} + \sqrt[4]{n^2+2n+1}}\\
= & \lim_{n\to \infty}\sqrt{n}\frac{\sqrt{n^2+1} - \sqrt{n^2+2n+1}}{\sqrt[4]{n^2+1}+\sqrt[4]{n^2+2n+1}}\\
= & \lim_{n\to \infty}\sqrt{n}\frac{-2n}{\left( \sqrt[4]{n^2+1}+\sqrt[4]{n^2+2n+1} \right) \left( \sqrt{n^2+1}+\sqrt{n^2+2n+1} \right) }\\
= & \lim_{n\to \infty} \frac{-2n^{\frac{3}{2}}}{\left( \sqrt[4]{n^2+1}+\sqrt[4]{n^2+2n+1} \right) \left( \sqrt{n^2+1}+\sqrt{n^2+2n+1} \right) }\\
= & \lim_{n\to \infty}\frac{-2n^{\frac{3}{2}}}{4n^{\frac32}} = -\frac 12
\end{aligned}
$$

------

（8）
$$ \lim_{n\to \infty}(\frac{1}{2} + \frac{3}{2^2} + \cdots + \frac{2n-1}{2^n}) $$

------

4. 证明：若 $\lim_{n\to \infty} a_n = a$ 则 $\lim_{n\to \infty}\frac{a_1+a_2+a_3+\cdots + a_n}{n} = a$
&emsp; 令 $x_n = a_1+\cdots+a_n，y_n = n$
$$
\begin{aligned}
\lim_{n\to \infty}\frac{1_1+\cdots+a_n}{n} = \lim_{n\to \infty}\frac{x_{n+1}-x_n}{y_{n+1}-y_n} = \lim_{n\to \infty}\frac{a_{n+1}}{1} = a
\end{aligned}
$$
&emsp; 证毕

----

5.  设 $a_n > 0$， 且 $\lim_{n\to \infty}a_n = a$，证明：$\lim_{n\to \infty}\sqrt[n]{a_1a_2\cdots a_n} = a$
$$ \lim_{n\to \infty}\sqrt[n]{a_1\cdots a_n} \leq \lim_{n\to \infty}\frac{a_1 + \cdots + a_n}{n} = a $$
$$ \lim_{n\to \infty}\sqrt[n]{a_a\cdots a_n} \geq \lim_{n\to \infty}a_n = a $$
$$ \therefore \lim_{n\to \infty}\sqrt[n]{a_1a_2\cdots a_n} = a $$
&emsp; 证毕






------

6. 若 $a_n > 0$ （n = 1， 2， 3...），且 $\lim_{n\to \infty}\frac{a_{n+1}}{a_n} = a$，求证 $\lim_{n\to \infty}\sqrt[n]{a_n} = a$


------
7. 求 $\lim_{n\to \infty}\frac{1^2 + 3^3 + 5^2 + \cdots + (2n+1)^2}{n^3}$

-------

8. 用 Stolz 定理求 $\lim_{n\to \infty}\frac{log_an}{n}$ 和 $\lim_{n\to \infty}\frac{n^k}{a^n}$
$$
\begin{aligned}
\lim_{n\to \infty}\frac{log_an}{n} = &\lim_{n\to \infty}\frac{log_a(n+1)-log_an}{n+1-n} \\
= & \lim_{n\to \infty}log(\frac{n+1}{n})\\
= & \lim_{n\to \infty}log_a(1+\frac{1}{n}) = 0
\end{aligned}
$$
$$
\begin{aligned}
&\lim_{n\to \infty}\frac{n^k}{a^n} = \lim_{n\to \infty}\frac{n^k-(n-1)^k}{a^{n}-a^{n-1}}\\
= & \lim_{n\to \infty}\frac{C_k^1n^{k-1}-C_k^2n^{k-2}+C_k^3n^{k-3}-\cdots+1}{a^n-a^{n-1}}
\end{aligned}
$$

-----
9. 设 $\lbrace x_n \rbrace$ 是无穷大量， $&#124;y_n&#124; \geq \delta > 0$，证明 $\lbrace x_ny_n \rbrace$ 是无穷大量。


## 导数 
#### 常见的导数(们)
$$
\begin{aligned}
&(C)' = 0\\
&(sinx)' = cosx\\
&(cosx)' = -sinx\\
&(lnx)' = \frac 1x\\
&(log_ax)' = \frac{1}{xlna}\\
&(e^x)' = e^x\\
&(a^x)' = a^xlna\\
&(x^n)' = nx^{n-1}
\end{aligned}
$$

----
#### 求导法则(们)
$$
\begin{aligned}
&\frac{d(f(x)+g(x))}{dx} = \frac{df(x)}{dx} + \frac{dg(x)}{dx}\\ \\
&\frac{d\left(f(x)g(x)\right)}{dx} = \frac{df(x)}{dx}g(x) + \frac{dg(x)}{dx}f(x)\\ \\
&\frac{d\left(\frac{f(x)}{g(x)}\right)}{dx} = \frac{\frac{df(x)}{dx}g(x) - \frac{dg(x)}{dx}f(x)}{g^2(x)} \\ \\
&\frac{df(g(x))}{dx} = \frac{df(g(x))}{dg(x)} \cdot \frac{dg(x)}{dx}
\end{aligned}
$$
&emsp; 需要注意的是，复合函数求导法则不适用于指数形式，比如：$x^x$ 的导数应该这样求：
$$
\begin{aligned}
(x^x)' = \left(e^{ln(x^x)}\right)' = \left( e^{xlnx} \right)' = e^{xlnx} \cdot (lnx + 1)
\end{aligned}
$$

----
#### 题(们)
1.
&emsp; 当 a 为何值时，直线 $y = x$ 能与 $y = log_ax$ 相切，切点在哪里。
&emsp; 因为相切所以切点切线斜率为 1，即：
$$ \left( log_ax \right)' = \frac{1}{xlna} = 1 $$
&emsp; 又因为切点在 $y = x$ 上，所以横纵坐标相等，即：
$$ x = log_ax $$
&emsp; 联立得：
$$
\begin{aligned}
&\begin{cases}
\frac{1}{x_0lna} = 1 \\
x_0 = log_ax_0
\end{cases}\\
& \because \frac{1}{x_0lna} = 1 \quad \therefore x_0 = \frac{1}{lna}\\
& \because x_0 = log_ax_0 \quad \therefore x_0 = \frac{lnx_0}{lna}\\
&\therefore lnx_0 = 1  \rightarrow x_0 = e \rightarrow lna = \frac{1}{e} \rightarrow a = e^{\frac{1}{e}}
\end{aligned}
$$
&emsp; 所以当 $a = e^{\frac{1}{e}}$ 时， $y = log_ax$ 与 $y=x$ 相切，切点为 $(e, e)$。

2. 
&emsp; 求 $\arcsin x$ 的导数：

&emsp; 我们知道如果 $y = \arcsin x$ 则 $x = \sin y$。等式两边同时求导，得到：
$$ y' \cos y = 1 \rightarrow y' = \frac{1}{\cos y} = \frac{1}{\sqrt{1 - \sin^2 y}} $$

&emsp; 又因为 $y = \arcsin x$，所以：

$$ y' = \frac{1}{\sqrt{1 - \sin^2(\arcsin x)}} = \frac{1}{\sqrt{1-x^2}} $$




3.
&emsp; 求 $\arccos x$的导数：

&emsp; 因为 $y = \arccos x$，我们就有 $x = \cos y$。两边同时求导得到：
$$ 1 = -y' \sin y \rightarrow y' = -\frac{1}{\sin y} = -\frac{1}{\sqrt{1-\cos^2 y}} $$

&emsp; 又因为 $y = \arccos x$ 所以：
$$ y' = -\frac{1}{\sqrt{1-\cos^2(\arccos x)}} = -\frac{1}{\sqrt{1-x^2}} $$




4.
&emsp; 求 $\arctan x$ 的导数：

&emsp; 设 $y = \arctan x$ 则 $x = \tan y$两边同时求导得到：
$$ 1 = y' (\tan y)' = y' \left(\frac{\sin y}{\cos y}\right)' = y' \left( \frac{\cos^2 y + \sin^2 y}{\cos^2 y} \right) = \frac{y'}{\cos^2 y} $$

&emsp; 所以：
$$ y' = \cos^2 y = \frac{\cos^2 y}{\sin^2 y + \cos^2 y} = \frac{1}{1 + \tan^2 y} $$

&emsp; 又因为 $y = \arctan x$ 所以：
$$ y' = \frac{1}{1 +\tan^2(\arctan x)} = \frac{1}{1 + x^2} $$

---------
{% endraw %}
