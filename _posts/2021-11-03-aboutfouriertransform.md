---
layout: post
title: "傅里叶级数公式："
archive_title: "AboutFourierTransform"
date: 2021-11-03
tags: ["Math", "caculus"]
summary: "作者是个没有系统学习过高等数学的高中OIer，推导过程可能不严谨，有问题的地方望大家纠正一下qwq"
math: true
---
{% raw %}
作者是个没有系统学习过高等数学的高中OIer，推导过程可能不严谨，有问题的地方望大家纠正一下qwq
因为作者之前没学过有关知识，是边看文章边推边写出来的，所以推导思路根原文章基本一致，原文章在此：[【Math】复数表示个傅里叶变换](https://www.cnblogs.com/yifanrensheng/p/12540652.html#_label2)

----
## 傅里叶级数公式：
$$
f(t) = A_0 + \sum_{n=1}^{\infty}\Big[ a_ncos(n\omega t) + b_nsin(n\omega t) \Big] ，
\begin{cases}
A_0 = \frac{1}{2\pi} \int_{-\pi}^{\pi}f(t)dt \\
a_n = \frac{1}{2\pi} \int_{-\pi}^{\pi}cos(n\omega t)f(t)dt \\
b_n = \frac{1}{2\pi} \int_{-\pi}^{\pi}sin(n\omega t)f(t)dt
\end{cases}
$$
&emsp; 推导：首先我们把一个周期函数用一堆正弦函数来表达：
$$
\begin{aligned}
f(t) = &A_0 + \sum_{n=1}^{\infty} sin(n\omega t + \varphi_n) \\
= & A_0 + \sum_{n=1}^{\infty} \Big[A_nsin(n\omega t)cos \varphi_n + A_n cos(n\omega t)sin\varphi_n\Big] \qquad 和差角公式\\
= & A_0 + \sum_{n=1}^{\infty} \Big[A_n sin\varphi_ncos(n\omega t) + A_n cos \varphi_nsin(n\omega t)\Big] \\
令 \; a_n = &A_nsin\varphi_n ，b_n = A_ncos\varphi_n 得：\\
f(t) = &A_0 + \sum_{n = 1}^{\infty}[a_ncos(n\omega t) + b_nsin(n\omega t)] \\
两边同时取&积分得到： \\
\int_{-\pi}^{\pi}f(t)dt = & \int_{-\pi}^{\pi}A_0dt + \int_{-\pi}^{\pi}\sum_{n=1}^{\infty}[a_ncos(n\omega t) + b_nsin(n\omega t)]dt
\end{aligned}
$$
&emsp; 我们先把这一项算出来：
$$
\begin{aligned}
\int_{-\pi}^{\pi}\sum_{n=1}^{\infty}[a_ncos(n\omega t) + b_nsin(n\omega t)]dt 
\end{aligned}
$$
&emsp; 要计算这一项，只需要知道求和里面的东西等于几，也就是：
$$
\begin{aligned}
&\int_{-\pi}^{\pi}[a_ncos(n\omega t) + b_nsin(n\omega t)]dt \\
= & \frac{a_n}{n\omega}sin(n\omega t) - \frac{b_n}{n\omega}cos(n\omega t) \bigg|_{-\pi}^{\pi} \\
= & \Big[ \frac{a_n}{n\omega}sin(n\omega \pi) - \frac{b_n}{n\omega}cos(n\omega \pi) \Big] - \Big[  \frac{a_n}{n\omega}sin(-n\omega \pi) - \frac{b_n}{n\omega}cos(-n\omega \pi) \Big] \\
= &  \frac{a_n}{n\omega}sin(n\omega \pi) -  \frac{a_n}{n\omega}sin(-n\omega \pi) + \frac{b_n}{n\omega}cos(-n\omega \pi) - \frac{b_n}{n\omega}cos(n\omega \pi)  \\
= & \frac{a_n}{n\omega}[sin(n\omega \pi) - sin(-n\omega\pi)] + \frac{b_n}{n\omega}[cos(-n\omega \pi) - cos(n\omega\pi)]
\end{aligned}
$$
&emsp; 因为 $sink\pi = 0$ 且 $cosx = cox(-x)$，所以上面那一项总体就是 0。即：
$$
\int_{-\pi}^{\pi}[a_ncos(n\omega t) + b_nsin(n\omega t)]dt  = 0
$$
&emsp; 所以原式可以化为：
$$
\begin{aligned}
\int_{-\pi}^{\pi}f(t)dt = & \int_{-\pi}^{\pi}A_0dt + \int_{-\pi}^{\pi}\sum_{n=1}^{\infty}[a_ncos(n\omega t) + b_nsin(n\omega t)]dt \\
= & A_0t \bigg|_{-\pi}^{\pi} + 0 = [\pi - (-\pi)]A_0 = 2\pi A_0 \\
\therefore A_0 = \frac{1}{2\pi}\int_{-\pi}^{\pi}&f(t)dt
\end{aligned}
$$
&emsp; 然后我们来求 $a_n$ 和 $b_n$。等式两边同时乘上 $cos(k\omega t)$得到了：
$$
\begin{aligned}
f(t)cos(k\omega t) = &A_0cos(k\omega t) + \sum_{n = 1}^{\infty}[a_ncos(n\omega t)cos(k\omega t) + b_nsin(n\omega t)cos(k\omega t)]\\
\end{aligned}
$$
&emsp; 两边同时积分得到了：
$$
\begin{aligned}
\int_{-\pi}^{\pi} f(t)cos(k\omega t)dt = &A_0\int_{-\pi}^{\pi}cos(k\omega t)dt +\\
 \sum_{n = 1}^{\infty}[a_n\int_{-\pi}^{\pi}&cos(n\omega t)cos(k\omega t)dt + b_n\int_{-\pi}^{\pi}sin(n\omega t)cos(k\omega t)dt]\\
\end{aligned}
$$
&emsp; 又因为这些项都是 0：
$$  
\begin{aligned}
A_0\int_{-\pi}^{\pi}cos(k\omega t)dt = A_0 \cdot \frac{1}{k\omega}sin(k\omega t)\bigg|_{-\pi}^{\pi} = 0\\
b_n\int_{-\pi}^{\pi}sin(n\omega t)cos(k\omega t)dt = b_n \cdot -\frac{1}{n\omega}cos(\omega t)\frac{1}{k\omega}sin(k\omega t)\bigg|_{-\pi}^{\pi} = 0
\end{aligned}
$$
&emsp; 所以：

$$
\begin{aligned}
\int_{-\pi}^{\pi} f(t)cos(k\omega t)dt = &a_n\sum_{n = 1}^{\infty}\int_{-\pi}^{\pi}cos(n\omega t)cos(k\omega t)dt \\
= &a_n \int_{-\pi}^{\pi}cos^2(n\omega t)dt \\
= & \frac{a_n}{2} \int_{-\pi}^{\pi} [1 + cos(2n\omega t)]dt \qquad 半角公式\\
= & \frac{a_n}{2} \Big[\int_{-\pi}^{\pi}1dt + \int_{-\pi}^{\pi}cos(2n\omega t)dt \Big]
\end{aligned}
$$
&emsp; 又因为：
$$
\int_{-\pi}^{\pi}cos(2n\omega t)dt = -\frac{1}{2n\omega}sin(2n\omega t)\bigg|_{-\pi}^{\pi} = 0
$$
&emsp; 所以：
$$
\begin{aligned}
&\int_{-\pi}^{\pi} f(t)cos(k\omega t)dt = a_n\sum_{n = 1}^{\infty}\int_{-\pi}^{\pi}cos(n\omega t)cos(k\omega t)dt \\
= & \frac{a_n}{2} \int_{-\pi}^{\pi}1dt = \frac{a_n}{2} \times t \bigg|_{-\pi}^{\pi} = \frac{a_n}{2} [\pi - (-\pi)] = \pi a_n\\
\therefore &a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(t)cos(n\omega t)dt \qquad \qquad \qquad \qquad (n=k)
\end{aligned}
$$
&emsp; 计算 $b_n$ 的方法和计算 $a_n$ 的基本相同，可以得到：
$$ b_n = \frac{1}{\pi}\int_{-\pi}^{\pi}f(t)sin(n\omega t)dt \qquad \qquad \qquad \qquad \quad (n = k) $$

## 傅里叶指数形式：
$$ f(t) = \frac{1}{T}\sum_{n = -\infty}^{+\infty}\int_{t_0}^{t_o+T}e^{-in\omega t}dt \; \cdot \; e^{in\omega t} $$
&emsp; 推导如下：
&emsp; 由欧拉公式($e^{ix} = cosx + isinx$)我们可以推出：
$$ cosx = \frac{e^{ix} + e^{-ix}}{2} \qquad sinx = -i \cdot \frac{e^{ix} - e^{-ix}}{2} $$
&emsp; 将两式带入傅里叶级数得到：
$$
\begin{aligned}
f(t) = &A_0 + \sum_{n = 1}^{\infty}[a_n\frac{e^{in\omega t} + e^{-in\omega t}}{2} + b_n \cdot (-i)\frac{e^{in\omega t} - e^{-in\omega t}}{2} ]\\
= &A_0 + \sum_{n = 1}^{\infty}[\frac{a_n-ib_n}{2}e^{in\omega t } + \frac{a_n + ib_n}{2}e^{-in\omega t}]\\
\end{aligned}
$$
&emsp; 又因为：
$$
\begin{aligned}
a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(t)cos(n\omega t)dt \qquad \qquad \qquad \qquad (n=k)\\
b_n = \frac{1}{\pi}\int_{-\pi}^{\pi}f(t)sin(k\omega t)dt \qquad \qquad \qquad \qquad \quad (n = k)
\end{aligned}
$$
&emsp; 所以：
$$
\begin{aligned}
\frac{a_n - ib_n}{2} = &\frac{1}{2} \cdot \Bigg[ \frac{1}{\pi}\int_{-\pi}^{\pi} f(t)cos(n\omega t)dt - i \cdot \frac{1}{\pi}\int_{-\pi}^{\pi}f(t)sin(k\omega t)dt \Bigg] \\
= &\frac{1}{2} \cdot \frac{2}{T}\Bigg[ \int_{t_0}^{t_0+T}cos(n\omega t)f(t)dt - i \int_{t_0}^{t_0+T}sin(n\omega t)f(t)dt \Bigg]\\
= & \frac{1}{T} \cdot \int_{t_0}^{t_0+T}f(t)[cos(n\omega t) - isin(n\omega t)]dt \\
= & \frac{1}{T} \cdot \int_{t_0}^{t_0+T}f(t)\Big[\frac{e^{in\omega t} + e^{-in\omega t}}{2} - i \cdot (-i)\frac{e^{in\omega t} - e^{-in\omega t}}{2}\Big]dt \\
= & \frac{1}{T} \cdot \int _{t_0}^{t_0+T}f(t)e^{-in\omega t}dt
\end{aligned}
$$
$$
\begin{aligned}
\frac{a_n + ib_n}{2} = &\frac{1}{2} \cdot \Bigg[ \frac{1}{\pi}\int_{-\pi}^{\pi} f(t)cos(n\omega t)dt + i \cdot \frac{1}{\pi}\int_{-\pi}^{\pi}f(t)sin(k\omega t)dt \Bigg] \\
= &\frac{1}{2} \cdot \frac{2}{T}\Bigg[ \int_{t_0}^{t_0+T}cos(n\omega t)f(t)dt + i \int_{t_0}^{t_0+T}sin(n\omega t)f(t)dt \Bigg]\\
= & \frac{1}{T} \cdot \int_{t_0}^{t_0+T}f(t)[cos(n\omega t) + isin(n\omega t)]dt \\
= & \frac{1}{T} \cdot \int_{t_0}^{t_0+T}f(t)\Big[\frac{e^{in\omega t} + e^{-in\omega t}}{2} + i \cdot (-i)\frac{e^{in\omega t} - e^{-in\omega t}}{2}\Big]dt \\
= & \frac{1}{T} \cdot \int _{t_0}^{t_0+T}f(t)e^{in\omega t}dt
\end{aligned}
$$
&emsp; 然后再带回去：
$$
\begin{aligned}
f(t) = &A_0 + \sum_{n = 1}^{\infty}[\frac{a_n-ib_n}{2}e^{in\omega t } + \frac{a_n + ib_n}{2}e^{-in\omega t}]\\
= & \frac{1}{T}\int_{t_0}^{t_0+T}f(t)dt + \sum_{n=1}^{\infty}\Big[ \frac{1}{T} \cdot \int _{t_0}^{t_0+T}f(t)e^{-in\omega t}dt \cdot e^{in\omega t} + \frac{1}{T} \cdot \int _{t_0}^{t_0+T}f(t)e^{in\omega t}dt \cdot e^{-in\omega t} \Big] \\
= &\frac{1}{T}\int_{t_0}^{t_0+T}f(t)dt + \frac{1}{T}\sum_{n=1}^{\infty}\int_{t_0}^{t_0+T}f(t)e^{-in\omega t}dt \cdot e^{in\omega t} + \frac{1}{T}\sum_{n = -\infty}^{-1}\int_{t_0}^{t_0+T}f(t)e^{-in\omega t}dt \cdot e^{in\omega t}\\
= & \frac{1}{T}\sum_{n=-\infty}^{+\infty}\int_{t_0}^{t_0+T}f(t)e^{-in\omega t}dt \cdot e^{in \omega t}
\end{aligned}
$$
## 傅里叶变换和傅里叶逆变换
&emsp; 傅里叶变换：
$$
\begin{aligned}
F(\omega_x) = \int_{-\infty}^{+\infty}f(t)s^{-i\omega_x t}dt
\end{aligned}
$$
&emsp; 傅里叶逆变换：
$$
\begin{aligned}
f(t) = \frac{1}{2\pi}\int_{-\infty}^{+\infty}F(\omega_x)e^{i\omega_x t}d\omega
\end{aligned}
$$
&emsp; 其中 $F(\omega)$ 叫做 $f(t)$ 的像函数，$f(t)$ 叫做$F(\omega)$ 的像原函数。$F(\omega)$ 是 $f(t)$ 的像。$f(t)$ 是 $F(\omega)$ 原像。
&emsp; 推导过程如下：
&emsp; 令：
$$ \omega_x = n\omega \qquad F(\omega_x) = \int_{-\infty}^{+\infty}f(t)s^{-i\omega_x t}dt $$
&emsp; 又因为：
$$ f(t) = \frac{1}{T}\sum_{n=-\infty}^{+\infty}\int_{t_0}^{t_0+T}f(t)e^{-in\omega t}dt \cdot e^{in \omega t} $$
&emsp; 所以：
$$
\begin{aligned}
f(t) = &\frac{1}{T}\sum_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}f(t)e^{-i\omega_xt}dt \cdot e^{i\omega_xt} \\
= &\frac{1}{T} \sum_{-\infty}^{+\infty}[F(\omega_x)e^{i\omega_xt}] = \frac{1}{2\pi}\int_{-\infty}^{+\infty}F(\omega_x)e^{i\omega_xt}d\omega_x
\end{aligned}
$$
## 离散傅里叶变换
&emsp; 离散傅里叶变换：
$$ F(n) = \sum_{n = 0}^{N}f(t)e^{i\frac{2\pi n}{N}t} $$
&emsp; 逆离散傅里叶变换：
$$ f(t) = \sum_{n=0}^{N}\frac{1}{N}F(n)e^{i\frac{2\pi n}{N}t} $$
{% endraw %}
