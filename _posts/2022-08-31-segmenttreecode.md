---
layout: post
title: "线段树"
archive_title: "线段树"
date: 2022-08-31
tags: ["DS", "Tree", "线段树"]
summary: "线段树 的算法笔记。"
math: false
---
{% raw %}
# 线段树

```cpp
#include<bits/stdc++.h>
using namespace std;

typedef long long ll;
#define MAXN 100100

int n = 0; int m = 0;
int a[MAXN] = { 0 };
struct SegTree{
	int l, r;
	ll dat;
	int lazy;
}t[4 * MAXN];

int ls(int p){
	return p << 1;
}
int rs(int p){
	return p << 1 | 1;
}

void pushup(int p){
	t[p].dat = t[ls(p)].dat + t[rs(p)].dat;
}

void pushdown(int p){
	t[ls(p)].dat += (ll)t[p].lazy * (ll)(t[ls(p)].r - t[ls(p)].l + 1);
	t[rs(p)].dat += (ll)t[p].lazy * (ll)(t[rs(p)].r - t[rs(p)].l + 1);
	t[ls(p)].lazy += t[p].lazy; t[rs(p)].lazy += t[p].lazy;
	t[p].lazy = 0;
}

void build(int p, int l, int r){
	t[p].l = l; t[p].r = r;
	if(l == r){
		t[p].dat = a[l];
		return;
	}
	int mid = (l + r) >> 1;
	build(ls(p), l, mid);
	build(rs(p), mid + 1, r);
	pushup(p);
}

void upadteP(int p, int index, int val){                 // 单点修改
	if(t[p].l == t[p].r){
		t[p].dat += val;
		return;
	}
	int mid = (t[p].l + t[p].r) >> 1;
	if(index <= mid){
		update(ls(p), index, val);
	}
	else{
		update(rs(p), index, val);
	}
	pushup(p);
}

void updateS(int p, int l, int r, int val){               // 区间修改
	if(l <= t[p].l and t[p].r <= r){
		t[p].dat += (ll)(t[p].r - t[p].l + 1) * (ll)val;
		t[p].lazy += val;
		return;
	}
	pushdown(p);
	int mid = (t[p].l + t[p].r) >> 1;
	if(l <= mid){
		update(ls(p), l, r, val);
	}
	if(r > mid){
		update(rs(p), l, r, val);
	}
	pushup(p);
}

ll query(int p, int l, int r){
	if(l <= t[p].l and t[p].r <= r){
		return t[p].dat;
	}
	pushdown(p);
	ll ans = 0;
	int mid = (t[p].l + t[p].r) >> 1;
	if(l <= mid){
		ans += query(ls(p), l, r);
	}
	if(r > mid){
		ans += query(rs(p), l, r);
	}
	return ans;
}

signed main(){
	scanf("%d%d", &n, &m);
	for(int i = 1; i <= n; i++){
		scanf("%d", &a[i]);
	}
	
	build(1, 1, n);
	
	for(int i = 1; i <= m; i++){
		int op = 0;
		scanf("%d", &op);
		if(op == 1){
			int x, y, z;
			scanf("%d%d%d", &x, &y, &z);
			updateS(1, x, y, z);
		}
		else if(op == 2){
			int x, y;
			scanf("%d%d", &x, &y);
			printf("%lld\n", query(1, x, y));
		}
	}
	return 0;
}
```
{% endraw %}
