---
layout: post
title: "回文"
archive_title: "CSP2021T3回文"
section: "OI"
section_slug: "oi"
oi_category: "Solutions"
oi_category_slug: "solutions"
date: 2022-07-21
tags: ["Solution", "DS"]
summary: "传送门：CSP2021 T3 回文"
math: true
---
{% raw %}
# 回文

&emsp; 传送门：[CSP2021 T3 回文](https://www.luogu.com.cn/problem/P7915)

## 题目大意

&emsp; 给定一个长度为 $2n$ 的数组，在这个数组中，数字 $1, 2, 3, \cdots, n$ 分别出现两次。

&emsp; 现在有两个操作，一是把 $a$ 的开头放到 $b$ 数组的结尾，二是把 $a$ 的结尾放到 $b$ 的结尾。要求使得 $b$ 最后是一个回文数组，并且要求字典序最小。

&emsp; 最后输出方案。

## 分析

&emsp; 假设我们第一步是 $L$（第一步是 $R$ 其实也差不多， 这里就以是 $L$ 为例）。我们显然可以 $O(n)$ 在数组中找到一个点 $x$ 满足 $x \in [2, 2n] \land a\_1 = a\_x$。然后我们就可以发现，因为我们第一步把 $a\_1$ 放到了 $b$ 数组的开头，所以 $b$ 数组的结尾就一定是我们找到的 $a\_x$。所以我们就通过这两个点把数组分成了 $2$ 个栈，分别是：

1. **栈顶 $\to$ 栈底** : $a\_2 \to a\_{x - 1}$
2. **栈顶 $\to$ 栈底** : $a\_{2n} \to a\_{x + 1}$

&emsp; 我们就以样例中的第一组为例子：



$$
\color{red}{4}\color{white}{, 1, 2,} \color{red}{4} \color{white}{,  5, 3, 1, 2, 3, 5}
$$



&emsp; 我们弄出来的两个栈就是：

![](/assets/images/blog/CSP2021T31.png)

&emsp; 然后我们就可以继续下面的工作了 ~~似乎变得很简单了qwq~~。

&emsp; 我们把这两个栈看成双端队列，然后找同时再栈底和栈顶都存在的数字（可能有两对或者一对，一对就直接搞，两队就选字典序小的搞）。同时弹出它们两个然后记录一下是怎么弹的输出就好了。

&emsp; 如果没看懂上面的文字描述的可以看下面的完整的弹栈图解（还是以刚才的数列为例）：

![](/assets/images/blog/CSP2021T32.png)

&emsp; 显然这样做的复杂度是 $O(n)$ 的。

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
#define in read()
#define MAXN 500500 << 1

inline int read(){
	int x = 0; char c = getchar();
	while(c < '0' or c > '9') c = getchar();
	while('0' <= c and c <= '9'){
		x = x * 10 + c - '0'; c = getchar();
	}
	return x;
}

int T = 0;
int n = 0;
int a[MAXN] = { 0 };
char ans[MAXN];

bool work(int l1, int r1, int l2, int r2){
	for(int i = 1; i < n; i++){
		if(l1 <= r1 and ((l2 <= r2 and a[l1] == a[l2]) or (l1 < r1 and a[l1] == a[r1])))
			if(l1 < r1 and a[l1] == a[r1]){
				l1++, r1--;
				ans[i] = 'L', ans[2 * (n - 1) - i + 1] = 'L';
			}
			else{
				l1++, l2++;
				ans[i] = 'L', ans[2 * (n - 1) - i + 1] = 'R';
			}
		else if(l2 <= r2 and ((l1 <= r1 and a[r1] == a[r2]) or (l2 < r2 and a[l2] == a[r2])))
			if(l2 < r2 and a[l2] == a[r2]){
				l2++, r2--;
				ans[i] = 'R', ans[2 * (n - 1) - i + 1] = 'R';
			}
			else{
				r1--, r2--;
				ans[i] = 'R', ans[2 * (n - 1) - i + 1] = 'L';
			}
		else return 0;
	}
	return 1;
}

int main(){
	T = in;
	while(T--){
		n = in; int x1 = -1, x2 = -1;
		for(int i = 1; i <= 2 * n; i++) a[i] = in;
		for(int i = 1; i <= 2 * n; i++) ans[i] = 0;
		for(int i = 2; i <= 2 * n; i++) if(a[i] == a[1]) { x1 = i; break; }
		for(int i = 1; i < 2 * n; i++) if(a[i] == a[2 * n]) { x2 = i; break; }
		if(work(2, x1 - 1, x1 + 1, 2 * n)) printf("L%sL\n", ans + 1);
		else if(work(1, x2 - 1, x2 + 1, 2 * n - 1)) printf("R%sL\n", ans + 1);
		else puts("-1");
	}
	return 0;
} 
```
{% endraw %}
