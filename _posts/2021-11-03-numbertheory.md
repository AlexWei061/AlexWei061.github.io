---
layout: post
title: "约数"
archive_title: "数论"
section: "OI"
section_slug: "oi"
oi_category: "Math"
oi_category_slug: "math"
date: 2021-11-03
tags: ["Math", "NumberTheory"]
summary: "若 n 除以整数 d 的余数为 0 ，即 d 能整除 n ，计为 d|n"
math: true
---
{% raw %}
## 约数
 若 $n$ 除以整数 $d$ 的余数为 $0$ ，即 $d$ 能整除 $n$，计为 $d&#124;n$ <br>

----

 ## 算术基本定理的推论：

算术基本定理中，若正整数 $N$ 被唯一分解为：

$$N = {P_1}^{c_1} \times {P_2}^{c_2} \times {P_3}^{c_3} \times ... \times {P_m}^{c_m} $$

其中 $c_i$ 都是正整数， $P_i$ 都是质数，其中 $P_1 < P_2 < ... < P_m$ <br>
则 $N$ 的正约数集合可以写作：

$$ \lbrace {P_1}^{b_1}, {P_2}^{b_2}, ..., {P_m}^{b_m} \rbrace (0 \leq b_i \leq c_i)$$

$N$ 的正约数的个数为：

$$ (c_1 + 1) \times (c_2 + 1) \times ... \times (c_m + 1) = \prod_{i=1}^{m}(c_i + 1) $$

$N$ 的所有正约数之和为：

$$ (1+P_1+P_1^2+...+P_1^{c_1}) \times (1+P_2+P_2^2+...+P_2^{c_2}) \times ... \times (1+P_m+P_m^2+...+P_m^{c_m}) = \prod_{i=1}^{m} \bigg( \sum_{j=0}^{c_i}(P_i)^j \bigg) $$
--------

## 最大公约数

### 定理：
$$ \forall a, b \in N , gcd(a, b) * lcm(a, b) = a * b $$

### 证明：

&emsp; 设 $d = gcd(a, b)$, $a_0 = a/d, b_0 = b/d$。 根据最大公约数的定义，有$gcd(a_0, b_0) = 1$。再根据最小公倍数的定义有 $lcm(a_0, b_0) = a_0 \times b_0$ <br>

于是，
$$lcm(a, b) = lcm(a_0 \times d, b_0 \times d) = lcm(a_0, b_0) \times d = a_0 \times b_0 \times d = a \times b / d$$ 

所以

$$gcd(a, b) \times lcm(a, b) = a \times b$$

证毕

### 其他的性质

1. $\forall a, b \in N, a \geq b$，有 $gcd(a, b) = gcd(b, a-b) = gcd(a, a-b)$
2. $\forall a, b \in N$，有 $gcd(2a, 2b) = 2gcd(a, b)$

----

## 欧几里得算法

$$\forall a, b \in N, b \neq 0 \rightarrow gcd(a, b) = gcd(b, a\mod{b})$$

### 证明：
&emsp; 若 $a < b$，则 $gcd(b, a\mod{b}) = gcd(b, a) = gcd(a, b)$。命题显然成立<br>

&emsp; 若 $a \geq b$，不妨设 $a=q \times b + r$，其中 $0 \leq r \leq b$，显然 $r = a\mod b$。对于 $a, b$的任意公约数 $d$， 因为 $d&#124;a, d&#124;qb$，故 $d&#124;(a-qb)$，即 $d&#124;r$，因此 $d$也是 $b, r$的公约数。反之亦然成立。故 $a, b$的公约数集合与 $b, a\mod b$的公约数集合相同。于是他们的最大公约数也自然相等。<br>

证毕

int gcd(int a, int b){<br>
&emsp; &ensp; return b ? gcd(b, a%b) : a;<br>
}<br>

runtime complexity : O(log(a+b))

----

## 互质与欧拉函数

### 定义：
&emsp; $\forall a, b \in N$, 若 $gcd(a, b) = 1$，则称 a, b 互质<br>

### 欧拉函数：
&emsp; $1 \sim N$中与 $N$互质的数的个数被称为欧拉函数，记为 $\phi(N)$<br>
&emsp; 若在算术基本定理中，$N = {P_1}^{c_1} \times {P_2}^{c_2} \times {P_3}^{c_3} \times ... \times {P_m}^{c_m}$则：

$$ \phi(N) = N \times \frac{p_1-1}{p_1} \times \frac{p_2-1}{p_2} \times ... \times \frac{p_m-1}{p_m} = N \times \prod_{质数p|N}(1-\frac{1}{p})$$

