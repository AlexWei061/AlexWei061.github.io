---
layout: post
title: "线性 DP"
archive_title: "线性 DP"
section: "OI"
section_slug: "oi"
date: 2021-11-13
tags: ["DP", "linearDp"]
summary: "LIS"
math: true
---
{% raw %}
# 线性 DP
## LIS
&emsp; Longgest increasing subsequence，最长上升子序列。给定一个长度为 $N$ 的数列 $A$，求数值单调递增的子序列的长度最长是多少。$A$ 的任意子序列 $B$ 可以表示成这样：
$$ B = \lbrace A_{k_1}, A_{k_2}, \cdots A_{k_p} \rbrace \quad k_1 < k_2 < \cdots < k_p $$

&emsp; 记 F[i] 表示**已 A[i] 结尾的最长上升子序列**的长度。我们就有：
$$ F[i] = \max_{0 \leq j < i,，A[j] < A[i]}\lbrace F[j] + 1 \rbrace $$

&emsp; 其中 $F[0] = 0$，我们要的答案就是 $\max\limits_{1\leq i\leq N}\lbrace F[i] \rbrace$。

## LCS
&emsp; longgest common subsequence，最长公共子序列。给定两个长度分别为 $N$，$M$ 的字符串序列 $A$，$B$，求既是 $A$ 的子序列又是 $B$ 的子序列的字符串长度最长是多少。

&emsp; 记 $F[i, j]$ 表示 $A$ 的前缀 $A[1\sim i]$ 和 $B$ 的前缀 $B[1 \sim j]$ 的**最长公共子序列**的长度，我们就有：
$$ F[i, j] = \max \begin{cases} F[i, j-1] \\ F[i-1, j] \\ F[i-1][j-1]+1 \quad(A[i] = B[j]) \end{cases} $$

&emsp; 其中 $F[i, 0] = F[0, j] = 0$，我们要找的目标就是 $F[N, M]$

## 数字三角
&emsp; 给定一个有 $N$ 行的三角形矩阵 $A$，其中第 $i$ 行有 $i$ 列。从左上角出发，每次可以向下走或者向右下走，最后走到三角的底部。问经过的路径中数字的和的最大值。

&emsp; 记 $F[i, j]$ 表示从左上出发走到 $A[i, j]$ 的位置时的和的最大，我们就有：
$$ F[i, j] = \max \lbrace F[i-1, j], F[i-1, j-1] \rbrace + A[i, j] $$

&emsp; 其中 $F[1, 1] = A[1, 1]$，我们要求的答案就是 $\max\limits_{1 \leq j \leq N}\lbrace F[N, j] \rbrace$
{% endraw %}
