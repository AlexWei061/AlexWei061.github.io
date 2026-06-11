---
layout: post
title: "实分析入门（10）--Lebesgue-Stieltjes测度"
archive_title: "实分析入门（10）--Lebesgue-Stieltjes测度"
section: "Math"
section_slug: "math"
math_category: "Real Analysis"
math_category_slug: "real-analysis"
math_chapter: "Chapter 1"
math_chapter_slug: "ch1"
series_order: 10
date: 2026-02-10
tags: ["Real Analysis", "Chapter 1", "测度理论"]
summary: "实分析入门： R上的 Borel 测度和 Lebesgue-Stieltjes 测度"
math: true
---
{% raw %}
# 实分析入门：$\mathbb R$ 上的 Borel 测度和 Lebesgue-Stieltjes 测度

&emsp; 上一篇我们讲的是抽象构造：先在一个代数上定义预测度，再用覆盖构造外测度，最后用 Carathéodory 条件筛出真正可测的集合。

&emsp; 这一篇要把这条抽象路线放到 $\mathbb R$ 上，从数轴上的区间长度，构造出 Borel 测度和 Lebesgue 测度

&emsp; 更进一步，我们还会看到：区间长度只是最特殊的一种情况。只要给出一个递增右连续函数 $F$，它就可以定义一种“由 $F$ 控制的长度”，这就是 Lebesgue-Stieltjes 测度。

## 半开区间代数

&emsp; 在 $\mathbb R$ 上，最自然的简单集合当然是区间。为了避免端点被重复计算，我们选用左开右闭区间：



$$
(a,b].
$$



&emsp; 具体地，令 $\mathcal A$ 是所有**有限个**左开右闭区间的不交并组成的集合族。这里端点允许出现 $\pm\infty$，也就是说我们把



$$
(-\infty,b],
\qquad
(a,\infty),
\qquad
\mathbb R
$$



&emsp; 也看成同一类半开区间。更正式地写，就是



$$
\mathcal A=
\left\{
\bigcup_{k=1}^{n} I_k:
I_k \text{ 两两不交，且 } I_k=(a_k,b_k],
-\infty\leq a_k<b_k\leq\infty
\right\}.
$$



&emsp; 这里约定



$$
(a,\infty]=(a,\infty),
$$



&emsp; 因为 $\infty$ 不是实数轴上的点。

&emsp; 为什么要用半开区间，而不是开区间或者闭区间？原因是半开区间在拼接的时候最干净。比如



$$
(a,b]\cup(b,c]=(a,c],
$$



&emsp; 右端点 $b$ 不会被重复算两次。如果用闭区间 $[a,b]$ 和 $[b,c]$，端点 $b$ 会同时属于两边；如果用开区间，端点又会丢掉。半开区间刚好把这个问题处理得很舒服。

&emsp; 这个 $\mathcal A$ 是一个代数。直观上，这是因为有限个半开区间做有限并、有限交、补集之后，仍然可以重新切成有限个半开区间的不交并。

&emsp; 举个例子，



$$
(a,b]^c=(-\infty,a]\cup(b,\infty).
$$



&emsp; 右边仍然是有限个半开区间的并。两个半开区间相交也仍然是半开区间或者空集：



$$
(a,b]\cap(c,d]=(\max\{a,c\},\min\{b,d\}]
$$



&emsp; 当然，如果左端点不小于右端点，那么交集就是空集。

&emsp; 还有一个重要事实：



$$
S(\mathcal A)=\mathcal B_{\mathbb R}.
$$



&emsp; 也就是说，由这些半开区间生成的 $\sigma$-代数正好是 $\mathbb R$ 上的 Borel $\sigma$-代数。

## Borel 测度

&emsp; 在继续之前，我们需要定义 $\mathbb R$ 上的 **Borel 测度**：

&emsp; 定义在 Borel $\sigma$-代数 $\mathcal B\_{\mathbb R}$ 上的测度就称之为 Borel 测度，也就是说，它只保证能测量 Borel 集。有时候我们还会要求它是**局部有限**的，也就是每个有界 Borel 集的测度都是有限的。对 $\mathbb R$ 来说，这通常等价于每个有界区间的测度有限：


$$
\mu((a,b])<\infty,
\qquad a<b.
$$



&emsp; 这个条件非常自然。因为如果一个有界区间的长度都可以是无穷大，那它就不太像我们平时想象的“数轴上的大小”了。

## 由递增右连续函数定义预测度

&emsp; 现在取一个函数



$$
F:\mathbb R\to\mathbb R,
$$



&emsp; 假设 $F$ 是递增且右连续的，对有限半开区间 $(a,b]$，我们定义



$$
\mu_0((a,b])=F(b)-F(a).
$$



