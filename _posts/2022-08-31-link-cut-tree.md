---
layout: post
title: "Link-Cut-Tree"
date: 2022-08-31
tags: ["GraghTheory", "Tree", "树链剖分"]
summary: "模板传送门：luogu P3690"
math: true
---
{% raw %}
# Link-Cut-Tree

&emsp; 模板传送门：[luogu P3690](https://www.luogu.com.cn/problem/P3690)

## 一些问题
1. 给定一棵树，一共有 $4$ 个操作，分别为：（1）将树上一条路径上的所有边的边权加上 $k$，（2）删去树上的一条边，（3）在两棵树之间链接一条边，（4）询问一颗树上两点之间路径上的权值和。
2. 给定一片森林（其实就是很多棵树）。你每次操作删一条边或者加一条边，每次询问输出一个节点的子树大小。

## 关于树链剖分中的重链剖分

&emsp; 如果大家不会树链剖分可以点这里：[树链剖分~~~](/posts/heavypathdecomposition/)。我们在大多数情况下讲的树链剖分实际上都是重链剖分，也就是链接里的文章将的内容。重链剖分可以 $O(\log_2n)$ 解决树上路径和和子树和的问题（带修）。而现在我们要解决的不止是这些问题，我们还要考虑怎样把两棵树连接到一起（也就是 $link$）和把一棵树分割成两棵树（也就是 $cut$），也就是上面提到的第一个问题，那我们就需要引入我们的 $LCT$ 啦。

&emsp; 当然， $LCT$ 也不只能够解决树形变化的重链剖分问题，就像上面提到的第二个问题一样。所以我们来看看这个算法是如何解决这几个问题的吧：

## 几个概念
&emsp; $LCT$ 也叫**实链剖分**，所以和重链剖分一样，我们也有几个概念需要提前说明一下：

1. 实边：对于每一个非叶子节点，我们向它的其中一个儿子连一条特殊的边，这条边被称为实边
2. 虚边：该非叶子节点向其他儿子连的边都是虚边。
3. 实路径（链）：由实边构成的路径。
4. 实儿子：与该节点用实边相连的儿子。
5. 虚儿子：与该店工虚边相连的儿子。

&emsp; 与重链剖分不同的是，在一棵 $LCT$ 里面实链和虚链是可以动态变化的。所以我们使用更加灵活的数据结构 $splay$ 来维护实链。基于 $splay$ 我们就能很巧妙的解决上面我们提到的问题。（不会 $splay$ 的同学看过来：[Splay](/posts/splay1/)）

## LCT 的一些性质

1. 一棵 $splay$ 维护一条实链
2. 每一棵 $splay$ 维护的是从上到下严格递增的路径。且**中序遍历 $spaly$ 得到的就是每个点的深度序列严格递增**（~~显然 $splay$ 就是用来维护中序遍历的东西qwq~~）。
3. 没一个节点仅存在于一棵 $splay$ 中（每个节点最多在一条实链上）。
4. 每个节点最多一个实儿子，最多延伸出一条实链

&emsp; 上面说了那么多可能有些难懂，所以我们来画一个图直观的感受一下 $LCT$ 吧（左图为原树，红色的便代表实边，右图是这个数的 $LCT$）：

![在这里插入图片描述](/assets/images/blog/LCT1.png)

&emsp; 是不是非常好理解呢qwq。

## 一些操作

### access(x)

&emsp; 这个操作应该是 $LCT$ 中最重要的操作了，他要完成的功能就是将这个节点一直到根节点的路径上的所有边都设置成实边，这个点到节点的路径也就变成了一条实链。我们还使用上文用到的树作为例子，我们现在进行 $access(11)$。那我们希望得到的就应该是这样的一个图：

![在这里插入图片描述](/assets/images/blog/LCT2.png)

&emsp; 然后我们来考虑如何实现这个操作。我们进行 $access(11)$ 就是说要构造一棵从 $1$ 开始到 $11$ 结束的 $splay$。我们一步步向上合并链，首先我们 $spaly(11)$（~~虽然这个图中 $11$ 已经在它这条链的根了~~），让它变成这个链的根，然后我们把 $11$ 的右儿子断开，也就是将它设置为虚边（虽然在原图中它并没有右儿子），就像这样：因为这一步相当于啥也没干我就不画图了qwq。

&emsp; 下一步我们找到 $11$ 的父节点 $5$，然后 $splay(5)$，把它转到根就像这样：

![在这里插入图片描述](/assets/images/blog/LCT3.png)
&emsp; 然后我们把 $5$ 的右儿子给断开，也就是设置成虚边。然后将 $11$ 设置成 $5$ 的右儿子，像这样：

![在这里插入图片描述](/assets/images/blog/LCT4.png)
&emsp; 于是我们就完成了 $access(11)$ 的操作啦，接下来上代码：

```cpp
inline void acs(int x){
	for(int y = 0; x; y = x, x = fa[x]) // 不断向上跳直到整棵 LCT 的根
		spl(x), rs(x) = y, up(x);       // 转到这条链根，右儿子改成上一次的根，维护信息
}
```

### findRoot(x)

&emsp; 有了 $access(x)$，其他的操作就相对简单许多了。就像这个操作，$findRoot(x)$ 表示找到节点 $x$ 所在的树的根节点。我们先 $access(x)$，这样 $x$ 就和他所在书的根节点在同一颗 $splay$ 中了，又因为根节点一定是深度最小的一个点，所以一定在这课 $splay$ 的最左边。那么我们只需要先把 $x$ 转到根（这里指的是 $splay$ 的根），然后一直向下找到这个 $splay$ 的最左节点就是根节点了。上代码：

```cpp
inline int find(int x){
	acs(x); spl(x); down(x);             // down(x) 是下传一个神秘的标记，现在不用管
	while(ls(x)) x = ls(x), down(x);     // 一直到左节点
	spl(x); return x;                    // 把最左节点转到根然后返回
}
```

### makeRoot(x)

&emsp; 顾名思义 $makeRoot(x)$ 就是一个让 $x$ 成为**原树**的根节点的操作。

&emsp; 我们还是先 $access(x)$，使得根和 $x$ 现在在一棵 $splay$ 上。然后我们想象一下，如果我们要将 $x$ 弄成根节点，是不是相当于在原树中 $x$ 到根的序列翻转一下就达到目的了，就比如说我们现在要 $makeRoot(11)$，那么就像这样（直译我圈出来的链就是进行了翻转操作）：

![在这里插入图片描述](/assets/images/blog/LCT5.png)
&emsp; 进行翻转操作在 $splay$ 中也很好实现，因为 $splay$ 维护的是中序遍历，并且区间取反的中序遍历其实就是对所有的节点的两个儿子都进行交换（交换区间内所有节点的左右儿子）。

&emsp; 在代码实现的时候，我们不用每次直接把所有翻转都执行，我们可以利用线段树懒标记一样的操作在每个节点上弄一个翻转标记，在每次执行到的时候就进行交换左右儿子（也就是上文里面的需要下传的神秘的标记）。代码如下：

```cpp
inline void mrt(int x) {
	acs(x); spl(x); rev(x);       // 翻转
}
```

### select(x, y)

&emsp; 提取 $x, y$ 两个节点之间的路径。我们显然用 $access(x)$ 就能提取一个节点到根的路径，但是显然这样我们是不能满足的，我们在求解两个点的路径的权值的时候显然需要提取 $x$ 到 $y$ 的路径。所以我们需要这个操作。

&emsp; 显然这个操作也很简单，我们只需要先 $makeRoot(x)$，这样 $x$ 就是根了，那么我们只要 $access(y) 就能提取 $x$ 到 $y$ 的路径了，代码：

```cpp
inline void sel(int x, int y){
	mrt(x); acs(y); spl(y);
}
```

### link(x, y)

&emsp; $link(x, y)$ 就是说如果 $x, y$ 不连通，那么在 $x$ 和 $y$ 之间连一条边。就相当于合并了 $x$ 和 $y$ 所在的两棵树。我们先 $makeRoot(x)$ 再让 $x$ 的父亲为 $y$ 就好了，代码：

```cpp
inline void link(int x, int y){
	mrt(x);
	if(find(y) == x) return;                   // 如果本来就在同一棵树内就不用管了
	fa[x] = y;                                 // 改父节点
}
```

### cut(x, y)

&emsp; 删除树中 $(x, y)$ 的这条边。我们还是先 $makeRoot(x)$，现在 $y$ 就一定是 $x$ 的子节点了，然后再 $access(y)$，这样 $x$ 和 $y$ 就到同一颗平衡树中了。然后把 $y$ 转到根，并且分离 $y$ 和 $y$ 的左子树（因为一开始 $x$ 的深度比 $y$ 小，所以 $x$ 现在一定在 $y$ 的左子树中）就做完了，上代码：

```cpp
inline void cut(int x, int y){
	mrt(x); acs(y); spl(y);
	if(ls(y) != x) return;                 // 如果 x 不在 y 的左边就没必要 cut 了
	ls(y) = fa[x] = 0;
}
```

&emsp; 完结撒花！！！

## 代码

&emsp; 接下来就是最顶上的模板题的代码了

```cpp
#include<bits/stdc++.h>
using namespace std;
#define MAXN 100100
#define ls(p) ch[p][0]
#define rs(p) ch[p][1]

int n = 0; int m = 0;
int a[MAXN] = { 0 };
int ch[MAXN][2] = { 0 };
int fa[MAXN] = { 0 };
int rv[MAXN] = { 0 };
int w[MAXN] = { 0 };

inline void up(int x) { w[x] = a[x] ^ w[ls(x)] ^ w[rs(x)]; }
inline bool isr(int x) { return ls(fa[x]) != x and rs(fa[x]) != x; }
inline bool get(int x) { return rs(fa[x]) == x; }
inline void rev(int x){
	if(!x) return;
	swap(ls(x), rs(x));
	rv[x] ^= 1;
}
inline void down(int x) { if(rv[x]) rev(ls(x)), rev(rs(x)); rv[x] = 0; }
inline void rot(int x){
	int y = fa[x]; int z = fa[y]; int k = get(x);
	if(!isr(y)) ch[z][get(y)] = x; fa[x] = z;
	ch[y][k] = ch[x][k ^ 1]; fa[ch[x][k ^ 1]] = y;
	ch[x][k ^ 1] = y; fa[y] = x; up(y); up(x);
}
inline void path(int x) { if(!isr(x)) path(fa[x]); down(x); }
inline void spl(int x){
	path(x);
	while(!isr(x)){
		int y = fa[x];
		if(!isr(y)) rot(get(x) ^ get(y) ? x : y);
		rot(x);
	}
}
inline void acs(int x){
	for(int y = 0; x; y = x, x = fa[x])
		spl(x), rs(x) = y, up(x);
}
inline void mrt(int x) { acs(x); spl(x); rev(x); }
inline int find(int x){
	acs(x); spl(x); down(x);
	while(ls(x)) x = ls(x), down(x);
	spl(x); return x;
}
inline void link(int x, int y){
	mrt(x);
	if(find(y) == x) return;
	fa[x] = y;
}
inline void cut(int x, int y){
	mrt(x); acs(y); spl(y);
	if(ls(y) != x) return;
	ls(y) = fa[x] = 0;
}

int main(){
	scanf("%d%d", &n, &m);
	for(int i = 1; i <= n; i++)
		scanf("%d", &a[i]), w[i] = a[i];
	for(int i = 1; i <= m; i++){
		int o, x, y;
		scanf("%d%d%d", &o, &x, &y);
		if(o == 0){
			mrt(x); acs(y); spl(y);
			cout << w[y] << '\n';
		}
		if(o == 1) link(x, y);
		if(o == 2) cut(x, y);
		if(o == 3){
			acs(x); spl(x); a[x] = y, up(x);
		}
	}
	return 0;
}
```
{% endraw %}
