---
layout: post
title: "关于泰勒展开"
archive_title: "泰勒展开"
section: "OI"
section_slug: "oi"
date: 2021-11-03
tags: ["Math", "caculus"]
summary: "提醒：本人是一个高一的蒟蒻，没有系统的学习过高等数学，所以本文关于泰勒展开的推导过程会及其不严谨，大家看着就当图个乐。"
math: true
---
{% raw %}
# 关于泰勒展开
&emsp; 提醒：本人是一个高一的蒟蒻，没有系统的学习过高等数学，所以本文关于泰勒展开的推导过程会及其不严谨，大家看着就当图个乐。

#### 泰勒展开推导 : 
我们设一个函数写成多项式的形式如下：
$$ f(x) = a_0 + a_1x + a_2x^2 + a_3x^3 + \cdots + a_nx^n $$

$$ \therefore f(0) = a_0 + a_1*0 + a_2*0^2 + a_3*0^3 + \cdots + a_n*0^n = a_0 $$
$$ \therefore a_0 = f(0) = \frac{f^{(0)}(0)}{0!} $$

$$ f(x) = \sum_{i=0}^{n}a_ix^i $$

我们对它求一阶导：

$$ f'(x) = 0 + a_1 + 2a_2x + 3a_3x^2 + \cdots + na_nx^{n-1} $$

$$ \therefore f'(0) = 0 + a_1 + 2a_2*0 + 3a_3*0^2 + \cdots + na_n*0^{n-1} = a_1 $$
$$ \therefore a_1 = f'(0) = \frac{f^{(1)}(0)}{1!} $$

$$ f'(x) = \sum_{i=0}^{n} (i \times a_i)  x^{i-1} $$

我们对它求二阶导：

$$ f''(x) = 0 + 0 + 2a_2 + 6a_3x + \cdots + n(n-1)a_nx^{n-2} $$

$$ \therefore f''(0) = 0 + 0 + 2a_2 + 6a_3*0 + \cdots + n(n-1)a_n*0^{n-2} = 2a_2 $$
$$ \therefore a_2 = \frac{f''(0)}{2} = \frac{f^{(2)}(0)}{2!} $$

$$ f''(x) = \sum_{i=0}^{n} [i  (i-1)  a_i] x^{i-2} $$

我们对它求三阶导：

$$ f'''(x) = 0 + 0 + 0 + 6a_3 + \cdots + n(n-1)(n-2)a_nx^{n-3} $$

$$ \therefore f'''(0) = 0 + 0 + 0 + 6a_3 + \cdots + n(n-1)(n-2)a_n*0^{n-3} = 6a_3 $$
$$ \therefore a_3 = \frac{f'''(0)}{6} = \frac{f^{(3)}(0)}{3!} $$

$$ f'''(x) = \sum_{i=0}^{n}[i(i-1)(i-2)a_i]x^{i-3} $$


以此类推我们可以得到：

$$ \therefore a_n = \frac{f^{(n)}(0)}{n!} $$

$$ \therefore f(x) = \sum_{n=0}^{N} \frac{f^{(n)}(0)}{n!}     x^n + Rn(x) $$

推广 :
$$ f(x) = \sum_{n=0}^{N} \frac{f^{(n)}(a)}{n!} (x-a)^n + Rn(x) $$

----

#### 二级结论 :

1.
$$ f(x) = e^x \therefore f^{(n)}(0) = 1$$
$$ \therefore e^x = \sum_{n=0}^{N} \frac{x^n}{n!} = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots $$

2.
$$ f(x) = \sin{x} $$ 
$$  \therefore f^{(4n+1)}(0) = 1 \;\;\;
 且 f^{(4n+2)}(0) = 0 \;\;\;
 且 f^{(4n+3)}(0) = -1 \;\;\;
 且 f^{(4n+4)}(0) = 0 $$
$$ \therefore sinx = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots $$

3.
$$ f(x) = \cos{x} $$
$$  \therefore f^{(4n+1)}(0) = 0  \;\;\;
 且 f^{(4n+2)}(0) = -1 \;\;\;
 且 f^{(4n+3)}(0) = 0 \;\;\;
 且 f^{(4n+4)}(0) = 1 $$
$$ \therefore cosx = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots $$

4.
最后一个等号只有在 $\alpha \in N_+$ 的时候才成立。
$$ f(x) = (1 + x)^{\alpha}  \therefore f^{(n)}(0) = \alpha (\alpha-1) (\alpha-2) \cdots (\alpha-n+1) = \prod_{i=0}^{n-1}(\alpha-i) = A_{\alpha}^{n} $$
$$ \therefore (1 + x)^{\alpha} = 1 +  \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \frac{\alpha(\alpha-1)(\alpha-2)}{3!}x^3 + \cdots $$

5.
$$ f(x) = (a  + x)^{\alpha} \therefore f^{(n)}(0) = \alpha(\alpha-1)(\alpha-2)\cdots(\alpha - n + 1) a^{\alpha-n} = \Bigg[\prod_{i=0}^{n-1}(\alpha-i)\Bigg] \times a^{\alpha-n} = A_{\alpha}^n \times a^{\alpha-n} $$

$$ \therefore (a + x)^{\alpha} = a^{\alpha} + \alpha a^{\alpha-1}x + \frac{\alpha(\alpha-1)a^{\alpha-2}}{2!}x^2 + \frac{\alpha(\alpha-1)(\alpha-2)a^{\alpha-3}}{3!}x^3 + \cdots $$

6.

$$ f(x) = \frac{1}{1-x} \therefore f^{(n)}(0) = n! $$

$$ \therefore f(x) = 1 + x + x^2 + x^3 + x^4 + \cdots $$

##### 关于欧拉公式:

&emsp; 引入 $i = \sqrt{-1}$
$$ \therefore i^1 = i 且 i^2 = -1 且 i^3 = -i 且 i^4 = 1 $$
$$ \therefore i^{4n+1} = i 且 i^{4n+2} = -1 且 i^{4n+3} = -i 且 i^{4n+4} = 1 (其中 n \in Z)$$
$$ \because e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \frac{x^5}{5!} + \cdots $$

$$
\begin{aligned}
\therefore 
 e^{ix} = &1 + ix + \frac{(ix)^2}{2!} + \frac{(ix)^3}{3!} + \frac{(ix)^4}{4!} + \frac{(ix)^5}{5!} + \cdots \\
 = &1 + ix -\frac{x^2}{2!} - \frac{ix^3}{3!} + \frac{x^4}{4!} + \frac{ix^5}{5!} - \frac{x^6}{6!} - \frac{ix^7}{7!} + \cdots \\
 = &(1 -\frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots) + (ix - \frac{ix^3}{3!} + \frac{ix^5}{5!} - \frac{ix^7}{7!} + \cdots) \\
 = &(1 -\frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots) + i(x - \frac{x^3}{3!} + \frac{x^5}{5!}- \frac{x^7}{7!} + \cdots) \\
 = &\cos{x} + i\sin{x} 
\end{aligned}
$$

$$ \therefore e^{ix} = \cos{x} + i\sin{x} $$

&emsp; &emsp; &emsp; &emsp;当 $x = \pi$ 时:

$$ e^{i\pi} = \cos{\pi} + i\sin{\pi} = -1 $$
$$ \therefore e^{i\pi} + 1 = 0 $$
{% endraw %}
