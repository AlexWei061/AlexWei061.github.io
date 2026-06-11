---
layout: post
title: "状压 DP"
archive_title: "状压 DP"
section: "OI"
section_slug: "oi"
oi_category: "DP"
oi_category_slug: "dp"
date: 2021-11-13
tags: ["DP", "stateOfCompressionDp"]
summary: "什么是状压"
math: true
---
{% raw %}
# 状压 DP

## 什么是状压
&emsp; 状态压缩是一种针对集合的 DP，可以利用一个整数对应的二进制数表示一个集合，用这个集合来表示当前状态，通过位运算来转移状态。

&emsp; 与普通 DP 相比，状态压缩 DP 的转移状态比较复杂，由于一些特点可以用二进制数来表示，从而达到状压的效果，思路与普通 DP 基本相同。

----

## 集合的整数表示
&emsp; 当集合元素较少时，可以用二进制数表示。集合 $\lbrace0, 1, 2, \cdots, n-1\rbrace$ 的子集 $S$ 可以用如下方式编码成整数。



$$
f(S) = \sum_{i \in S}2^i
$$



&emsp; (~~相当于二进制数 S 的第 i 位是 1~~)

&emsp; 这样表示后，集合的一些运算可以写成如下形式。

1. 空集 $\empty : 0$
2. 只含有第 $i$ 个元素的集合 $\lbrace i \rbrace : 1 \ll i$
3. 含有全部 $n$ 个元素的集合 $\lbrace 0, 1, 2, \cdots, n-1 \rbrace : (1 \ll n) - 1$
4. 判断第 $i$ 个元素是否属于集合 S : $if(S \gg i \& 1)$
5. 向集合 $S$ 加入第 $i$ 个元素 $S \cup \lbrace i \rbrace : S \mid 1 \ll i$
6. 从集合 $S$ 中移除第 $i$ 个元素 $S \setminus \lbrace i \rbrace : S \& ^{\sim}(1 \ll i)$
7. 集合 $S$ 和 $T$ 的并集 $S \cup T : S \mid T$
8. 集合 $S$ 和 $T$ 的交集 $S \cap T : S \& T$

&emsp; 此外，遍历集合 $S$ 的所有状态:<br><br>
&emsp; for(int S = 0; S < (1 << n); S++){<br>
&emsp; &emsp; &emsp; //处理语句<br>
&emsp; }

----
{% endraw %}
