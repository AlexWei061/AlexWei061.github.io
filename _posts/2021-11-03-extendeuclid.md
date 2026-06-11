---
layout: post
title: "扩展欧几里得"
archive_title: "扩展欧几里得"
section: "OI"
section_slug: "oi"
oi_category: "Math"
oi_category_slug: "math"
date: 2021-11-03
tags: ["Math", "NumberTheory"]
summary: "B e zout 定理"
math: true
---
{% raw %}
# 扩展欧几里得
## $B\acute{e}zout$定理
>对任何整数a、b和它们的最大公约数d，关于未知数x和y的线性不定方程（称为裴蜀等式）：若a,b是整数,且gcd(a,b)=d，那么对于任意的整数x,y,ax+by都一定是d的倍数，特别地，一定存在整数x,y，使ax+by=d成立。
>它的一个重要推论是：a,b互质的充分必要条件是存在整数x, y使ax+by=1.

(以上内容来自百度)
#### 证明：
1. 我们知道在欧几里得算发的最后一步，即 b = 0 时，显然有 x = 1, y = 0，满足ax+by = gcd(a, b) = gcd(a, 0) = a。
2. b > 0 时，根据欧几里得算法我们知道 :


$$
gcd(a, b) = gcd(b, a mod b)
$$


我们假设存在一对整数 x, y。满足:


$$
bx + (a mod \, b)y = gcd(b, a mod b) = gcd(a, b)
$$


又因为 :


$$
bx + (a mod \, b)y = bx + \Big(a - b\lfloor \frac{a}{b} \rfloor\Big)y = ay + b\Big(x - \lfloor\frac{a}{b}\rfloor y\Big)
$$


所以令:


$$
x' = y, \quad y' = x - \lfloor \frac{a}{b} \rfloor y
$$


就可以得到：


$$
ax' + by' = gcd(a, b)
$$


&emsp; 而且这里的 x' 和 y' 一定是整数。所以我们可以由此得到在欧几里得算法的最后一步结束后，我们可以用回溯法一步一步地向上得到整数x, y，使它们满足ax + by = gcd(a, b) 的关系。
&emsp; 证毕。

```cpp
int exgcd(int a, int b, int &x, int &y){
	if(b == 0){
		x = 1; y = 0;
		return a;
	}
	int d = exgcd(b, a % b, x, y);
	int z = x; x = y; y = z - (a / b) * y;
	return d;
}
```
&emsp; 用上述代码就可以求出方程  ax + by = d = gcd(x, y) 的一组特殊解 $x\_0, y\_0$。而对于更一般的方程 ax + by = c。这个方程当且仅当 $d\mid c$ 时有解。我们就可以先求出ax + by = d 的特解 $x\_0, y\_0$。然后等式两边同时成上 $\frac{c}{d}$，就得到了$ax\_0\frac{c}{d} + by\_0 \frac{c}{d} = d\frac{c}{d}$。也就是:


$$
a \times\frac{c}{d}x_0 + b\times \frac{c}{d}y_0 = c
$$


&emsp; 然后我们就得到了ax + by = c 的一组特解 ：$\frac{c}{d}x\_0 ,\; \frac{c}{d}y\_0$。
&emsp; 事实上我们可以通过数学推导构造出ax + by = c 的通解和 $x\_0, y\_0$的关系：


$$
ax + by = c = \frac{c(ax_0 + by_0)}{ax_0 + by_0} = \frac{acx_0 + bcy_0 + kab - kab}{ax_0+by_0}
$$




$$
= \frac{a(cx_0+kb) + b(cy_0+ka)}{ax_0+by_0} = a \frac{cx_0+kb}{ax_0+by_0} + b\frac{cy_0-ka}{ax_0+by_0}
$$


&emsp; 又因为$ax\_0 + by\_0 = d$，所以：


$$
ax + by = c = a\frac{cx_0 + kb}{d} + b\frac{cy_0-ka}{d} = a  \Big(\frac{c}{d}x_0 + \frac{b}{d}k\Big) + b\Big( \frac{c}{d}y_0 + \frac{a}{d}k \Big)
$$


&emsp; 我们另：


$$
x = \frac{c}{d}x_0 + \frac{b}{d}k，y = \frac{c}{d}y_0 + \frac{a}{d}k
$$


&emsp; 这就是 ax + by = c的通解了。（其中 k 取遍整数集）

-----
参考文章：《算法竞赛进阶指南》
{% endraw %}