### 证明：
&emsp; 设 $p$ 是 $N$ 的质因子， $1 \sim N$中 $p$ 的倍数有，$p, 2p, 3p,...,(N/p)\times p$，共有 $N/p$个。同理，若 $q$ 也是 $N$ 的质因子，则 $1 \sim N$ 中 $q$ 的倍数有 $N/q$ 个。如果我们把这 $\frac{N}{p} + \frac{N}{q}$ 个数去掉，那么 $p \times q$ 的倍数就被排除了两次，需要加回来一次。因此，$1 \sim N$ 中不与 $N$ 含有共同质因子 $p$ 或 $q$ 的数的个数为：

$$ N - \frac{N}{p} - \frac{N}{q} + \frac{N}{pq} = N \times \bigg( 1 - \frac{1}{p} - \frac{1}{q} + \frac{1}{pq} \bigg) = N(1-\frac{1}{p})(1-\frac{1}{q}) $$

&emsp; 类似的，可以在 $N$ 的全部质因子使用上述容斥原理，即可得到 $1 \sim N$ 中不与 $N$ 含有任何共同质因子的数的个数 ，也就是与 $N$ 互质的数的个数。
证毕

### 欧拉函数的性质
1. $\forall n > 1, 1\sim n$中与 $n$ 互质的数的和为 $n \times \frac{\phi(n)}{2}$
2. 若 $a, b$ 互质，则 $\phi(ab) = \phi(a) \times \phi(b)$

### 积性函数
&emsp; 如果当 $a, b$ 互质时，有 $f(ab) = f(a) \times f(b)$，则称函数 $f$ 为积性函数

3. 若 $f$ 为积性函数，且在算术基本定理中 $n = \prod_{i=1}^{m}p_i^{c_i}$，则 $f(n) = \prod_{i=1}^{m}f(p_i^{c_i})$
4. 设 $p$ 为质数，若 $p&#124;n$ 且 $p^2\mid n$，则 $\phi(n) = \phi(\frac{n}{p})\times p$
5. 设 $p$ 为质数，若 $p&#124;n$ 且 $p^2\nmid n$，则 $\phi(n)=\phi(\frac{n}{p})\times (p-1)$
6. $\sum_{d \mid n}\phi(d) = n$

----

## 同余

### 定义：
&emsp; 若整数 $a$ 和整数 $b$ 除以整数 $m$ 的余数相等，则称 $a, b$ 模 $m$ 同余，记为 $a \equiv b \pmod{m}$

### 同余类和剩余系
&emsp; 对于 $\forall a \in [0, m-1]$，集合 $\lbrace a+km\rbrace (k \in Z)$ 的所有数模 $m$ 同余，余数都是 $a$。该集合称为一个模 $m$ 的同余类，简记为 $\overline{a}$ 

&emsp; 模 $m$ 的同余类一共有 $m$ 个，分别为 $\overline{0}, \overline{1}, \overline{2}, ..., \overline{m-1}$。他们构成 $m$ 的完全剩余系。

&emsp; $1 \sim m$ 中与 $m$ 互质的数代表的同余类共有 $\phi(m)$ 个，它们构成 $m$ 的简化剩余系。例如，模 $10$ 的简化剩余系为 $\lbrace\overline{1}, \overline{3}, \overline{7}, \overline{9}\rbrace$。

&emsp; 简化剩余系关于模 $m$ 乘法封闭。

### 费马小定理
&emsp; 若 $p$ 是质数， 则对任意数 $a$，有 $a^p \equiv a \pmod{p}$

### 欧拉定理
&emsp; 若正整数 $a, n$ 互质，则 $a^{\phi(n)} \equiv 1 \pmod{n}$，其中 $\phi(n)$为欧拉函数

### 证明：
&emsp; 设 $n$ 的简化剩余系为 $\lbrace\overline{a_1}, \overline{a_2}, ..., \overline{a_{\phi(n)}}\rbrace$。对 $\forall a_i, a_j$，若 $a \times a_i \equiv a \times a_j \pmod{n}$ 则 $a \times (a_i - a_j) \equiv 0$。因为 $a, n$ 互质，所以 $a_i - a_j \equiv 0$，即 $a_i \equiv a_j$。故当 $a_i \neq a_j$时，$aa_i, aa_j$也代表不同的同余类。<br>

&emsp; 又因为简化剩余系关于模 $n$ 乘法封闭，故 $\overline{aa_i}$也在简化剩余系里。 因此 $\lbrace\overline{a_1}, \overline{a_2}, ..., \overline{a_{\phi(n)}}\rbrace$ 和 $\lbrace\overline{aa_1}, \overline{aa_2}, ..., \overline{aa_{\phi(n)}}\rbrace$都能表示 $n$ 的简化剩余系。综上所述

