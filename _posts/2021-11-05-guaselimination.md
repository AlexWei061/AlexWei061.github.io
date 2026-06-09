---
layout: post
title: "高斯消元"
date: 2021-11-05
tags: ["Math", "LinearAlgebra"]
summary: "前置芝士：关于线性代数的基本知识"
math: true
---
{% raw %}
# 高斯消元
&emsp; 前置芝士：[关于线性代数的基本知识](/posts/linearalgebra/)

&emsp; 高斯消元是在数学中一种用去求解线性方程组的方法，并且这个算法还能用来求出矩阵的秩和矩阵的逆矩阵。在说高斯消元之前，我们先要说一下什么是矩阵的初等行变换。

## 初等行变换
&emsp; 首先，我们知道 M 个 N 元一次方程组能够成一个线性方程组，而这些方程组的系数能够写成一个 M 行 N 列的 "系数矩阵"，这个系数矩阵再加上每个方程等号右侧的常数，可以写成一个 M 行 N + 1 列的 "增广矩阵"，举个例子：

$$
\begin{cases} x_1 + 2x_2 + x_3  =  7 \\ 2x_1 - x_2 + 3x_3 = 7 \\ 3x_1 + x_2 + 2x_3 = 18 \end{cases} \rightarrow \left[ \begin{array}{ccc|c} 1 & 2 & 1 & 7 \\ 2 & -1 & 3 & 7 \\ 3 & 1 & 2 & 18 \end{array} \right]
$$

&emsp; 对于一个增广矩阵，我们有以下三类操作：

1. 用一个非零的数乘上某一行
2. 把其中的一行的若干倍加到另一行上
3. 交换两行的位置

&emsp; 我们把这三类操作称为矩阵的 "初等行变换"。

## 回到正题
&emsp; 相信大家已经看出来了，初等行变换其实就是我们在小学就学过的 "加减消元法"。而高斯消元就是利用 "初等行变换" ~~加减消元~~ 求解方程组的方法。 我们还是用上面的个例子来模拟一下高斯消元的过程。

### 手动解方程
&emsp; 首先来看看我们手动解方程的做法：

$$ \begin{cases} x_1 + 2x_2 + x_3  =  7\quad...① \\ 2x_1 - x_2 + 3x_3 = 7 \quad ...②  \\ 3x_1 + x_2 + 2x_3 = 18 \quad ... ③ \end{cases} $$

&emsp; 首先 ① + ② × 2 得：

$$ 5x_1 + 7x_3 = 21 \quad ...④  $$

&emsp; ② + ③ 得：

$$ 5x_1 + 5x_3 = 25 \rightarrow x_1 + x_3 = 5 \quad ...⑤ $$

&emsp; ④ - 5 × ⑤ 得：

$$ 2x_3 = -4 \rightarrow x_3 = -2 $$


&emsp; 将 $x_3 = -2$ 带回 ④ 式得到 $x_1 = 7$

&emsp; 再把 $x_1 = 7, x_3 = -2$ 带入 ① 得到 $x_2 = 1$

&emsp; 所以解得：

$$ \begin{cases} x_1 = 7 \\ x_2 = 1 \\ x_3 = -2 \end{cases} $$



### 高斯消元解方程
&emsp; 然后我们再来看看怎么用初等行变换来化简矩阵之后得到方程的解（两种方法本质上是一样的）。首先我们初始的矩阵就是这样的：

$$ \left[ \begin{array}{ccc|c} 1 & 2 & 1 & 7 \\ 2 & -1 & 3 & 7 \\ 3 & 1 & 2 & 18 \end{array} \right] $$

&emsp; 交换 1、2 行：

$$ \left[ \begin{array}{ccc|c} 2 & -1 & 3 & 7 \\ 1 & 2 & 1 & 7  \\ 3 & 1 & 2 & 18 \end{array} \right] $$

&emsp; 第一行 × 2 加到第二行上：

$$ \left[ \begin{array}{ccc|c} 2 & -1 & 3 & 7 \\ 5 & 0 & 7 & 21  \\ 3 & 1 & 2 & 18 \end{array} \right] $$





&emsp; 第一行加到第三行上：

$$ \left[ \begin{array}{ccc|c} 2 & -1 & 3 & 7 \\ 5 & 0 & 7 & 21  \\ 5 & 0 & 5 & 25 \end{array} \right] $$

&emsp; 第三行除以 5：