&emsp; 它的意思是：一个区间的“大小”由 $F$ 在端点上的增量决定，举个例子，如果取：



$$
F(x)=x,
$$



&emsp; 那么



$$
\mu_0((a,b])=b-a,
$$



&emsp; 这就是通常的长度。

&emsp; 如果 $F$ 在某个点 $c$ 有跳跃，那么这个跳跃会变成点 $c$ 上的“质量”。比如



$$
F(x)=
\begin{cases}
0,&x<c,\\
1,&x\geq c,
\end{cases}
$$



&emsp; 那么它诱导出的测度就是集中在点 $c$ 上的 Dirac 测度。因为只要区间 $(a,b]$ 包含 $c$，就有



$$
F(b)-F(a)=1,
$$



&emsp; 否则就是 $0$。

&emsp; 对无界区间，我们用极限来定义。记



$$
F(-\infty)=\lim_{x\to-\infty}F(x),
\qquad
F(\infty)=\lim_{x\to\infty}F(x),
$$



&emsp; 这两个极限允许取到 $\pm\infty$。于是约定



$$
\mu_0((a,b])=F(b)-F(a),
\qquad
-\infty\leq a<b\leq\infty.
$$



&emsp; 对有限区间，这个值一定有限；对无界区间，这个值可能是 $\infty$。这没有问题，因为测度本来就允许取值为 $\infty$。

&emsp; 如果一个集合是有限个两两不交的半开区间的并：



$$
A=\bigcup_{j=1}^{n}(a_j,b_j],
$$



&emsp; 那么定义



$$
\mu_0(A)=
\sum_{j=1}^{n}\bigl(F(b_j)-F(a_j)\bigr).
$$



&emsp; 这么直接讲 Lebesgue-Stieltjes 测度就是用 $F$ 的增量来替代普通长度可能还是有点抽象了，这里我们举一个大家都很熟悉的例子：概率。我们的测度空间 $(X, \Sigma, \mu)$ 和概率论中的概率空间 $(\Omega, \mathcal{F}, P)$ 完美对应。而我们又知道 $F$ 为分布函数时：


$$
P\{ a < x \leq b \} = F(b) - F(a)
$$


&emsp; 这里就跟上面我们定义的测度：


$$
\mu_0((a, b]) = F(b) - F(a)
$$


&emsp; 一模一样了qwq。

### 为什么需要右连续？

&emsp; 右连续不是硬凑出来的条件，它和半开区间 $(a,b]$ 是配套的。

&emsp; 关键原因在于：我们之后要证明 $\mu\_0$ 是预测度，也就是要证明它对可数分解是可加的。这个证明会不断遇到“把端点稍微往右挪一点”的操作。

&emsp; 比如我们想把 $(a,b]$ 用一些半开区间覆盖，我们会先把左端点往右缩一点：



$$
[a+\delta,b]\subset(a,b].
$$



&emsp; 最后再让 $\delta\downarrow0$。这时候我们需要



$$
F(a+\delta)\to F(a).
$$



&emsp; 这正是右连续性。

&emsp; 还有一种看法更直观：区间 $(a,b]$ 包含右端点 $b$，不包含左端点 $a$。所以如果端点处有跳跃，这个跳跃应该算在右端点上，而不是左端点上。右连续函数刚好采用了这种记录方式。

&emsp; 如果不用右连续，端点处的跳跃到底归到哪边就会变得混乱，最后构造出来的测度可能和我们想要的端点规则不一致。

## $\mu\_0$ 是预测度

&emsp; **Proposition 1.4.1：** 如果 $F:\mathbb R\to\mathbb R$ 是递增且右连续的，那么上面定义的 $\mu\_0$ 是 $\mathcal A$ 上的一个预测度。

&emsp; 这句话需要证明两件事：

1. $\mu\_0$ 是良定的；
2. $\mu\_0$ 满足预测度意义下的可数可加性。

### 良定性

&emsp; 良定性就是说：同一个集合可能有不同的半开区间分解方式，但不管怎么分，算出来的 $\mu\_0$ 都应该一样。

&emsp; 先看最简单的情况。如果



$$
(a,b]=(a,c]\cup(c,b],
\qquad a<c<b,
$$



&emsp; 那么



$$
\mu_0((a,c])+\mu_0((c,b])=
\bigl(F(c)-F(a)\bigr)+\bigl(F(b)-F(c)\bigr)=
F(b)-F(a).
$$



&emsp; 中间的 $F(c)$ 被抵消了。这就是 telescoping sum，更一般地，如果把 $(a,b]$ 切成有限个小半开区间



$$
(a,b]=\bigcup_{j=1}^{n}(x_{j-1},x_j],
\qquad
a=x_0<x_1<\cdots<x_n=b,
$$