$$ a^{\phi(n)}a_1a_2 \cdots a_{\phi(n)} \equiv (aa_1)(aa_2) \cdots (aa_{\phi(n)}) \equiv a_1a_2 \cdots a_{\phi(n)}\pmod{n} $$

&emsp; 因此 $a^{\phi(n)} \equiv 1\pmod{n}$ 则欧拉定理成立

&emsp; 当 $p$ 是质数时，$\phi(p) = p-1$，并且只有 $p$ 的倍数与 $p$ 不互质。所以，只要 $a$ 不是 $p$ 的倍数，就有 $a^{p-1} \equiv 1 \pmod{p}$ 两边同时乘 $a$ 就是费马小定理，故费马小定理成立。

证毕

### 欧拉定理的推论
&emsp; 若正整数 $a, n$互质，则对任意正整数 $b$，有 $a^b \equiv a^{b \mod{\phi(n)}} \pmod{n}$

证明：<br>

设 $b = q \times \phi(n) + r$，其中 $0 \leq r \leq \phi(n)$，即 $r = b\mod{\phi(n)}$。 于是：<br>

$$ a^b \equiv a^{q \times \phi(n) + r} \equiv \bigg(a^{\phi(n)}\bigg)^q \times a^r \equiv 1^q \times a^r \equiv a^r \equiv a^{b \mod{\phi(n)}} \pmod{n} $$

证毕

----

## 扩展欧几里得

### $B\acute{e}zout$ 定理
&emsp; 对于任意数 $a, b$，存在一对正整数 $x, y$，满足 $ax + by = gcd(a, b)$。

### 证明：
&emsp; 在欧几里得算法的最后一步，即 $b = 0$ 的时候，显然有一对整数 $x=1, y=0$，使得 $a \times 1 + 0 \times 0 = a = gcd(a, 0)$。
&emsp; 若 $b > 0$，则 $gcd(a, b) = gcd(b, a \mod{b})$。假设存在一对整数 $x, y$满足 $bx + (a \mod{b})y = gcd(b, a \mod{b})$，因为 $bx + (a-b\lfloor \frac{a}{b} \rfloor)y = ay + b(x - \lfloor \frac{a}{b} \rfloor y)$，所以令 $x' = y, y' = x - \lfloor \frac{a}{b} \rfloor y$，就得到了 $ax' + by' = gcd(a, b)$

证毕

int exgcd(int a, int b, int &x, int &y){<br>
&emsp; if(b == 0){<br>
&emsp; &emsp; x = 1;<br>
&emsp; &emsp; y = 0;<br>
&emsp; &emsp; return a;<br>
&emsp; }<br>
&emsp; int d = exgcd(b, a%b, x, y);<br>
&emsp; int z = x;<br>
&emsp; x = y;<br>
&emsp; y = z - y * (a / b)<br>
&emsp; return d;<br>
}

&emsp; 以上代码得到的 $x, y$ 是 $ax + by = gcd(a, b)$的一组特解 $x_0, y_0$

&emsp; 对于更一般的方程 $ax + by = c$，他有解当且仅当 $d \mid c$。我们可以先求出 $ax+by=d$的一组特解 $x_0, y_0$。然后同时乘上 $\frac{c}{d}$ 得到 $ax+by=c$的特解 $\frac{c}{d}x_0, \frac{c}{d}y_0$。

&emsp; 事实上，方程 $ax + by = c$的通解可以表示为：
 
$$ x = \frac{c}{d}x_0 + k \frac{b}{d} = \frac{cx_0+kb}{d}, y = \frac{c}{d}y_0 - k \frac{a}{d} = \frac{cy_0-ka}{d} (k \in Z)$$

&emsp; 其中 $k$ 取遍整数集合， $d = gcd(a, b), x_0, y_0$是 $ax + by = gcd(a, b)$的一组特解。

$$d = gcd(a, b) = ax_0 + by_0$$

方程 $ax + by = c$的通解可以表示为：上述表达式的原因为：

$$ x = \frac{c}{d}x_0 + k \frac{b}{d} = \frac{cx_0+kb}{d} = \frac{cx_0+kb}{ax_0 + by_0}, y = \frac{c}{d}y_0 - k \frac{a}{d} = \frac{cy_0-ka}{d} = \frac{cy_0-ka}{ax_0 + by_0} (k \in Z)$$

$$ ax + by = a\frac{cx_0+kb}{ax_0 + by_0} + b\frac{cy_0-ka}{ax_0 + by_0} $$

