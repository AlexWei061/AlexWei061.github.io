---
layout: post
title: "木棒交叉 Intersect"
archive_title: "木棒交叉Intersect"
section: "OI"
section_slug: "oi"
date: 2022-03-17
tags: ["Solution", "dp"]
summary: "原题大意如下："
math: true
---
{% raw %}
# 木棒交叉 Intersect

原题大意如下：

&emsp;  有 n 根木棒(木棒可以理解为无限长 ~~其实就是一根直线~~)，n根木棒可能互相平行也可能相交，但不可能存在三根即以上的木棒交于同一点。然后就是输入好几个 n 和 b 让你判断这n根木棒存不存在一种摆放方式让它们有 b 个交点。

&emsp; ​
然后数据的范围我记不清了，等明天回学校把原题找出来再说qwq。（反正好像 $O(n^3)$ 是正解）

----

&emsp;我呢，一看到这个题就感觉这玩意儿不就是找规律吗？然后我就开始画图......（~~就挺离谱的~~）然后就是痛苦的分析过程（~~在考场上真的是要把我烦死了~~）...

&emsp; 首先，我们知道对于每个数 n 我们可以用一个简简单单的 dfs 来找出他所有的加法拆分。就比如5可以拆分为：1+1+1+1+1、1+1+1+2、1+2+2、1+1+3、1+4、2+3、5。用代码写出来就是这样：
```c++
#include<bits/stdc++.h>
using namespace std;
 
int n = 0;
int m = 0;
int a[100001] = { 1 };
 
void print(int x){
    for(int i = 1; i <= x-1; i++){
        printf("%d + ", a[i]);
    }
    printf("%d\n", a[x]);
}
 
void dfs(int x){                            //当前项
    for(int i = a[x-1]; i <= m; i++){       //后面的一定比前面的大所以从前一项开始枚举
        if(i == n) continue;
        a[x] = i;
        m -= i;
        if(m == 0) print(x);
        else dfs(x+1);
        m += i;
    }
}
 
int main(){
    scanf("%d", &n);
    m = n;
    dfs(1);
    return 0;
}
```
&emsp; 然后我们对每次拆分出来的数组a进行一个操作就可以求出 n 根木棒能摆出的交点个数的其中一种情况。但是这要怎么做呢？说来也很简单，拿 n = 7 为例。7 显然能被拆分为 1 + 1 + 1 + 2 + 2，我们对于这一种拆分，认为7根木棒被分成了5组，每组的所有木棒都互相平行且于其他组的木棒都不平行，然后我们将每一组木棒依次摆放到一个平面上。还是以7 = 1 + 1 + 1 + 2 + 2 为例：

1. ​
我们把第一组（~~其实只有一根~~）放在平面上，显然这时平面上是没有交点的（平面上增加了个交点）。
2. ​
我们把第二组（~~其实也只有一根~~）放到平面上，因为这一组与第一组的木棒不平行（~~而且他们还无限长~~）所以平面上就增加了1 ($1\times 1$) 个交点了。
3. ​
我们把第三组（~~还是只有一根~~）放到平面上，因为这一组与第一组和第二组的木棒都不平行，且不存在三根即以上的木棒交于一点的情况，所以平面上必然又增加了2 ($2\times 1$) 个交点了。
4. ​
我们把第四组（~~这次是两根了qwq~~）放到平面上（如下左图），因为这两根木棒与其他的木三组棒也都互相不平行所以平面上就会增加6 ($3\times 2$) 个交点

5. 我们把最后一组（~~也是两根~~）放到平面上，与前面同理（如下右图），平面上就会多出10 ($5 \times 2$) 个点。

![](/assets/images/blog/intersect1.jpg)

​
&emsp; 综上所述我们知道这七根木棍在这种排列组合下能够构成的交点个数为 0 + 1 + 2 + 6 + 10 = 19 个点。而根据我们的推导过程我们又可以发现把第 i 组放进平面的时候能够增加的点的个数 $p_i$ 等于前 i - 1 组已经放进平面的木棒的数量 $sum_i$乘上第 i 组的木棒的数量 $a_i$ 。

​&emsp; ​
即。由此我们可以得到总点数为：$\sum_{i=1}^{k}p_i = \sum_{i=1}^k sum_{i-1}\times a_i$ 。所以我们就得到了下面的代码：
```c++
#include<bits/stdc++.h>
using namespace std;
 
#define MAXN 100100
 
int q = 0;
int n = 0; int m = 0;
int b = 0;
int a[100001] = { 1 };
 
void print(int x){
    for(int i = 1; i <= x-1; i++){
        printf("%d + ", a[i]);
    }
    printf("%d\n", a[x]);
}
 
vector<int> v[MAXN];
void dfs(int x){                            //当前项
    for(int i = a[x-1]; i <= m; i++){       //后面的一定比前面的大所以从前一项开始枚举
        if(i == n) continue;
        a[x] = i;
        m -= i;
        if(m == 0){
            //print(x);
            int sum = 0; int ans = 0;
            for(int j = 1; j <= x; j++){
                ans += sum * a[j];
                sum += a[j];
            }
            v[n].push_back(ans);
        }
        else dfs(x+1);
        m += i;
    }
}
 
int main(){
    scanf("%d", &q);
    while(q--){
    	scanf("%d%d", &n, &b);
    	if(b == 0){
    		printf("%d\n", 1);
    		continue;
		}
    	m = n; bool is = false;
    	fill(a, a + n + 1, 1);
    	if(!v[n].size()){
    		dfs(1);	
		}
		
		for(int j = 0; j < v[n].size(); j++){
			if(v[n][j] == b){
				is = true; break;
			}
		}
		if(is){
			printf("%d\n", 1);
		}
		else{
			printf("%d\n", 0);
		}
	}
    return 0;
}
```
&emsp; 然后我们就愉快的得到了80分 (~~然而考试的时候我的 dfs 出了一点小问题就只打到了50分，越想越气...~~)