&emsp; 那么



$$
\sum_{j=1}^{n}\mu_0((x_{j-1},x_j])=
\sum_{j=1}^{n}\bigl(F(x_j)-F(x_{j-1})\bigr)=
F(b)-F(a).
$$



&emsp; 任意两个有限分解都可以通过把所有端点合在一起，得到一个共同细分。既然在共同细分上求和结果一样，原来的两个分解算出来也一样，这就说明 $\mu\_0$ 是良定的。

### 有限可加性

&emsp; 良定性顺便给出有限可加性。如果



$$
A_1,\dots,A_n\in\mathcal A
$$



&emsp; 两两不交，那么



$$
\mu_0\left(\bigcup_{j=1}^{n}A_j\right)=
\sum_{j=1}^{n}\mu_0(A_j).
$$



&emsp; 原因很朴素：把所有 $A\_j$ 都拆成半开区间的不交并，再把这些区间放在一起，就是 $\bigcup\_j A\_j$ 的一个半开区间分解。又因为定义是良定义的，所以上述等式成立。

### 可数可加性

&emsp; 预测度和普通有限可加函数真正的区别，就在这里。

&emsp; 假设



$$
A=\bigcup_{j=1}^{\infty}A_j,
$$



&emsp; 其中 $A,A\_j\in\mathcal A$，而且 $A\_j$ 两两不交。我们要证明



$$
\mu_0(A)=\sum_{j=1}^{\infty}\mu_0(A_j).
$$



&emsp; 还是一样的思路，先证 $\leq$ 再证 $\geq$ 然后合并起来就是 $=$，证明 $\geq$ 比较容易。因为对每个 $n$，


$$
\bigcup_{j=1}^{n}A_j\subset A.
$$



&emsp; 由有限可加性和单调性，



$$
\sum_{j=1}^{n}\mu_0(A_j)=
\mu_0\left(\bigcup_{j=1}^{n}A_j\right)
\leq
\mu_0(A).
$$



&emsp; 令 $n\to\infty$，得到



$$
\sum_{j=1}^{\infty}\mu_0(A_j)
\leq
\mu_0(A).
$$



&emsp; 难的是反过来：



$$
\mu_0(A)
\leq
\sum_{j=1}^{\infty}\mu_0(A_j).
$$



&emsp; 这个地方的核心思想是：先证明一个覆盖估计。

&emsp; 假设一个半开区间 $(a,b]$ 被可数个半开区间覆盖：



$$
(a,b]\subset \bigcup_{j=1}^{\infty}(a_j,b_j],
$$



&emsp; 那么应该有



$$
F(b)-F(a)
\leq
\sum_{j=1}^{\infty}\bigl(F(b_j)-F(a_j)\bigr).
$$



&emsp; 这句话的意思是：如果很多小区间把 $(a,b]$ 盖住了，那么这些小区间的总 $F$-长度不能比 $(a,b]$ 自己的 $F$-长度还小。否则就相当于用更短的东西盖住了更长的东西，测度就会不合理。

&emsp; 下面说明为什么这个估计成立。

&emsp; 还记得我们在数学分析中学过的**优先覆盖定理**吗：设 $H$ 是闭区间 $[a,b]$ 的一个（无限）开覆盖，则必可以从 $H$ 中选择有限个开区间来覆盖 $[a,b]$，这里我们如果想使用这个定理，就需要我们对区间进行一点小小的修改：

&emsp; 第一步，先把被覆盖的区间稍微缩小一点。取 $\delta>0$，看闭区间



$$
[a+\delta,b]\subset(a,b].
$$



&emsp; $(a,b]$ 不是紧集，不能直接用有限覆盖定理；但 $[a+\delta,b]$ 是闭区间

&emsp; 第二步，把每个覆盖区间也稍微放大一点。原来的 $(a\_j,b\_j]$ 不是开集，所以也不能直接用有限覆盖定理。于是我们把它变成开区间



$$
(a_j,b_j+\eta_j).
$$



&emsp; 如果某个 $b\_j=\infty$，那这一项就不用放大，仍然理解成 $(a\_j,\infty)$，也不会产生右端点误差。

&emsp; 只要 $\eta\_j>0$，就有



$$
(a_j,b_j]\subset(a_j,b_j+\eta_j).
$$



&emsp; 所以这些放大后的开区间仍然覆盖 $[a+\delta,b]$：



$$
[a+\delta,b]\subset \bigcup_{j=1}^{\infty}(a_j,b_j+\eta_j).
$$



&emsp; 第三步，用有限覆盖定理。因为 $[a+\delta,b]$ 是紧集，而右边是一族开区间覆盖，所以可以从里面挑出有限多个开区间，仍然覆盖 $[a+\delta,b]$。也就是说，存在 $j\_1,\dots,j\_N$，使得