$$ \left[ \begin{array}{ccc|c} 2 & -1 & 3 & 7 \\ 5 & 0 & 7 & 21  \\ 1 & 0 & 1 & 5 \end{array} \right] $$




&emsp; 从第二行里减去第三行 × 5：

$$ \left[ \begin{array}{ccc|c} 2 & -1 & 3 & 7 \\ 0 & 0 & 2 & -4  \\ 1 & 0 & 1 & 5 \end{array} \right] $$


&emsp; 交换2、3行，再交换1、2 行，并把第三行除以 2：

$$ \left[ \begin{array}{ccc|c} 1 & 0 & 1 & 5 \\ 2 & -1 & 3 & 7  \\ 0 & 0 & 1 & -2 \end{array} \right] $$

&emsp; 第一行减去第三行：

$$ \left[ \begin{array}{ccc|c} 1 & 0 & 0 & 7 \\ 2 & -1 & 3 & 7  \\ 0 & 0 & 1 & -2 \end{array} \right] $$

&emsp; 第二行减去第一行 × 2 再减去第三行 × 3：

$$ \left[ \begin{array}{ccc|c} 1 & 0 & 0 & 7 \\ 0 & -1 & 0 & -1  \\ 0 & 0 & 1 & -2 \end{array} \right] $$



&emsp; 第二行乘上 -1：

$$ \left[ \begin{array}{ccc|c} 1 & 0 & 0 & 7 \\ 0 & 1 & 0 & 1  \\ 0 & 0 & 1 & -2 \end{array} \right] $$

&emsp; 我们可以看到我们已经把左边的矩阵消元消成了一个单位矩阵，所以我们现在已经得到了这个方程的解。这个增广矩阵里包含的信息就是这样的：

$$ \begin{cases} x_1 + 0x_2 + 0x_3 = 7 \\ 0x_1 + x_2 + 0x_3 = 1 \\ 0x_1 + 0x_2 + x_3 = -2 \end{cases} $$


&emsp; 也就是：

$$ \begin{cases} x_1 = 7 \\ x_2 = 1 \\ x_3 = -2 \end{cases} $$



### 几种情况
&emsp; 当然，我们上面只是给出了一种很特殊的情况。在其他的方程组中，可能出现各种各样的神奇的情况，让这个方程组不可解。比如，在消元的过程中可能出现 $0 = d$ 的情况，其中 $d$ 是一个非零的常数。这就说明了这个线性方程组无解。还有其他的情况，比如我们可能找不到一个 $x_i$ 的吸入非零，单是 $x_1 \sim x_{i-1}$ 的系数都是零的方程（也就是左边无法化成单位矩阵的样子）。我们举个例子：

$$
\begin{aligned}
& \begin{cases} x_1 + 2x_2 - x_3 = 3 \\ 2x_1 + 4 x_ 2 - 8 x_ 3 = 0 \\ -x_1 - 2 x_ 2 + 6 x_3 = 2 \end{cases} \rightarrow \left[ \begin{array}{ccc|c} 1 & 2 & -1 & 3 \\ 2 & 4 & -8 & 0 \\ -1 & -2 & 6 & 2 \end{array} \right] \rightarrow \left[ \begin{array}{ccc|c} 1 & 2 & -1 & 3 \\ 0 &0 & 4 & 4 \\ 0 & 0 & 5 & 5 \end{array} \right] \\ \\
\rightarrow & \left[ \begin{array}{ccc|c} 1 & 2 &-1 & 3 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{array} \right] \rightarrow \left[ \begin{array}{ccc|c} 1 & 2 & 0 & 4 \\ 0 & 0 & 1 & 1 \\ 0 & 0 & 0 & 0 \end{array} \right]
\end{aligned}
$$

&emsp; 在上面的例子里面，找不到 $x_2$ 的系数非零，单是 $x_1$ 的系数为 0 的方程，方程组在消元后能被写为：

$$ \begin{cases} x_1 +2x_2 = 4 \\ x_3 = 1 \end{cases} $$

&emsp;在这个方程组里面， $x_2$ 取任何一个值都能找到一个 $x_1$ 让他们满足这个方程的需要，也就是说这个方程组有无数多组解。在这里我们把 $x_1,x_3$这样的变量称为 "**主元**"， $x_2$ 这样的变量称为 "**自由元**"。

&emsp; 在方程组里面，对于每个主元来说有在化简后的矩阵中有且仅有一个位置 $(i, j)$ 使得主元的系数不为 0 ，其他列的系数都为 0。第 $i$ 行的第 $i \sim j-1$ 列都是 0。所以综上所述，一个线性方程组解出来有三种情况：

