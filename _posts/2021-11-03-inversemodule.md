---
layout: post
title: "乘法逆元"
date: 2021-11-03
tags: ["Math", "NumberTheory"]
summary: "前置知识：扩展欧几里得算法"
math: true
---
{% raw %}
# 乘法逆元
&emsp; 前置知识：[扩展欧几里得算法](/posts/extendeuclid/)
### 定义：
>乘法逆元，是指数学领域群G中任意一个元素a，都在G中有唯一的逆元a‘，具有性质a×a'=a'×a=e，其中e为该群的单位元

（以上内容来自百度）

&emsp; 我们要考虑的是模 m 乘法逆元：若整数 b，m 互质，并且 $b \mid a$，则存在一个整数 x，使得 $ax \equiv a/b \pmod p$。我们就称 x 为 b 的模 m 乘法逆元。记做 $b^{-1}$

----

### 求解乘法逆元
&emsp; 因为：$a/b \equiv ab^{-1} \equiv a \times b/b \times b^{-1} \pmod  m$

&emsp; 所以：$b\times b^{-1} \equiv 1 \pmod m$

&emsp; 如果 m 是质数（后文用 p 代替），并且 b < p，根据欧拉定理（$b^{\phi(p)} \equiv 1 \pmod p$）我们知道 $b^{p-1} \equiv 1 \pmod p$，也就是说$b\times b^{p-2} \equiv 1 \pmod p$。因此，**当模数 p 为质数时，$b^{p-2}$ 就是 b 的模 p 乘法逆元**。

&emsp; 但是对于更一般的情况就只能通过求解一次同余方程来求得乘法逆元了。下面我们来说线性同余方程的解法：

&emsp; 对于这个方程：$ax \equiv b \pmod m$，它等价于 $m \mid (ax-b)$。我们令 ax - b = -ym。则有 ax + my = b。根据在扩展欧几里得算法里面讲过的 $B\acute{e}zout$ 定理及其推论，当且仅当 $gcd(a, m) \mid b$ 时，方程有解。在有解时，我们先用 exgcd 求出ax + my = gcd(a, m) 的一组特解 $x_0, y_0$。然后 $x = x_0 \frac{b}{gcd(a, m)}$就是原方程的一个解了。

&emsp; 在求解乘法逆元时就是求解方程：$ax \equiv 1\pmod b$时,先改写方程为$ax + by = 1$，所以我们知道方程当且仅当 a, b 互质时有解。先用 exgcd 得求出方程的一组特解 $x_0, y_0$。则 $x_0$ 就是原方程的一个解。

&emsp; 通解也很好想出来就是模 b 与 $x_0$ 同余的所有整数。所以我们如果想要 x 的最小整数解，我们就可以利用取模运算把 $x_0$ 移动到 [1, b) 的区间内：$x_0 = ((x_0 \;mod \; b) + b) \; mod \;b$
```cpp
#include<bits/stdc++.h>
using namespace std;

int a = 0, b = 0;

 1. List item

int exgcd(int a, int b, int &x, int &y){        // ax + by = gcd(a, b) --> (x, y)
	if(b == 0){
		x = 1; y = 0;
		return a;
	}
	int d = exgcd(b, a % b, x, y);
	int z = x; 
	x = y; y = z - (a / b) * y;
	return d;
}

int inver(int a, int b){                        // ax ≡ 1 (mod b) --> x
	int x = 0; int y = 0;
	exgcd(a, b, x, y);
	return (x % b + b) % b;
}

int main(){
	scanf("%d%d", &a, &b);
	printf("%d\n", inver(a, b));
	return 0;
}

```
---
### 另一种方法求逆元--递推

&emsp; 扩展欧几里得常用于求解单个数的逆元，而如果我们需要一堆数的逆元的话，我们一般就是用递推的方法进行求解。推导过程如下：

&emsp; 设：
$$ ik + r = p \rightarrow ik + r \equiv 0 \pmod p $$

&emsp; 两边同时乘上 $i^{-1}r^{-1}$ 得到：
$$ ik\times i^{-1}r^{-1} + r\times i^{-1}r^{-1} \equiv 0 \pmod p \rightarrow kr^{-1} + i^{-1} \pmod p $$

&emsp; 所以：
$$ i^{-1} \equiv -kr^{-1} \pmod p $$

&emsp; 因为我们设的是$ik + r = p$，所以 $r \in (0, i)$，r < i。所以在递推的过程中， $r^{-1}$ 肯定在之前就被求出来了。所以我们就可以由此确定 $i^{-1}$。下面证明递推式：

&emsp; 因为 $ik + r = p$ 所以 $k = \lfloor\frac{p}{i}\rfloor，r = p\mod i$，所以：
$$ i^{-1} \equiv - \lfloor \frac{p}{i} \rfloor \times (p \; mod \; i)^{-1} \pmod p$$

&emsp; 然后我们就可以得到递推式：
$$ i^{-1} = - \lfloor \frac{p}{i} \rfloor \times (p \; mod \; i) $$

&emsp; 如果我们要得到最小整数解，我们可以在乘法的第一项加上一个 p，就是这样：
$$ i^{-1} = (p - \lfloor \frac{p}{i} \rfloor) \times (p \; mod \; i) $$

&emsp; 代码如下：
```c
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100

int n = 0; int p = 0;
int inv[MAXN] = { 0 };

int main(){
	scanf("%d%d", &n, &p);
	inv[1] = 1;
	for(int i = 2; i <= n; i++){
		inv[i] = (p - p / i) * inv[p % i] % p;
		printf("%d ", inv[i]);
	}
	return 0;
}
```

----
参考书籍：《算法竞赛进阶指南》
{% endraw %}