$$
[a+\delta,b]
\subset
\bigcup_{\ell=1}^{N}(a_{j_\ell},b_{j_\ell}+\eta_{j_\ell}).
$$



&emsp; 于是特别有



$$
(a+\delta,b]
\subset
\bigcup_{\ell=1}^{N}(a_{j_\ell},b_{j_\ell}+\eta_{j_\ell}].
$$



&emsp; 第四步，现在只剩有限多个区间了，就可以用 $\mu\_0$ 的有限次可加性和单调性。由上面的包含关系，



$$
\mu_0((a+\delta,b])
\leq
\mu_0\left(\bigcup_{\ell=1}^{N}(a_{j_\ell},b_{j_\ell}+\eta_{j_\ell}]\right).
$$



&emsp; 再由有限次可加性推出有限次可加性版本的次可加性：



$$
\mu_0\left(\bigcup_{\ell=1}^{N}(a_{j_\ell},b_{j_\ell}+\eta_{j_\ell}]\right)
\leq
\sum_{\ell=1}^{N}\mu_0((a_{j_\ell},b_{j_\ell}+\eta_{j_\ell}]).
$$



&emsp; 所以



$$
F(b)-F(a+\delta)
\leq
\sum_{\ell=1}^{N}
\bigl(F(b_{j_\ell}+\eta_{j_\ell})-F(a_{j_\ell})\bigr).
$$



&emsp; 把右边拆成原来的长度加上放大右端点带来的误差：



$$
\begin{aligned}
F(b)-F(a+\delta)
\leq&
\sum_{\ell=1}^{N}
\bigl(F(b_{j_\ell})-F(a_{j_\ell})\bigr)
\\
&+
\sum_{\ell=1}^{N}
\bigl(F(b_{j_\ell}+\eta_{j_\ell})-F(b_{j_\ell})\bigr).
\end{aligned}
$$



&emsp; 第五步，用右连续性控制误差。给定任意 $\varepsilon>0$，因为 $F$ 在每个有限的 $b\_j$ 处右连续，所以我们可以把 $\eta\_j$ 取得足够小，使得



$$
F(b_j+\eta_j)-F(b_j)<\frac{\varepsilon}{2^j}.
$$



&emsp; 因此不管有限子覆盖最后挑中了哪些 $j\_\ell$，都有



$$
\sum_{\ell=1}^{N}
\bigl(F(b_{j_\ell}+\eta_{j_\ell})-F(b_{j_\ell})\bigr)
\leq
\sum_{j=1}^{\infty}\frac{\varepsilon}{2^j}=
\varepsilon.
$$



&emsp; 于是得到



$$
F(b)-F(a+\delta)
\leq
\sum_{j=1}^{\infty}\bigl(F(b_j)-F(a_j)\bigr)+\varepsilon.
$$



&emsp; 最后令 $\delta\downarrow0$。因为 $F$ 在 $a$ 右连续，



$$
F(a+\delta)\to F(a),
$$



&emsp; 所以



$$
F(b)-F(a)
\leq
\sum_{j=1}^{\infty}\bigl(F(b_j)-F(a_j)\bigr)+\varepsilon.
$$



&emsp; 由于 $\varepsilon>0$ 任意，去掉 $\varepsilon$，就得到



$$
F(b)-F(a)
\leq
\sum_{j=1}^{\infty}\bigl(F(b_j)-F(a_j)\bigr).
$$



&emsp; 这就是我们需要的覆盖估计。

&emsp; 回到 $A=\bigcup\_j A\_j$。因为 $A$ 本身是有限个半开区间的并，所以把上面的覆盖估计对每一块相加，就得到



$$
\mu_0(A)
\leq
\sum_{j=1}^{\infty}\mu_0(A_j).
$$



&emsp; 两边合起来，$\mu\_0$ 就满足可数可加性。因此 $\mu\_0$ 是预测度。

## Lebesgue-Stieltjes 测度

&emsp; 现在我们终于可以调用上一篇的扩张定理，我们已经有：

1. $\mathcal A$ 是一个代数；
2. $\mu\_0$ 是 $\mathcal A$ 上的预测度；
3. $S(\mathcal A)=\mathcal B\_{\mathbb R}$。

&emsp; 所以 $\mu\_0$ 可以扩张到 $\mathcal B\_{\mathbb R}$ 上，得到一个 Borel 测度。

&emsp; **Theorem 1.4.2：** 如果 $F:\mathbb R\to\mathbb R$ 是递增且右连续的，那么存在唯一的 Borel 测度



$$
\mu_F:\mathcal B_{\mathbb R}\to[0,\infty],
$$



