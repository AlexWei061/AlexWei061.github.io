---
layout: post
title: "Lucas 定理"
date: 2022-04-05
tags: ["Math", "NumberTheory"]
summary: "结论"
math: true
---
{% raw %}
# Lucas 定理

## 结论

&emsp; 结论很简单，就是一个简单的式子（$p$ 是质数）：

$$ C_n^m \equiv C_{n \mod p}^{m \mod p} \times C_{\frac{n}{p}}^{\frac{m}{p}} \pmod p $$

&emsp; 根据这个式子，我们就能快速计算 $p$ 较小的组合数了。

&emsp; 具体来说，现预处理出一个数组 $frac[i]$ 表示模 $p$ 下的 $i!$。然后我们就能写出一个 $\log$ 级别求组合数（要求 $n, m < p$）的函数：

```cpp
int qp(int a, int b, int p){                          // 快速幂 
    int ans = 1 % p;
    for(; b; b >>= 1){
        if((b & 1) == 1)
            ans = (long long)ans * a % p;
        a = (long long)a * a % p;
    }
    return ans;
}

int inv(int a, int p) { return qp(a, p - 2, p); }                         // 求逆元 (质数就是 x^{p-2}) 

int C(int n, int m, int p){                                               // 正常的组合数 
	if(n < m) return 0;
	return (long long)frac[n] * inv(frac[m], p) % p * inv(frac[n - m], p) % p;
}
```

&emsp; 然后根据我们上面给出的式子，我们发现 $C_{n \mod p}^{m \mod p}$ 是可以用 $C$ 这个函数解决的。那么我们很自然的想到递归计算 $C_{\frac np}^{\frac mp}$。就像这样：

```cpp
int lucas(int n, int m, int p){                                           // lucas 求组合数 
	if(n < m) return 0;
	if(!n) return 1;
	return (long long)lucas(n / p, m / p, p) * C(n % p, m % p, p) % p;
}
```

## 式子的证明

&emsp; 	考虑 $C_p^n \mod p$ 的取值，注意到：

$$ C_p^n = \frac{p!}{n!(p - n)!	} $$

&emsp; 分子的质因数分解中 $p$ 次项恰好为 $1$。所以只有 $n = 0 \lor n = p$ 的时候 $n!(p - n)!$ 的质因子含有 $p$。所以我们得到以下式子：

$$ C_p^n \mod p = [n = 0 \lor n = p] $$

&emsp; 进而：

$$
\begin{aligned}
(a + b) ^ p & \equiv \sum_{n = 0}^pC_p^na^nb^{p - n} \\
& \equiv \sum_{n = 0}^p [n = 0 \lor n = p]a^nb^{p - n} \\
& \equiv a^p + b^p \pmod p
\end{aligned}
$$

&emsp; 这个式子不仅适用于整数，还适用于多项式，比如说考虑二项式 $f^p(x) = (ax^n + bx^m)^p \mod p$ 的结果：

$$
\begin{aligned}
f^p(x) \equiv (ax^n + bx^m)^p & \equiv a^px^{pn} + b^px^{pm} \\
& \equiv ax^{pn} + bx^{pm} \equiv f(x^p) \pmod p
\end{aligned}
$$

&emsp; 考虑二项式 $(1 + x) ^ n \mod p$，那么 $C_n^m$ 就是在求 $x^m$ 次项的系数。使用上面证明过的引理，我们可以得到：

$$ (1 + x)^n \equiv (1 + x)^{p\lfloor \frac np \rfloor}(1 + x)^{n \mod p} \equiv (1 + x^p)^{\lfloor \frac np \rfloor}(1 + x)^{n \mod p} \pmod p $$

&emsp; 注意前面那一坨只有在 $p$ 的倍数的时候才会有取值，后面那一坨的最高此项是 $n \mod p \leq p - 1$，所以这俩玩意儿的卷积在任何一个位置最多有一种方式进行贡献，也就是说前者去 $p$ 的倍数次项，后者取余数次项，也就是上面最初给出的式子：

$$ C_n^m \equiv C_{\frac np}^{\frac mp} \times C_{n \mod p}^{m \mod p} \pmod p $$
{% endraw %}
