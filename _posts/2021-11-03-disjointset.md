---
layout: post
title: "并查集"
date: 2021-11-03
tags: ["DS", "Tree"]
summary: "并查集 的算法笔记。"
math: false
---
{% raw %}
# 并查集
```cpp
#include<bits/stdc++.h>
using namespace std;

#define MAXN 100100

int n  = 0; int m = 0;
int q = 0;
int parent[MAXN] = { 0 };

void init(){
	for(int i = 1; i <= n; i++){
		parent[i] = i;
	}
}

int findRoot(int x){
	if(x == parent[x]){
		return x;
	}
	return parent[x] = findRoot(parent[x]);
}

void unionVertices(int x, int y){
	parent[findRoot(x)] = findRoot(y);
}

int main(){
	scanf("%d%d%d", &n, &m, &q);                     // n 个点 m 个关系 q 次询问 
	init();
	for(int i = 1; i <= m; i++){
		int x, y;
	    scanf("%d%d", &x, &y);
	    unionVertices(x,y);
	}
	
	for(int i = 1; i <= q; i++){
		int x, y;
		scanf("%d%d", &x, &y);
		if(findRoot(x) == findRoot(y)){
		    printf("Yes\n");
		}
		else{
    		printf("No\n");
		}
	}
	return 0;
}
```
{% endraw %}