&emsp; 使得对任意 $a<b$，



$$
\mu_F((a,b])=F(b)-F(a).
$$



&emsp; 这个测度称为由 $F$ 诱导的 **Lebesgue-Stieltjes 测度**。

&emsp; “唯一”这件事很重要。因为 Borel $\sigma$-代数就是由这些半开区间生成的，所以只要两个 Borel 测度在所有半开区间上取值一样，它们在所有 Borel 集上就一样。

&emsp; 因此，一个递增右连续函数 $F$ 完全决定了一个 Borel 测度。

&emsp; 反过来，这个测度也可以被理解为 $F$ 的“分布方式”：哪里 $F$ 增长得快，哪里测度就大；哪里 $F$ 没有增长，哪里就没有质量；如果 $F$ 在某点跳了一下，那一点就有一个原子质量。

&emsp; 更具体地，对点 $x$，有



$$
\mu_F(\{x\})=
F(x)-F(x-),
$$



&emsp; 所以跳跃大小就是点质量。普通 Lebesgue 测度没有点质量，是因为 $F(x)=x$ 没有跳跃。

## 反过来：测度也可以生成函数

&emsp; 上面是从函数 $F$ 得到测度 $\mu\_F$。反过来，如果已经有一个局部有限的 Borel 测度 $\mu$，我们也可以从它造出一个函数，定义：



$$
F(x)=
\begin{cases}
\mu((0,x]),& x>0,\\
0,& x=0,\\
-\mu((x,0]),& x<0.
\end{cases}
$$



&emsp; 这个定义看起来有点不对称，但其实只是为了固定一个常数。因为测度只关心 $F(b)-F(a)$，所以 $F$ 整体加一个常数不会改变测度。这里令 $F(0)=0$，只是选了一个标准代表。

&emsp; 先看递增性。如果 $a<b$，那么无论 $a,b$ 在 $0$ 的哪边，都可以验证



$$
F(b)-F(a)=\mu((a,b])\geq0.
$$



&emsp; 因此 $F$ 递增。

&emsp; 再看右连续性。取 $x\_n\downarrow x$。因为 $\mu$ 局部有限，所以在一个有界区间上测度有限。于是可以用测度的从上连续性：



$$
(x,x_n]\downarrow\varnothing.
$$



&emsp; 因此



$$
\mu((x,x_n])\to0.
$$



&emsp; 这正好说明



$$
F(x_n)-F(x)\to0.
$$



&emsp; 所以 $F$ 右连续。

&emsp; 最后，由定义直接得到



$$
F(b)-F(a)=\mu((a,b]).
$$



&emsp; 因而 $\mu$ 和 $\mu\_F$ 在所有半开区间上相同。由扩张唯一性，



$$
\mu=\mu_F.
$$



&emsp; 于是我们得到一个很漂亮的对应：



$$
\boxed{
\text{局部有限 Borel 测度}
\quad\longleftrightarrow\quad
\text{递增右连续函数，差一个常数}
}
$$



&emsp; 为什么说“差一个常数”？因为如果 $G=F+C$，那么



$$
G(b)-G(a)=F(b)-F(a).
$$



&emsp; 所以 $F$ 和 $F+C$ 诱导出同一个测度。反过来，如果



$$
\mu_F=\mu_G,
$$



&emsp; 那么对任意 $a<b$，



$$
F(b)-F(a)=G(b)-G(a),
$$



&emsp; 于是



$$
(F-G)(b)=(F-G)(a).
$$



&emsp; 所以 $F-G$ 是常数。

## 从 Borel 测度到完备测度

&emsp; 到目前为止，$\mu\_F$ 是定义在 $\mathcal B\_{\mathbb R}$ 上的 Borel 测度。但 Borel 测度不一定完备，换句话说就是可能存在一个 Borel 零测集 $N$，以及它的某个子集 $E\subset N$，但是 $E$ 不是 Borel 集。由于 $\mu\_F(N)=0$，我们直觉上当然希望 $E$ 也可测，并且测度为 $0$。所以我们要做完备化。完备化后的定义域可以像上上篇文章里那样写成：


$$
\mathcal M_F=
\{B\cup Z:B\in\mathcal B_{\mathbb R},\ Z\subset N,\ N\in\mathcal B_{\mathbb R},\ \mu_F(N)=0\}.
$$



&emsp; 也就是说，一个完备化后的可测集由两部分组成：

1. 一个 Borel 集 $B$；
2. 一个藏在 Borel 零测集里面的任意子集 $Z$。

&emsp; 在这个更大的 $\sigma$-代数上，测度定义为



$$
\overline{\mu_F}(B\cup Z)=\mu_F(B).
$$



