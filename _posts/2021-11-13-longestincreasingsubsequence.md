---
layout: post
title: "最长不下降子序列 LIS"
archive_title: "最长上升子序列"
section: "OI"
section_slug: "oi"
oi_category: "DP"
oi_category_slug: "dp"
date: 2021-11-13
tags: ["DP", "linearDp"]
summary: "Longest Increasing Subsequence"
math: true
---
{% raw %}
## 最长不下降子序列 LIS 
~~Longest Increasing Subsequence~~

令 $f[i]$ 表示以 $a[i]$ 结尾的最长不下降子序列。这样对于 $\forall a[i]$ 来说有两种情况:

1. 如果存在 $a[i]$ 之前的元素 $a[j] (j < i)$ ，使得 $a[j] < a[i]$ 且 $f[j+1] > f[i]$ 那么就把 $a[i]$ 跟在以 $a[j]$ 结尾的 $LIS$ 后面，形成一条更大的不下降子序列。即 $f[i] = f[j] + 1$
2. 如果 $a[i]$ 比之前的元素都要大那么就只能自己形成一条不下降子序列，长度为1.

由此写出动态转移方程:
$$ f[i] = max\lbrace 1, f[j] + 1 \rbrace ， 其中 j \in \lbrace j \in N^* \mid 1 \leq j < i \rbrace $$

边界：
$$ f[i] = 1 (i > j, j \in \lbrace j \in N^* \mid 1 \leq j < i \rbrace) $$

整体时间复杂度 :
$$ O(n^2) $$

代码请参考 cpp/practice/SeniorHigh1/semester1/September2021/20210910/LIS.cpp
{% endraw %}