1. 消元完成后存在系数全为 0 常熟不为 0 的行，方程组无解。
2. 若系数不全为 0 的行数恰好有 n 个，则说明主元有 n 个且方程组有唯一解
3. 若系数不全为 0 的行数有 $k < n$ 个，则说明主元有 k 个，自由元 $n-k$ 个。方程有无穷多组解。

&emsp; 根据我们的 "前置芝士"，我们又能知道，主元的个数也就是矩阵的秩，我们也把有 n 个主元的情况叫做矩阵满秩。

### 代码实现
&emsp; 来看看一道模板题：[P3389 [模板]高斯消元](https://www.luogu.com.cn/problem/P3389)

&emsp; 这道题就直接让你解线性方程组，我们考虑如何用代码实现高斯消元的过程。首先，显然我们需要一个二维数组来存储这个线性方程组的系数。然后用一个数组来存储答案（变量类型 double）。然后我们考虑这样做：

&emsp; 我们首先找到第一列中系数最大的来消掉其他的，并且为了方便进行消元，我们找到这个最大之后把这个系数变成 1。我们之所以取这一列最大的来进行消元，是因为我们用 double 类型存储变量必然会存在误差，用最大的来进行消元能把这个误差最小化。在文章的最下面我会给出一个不太严谨的证明 ~~这个证明适合意会（逃）~~，有兴趣的读者可以看看。

&emsp; 我们在把这个地方的系数变成1 之后，就能用这个式子消掉其他的式子，在最后我们就只需要用最后一个元的实际值不断向上带回前面的式子来计算其他元的值就好了。

&emsp; 代码就是这样：
```cpp
#include<bits/stdc++.h>
using namespace std;
#define EPS 1e-7

int n = 0;
double mmap[111][111] = { 0 };
double ans[111] = { 0 };

void solve(){
	for(int i = 1; i <= n; i++){ 
        int r = i;
        for(int j = i + 1; j <= n; j++)                        // 找到这一列的最大值
            if(fabs(mmap[r][i]) < fabs(mmap[j][i]))
                r = j;
        if(fabs(mmap[r][i]) < EPS){                            // 如果某一列全是 0 就无解 
            printf("No Solution"); return;
        }
        if(i != r) swap(mmap[i], mmap[r]);                     // 交换这两行 方便在本行进行消元 
        double div = mmap[i][i];
        for(int j = i; j <= n + 1; j++)                        // 系数置为 1
            mmap[i][j] /= div;
        for(int j = i + 1; j <= n; j++){                       // 消元 
            div = mmap[j][i];
            for(int k = i; k <= n + 1; k++)
                mmap[j][k] -= mmap[i][k] * div;
        }
    }
    ans[n] = mmap[n][n + 1];
    for(int i = n - 1; i >= 1; i--){                           // 回带
        ans[i] = mmap[i][n + 1];
        for(int j = i + 1; j <= n; j++)
            ans[i] -= (mmap[i][j] * ans[j]);
    }
    for(int i = 1; i <= n; i++) printf("%.2lf\n", ans[i]);
} 

int main(){
    scanf("%d", &n);
    for(int i = 1; i <= n; i++)
        for(int j = 1; j <= n + 1; j++)
            scanf("%lf", &mmap[i][j]);
    solve();
}
```

#### 神奇的证明
&emsp; 假设我们现在正在处理第 n 个未知数，此时我们又很多未知数，我们假设他们的系数分别为 $c_1, c_2, c_3, \cdots c_m$，我们考虑在选了 $c_i$ 之后就要把它的系数置成 1，那么这一行（第 i 行）中的其他所有系数也都要除以一个 $c_i$ 。然后我们就要用这一行的系数来消掉其他行。也就是说我们要让其他行中的系数每一个都减去一个当前行上对应的系数乘上某一个值。

&emsp; 用 $c_{i, 1}$ 消第 j 行，也就四十 $c_{j, 1}, c_{j, 2}, c_{j, 3}, \cdots c_{j, m}$ ，用表达式写出来就是让每一个 $c_{j, k}$ 变成这样：

$$ c_{j, k} - \frac{c_{j, 1}}{c_{i, 1}} \times c_{i, k} $$

&emsp; 这样的话如果 $c_{i, 1}$ 越大，那么 $\frac{c_j, 1}{c_{i, 1}}$ 期望越小。这样的话我们所失去的精度的期望也就越小。（逃）
{% endraw %}