&emsp; 这个定义是良定的，原因是 $Z$ 只差在零测集里面，不会改变测度。

&emsp; 通常我们不再额外写横线，仍然把完备化后的测度记作 $\mu\_F$，并称它为 Lebesgue-Stieltjes 测度。

&emsp; 所以要分清两层：



$$
\text{Borel Lebesgue-Stieltjes 测度}
\subset
\text{完备 Lebesgue-Stieltjes 测度}.
$$



&emsp; 前者定义在 Borel 集上，后者还把 Borel 零测集的所有子集补了进来。

## 外正则表示

&emsp; Lebesgue-Stieltjes 测度的一个非常有用的特点是：它仍然可以用区间覆盖来表示：设 $\mu$ 是由 $F$ 诱导出的完备 Lebesgue-Stieltjes 测度。对任意 $\mu$-可测集 $E$，有



$$
\mu(E)=
\inf
\left\{
\sum_{j=1}^{\infty}\mu((a_j,b_j]):
E\subset\bigcup_{j=1}^{\infty}(a_j,b_j]
\right\}.
$$



&emsp; 这其实就是外测度构造留下来的公式：用简单集合从外面覆盖 $E$，然后取所有覆盖总代价的下确界。不过实际使用时，我们更喜欢用开区间覆盖。也可以证明：



$$
\mu(E)=
\inf
\left\{
\sum_{j=1}^{\infty}\mu((a_j,b_j)):
E\subset\bigcup_{j=1}^{\infty}(a_j,b_j)
\right\}.
$$



&emsp; 为什么半开区间可以换成开区间？核心是右连续性。，对一个半开区间 $(a,b]$，我们可以把它稍微放大成开区间



$$
(a,b+\delta).
$$



&emsp; 多出来的部分是



$$
(b,b+\delta),
$$



&emsp; 它的测度大约是



$$
F(b+\delta)-F(b).
$$



&emsp; 由于 $F$ 右连续，这个量可以随着 $\delta\downarrow0$ 变得任意小。所以半开覆盖可以变成开覆盖，而且总测度只增加一点点。

&emsp; 这就是外正则性的雏形：复杂集合可以从外面用开集逼近。

## 测度的正则性

&emsp; 接下来是 $\mathbb R$ 上 Lebesgue-Stieltjes 测度最重要的性质之一：正则性。

&emsp; **Proposition 1.4.4（Regularity of measures）：** 如果 $E\in\mathcal M\_F$，那么



$$
\mu(E)=
\inf\{\mu(U):E\subset U,\ U\text{ is open}\}.
$$



&emsp; 这叫做**外正则性**。翻译成人话就是：



$$
\boxed{
\text{任意可测集都可以用稍微大一点的开集从外面逼近。}
}
$$



&emsp; 更具体地说，对任意 $\varepsilon>0$，都可以找到开集 $U\supset E$，使得



$$
\mu(U)\leq \mu(E)+\varepsilon.
$$



&emsp; 如果 $\mu(E)=\infty$，这个结论当然没有太多信息；真正有用的是 $\mu(E)<\infty$ 的时候，它说我们可以把多出来的测度压到任意小。

&emsp; 还有内正则性：



$$
\mu(E)=
\sup\{\mu(K):K\subset E,\ K\text{ is compact}\}.
$$



&emsp; 这句话的意思是：



$$
\boxed{
\text{任意可测集也可以用里面的紧集从内部逼近。}
}
$$



&emsp; 对任意 $\varepsilon>0$，如果 $\mu(E)<\infty$，可以找到紧集 $K\subset E$，使得



$$
\mu(K)\geq \mu(E)-\varepsilon.
$$



&emsp; 为什么内正则性也成立？可以先在有界集合上看。若 $E\subset[-N,N]$，那么用外正则性逼近补集：



$$
[-N,N]\setminus E.
$$



&emsp; 找到开集 $U$ 包住它，而且多出来的测度很小。令



$$
K=[-N,N]\setminus U.
$$



&emsp; 那么 $K$ 是闭且有界的，所以是紧集，并且



$$
K\subset E.
$$



&emsp; 由于 $U$ 只比 $[-N,N]\setminus E$ 多一点点，$K$ 只比 $E$ 少一点点。于是 $\mu(K)$ 可以任意接近 $\mu(E)$。

&emsp; 如果 $E$ 不有界，就先看



$$
E\cap[-N,N],
$$



&emsp; 再令 $N\to\infty$。这就是正则性的基本思路。

&emsp; 正则性非常重要，因为它把抽象的可测集和熟悉的拓扑对象联系了起来：



$$
\text{开集、闭集、紧集}
\quad\longleftrightarrow\quad
\text{一般可测集}.
$$



