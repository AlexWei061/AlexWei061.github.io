---
layout: post
title: "启发式合并"
date: 2022-04-11
tags: ["Algorithm"]
summary: "普通的启发式合并"
math: true
---
{% raw %}
# 启发式合并

## 普通的启发式合并

&emsp; 假设现在有 $n$ 个元素，然后这些元素被分成了很多个集合，我们怎样高效的合并这些集合。这就需要用到启发式合并的思想。

### 流程

&emsp; 我们考虑合并 $S_1$ 和 $S_2$：

1. 若 $|S_1| < |S_2|$ 就将 $S_1$ 中的元素合并进 $S_2$。
2. 若 $|S_2| < |S_1|$ 就将 $S_2$ 中的元素合并进 $S_1$。

&emsp; 对，没错，算法流程就是这么简单~~

### 复杂度分析

&emsp; 我们来看看启发式合并为什么这么高效。首先，感性上理解，我们将小的集合的元素一个一个取出来再放进大的集合中显然要比反过来操作的时间更少。然后我们考虑比较严谨的证明： 假设有一个元素 $x \in S_1$ 发生了转移到 $S_2$ 中（显然现在 $|S_2| > |S_1|$），那么我们有 $|S_1| + |S_2| > 2|S_1|$，也就是说发生转移的元素所在的集合大小至少翻倍。那么显然这个元素在合并的过程中至多转移了 $\log n$ 次。这样我们就能发现整体的时间复杂度是 $O(n\log n)$ 的。是不是很高效 qwq~~

### 来看一道题

&emsp; 传送门：[luogu3201 HNOI2009 梦幻布丁](https://www.luogu.com.cn/problem/P3201)

&emsp; 初始给以一个长度为 $n$ 的数列，这个数列的每个数表示一个颜色，然后给你 $m$ 个操作，每次操作或是查询现在颜色的总段数（例如 $1, 2, 2, 1$ 就是有 $3$ 段颜色）或是给定 $x, y$ 表示将颜色 $x$ 的数全部变为 $y$ 颜色。

&emsp; 显然这道题就是一个链表的启发式合并，我们维护很多链表，每个链表中存出同一种颜色的数。然后每一次修改就是一次启发式合并，对于询问我们可以在修改的时候处理出来，具体来说就是：如果（假设 $x$ 是元素较少的那个集合） $x$ 中的一个元素旁边有有 $y$ 中的元素的话那么 $ans$ 就应该减 $1$。

&emsp; 这样虽然看起来很暴力，但是时间复杂度就是启发式合并的时间复杂度也就是 $O(n\log n)$ 的。看代码：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 1001000

inline int read(){
    int x = 0; char c = getchar();
    while(c < '0' or c > '9') c = getchar();
    while('0' <= c and c <= '9'){
        x = x * 10 + c - '0'; c = getchar();
    }
    return x;
}

int n = 0; int m = 0;
int a[MAXN] = { 0 }; int c[MAXN] = { 0 };
int h[MAXN] = { 0 }; int p[MAXN] = { 0 };
int f[MAXN] = { 0 };

int main(){
    n = in; m = in; int ans = 0;
    for(int i = 1; i <= n; i++){
        a[i] = in; c[a[i]]++; f[a[i]] = a[i];
        p[i] = h[a[i]]; h[a[i]] = i;
        if(a[i] != a[i - 1]) ans++;
    }
    while(m--){
        int op = in;
        if(op == 2) cout << ans << '\n'; 
        else{
            int x = in; int y = in;
            if(x == y) continue;
            if(c[f[x]] > c[f[y]]) swap(f[x], f[y]);
            if(!c[f[x]]) continue;
            x = f[x]; y = f[y];
            for(int i = h[x]; i; i = p[i]){
                if(a[i - 1] == y) ans--;
                if(a[i + 1] == y) ans--;
            } int j = 0;
            for(int i = h[x]; i; i = p[i]) a[j = i] = y;
            p[j] = h[y]; h[y] = h[x]; c[y] += c[x];
            h[x] = c[x] = 0;
        }
    }
    return 0;
}
```
{% endraw %}
