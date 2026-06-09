---
layout: post
title: "SurfixArray"
archive_title: "后缀数组"
section: "OI"
section_slug: "oi"
oi_category: "String"
oi_category_slug: "string"
date: 2022-03-12
tags: ["String"]
summary: "upd：20220317 更正了之前求解 lcp 的错误。"
math: true
---
{% raw %}
# SurfixArray
&emsp; upd：20220317 更正了之前求解 $lcp$ 的错误。

&emsp; 板子传送门：[luogu P3809 后缀排序](https://www.luogu.com.cn/problem/P3809)

&emsp; 题目大概意思如下：

&emsp; 读入一个长度为 $n$ 的由大小写英文字母或数字组成的字符串，请把这个字符串的所有非空后缀按字典序（用 ASCII 数值比较）从小到大排序，然后按顺序输出后缀的第一个字符在原串中的位置。位置编号为 $1$ 到 $n$。我们将我们要求的目标数组称为**后缀数组**。

## 构造后缀数组
&emsp; 现在我们已经知道了后缀数组的定义了，接下来我们来看看如何构造后缀数组吧。

### 1.很显然的暴力
&emsp; 直接提取出这个字符串所有的后缀，然后暴力排序就好了嘛（~~不要告诉我你不会字符串操作或者你不会排序qwq~~）。显然这样的复杂度就是 $O(n^2 \log n)$ 的。直接上代码：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100

string s;
string a[MAXN];
int SA[MAXN] = { 0 };

int main(){
	cin >> s;
	int len = s.size();
	for(int i = 0; i < len; i++)
		for(int j = 0; j <= len - i + 1; j++)
			a[i] = s.substr(i, j);
	sort(a, a + len);
	for(int i = 0; i < len; i++) SA[i] = len - a[i].size() + 1;
	for(int i = 0; i < len; i++) cout << SA[i] << ' ';
	puts("");
	return 0;
} 
```

&emsp; 然后我们就愉快的 $T$ 掉了 $8$ 个点，并且愉快的得到了 $27$ 分的高分。

### 2.更快的构造方法

&emsp; 虽然我们已经拿到了 $27$ 分的高分，但是我们显然是不能满足与 $27$ 分的。所以我们考虑如何能更快的构造出这个后缀数组。我们看出上面的代码中，我们不能很快的比较两个字符串的大小，也就是说因为我们用的 $sort$  函数显然是暴力比较两个字符串大小的（也就是一位一位的比较）。我们考虑用二分加字符串 $Hash$ 来优化比较过程。

&emsp; 首先我们知道我们构造出了一个字符串的 $Hash$ 之后，我们就可以 $O(1)$ 比较这个字符串的两个子串是否相等。所以如果我们二分答案，那么我们就可以做到 $O(\log n)$ 完成一次比较。那么总的时间复杂度就是 $O(n\log^2n)$。上代码：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define mod 233
#define ull unsigned long long
#define MAXN 1001000

int n = 0;
ull base[MAXN] = { 0 };                                                   // base[i] = mod ^ i
ull Hash[MAXN] = { 0 };                                                   // 哈希值 
char str[MAXN];
int SA[MAXN] = { 0 };

inline ull get(int l, int r){                                             // O(1) 求子串哈希 
	return Hash[r] - Hash[l - 1] * base[r - l + 1];
}

bool comp(int x, int y){                                                  // 手写比较函数 
    int l = -1, r = min(n - x, n - y);                                    // 在两个后缀的长度之内二分 
    while(l < r){                                                         // 二分 
        int mid = (l + r + 1) >> 1;
        if(get(x, x + mid) == get(y, y + mid)) l = mid;                   // 前半部分相同 
        else r = mid - 1;                                                 // 不同 
    }
    if(l > min(n - x, n - y)) return x > y;                               // 左端点超过了右端点 说明短的是长的的子串 那么按照字符串长度来排名 
    else return str[x + l + 1] < str[y + l + 1];                          // 没超过 就按照第一个不同的地方的大小比较 
}

int main(){
    scanf("%s", str + 1);
    n = strlen(str + 1);
    base[0] = 1;
    for(int i=1;i<=n;i++){
        base[i] = base[i - 1] * mod;
        Hash[i] = Hash[i - 1] * mod + str[i];
        SA[i] = i;
    }
    sort(SA + 1, SA + n + 1, comp);
    for(int i = 1; i <= n; i++) printf("%d ", SA[i]);
    return 0;
}
```

&emsp; 这样我们就成功的拿到了 $82$ 分的高分。（~~我是不会告诉你把 sort() 改成 stable_sort() 就能 A 掉的qwq~~）

### 3.更更更快的构造方法
&emsp; 前两种构造方法本质上其实都是暴力做法。我们如果要真正过掉这道题的话就需要想出一种新的更神奇玄妙的做法。

&emsp; 废话不多说，我们直接来一个例子来看一下如何构造吧。比如说下面这个字符串：

$$ aababababb $$

&emsp; 首先我们知道，以 $a$ 开头的后缀是必定比以 $b$ 开头的后缀要小的。所以我们把所有的 $a$ 位置上标上一个数组 "1"，把所有 $b$ 标上一个数字 “2”，就像这样：

||||||||||
|-|-|-|-|-|-|-|-|-|
| a | a | b | a | b | a | a | b | b |
| 1 | 1 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 

&emsp; 然后我们又知道， $aa$ 开头的必定小于 $ab$ 开头的 小于 $ba$ 开头的 小于 $bb$ 开头的。所以我们现在把这些数字和它们的后面一个数字组成一个二元组，像这样：

||||||||||
|-|-|-|-|-|-|-|-|-|
| a | a | b | a | b | a | a | b | b |
| 1 | 1 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 
|(1, 1)|(1, 2)|(2, 1)|(1, 2)|(2, 1)|(1, 1)|(1, 2)|(2, 2)|(2, 0)|

&emsp; 然后我们对于所有的 $(1, 1)$ 下面标上 $1$，所有的 $(1, 2)$ 下面标上 $2$，所有 $(2, 0)$ 下面标上 $3$，所有的 $(2, 1)$ 标上 $4$，所有的 $(2, 2)$ 标上 $5$。也就是这样

||||||||||
|-|-|-|-|-|-|-|-|-|
| a | a | b | a | b | a | a | b | b |
| 1 | 1 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 
|(1, 1)|(1, 2)|(2, 1)|(1, 2)|(2, 1)|(1, 1)|(1, 2)|(2, 2)|(2, 0)|
|1|2|4|2|4|1|2|5|3|

&emsp; 然后我们继续上述的步骤，写二元组（这一次的二元组就要隔一个数字写了，因为现在的每个编号代表着两个字符，所以我们应该隔开一个写）：

||||||||||
|-|-|-|-|-|-|-|-|-|
| a | a | b | a | b | a | a | b | b |
| 1 | 1 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 
|(1, 1)|(1, 2)|(2, 1)|(1, 2)|(2, 1)|(1, 1)|(1, 2)|(2, 2)|(2, 0)|
|1|2|4|2|4|1|2|5|3|
|(1, 4)|(2, 2)|(4, 4)|(2, 1)|(4, 2)|(1, 5)|(2, 3)|(5, 0)|(3, 0)|

&emsp; 然后继续标号：

||||||||||
|-|-|-|-|-|-|-|-|-|
| a | a | b | a | b | a | a | b | b |
| 1 | 1 | 2 | 1 | 2 | 1 | 1 | 2 | 2 | 
|(1, 1)|(1, 2)|(2, 1)|(1, 2)|(2, 1)|(1, 1)|(1, 2)|(2, 2)|(2, 0)|
|1|2|4|2|4|1|2|5|3|
|(1, 4)|(2, 2)|(4, 4)|(2, 1)|(4, 2)|(1, 5)|(2, 3)|(5, 0)|(3, 0)|
|1|4|8|3|7|2|5|9|6|

&emsp; 这样我们发现现在的标号已经没有重复的了，所以现在的标号就应该是我们要求的 $SA$ 数组了。这种做法的正确性是很显然的（~~其实是因为作者不知道怎么证qwq~~）。大家可以再写几个字符串自己去验证一下。然后，上代码：

```cpp
// 因为 FSYo 大佬的代码有注释我就直接放过来了
#include<bits/stdc++.h>
using namespace std;
#define MAXN 1000050

int n = 0; int m = 0;
char s[MAXN];                                          // 原串
int x[MAXN] = { 0 };                                   // 排序时需要用
int y[MAXN] = { 0 };
int tmp[MAXN] = { 0 };
int c[MAXN] = { 0 };                                   // 排序时的桶
int SA[MAXN] = { 0 };

void Sort(){
	for(int i = 1; i <= m; i++) c[i] = 0;
	for(int i = 1; i <= n; i++) c[x[i]]++;
	for(int i = 2; i <= m; i++) c[i] += c[i - 1]; 
	/* c[i] 求前缀和 , 表示以第一关键字排到第几名 
	比如有 3个a , 2个b , 那么第一关键字为 b 的第二关键字最大的就是第 5名 */ 
	for(int i = n; i >= 1; i--) SA[c[x[y[i]]]--] = y[i];
	// 接着把存b的桶减一个 ,  第一关键字为 b 的第二关键字第二大的就是第 4名 
}

void getSA(){
	//y[i] 表示第二关键字为第i名的在的后缀位置 
	for(int i = 1; i <= n; i++) x[i] = s[i] , y[i] = i;
	Sort();
	for(int k = 1; k <= n; k <<= 1){
		int cnt = 0; // y 数组下标
		for(int i = n - k + 1; i <= n; i++) y[++cnt] = i; // 最右边一块的第二关键字为 0
		for(int i = 1; i <= n; i++) if(SA[i] > k) y[++cnt] = SA[i] - k;
		/*排名为 i 的数 在数组中是否在第k位以后
		如果满足 (sa[i] > k) 那么它可以作为别人的第二关键字，就把它的第一关键字的位置添加进 y 就行了*/
		Sort(); swap(x, tmp); x[SA[1]] = 1; int num = 1;
		for(int i = 2; i <= n; i++){
			if(tmp[SA[i]] == tmp[SA[i - 1]] and tmp[SA[i] + k] == tmp[SA[i - 1] + k])
			// 第一二关键字都相同 
				x[SA[i]] = num;
			else x[SA[i]] = ++num;
		} m = num; 
	}
}
int main(){
	scanf("%s",s + 1);
	n = strlen(s + 1); m = 127;
	getSA();
	for(int i = 1; i <= n; i++) printf("%d ", SA[i]);
	return 0;
} 
```

&emsp; 这样做的时间复杂度显然就是 $O(n\log n)$ 的啦，这样我们就愉快的 A 掉这个题啦（~~我是不会告诉你其实有线性构造 SA 的方法但是我不会做的qwq~~）。

## SA 与 LCP

&emsp; 所谓 $lcp$ 也就是 longgest common prefix，就是最长公共前缀的意思啦（~~我觉得其实叫 longgest same prefix (lsp) 也可以的qwq~~）。我们现在来观察一下一个字符串中的所有后缀的 $lcp$ 都有什么性质吧。

&emsp; 首先我们还是以上面计算 $SA$ 时的字符串来举例子。我们已经求得了这个字符串的 $SA$ 为：

||||||||||
|-|-|-|-|-|-|-|-|-|
| a | a | b | a | b | a | a | b | b |
|1|4|8|3|7|2|5|9|6|

&emsp; 现在我们按照这个后缀数组的顺序写出按字典序排列的所有后缀，像这样：

&emsp; 1. aababaabb

&emsp; 2. aabb

&emsp; 3. abaabb

&emsp; 4. ababaabb

&emsp; 5. abb

&emsp; 6. b

&emsp; 7. baabb

&emsp; 8. babaabb

&emsp; 9. bb

&emsp; 然后我们可以很容易的算出这些东西两两之间的 $lcp$ 是多少：

|lcp|1|2|3|4|5|6|7|8|9|
|-|-|-|-|-|-|-|-|-|-|
|1|9|3|1|1|1|0|0|0|0|
|2|$\times$|4|1|1|1|0|0|0|0|
|3|$\times$|$\times$|6|3|2|0|0|0|0|
|4|$\times$|$\times$|$\times$|8|2|0|0|0|0|
|5|$\times$|$\times$|$\times$|$\times$|3|0|0|0|0|
|6|$\times$|$\times$|$\times$|$\times$|$\times$|1|1|1|1|
|7|$\times$|$\times$|$\times$|$\times$|$\times$|$\times$|5|2|1|
|8|$\times$|$\times$|$\times$|$\times$|$\times$|$\times$|$\times$|7|1|
|9|$\times$|$\times$|$\times$|$\times$|$\times$|$\times$|$\times$|$\times$|2|

&emsp; 显然这个表下半部分个上半部分是对称的，所以我就用 "$\times$" 来标记表的下边部分而不写出具体数字。

&emsp; 我们可以很容易发现，在表的上半部分中，每一行中的数字都是单调递减的，而且每一列中，所有数都是单调递增的。如果这样的规律是普遍适用的话，我们就能得到这样一个式子（$1 \leq i < j  \leq n$）：

$$
\begin{aligned}
\forall 1≤i<j<k≤n,lcp(sa[i],sa[k])=\min\{ lcp(sa[j],sa[k])\}
\end{aligned}
$$

&emsp; 于是我们就能推出一下的式子（设 $h_i = lcp(sa[i-1], sa[i])$）：

$$ \forall 1 \leq i < j \leq n, lcp(sa[i], sa[k]) = \min_{k=i+1}^j lcp(sa[k-1], sa[k]) = \min_{k=i+1}^j h_k $$

&emsp; 证明我就不写了，因为证明很简单，反证(~~反正~~)大家都能证书来qwq。（~~其实就是因为我懒~~）。有了这个式子，我们就把求两个后缀的 $lcp$ 的问题转化成了一个区间最小值的问题。是不是很神奇呢？	用 st 表就能做到 $O(n\log n)$ 预处理， $O(1)$ 查询了。

&emsp; 现在我们的问题是如何快速求解 $h_i$ 这个数组。其实这个也很简单，我们先暴力计算（就是一位一位的比较） $h_2 = lcp(sa[1], sa[2]) = 3$。然后我们把 $sa[1]$ 和 $sa[2]$ 都退掉一个第一个字符：

$$ sa[1] = aababaabb \rightarrow ababaabb = sa[4] $$

$$ sa[2] = aabb \rightarrow abb = sa[5] $$

&emsp; 于是我们知道 $h_5 = lcp(sa[4], sa[5])$ 就是 $3 - 1 = 2$。然后我们继续退：

$$ sa[4] = abababb \rightarrow babaabb = sa[8] $$

$$ sa[5] = abb \rightarrow bb = sa[9] $$

&emsp; 然后我们就知道 $h_9 = lcp(sa[8], sa[9])$ 就是 $2 - 1 = 1$。和上面一样，接着退：

$$ sa[8] = bababb \rightarrow abaabb = sa[3] $$

$$ sa[9] = bb \rightarrow b = sa[6] $$

&emsp; 于是我们就知道 $lcp(sa[3], sa[6])$ 就是 $1 - 1 = 0$。但是我们要求的显然是相邻的两个后缀的 $lcp$ 所以我们根据上面的式子（就是这个： $\forall 1 \leq i < j \leq n, lcp(sa[i], sa[k]) = \min\limits_{k=i+1}^j lcp(sa[k-1], sa[k]) = \min\limits_{k=i+1}^j h_k$）可以知道 $lcp(sa[3], sa[4]) \geq lcp(sa[3], sa[6])$，所以我们就从 0 暴力扩展求出 $lcp(sa[3], sa[4]) = 3$。然后继续退：

$$ sa[3] = abaabb \rightarrow baabb = sa[7] $$

$$ sa[4] = ababaabb \rightarrow babaabb = sa[8] $$

&emsp; 所以 $lcp(sa[7], sa[8])$ 显然就是 $3 - 1 = 2$，然后继续向下扩展发现扩展不了所以 $lcp(sa[7], sa[8]) = 2$，然后继续：

$$ sa[7] = baabb \rightarrow aabb = sa[2] $$

$$ sa[8] = babaabb \rightarrow abaabb = sa[3] $$

&emsp; 所以我们知道 $lcp(sa[2], sa[3]) = 2 - 1 = 1$。然后继续退：

$$ sa[2] = aabb \rightarrow abb = sa[5] $$

$$ sa[3] = abaabb \rightarrow baabb = sa[7] $$

&emsp; 所以我们知道 $lcp(sa[5], sa[7]) = 1 - 1 = 0$。然后和上面计算 $lcp(sa[3], sa[4])$ 时同理： $lcp(sa[5], sa[6]) \geq lcp(sa[5], sa[7])$。所以我们就接着暴力扩展得出 $lcp(sa[5], sa[6]) = 0$。然后接着退：

$$ sa[5] = abb \rightarrow bb = sa[9] $$

$$ sa[6] = b \rightarrow NULL = 啥也不是 $$

&emsp; 我们发现现在退出来什么都不是了，那么我们就直接从没有求解过的地方直接暴力计算 $lcp(sa[6], sa[7]) = 1$。

&emsp; 现在我们就求出了我们的 $h$ 数组：

|lcp(1, 2)|lcp(2, 3)|lcp(3, 4)|lcp(4, 5)|lcp(5, 6)|lcp(6, 7)|lcp(7, 8)|lcp(8, 9)|
|-|-|-|-|-|-|-|-|
|3|1|3|2|0|1|2|1|


&emsp; 这样计算的时间复杂度就应该是 $O(n)$ 的。你可以把这个过程想象成我们每向前走几步就往回退一步，而且我们最多退 $n$ 步所以我们最多向前走 $2n$ 步。所以复杂度就是 $O(n)$。
{% endraw %}