&emsp; 以后很多证明里，遇到一个复杂可测集，我们会先用开集或者紧集逼近它，然后在这些更规整的集合上做证明。

## Lebesgue-Stieltjes 可测集和 Borel 集的关系

&emsp; 我们现在可以回答这个问题了：Lebesgue-Stieltjes 可测集和 Borel 集到底差在哪里？

&emsp; 设 $\mathcal M\_F$ 是完备化后的 Lebesgue-Stieltjes 可测集类。那么



$$
\mathcal B_{\mathbb R}\subset \mathcal M_F.
$$



&emsp; 也就是说，所有 Borel 集当然都是 Lebesgue-Stieltjes 可测集，但反过来不一定成立。因为 $\mathcal M\_F$ 还包含 Borel 零测集的所有子集，而这些子集未必是 Borel 集。不过，这种“多出来”不是乱七八糟地多出来，而是只多在零测集里面，更准确地说，对任意 $E\in\mathcal M\_F$，存在 Borel 集 $B$ 和 Borel 零测集 $N$，使得



$$
E\triangle B\subset N,
$$



&emsp; 其中



$$
E\triangle B=(E\setminus B)\cup(B\setminus E)
$$



&emsp; 叫做**对称差**。也就是说，$E$ 和某个 Borel 集 $B$ 只差一个零测集，借助正则性，还可以把这个结论写得更漂亮。存在一个 $G\_\delta$ 集（$G\_{\delta}$ 集是可数个开集的交的意思） $G$，使得



$$
E\subset G,
\qquad
\mu(G\setminus E)=0.
$$



&emsp; 因此



$$
E=G\setminus (G\setminus E),
$$



&emsp; 也就是说，$E$ 可以看成一个 $G\_\delta$ 集删掉一个零测集。

&emsp; 同样，也存在一个 $F\_\sigma$ 集（$F\_{\delta}$ 集：可数个闭集的并） $H$，使得



$$
H\subset E,
\qquad
\mu(E\setminus H)=0.
$$



&emsp; 因此



$$
E=H\cup(E\setminus H).
$$



&emsp; 也就是说，$E$ 可以看成一个 $F\_\sigma$ 集加上一个零测集。

&emsp; 所以这条结论可以总结成：



$$
\boxed{
\text{完备可测集 = Borel 集 + 零测集里面的误差。}
}
$$



&emsp; 这也解释了为什么我们常说：



$$
\text{Borel 集}
\subset
\text{Lebesgue 可测集}
\subset
2^{\mathbb R}.
$$



&emsp; Lebesgue 可测集确实比 Borel 集多，但多出来的部分都藏在零测集的子集里。

### 为什么会有 $G\_\delta$ 和 $F\_\sigma$ 逼近？

&emsp; 先假设 $\mu(E)<\infty$。由外正则性，对每个 $n$，可以找开集 $U\_n\supset E$，使得



$$
\mu(U_n)\leq \mu(E)+\frac1n.
$$



&emsp; 令



$$
G=\bigcap_{n=1}^{\infty}U_n.
$$



&emsp; 那么 $G$ 是 $G\_\delta$ 集，并且 $E\subset G$。

&emsp; 又因为



$$
G\subset U_n,
$$



&emsp; 所以



$$
\mu(G)\leq \mu(U_n)\leq \mu(E)+\frac1n.
$$



&emsp; 令 $n\to\infty$，得到



$$
\mu(G)\leq\mu(E).
$$



&emsp; 但 $E\subset G$，所以 $\mu(E)\leq\mu(G)$。因此



$$
\mu(G)=\mu(E).
$$



&emsp; 于是



$$
\mu(G\setminus E)=0.
$$



&emsp; 这就得到 $G\_\delta$ 逼近。

&emsp; 内部的 $F\_\sigma$ 逼近也类似。由内正则性，对每个 $n$，找紧集 $K\_n\subset E$，使得



$$
\mu(K_n)\geq \mu(E)-\frac1n.
$$



&emsp; 令



$$
H=\bigcup_{n=1}^{\infty}K_n.
$$



&emsp; 那么 $H$ 是 $F\_\sigma$ 集，并且 $H\subset E$。同时 $\mu(H)=\mu(E)$，所以



$$
\mu(E\setminus H)=0.
$$



&emsp; 如果 $\mu(E)=\infty$，就先对 $E\cap[-N,N]$ 做上面的论证，再对 $N$ 取可数并。技术上多一层下标，但思想完全一样。

## Lebesgue 测度

&emsp; 现在把最熟悉的 Lebesgue 测度作为特例拿出来。

&emsp; 取



$$
F(x)=x.
$$



&emsp; 那么



$$
\mu_F((a,b])=F(b)-F(a)=b-a.
$$