-----

&emsp; 然而，我们不能仅仅满足于这 80 分！于是在赛后，我看了看我们亲爱的 zhengguisheng 教练下发的题解，发现这居然是一道动归题，当时就给我整不会了。所以就有了这篇复盘的题解。下面我们来看一个 DP 的解。

&emsp; ​
我凭借这我前面的思路很容易想到一个正着走的 DP ，我们设 表示当前考虑的 i 根木棒（**这 i 跟木棒于后面的木棒都不平行**），是否可能构成 j 个交点。状态转移时沿用我们前面的思路，设下一组木棒的个数为 k ，和前面一样，**每一组中的木棒都互相平行** 。我们可以知道当把这 k 根木棒放入平面时，会增加 个交点。所以我们可以得到一个状态转移方程：

$$ f_{i, j} = \bigcup_{k=1}^i f_{i-k, j-(i-k)\times k} $$

&emsp; 很显然，这个DP 的初始化为 $f_{i, 0} = True$

&emsp; ​
我们可以看到，枚举 i 为 n 次，枚举 j 为 n * (n - 1) / 2 次，枚举 k 又为 n 次。所以这个 DP 的时间复杂度会达到 $O(n^4)$ 。再一看题解，好家伙居然前面的内容跟我想的一摸一样。再仔细一看，还是只能通过 80% 的数据..... 它后面还有优化。

--------

&emsp; 终于要将到正解了。

&emsp;  既然正着 DP 不行，我们就倒着来。我们研究当前的方案和全满（也就是交点数达到最大值 $\frac{n(n-1)}{2}$ 相差了多少）。​
如果某一个方案把木棒总根数分为 k 组，每组 根，那么这个方案这全满也就相差了 $\frac{n(n-1)}{2} - \sum sum_{i-1}\times a_i = \sum_{j=1}^k \frac{i_j \times (i_j-1)}{2}$ 个交点。据此，我们可以得到另一种 DP的方案。

&emsp; ​
我们令 $g_i$ 表示于全满状态差 i 个交点时（~~这个地方题解上面写错了，害得我看了好久~~）至少需要多少跟木棒。我们可以轻松（~~极其艰难~~）地得到一个方程：

$$ g_i = \min_{j = 1}^N j + g_{i-\frac{j(j-1)}{2}} $$

&emsp; ​
这玩意儿啥意思呢，就是说我们取每一个 j 从 1 到 n 然后找到  也就是找到能够达到  没有把这 j 个互相平行的木棒放入平面时的交点数(其实就是这一组又 j 根木棒)  的最小木棒根数。然后在用这玩意儿加上 j 就是能够达到 i 个交点的最小木棒根数了。

​&emsp; ​
这样的一个 DP 的时间复杂度很显然就是 $O(n^3)$ 的了。这样就能愉快的通过  100% 的数据了qwq。下面是 zengguisheng 教练给出的标准代码：

```c++
# include <bits/stdc++.h>
using namespace std;
 
namespace Base{
	# define mr make_pair
	typedef long long ll;
	typedef double db;
	const int inf = 0x3f3f3f3f, INF = 0x7fffffff;
	const ll  infll = 0x3f3f3f3f3f3f3f3fll, INFll = 0x7fffffffffffffffll;
	template<typename T> void read(T &x){
    	x = 0; int fh = 1; double num = 1.0; char ch = getchar();
		while (!isdigit(ch)){ if (ch == '-') fh = -1; ch = getchar(); }
		while (isdigit(ch)){ x = x * 10 + ch - '0'; ch = getchar(); }
	    if (ch == '.'){
	    	ch = getchar();
	    	while (isdigit(ch)){num /= 10; x = x + num * (ch - '0'); ch = getchar();}
		}
		x = x * fh;
	}
	template<typename T> void chmax(T &x, T y){x = x < y ? y : x;}
	template<typename T> void chmin(T &x, T y){x = x > y ? y : x;}
}
 
using namespace Base;
 
const int N = 700;
int num[N + 10], dp[N * N + 10];
 
int main(){
	//freopen("intersect.in", "r", stdin);
	//freopen("intersect.out", "w", stdout);
	for (int i = 1; i <= N; i++) num[i] = i * (i - 1) / 2;
	memset(dp, inf, sizeof(dp));
	dp[0] = 0;
	for (int i = 0; i <= N * (N - 1) / 2; i++)
		for (int j = 1; j <= N; j++){
			if (i + num[j] > N * (N - 1) / 2) continue;
			chmin(dp[i + num[j]], dp[i] + j);
		}
 
	int opt;
	read(opt);
	
    while (opt--){	
		int n, m;
		read(n); read(m);
		if (m > n * (n - 1) / 2){
			printf("0\n");
			continue;
		}
		if (dp[n * (n - 1) / 2 - m] <= n)
			printf("%d\n", 1);
			else printf("%d\n", 0);
	}
    return 0;
}
```
{% endraw %}