$$ ax + by = \frac{acx_0 + kab + bcy_0 - kab}{ax_0 + by_0} = \frac{acx_0 + bcy_0}{ax_0 + by_0} = c $$

### 乘法逆元
&emsp; 若整数 $b, m$ 互质，并且 $b \mid a$ 则存在一个整数 $x$ ，使得 $a/b \equiv ax \pmod{m}$ 则称 $x$ 为 $b$ 的模 $m$ 乘法逆元。记作 $b^{-1} \pmod{m}$

&emsp; 因为 $a/b \equiv ab^{-1} \equiv a/b \times b \times b^{-1} \pmod{m}$，所以 $b \times b^{-1} \equiv 1 \pmod{m}$

### 乘法逆元的特殊情况：
&emsp; 如果 $m$ 是质数，（此时我们用 $p$ 代替 $m$）并且 $b < p$，根据欧拉定理，$b^{p-1} \equiv 1 \pmod{p}$，即 $b \times b^{p-2} \equiv 1 \pmod{m}$。因此，当模数 $p$ 是质数时，$b^{p-2}$ 就是 $b$ 的乘法逆元。

### $b$ 的乘法逆元：
&emsp; 根据上面的描述，如果只是保证 $b,m$ 互质，那么乘法逆元可以通过求解同余方程 $bx \equiv 1 \pmod{m}$ 得到。

----

## 线性同余方程
&emsp; 给定整数 $a, b, m$，求一个整数 $x$ 满足 $ax \equiv b \pmod{m}$ 等价于 $ax\mod{m} = b\mod{m}$ 所以 $(ax-b) \mod{m} = 0$ 所以 $m \mid (ax-b)$ 设 $ax-b = km$ 则 $ax - km = b$，令 $y = -k$，$ax + my = b$

&emsp; 根据 B$\acute{e}$zout 定理及其证明过程。线性同余方程有解，当且仅当 $gcd(a, m) \mid b$


&emsp; 在有解时，先用欧几里得算法求出一组整数 $x_0, y_0$，满足 $ax_0 + by_0 = gcd(a, m)$。然后 $x = \frac{x_0 \times b}{gcd(a, m)}$就是原线性方程的一个解。

&emsp; 方程的通解则是模 $m/gcd(a, m)$ 与 $x$ 同余的整数。

----

## 高次同余方程

&emsp; 关于高次同余方程，有 $a^x \equiv b \pmod{p}$ 和 $x^a \equiv b \pmod{p}$两类。后者不在我们的讨论范围，我们只讨论前者。

&emsp; 给定整数 $a, b, p$，其中 $a, p$互质，求一个非负整数 $x$，使得 $a^x \equiv b \pmod{p}$

### Baby Step Gaint Step算法
&emsp; 因为 $a, p$ 互质，所以可以在模 $p$ 意义下执行关于 $a$ 的乘、除运算。

&emsp; 设 $x = i \times t - j$，其中 $t = \lceil\sqrt{p}\rceil$，$0 \leq j \leq t-1$，则方程变为 $a^{i \times t - j} \equiv b \pmod{p}$。即 $(a^t)^i \equiv b \times a^j \pmod{p}$ 

&emsp; 对于所有的 $j \in [0, t-1]$，把 $b \times a^j \mod{p}$插入一个 $Hash$ 表。

&emsp; 枚举 $i$ 的所有可能 取值，即 $i \in [0, t]$，计算出 $(a^t)^i \mod{p}$，在$Hash$表中查找是否存在对应的 $j$，更新答案即可。时间复杂度为 $O(\sqrt{p})$

//下面代码中的 power函数是快速幂
int BSGS(int a, int b, int p){<br>
&emsp; map<int, int>hash;<br>
&emsp; hash.clear();<br>
&emsp; b %= p;<br>
&emsp; int t = (int)sqrt(p) + 1;<br>
&emsp; for(int j = 0; j < t; j++){<br>
&emsp; &emsp; int val = (long long)b * power(a, j, p) % p;<br>
&emsp; &emsp; hash[val] = j;<br>
&emsp; }<br>
&emsp; a = power(a, t, p);<br>
&emsp; if(a == 0) return b == 0 ? 1 : -1;<br>
&emsp; for(int i = 0; i <= t; i++){<br>
&emsp; &emsp; int val = power(a, i, p)<br>
&emsp; &emsp; int j = hsah.find(val) == hasg.end() ? -1 : hash[val];<br>
&emsp; &emsp; if(j >= 0 and i * t - j >= 0) return i * t - j;<br>
&emsp; }<br>
&emsp; return -1;<br>
}<br>

----
{% endraw %}