&emsp; 所以由 $F(x)=x$ 诱导出的 Lebesgue-Stieltjes 测度，就是普通的一维 Lebesgue 测度。

&emsp; 我们通常把它记作



$$
m.
$$



&emsp; 它的完备定义域记作



$$
\mathcal L.
$$



&emsp; 所以



$$
(\mathbb R,\mathcal L,m)
$$



&emsp; 就是 $\mathbb R$ 上的 Lebesgue 测度空间。

&emsp; 这里也要分清两层：

1. $m$ 限制在 $\mathcal B\_{\mathbb R}$ 上，叫做 Borel Lebesgue 测度；
2. 把 Borel 零测集的所有子集补进来之后，得到完备 Lebesgue 测度。

&emsp; 我们在实分析中默认使用的，通常是第二个，也就是完备 Lebesgue 测度。

## Lebesgue 测度的平移和伸缩性质

&emsp; Lebesgue 测度最重要的性质之一，就是它真的符合我们对长度的直觉。

&emsp; **Proposition 1.4.6：** 如果 $E\in\mathcal L$，那么对任意 $s,r\in\mathbb R$，都有



$$
E+s\in\mathcal L,
\qquad
rE\in\mathcal L.
$$



&emsp; 并且



$$
m(E+s)=m(E),
$$





$$
m(rE)=|r|m(E).
$$



&emsp; 这里



$$
E+s=\{x+s:x\in E\}
$$



&emsp; 表示平移，



$$
rE=\{rx:x\in E\}
$$



&emsp; 表示伸缩。

&emsp; 先看半开区间：



$$
(a,b]+s=(a+s,b+s],
$$



&emsp; 所以



$$
m((a,b]+s)
=(b+s)-(a+s)
=b-a
=m((a,b]).
$$



&emsp; 这说明平移不改变半开区间的长度。

&emsp; 对伸缩，若 $r>0$，则



$$
r(a,b]=(ra,rb],
$$



&emsp; 所以



$$
m(r(a,b])=rb-ra=r(b-a).
$$



&emsp; 若 $r<0$，方向会反过来，端点形式会从左开右闭变成左闭右开。但端点对 Lebesgue 测度没有影响，所以最后仍然得到



$$
m(r(a,b])=|r|(b-a).
$$



&emsp; 对一般 Borel 集，可以定义新测度



$$
\nu(E)=m(E+s).
$$



&emsp; 它在半开区间上和 $m$ 一样，所以由扩张唯一性，



$$
\nu=m.
$$



&emsp; 于是所有 Borel 集都满足平移不变性。再通过完备化，就推广到所有 Lebesgue 可测集。

&emsp; 伸缩性质也是同样的逻辑：先在区间上验证，再由唯一性推广到 Borel 集，最后通过完备化推广到 Lebesgue 可测集。

&emsp; 所以这两个性质不是凭空来的，而是由“区间长度的平移/伸缩性质”和“测度扩张的唯一性”共同推出的。

## 小结

&emsp; 到这里，1.3 和 1.4 的主线就完整了。我们可以把它总结成下面这条路：



$$
\text{简单集合上的大小}
\Rightarrow
\text{预测度}
\Rightarrow
\text{外测度}
\Rightarrow
\text{Carathéodory 可测集}
\Rightarrow
\text{真正的测度}
\Rightarrow
\text{Lebesgue-Stieltjes 测度}
\Rightarrow
\text{Lebesgue 测度}.
$$



&emsp; 对这一篇来说，最核心的路线是：

1. 在半开区间代数 $\mathcal A$ 上定义



$$
\mu_0((a,b])=F(b)-F(a);
$$



2. 用 $F$ 的递增性保证 $\mu\_0$ 非负；
3. 用半开区间的端点抵消保证 $\mu\_0$ 良定并且有限可加；
4. 用 $F$ 的右连续性处理可数覆盖中的端点极限，从而证明 $\mu\_0$ 是预测度；
5. 用扩张定理得到 Borel 测度 $\mu\_F$；
6. 再做完备化，得到完整的 Lebesgue-Stieltjes 测度；
7. 当 $F(x)=x$ 时，得到通常的 Lebesgue 测度。

&emsp; 所以 Lebesgue 测度并不是突然冒出来的。它来自一条非常具体的构造链：



$$
\boxed{
\text{区间长度}
\Rightarrow
\text{预测度}
\Rightarrow
\text{外测度}
\Rightarrow
\text{Carathéodory 构造}
\Rightarrow
\text{完备化}
}
$$



&emsp; 而 Lebesgue-Stieltjes 测度则告诉我们：只要把“区间长度 $b-a$”换成“函数增量 $F(b)-F(a)$”，同一套机器仍然可以运转。
{% endraw %}
