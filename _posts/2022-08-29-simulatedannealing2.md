---
layout: post
title: "模拟退火"
archive_title: "模拟退火2"
section: "OI"
section_slug: "oi"
oi_category: "Optimization"
oi_category_slug: "optimization"
date: 2022-08-29
tags: ["Algorithm"]
summary: "上一篇的传送门：模拟退火"
math: true
---
{% raw %}
# 模拟退火
&emsp; 上一篇的传送门：[模拟退火](/posts/simulatedannealing/)

&emsp; 在上一篇写的模拟退火中我比较详细的写出了模拟退火的物理原理根据和主要的实现流程，但是没有具体的例子，所以在这里我们就用一道比较简单的题来简单的实现以下模拟退火的代码吧。

## 题目描述

&emsp; 传送门：[[JSOI2004] 平衡点 / 吊打XXX](https://www.luogu.com.cn/problem/P1337)

&emsp; 有n个重物，每个重物系在一条足够长的绳子上。每条绳子自上而下穿过桌面上的洞，然后系在一起。图中X处就是公共的绳结。假设绳子是完全弹性的（不会造成能量损失），桌子足够高（因而重物不会垂到地上），且忽略所有的摩擦。

&emsp; 问绳结X最终平衡于何处。

&emsp; 注意：桌面上的洞都比绳结X小得多，所以即使某个重物特别重，绳结X也不可能穿过桌面上的洞掉下来，最多是卡在某个洞口处。

## 分析

&emsp; 一眼计算几何，但是我不会计算几何...

&emsp; 首先要平衡显然节点 $(x, y)$ 要受力平衡，所以可以列出两个节点受力平衡的方程，也就是正交分解，纵向平衡和横向平衡两个方程，但是这样感觉会非常难写。

&emsp; 再考虑一下受力分析的方程比较难写那也可以写能量的方程嘛，众所周知，平衡状态其实就是能量最低态，所以我们考虑让这个系统的能量最小。

&emsp; 然后我们发现，这个系统中只需要考虑重力势能，于是我们令桌面为零势面，绳长为 $L$，节点坐标为 $(x, y)$,于是就是让这个式子取到最小值：



$$
\sum_{i = 1}^n \left(\sqrt{(x - x_i)^1 + (y - y_i)^2} - L \right) m_i g
$$



&emsp; 稍微化简一下：



$$
= \sum_{i = 1}^n \left(\sqrt{(x - x_i)^2 + (y - y_i)^2}\right)m_ig - \sum_{i = 1}^n m_igL
$$



&emsp; 然后我们就会发现，后面减掉的那一坨就是个常数，所以不用管，于是我们就只需要让下面这个式子最小就可以了：



$$
\sum_{i = 1}^n \left(\sqrt{(x - x_i)^2 + (y - y_i)^2}\right)m_i
$$



&emsp; 但是这个函数的性质我们也是完全不知道，要求出这个玩意儿的最小值看起来用正常的方法就有一点困难了，于是我们可以考虑模拟退火，具体来说就是这样：

1. 设定初始参数：初始温度 $T$，每次下降温度的幅度 $kt$
2. 开始退火：目前最优答案 $ans$，当前状态 $now$，和当前答案和当前最有答案之差 $delta = now - ans$，然后分两种情况讨论：
3. 如果 $delta < 0$ 那么接受当前答案为新的最优答案
4. 如果 $delta > 0$ 以 $e^{-\frac{delta}{kT}}$ 的概率接受当前答案为新的最优答案

&emsp; 然后就能跑出最优解了，这里如果你的退火跑得很快的话你还可以考虑多跑几次以增加你跑到最优解的概率。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 1010
#define ESP 1e-14

inline double read(){
	double x = 0; int f = 0; char c = getchar();
	while(c < '0' or c > '9'){
		if(c == '-') f = 1; c = getchar(); }
	while('0' <= c and c <= '9')
		x = x * 10 + c - '0', c = getchar();
	return f ? -x : x;
}

int n = 0;
double ans = 1e18;
double ansx = 0, ansy = 0;
double x[MAXN] = { 0 };
double y[MAXN] = { 0 };
double m[MAXN] = { 0 };

double calc(double xx, double yy){
	double res = 0;
	for(int i = 1; i <= n; i++){
		double dx = xx - x[i], dy = yy - y[i];
		res += sqrt(dx * dx + dy * dy) * m[i]; 
	}
	return res;
}

void sa(){
	double x = ansx, y = ansy;
	double T = 2000, dt = 0.993;
	while(T > ESP){
		double nx = x + ((rand() << 1) - RAND_MAX) * T;
		double ny = y + ((rand() << 1) - RAND_MAX) * T;
		double now = calc(nx, ny);
		double delta = now - ans;
		if(delta < 0) ansx = x = nx, ansy = y = ny, ans = now;
		else if(exp(-delta / T) * RAND_MAX > rand()) ansx = x = nx, ansy = y = ny, ans = now;
		T *= dt;
	}
}

int main(){
	srand(time(0));
	n = in;
	for(int i = 1; i <= n; i++){
		x[i] = in, y[i] = in, m[i] = in;
		ansx += x[i], ansy += y[i];
	} ansx /= n, ansy /= n;
	sa();
	printf("%.3f %.3f\n", ansx, ansy);
	return 0;
} 
```

&emsp; 完结撒花！！！
{% endraw %}
