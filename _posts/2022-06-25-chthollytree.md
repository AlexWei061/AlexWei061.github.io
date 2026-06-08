---
layout: post
title: "珂朵莉树"
date: 2022-06-25
tags: ["DS", "Tree"]
summary: "珂朵莉是世界上最幸福的女孩 qwq！！！"
math: true
---
{% raw %}
# 珂朵莉树

&emsp; 珂朵莉是世界上最幸福的女孩 qwq！！！

## 关于她的名字

&emsp; 起源是这里：[C. Willem, Chtholly and Seniorious](https://codeforces.com/problemset/problem/896/C)

&emsp; 当然， $luogu$ 上也有这道题：[C. Willem, Chtholly and Seniorious](https://www.luogu.com.cn/problem/CF896C)

&emsp; 简单的来说就是让你设计一个数据结构，可以进行以下操作：

1. 区间内所有的数加上一个数
2. 将区间内所有的数都修改为 $x$
3. 求区间第 $k$ 小
4. 输出区间内每个数字的 $k$ 次方和模 $p$，也就是 $(\sum\limits_{i = l}^r a_i^x) \mod p$

&emsp; **并且这道题的数据保证是随机的。**

&emsp; 而这道题就是第一道以 **珂朵莉树** 为正解的题目，而这道题的题目又是以《末日时在做什么？有没有空？可以来拯救吗？》中的女主珂朵莉为背景的，所以这种数据结构也就被称为 **珂朵莉树** 了。

## 算法分析

&emsp; 看到这个题目，我们想到的都应该是线段树，树状数组，分块这类的经典的维护区间问题的数据结构。但是这道题内的几个操作似乎用这些正常的数据结构不是很好维护，所以我们就要引入这样一个神秘的数据结构。

&emsp; 首先，我们能够很明显的注意到这道题的**数据是保证随机的** ~~因为我把这句话加粗了 (bushi 。~~ 并且这里有一个操作叫做吧区间内所有的树都变成 $x$ （后面我们把这个操作叫做区间推平），有了这个操作，珂朵莉树的复杂度就有了保障。

### 一些性质

&emsp; 为什么这么说呢，这就需要我们来看看数据随机时的数据的一些性质了。

&emsp; 首先我们考虑，一个区间内随机选取两个端点 $l, r$ 所选到的这个区间的期望长度是多少。假设区间长度为 $n$，现在我们有 $\frac 1n$ 的概率有选到的 $l = L$，又有 $\frac 1n$ 的概率算到的 $r = R$，所以这一次对期望的贡献就是 $\frac 1{n^2}|R - L + 1|$，那么期望长度就是：

$$
\begin{aligned}
E = & \frac{1}{n^2}\sum_{l = 1}^n\sum_{r = 1}^n|r - l + 1| \\
= & \frac{1}{n^2} \left( \sum_{l = 1}^n \sum_{r = 1}^{l-1} |r - l + 1| + \sum_{l = 1}^n\sum_{r = l}^n |r - l + 1| \right) \\
= & \frac{1}{n^2} \left( \sum_{l = 1}^n \sum_{r = 1}^{l-1} (l - r - 1) + \sum_{l = 1}^n\sum_{r = l}^n (r - l + 1) \right) \\
= & \frac{1}{n^2} \left( \sum_{l = 1}^n\sum_{r = 1}^{l - 1}l - \sum_{l = 1}^n \sum_{r = 1}^{l - 1}r - \sum_{l = 1}^n\sum_{r = 1}^{l - 1}1 + \sum_{l = 1}^n\sum_{r = l}^nr - \sum_{l = 1}^n\sum_{r = l}^nl + \sum_{l = 1}^n\sum_{r = l}^n1 \right) \\
= & \frac{1}{n^2} \left( \sum_{l = 1}^nl(l-1) - \sum_{l=1}^n\frac{1}{2}l(l-1) - \sum_{l=1}^n(l-1) + \sum_{l=1}^n\frac{1}{2}(l + n)(n - l + 1) - \sum_{l=1}^n(n-l+1)l + \sum_{l=1}^n(n-l+1) \right) \\
= & \frac{1}{n^2} \left( \frac 12\sum_{l=1}^n(l-1)^2 + \frac 12\sum_{l=1}^n(n-l+1)^2 \right)
= \frac{1}{2n^2} \left( \sum_{l=0}^{n-1}l^2 + \sum_{l=1}^nl^2 \right)
= \frac{1}{2n^2} \left( 2\sum_{l = 1}^n l^2 - n^2 \right)
= \frac{1}{n^2}\sum_{l=1}^nl^2 - \frac{1}{2} \\
= & \frac{n(n+1)(2n+1)}{6n^2} - \frac 12 = \frac{2n^2+3n+1}{6n} - \frac 12 = \frac n3 + \frac 1{6n} \\
\approx & \frac 13 n
\end{aligned}
$$

&emsp; 也就是说，每一次区间推平我们期望会覆盖掉 $\frac 13$ 的整个区间，这就会让很大一部分的数字都变成一样的。那么我们考虑把数字相同的连续的一段记为一个点（在代码中每一个点会记录一个 $l, r, val$，分别表示左端点右端点和这个点内所有数字的相同数值），我们算一算经过很多次区间推平后的期望点数。

&emsp; 显然我们能依据这个猜到点数应该是 $O(\log n)$ 级别的，但是要证明这个事情是有点麻烦的。

&emsp; 我们要求出点数的期望值，我们首先需要证明一个引理：令 $p_j$ 表示下标为 $j$ 的数现在是一个点的端点并且在进行 $k$ 次区间推平之后仍然为某一个点的端点的概率，那么有 $\frac 1n\sum\limits_{j = 1}^n = O(\frac 1k)$。

&emsp; 显然，对于每一次区间推平操作没有覆盖到一个点 $j$ 的概率就是：

$$\sqrt[k]{p_j} = \frac{(j-1)^2+(n-j)^2}{n^2}$$

&emsp; 就是说两个点都选在 $j$ 点之前概率加上两个点都选在 $j$ 点之后的概率，那么上面要证的式子就可以写成：

$$\frac 1n\sum_{j = 1}^n = \frac 1n \sum_{j = 1}^n\frac{(j - 1)^2 + (n - j)^2}{n^2} $$

&emsp; 换个元，令 $x = \frac jn$，就有：

$$
\begin{aligned}
p_j = & (\frac{j^2 - 2j + 1}{n^2} + \frac{n^2 + j^2 - 2nj}{n^2})^k \\
= & (x^2 - \frac 2nx + \frac 1{n^2} + 1 + x^2 - 2x)^k \\
= & (x^2 - 2x + 1 + x^2 - \frac {2j-1}{n^2})^k \\
\leq & (x^2 + (x - 1)^2	)^k
\end{aligned}
$$

&emsp; 带入到整个式子中去，就是：

$$ \frac 1n \sum_{j = 1}^np_j \leq \sum_{j = 1}^n(x^2+(x-1)^2)^k \approx \int_0^1 (x^2 + (x - 1)^2)^k dx $$

&emsp; 然后可以用计算器或者手动积分一下，就能得到这个式子的上界就是 $O(\frac 1k)$。

&emsp; 有了这个式子，我们就能知道初始的所有端点中每个点最后仍然存在的概率平均下来就是 $O(\frac 1k)$。有了这个之后我们就能很自然的推出区间期望点数：

$$ E(m) = O(n \cdot \frac 1k + \sum_{i = 1}^k \frac 1i) = O(\frac nk + \log k) $$

&emsp; 就是说初始有 $n$ 个点，每个点在最后仍然存在的概率是 $\frac 1k$，那么这些点最后存在的期望个数就是 $\frac nk$，然后在倒数第 $i$ 次操作中会新建 $O(1)$ 个点，那么这些点在剩下的 $i$ 次操作之后仍然存在的概率就是 $O(\frac 1i)$，所以还要加上新建的点的贡献就是 $\sum\limits_{i = 1}^k \frac 1i$。

&emsp; 然后就证完啦！！！

&emsp; 为例检验我们的证明是否正确，我们可以写一段代码来验证一下：

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
#define in read() 
#define MAXN 100100000
#define MOD 1000000007

struct Tnode{
	int l, r;
	mutable int v;
	Tnode(int l, int r = 0, int v = 0) : l(l), r(r), v(v) {}
	bool operator < (const Tnode &rhs) const { return l < rhs.l; }
};
int n = 0;
int a[MAXN] = { 0 };
set<Tnode> s;

set<Tnode> :: iterator split(int pos){
	set<Tnode> :: iterator it = s.lower_bound(Tnode(pos));
	if(it != s.end() and it->l == pos) return it;
	it--;
	if(it->r < pos) return s.end();
	int l = it->l, r = it->r, v = it->v;
	s.erase(it);
	s.insert(Tnode(l, pos - 1, v));
	return s.insert(Tnode(pos, r, v)).first;
}

void assign(int l, int r, int x){
	set<Tnode> :: iterator ir = split(r + 1), il = split(l);
	s.erase(il, ir);
	s.insert(Tnode(l, r, x));
}

signed main(){
	n = 1000000; srand(time(0));
	for(int i = 1; i <= n; i++){
		a[i] = rand() * rand() % n + 1;
		s.insert(Tnode(i, i, a[i]));
	}
	for(int i = 1; i <= n; i++){
		int l = rand() * rand() % n + 1;
		int r = rand() * rand() % n + 1;
		int x = rand() * rand() % n + 1;
		if(l > r) swap(l, r);
		assign(l, r, x);
	}
	cout << s.size() << '\n';
	return 0;
}
```

&emsp; 代码中的 $split()$ 和 $assign()$ 的工作原理在下面有详细说明，这里就不赘述了。

&emsp; 我们用这段代码运行 $10$ 次取平均，在 $n = 1e6$ 时，点数稳定在 $20\sim30$ 之间，和理论值吻合的很好，这进一步说明了我们的证明是正确的。

### 现在来看看操作吧

&emsp; 现在我们知道了我们的点数是 $O(\log n)$ 级别的了，那现在我们就可以自然的想到直接用这些点来进行分块，如果我们能做到对每一段的操作的时间复杂度为 $O(1)$ 那么我们就能做到 $O(n\log n)$ 的时间解决这个问题（但是实际上我这里用来维护单次操作的复杂度是 $O(\log n)$ 的）。具体来说我们这样维护：

&emsp; 首先创建一个结构体：

```cpp
struct Tnode{
	int l, r;
	mutable int v;
	Tnode(int l, int r = 0, int v = 0) : l(l), r(r), v(v) {}
	bool operator < (const Tnode &rhs) const { return l < rhs.l; }
};
```

&emsp; 这个结构体中的一个 "点" 中有三个数据 $l, r$ 和 $v$，分别表示这一段连续的区间内的左端点和右端点，和这一段里面所有数相同的数值。然后这里的 $mutable$ 关键字表示我们可以直接修改已经插入 $set$ 的元素的 $v$ 值，而不用将该元素取出后重新加入 $set$。

&emsp; 然后再用一个 $set$ 来维护整个区间：

```cpp
set<Tnode> s;
```

&emsp; 这样我们就得到了一颗空的珂朵莉树了。是的，就是这么简单qwq。

&emsp; 然后就是几个重要的操作了。

#### split

&emsp; 这个操作允许我们把原本包含点 $pos$ 的区间 $[l, r]$ 划分成 $[l, pos - 1]$ 和 $[pos, r]$ 这两个区间，并且返回后者的迭代器。

&emsp; 我们先利用 $lower\_bound()$ 函数在 $set$ 中查到左端点位置大于等于pos的节点。如果这个节点的左端点位置正是pos，那么我们无需分裂，直接返回。如果它的左端点位置不是 $pos$，那么必然大于 $pos$，则包含位置pos的节点是上一个节点，$it-=1$。接下来的事情就好办了，暴力分裂再插入即可。不要忘了返回值。

```cpp
set<Tnode> :: iterator split(int pos){
	set<Tnode> :: iterator it = s.lower_bound(Tnode(pos));        // 找到左端点大于等于pos的区间
	if(it != s.end() and it->l == pos) return it;                 // 如果这个点的左端点就是pos就不用split直接返回就可以了
	it--;                                                         // 左端点不是pos那就大于pos,包含pos的就一定是前一个点
	if(it->r < pos) return s.end();
	int l = it->l, r = it->r, v = it->v;
	s.erase(it);                                                  // 暴力删点
	s.insert(Tnode(l, pos - 1, v));                               // 暴力加点
	return s.insert(Tnode(pos, r, v)).first;                      // 暴力加点加返回
}
```

#### assign

&emsp; 这个也就是珂朵莉树中最重要的降复杂度的操作：区间推平。因为这个操作的实现实在过于简单，所以就直接看代码吧：

```cpp
void assign(int l, int r, int x){
	set<Tnode> :: iterator ir = split(r + 1), il = split(l);        // 把l和人之间split成整段
	s.erase(il, ir);                                                // 中间的节点全删掉
	s.insert(Tnode(l, r, x));                                       // 新建一个节点插进去
}
```

&emsp; 剩下的就是暴力分块了，就不细讲了。完整的代码贴在下面：

&emsp; 完结撒花！！！

## 代码

```cpp
#include<bits/stdc++.h>
using namespace std;
#define int long long
#define in read() 
#define MAXN 100100
#define MOD 1000000007

struct Tnode{
	
	int l, r;
	mutable int v;
	
	Tnode(int l, int r = 0, int v = 0) : l(l), r(r), v(v) {}
	
	bool operator < (const Tnode &rhs) const { return l < rhs.l; }
	
};

int n = 0; int m = 0;
int seed = 0; int vmax = 0;
int a[MAXN] = { 0 };

set<Tnode> s;

set<Tnode> :: iterator split(int pos){
	set<Tnode> :: iterator it = s.lower_bound(Tnode(pos));
	if(it != s.end() and it->l == pos) return it;
	it--;
	if(it->r < pos) return s.end();
	int l = it->l, r = it->r, v = it->v;
	s.erase(it);
	s.insert(Tnode(l, pos - 1, v));
	return s.insert(Tnode(pos, r, v)).first;
}

void add(int l, int r, int x) {
    set<Tnode>::iterator ir = split(r + 1), il = split(l);
    for (set<Tnode>::iterator it = il; it != ir; ++it) it->v += x;
}

void assign(int l, int r, int x){
	set<Tnode> :: iterator ir = split(r + 1), il = split(l);
	s.erase(il, ir);
	s.insert(Tnode(l, r, x));
}

struct Trank{
	
	int num, cnt;
	
	bool operator < (const Trank & rhs) const { return num < rhs.num; }
	
	Trank(int num, int cnt) : num(num), cnt(cnt) {}
	
};

int rk(int l, int r, int x){
	set<Tnode> :: iterator ir = split(r + 1), il = split(l);
	vector<Trank> v;
	for(set<Tnode> :: iterator i = il; i != ir; i++)
		v.push_back(Trank(i->v, i->r - i->l + 1));
	sort(v.begin(), v.end());
	int i = 0;
	for(i = 0; i < v.size(); i++)
		if(v[i].cnt < x) x -= v[i].cnt;
		else break;
	return v[i].num;
}

int power(int x, int y, int p){
	int r = 1, base = x % p;
	while(y){
		if(y & 1) r = r * base % p;
		base = base * base % p;
		y >>= 1;
	}
	return r;
}

int calp(int l, int r, int x, int y){
	set<Tnode> :: iterator ir = split(r + 1), il = split(l);
	int ans = 0;
	for(set<Tnode> :: iterator i = il; i != ir; i++)
		ans = (ans + power(i->v, x, y) * (i->r - i->l + 1) % y) % y;
	return ans; 
}

int rd(){
	int res = seed;
	seed = (seed * 7 + 13) % MOD;
	return res;
}

signed main(){
	cin >> n >> m >> seed >> vmax;
	for(int i = 1; i <= n; i++){
		a[i] = (rd() % vmax) + 1;
		s.insert(Tnode(i, i, a[i]));
	}
	for(int i = 1; i <= m; i++){
		int op = (rd() % 4) + 1;
		int  l = (rd() % n) + 1;
		int  r = (rd() % n) + 1;
		if(l > r) swap(l, r);
		if(op == 1){
			int x = (rd() % vmax) + 1;
			add(l, r, x);
		}
		else if(op == 2){
			int x = (rd() % vmax) + 1;
			assign(l, r, x);
		}
		else if(op == 3){
			int x = (rd() % (r - l + 1)) + 1;
			cout << rk(l, r, x) << '\n';
		}
		else{
			int x = (rd() % vmax) + 1;
			int y = (rd() % vmax) + 1;
			cout << calp(l, r, x, y) << '\n';
		}
	}
	return 0;
}
```
{% endraw %}
