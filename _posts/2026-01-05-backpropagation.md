---
layout: post
title: "反向传播"
archive_title: "反向传播"
section: "Machine Learning"
section_slug: "machine-learning"
series_order: 5
date: 2026-01-05
tags: ["SupervisedLearning"]
summary: "我上一篇写了关于反向传播的内容的是这里：机器学习--神经网络，现在过去想要复习一下已经有点看不懂了（（（"
math: true
---
{% raw %}
# 反向传播

&emsp; 我上一篇写了关于反向传播的内容的是这里：[机器学习--神经网络](/posts/neuralnetwork/)，现在过去想要复习一下已经有点看不懂了（（（

&emsp; 所以今天想能不能用更通俗一点的方式描述一下back propagation这个算法的精髓

## 进入正题

&emsp; 我们首先来看一下一个最最最最最简单的神经网络，她长这样：

![在这里插入图片描述](/assets/images/machine-learning/SupervisedLearning/pic/BP.png)

&emsp; 于是我们的 cost function 就可以直接写成这种形式：

$$ C(w_1, b_1, w_2, b_2, w_3, b_3) $$

&emsp; 然后我们令这四个节点分别为 $a^{(L-3)}, a^{(L-2)}, a^{(L-1)}, a^{(L)}$，我们期望的值是 $y$，那么就显然有：

$$ C(w_1, b_1, w_2, b_2, w_3, b_3) = \frac 12(a^{(L)} - y)^2 $$

&emsp; 然后还记得我们的 $a^{(L)}$ 是怎么计算的吗？ 没错，$L$ 层的激发就是它前一层的激发的线性组合加上偏差值 $b^{(L)}$ 然后再做 $reLU$ 或者 $sigmoid$：

$$
\begin{aligned}
& z^{(L)} = w^{(L)}a^{(L - 1)} + b^{(L)} \\
& a^{(L)} = \sigma(z^{(L)})
\end{aligned}
$$

### 第一层


&emsp; 我们现在的目标是要弄明白 **$w^{(L)}$ 的改变会对 $C(...)$ 产生多大的影响**，数学上也就是想要知道 $\frac{\partial C}{\partial w^{(L)}}$，那么我们就要建立 $C$ 和 $w^{(L)}$ 的关系：

$$
\begin{aligned}
& z^{(L)} = w^{(L)}a^{(L - 1)} + b^{(L)} \\
& a^{(L)} = \sigma(z^{(L)}) \\
& C = \frac 12(a^{(L)} - y)^2
\end{aligned}
$$

&emsp; 我们可以看到，我们 $w^{(L)}$ 想要和 $C(...)$ 关联起来就是靠这三个方程，那么我们一步一步来：

1. 先确定 $w^{(L)}$ 改变对 $z^{(L)}$ 的影响程度（也就是 $\frac{\partial z^{(L)}}{\partial w^{(L)}}$）
2. 再确定 $z^{(L)}$ 的改变对 $a^{(L)}$ 的影响程度（也就是 $\frac{\partial a^{(L)}}{\partial z^{(L)}}$）
3. 最后确定 $a^{(L)}$ 改变对 $C$ 的影响程度（也就是 $\frac{\partial C}{\partial a^{(L)}}$）

&emsp; 这样分三步来我们就可以得到 $w^{(L)}$ 改变对 $C(...)$ 的影响程度，数学上来说就是这样（其实就是链式求导法则）：

$$ \frac{\partial C}{\partial w^{(L)}} = \frac{\partial z^{(L)}}{\partial w^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial C}{\partial a^{(L)}} $$

&emsp; 然后我们把上式直接展开，就能得到：

$$
\begin{aligned}
\frac{\partial C}{\partial w^{(L)}} = & \frac{\partial z^{(L)}}{\partial w^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial C}{\partial a^{(L)}}\\ \\
= & a^{(L - 1)} \cdot \sigma'(z^{(L)}) \cdot (a^{(L)} - y)
\end{aligned}
$$

&emsp; 相似的，我们可以求出 $\frac{\partial C}{\partial b^{(L)}}$：

$$
\begin{aligned}
\frac{\partial C}{\partial b^{(L)}} = & \frac{\partial z^{(L)}}{\partial b^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial C}{\partial a^{(L)}}\\ \\
= & 1 \cdot \sigma'(z^{(L)}) \cdot (a^{(L)} - y)
\end{aligned}
$$

### 第二层

&emsp; 同样的，我们前一层的东西也是如法炮制，我们有：

$$
\begin{aligned}
& z^{(L - 1)} = w^{(L - 1)}a^{(L - 2)} + b^{(L - 1)} \\
& a^{(L - 1)} = \sigma(z^{(L - 1)}) \\
& z^{(L)} = w^{(L)}a^{(L - 1)} + b^{(L)} \\
& a^{(L)} = \sigma(z^{(L)})
\end{aligned}
$$



&emsp; 于是可以得到：

$$
\begin{aligned}
\frac{\partial C}{\partial w^{(L - 1)}} = & \frac{\partial z^{(L - 1)}}{\partial w^{(L - 1)}} \cdot \frac{\partial a^{(L - 1)}}{\partial z^{(L - 1)}} \cdot \frac{\partial C}{\partial a^{(L - 1)}}   \\ \\ 
= & \frac{\partial z^{(L - 1)}}{\partial w^{(L - 1)}} \cdot \frac{\partial a^{(L - 1)}}{\partial z^{(L - 1)}} \cdot \left[\frac{\partial z^{(L)}}{\partial a^{(L - 1)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial C}{\partial a^{(L)}}\right] \\ \\
= & a^{(L - 2)} \cdot \sigma'(z^{(L - 1)}) \cdot \left[w^{(L)} \cdot \sigma'(z^{(L)}) \cdot (a^{(L)} - y)\right]
\end{aligned}
$$

$$
\begin{aligned}
\frac{\partial C}{\partial b^{(L - 1)}} = & \frac{\partial z^{(L - 1)}}{\partial b^{(L - 1)}} \cdot \frac{\partial a^{(L - 1)}}{\partial z^{(L - 1)}} \cdot \frac{\partial C}{\partial a^{(L - 1)}}   \\ \\ 
= & \frac{\partial z^{(L - 1)}}{\partial b^{(L - 1)}} \cdot \frac{\partial a^{(L - 1)}}{\partial z^{(L - 1)}} \cdot \left[\frac{\partial z^{(L)}}{\partial a^{(L - 1)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial C}{\partial a^{(L)}}\right] \\ \\
= & 1 \cdot \sigma'(z^{(L - 1)}) \cdot \left[w^{(L)} \cdot \sigma'(z^{(L)}) \cdot (a^{(L)} - y)\right]
\end{aligned}
$$

### 对比一下？

&emsp; 我们现在已经算了两层这个东西了，根据已知的这几个表达式我们能看出什么规律吗？我们把求出来的这四个式子再写在下面供对比：

$$
\begin{aligned}
&\frac{\partial C}{\partial w^{(L)}} = a^{(L - 1)} \cdot \sigma'(z^{(L)}) \cdot \frac{\partial C}{\partial a^{(L)}} ,\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b^{(L)}} = 1 \cdot \sigma'(z^{(L)}) \cdot \frac{\partial C}{\partial a^{(L)}} \\
&\frac{\partial C}{\partial w^{(L - 1)}} = a^{(L - 2)} \cdot \sigma'(z^{(L - 1)}) \cdot \frac{\partial C}{\partial a^{(L - 1)}}, \;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b^{(L - 1)}} = 1 \cdot \sigma'(z^{(L - 1)}) \cdot \frac{\partial C}{\partial a^{(L)}}
\end{aligned}
$$

&emsp; 我们可以发现在这几个式子的最后我们都有一个 $\frac{\partial C}{\partial a}$ 的项，而且这个项是可以递推计算的，所以我们考虑令 $\delta^{(n)} = \frac{\partial C}{\partial a^{(n)}}$，于是上面四个式子可以写成：

$$
\begin{aligned}
&\frac{\partial C}{\partial w^{(L)}} = a^{(L - 1)} \cdot \sigma'(z^{(L)}) \cdot \delta^{(L)},\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b^{(L)}} = 1 \cdot \sigma'(z^{(L)}) \cdot \delta^{(L)} \\
&\frac{\partial C}{\partial w^{(L - 1)}} = a^{(L - 2)} \cdot \sigma'(z^{(L - 1)}) \delta^{(L - 1)}, \;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b^{(L - 1)}} = 1 \cdot \sigma'(z^{(L - 1)}) \cdot \delta^{(L - 1)}
\end{aligned}
$$

&emsp; 其中 $\delta^{(L)}$ 的递推式可以写成：

$$ \delta^{(L - 1)} = w^{(L)}\cdot \sigma'(z^{(L)}) \cdot \delta^{(L)} $$

&emsp; 这个递推关系也很好证明：

$$
\begin{aligned}
\delta^{(L - 1)} = & \frac{\partial C}{\partial a^{(L - 1)}} \\ \\
= & \frac{\partial C}{\partial a^{(L)}} \cdot \frac{\partial a^{(L)}}{\partial z^{(L)}} \cdot \frac{\partial z^{(L)}}{\partial a^{(L - 1)}} \\ \\
= & \delta^{(L)} \cdot \sigma'(z^{(L)}) \cdot w^{(L)}
\end{aligned}
$$

### 第三层

&emsp; 我们最后来验证一下前二层的式子是否满足我们刚才得到的递推关系，同样的，我们有：

$$
\begin{aligned}
& z^{(L - 2)} = w^{(L - 2)}a^{(L - 3)} + b^{(L - 2)} \\
& a^{(L - 2)} = \sigma(z^{(L - 2)}) \\
& z^{(L - 1)} = w^{(L - 1)}a^{(L - 2)} + b^{(L - 1)} \\
& a^{(L - 1)} = \sigma(z^{(L - 1)}) \\
\end{aligned}
$$

&emsp; 于是：

$$
\begin{aligned}
\frac{\partial C}{\partial w^{(L - 2)}} = & \frac{\partial z^{(L - 2)}}{\partial w^{(L - 2)}} \cdot \frac{\partial a^{(L - 2)}}{\partial z^{(L - 2)}} \cdot \frac{\partial C}{\partial a^{(L - 2)}}   \\ \\ 
= & \frac{\partial z^{(L - 2)}}{\partial w^{(L - 2)}} \cdot \frac{\partial a^{(L - 2)}}{\partial z^{(L - 2)}} \cdot \delta^{(L - 2)} \\ \\
= & a^{(L - 2)} \cdot \sigma'(z^{(L - 1)}) \cdot \delta^{(L - 2)}
\end{aligned}
$$

$$
\begin{aligned}
\frac{\partial C}{\partial b^{(L - 2)}} = & \frac{\partial z^{(L - 2)}}{\partial b^{(L - 2)}} \cdot \frac{\partial a^{(L - 2)}}{\partial z^{(L - 2)}} \cdot \frac{\partial C}{\partial a^{(L - 2)}}   \\ \\ 
= & \frac{\partial z^{(L - 2)}}{\partial b^{(L - 2)}} \cdot \frac{\partial a^{(L - 2)}}{\partial z^{(L - 2)}} \cdot \delta^{(L - 2)} \\ \\
= & a^{(L - 2)} \cdot \sigma'(z^{(L - 1)}) \cdot \delta^{(L - 2)}
\end{aligned}
$$

&emsp; 其中：

$$
\begin{aligned}
\delta^{(L - 2)} = & \frac{\partial C}{\partial a^{(L - 2)}} \\ \\
= & \frac{\partial C}{\partial a^{(L - 1)}} \cdot \frac{\partial a^{(L - 1)}}{\partial z^{(L - 1)}} \cdot \frac{\partial z^{(L - 1)}}{\partial a^{(L - 2)}} \\ \\
= & \delta^{(L - 1)} \cdot \sigma'(z^{(L - 1)}) \cdot w^{(L - 1)}
\end{aligned}
$$

&emsp; 我们现在把已经得到的三组递推关系整理一下：

$$
\begin{aligned}
&\frac{\partial C}{\partial w^{(L)}} = a^{(L - 1)} \cdot \sigma'(z^{(L)}) \cdot \delta^{(L)},\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b^{(L)}} = 1 \cdot \sigma'(z^{(L)}) \cdot \delta^{(L)} \\
&\frac{\partial C}{\partial w^{(L - 1)}} = a^{(L - 2)} \cdot \sigma'(z^{(L - 1)}) \delta^{(L - 1)}, \;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b^{(L - 1)}} = 1 \cdot \sigma'(z^{(L - 1)}) \cdot \delta^{(L - 1)} \\
&\frac{\partial C}{\partial w^{(L - 2)}} = a^{(L - 3)} \cdot \sigma'(z^{(L - 2)}) \delta^{(L - 2)}, \;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b^{(L - 2)}} = 1 \cdot \sigma'(z^{(L - 2)}) \cdot \delta^{(L - 2)}
\end{aligned}
$$

$$
\begin{aligned}
& \delta^{(L)} = (a^{(L)} - y) \\
& \delta^{(L - 1)} = w^{(L)}\cdot \sigma'(z^{(L)}) \cdot \delta^{(L)} \\
& \delta^{(L - 2)} = w^{(L - 1)}\cdot \sigma'(z^{(L - 1)}) \cdot \delta^{(L - 1)}
\end{aligned}
$$

&emsp; 于是我们找到了一种递推关系使得我们可以递推来求得 $C$ 关于所有 $w$ 和 $b$ 的偏导数，这样一来我们就能利用这些偏导数来做 $SGD$ 了。

## 更复杂的网络

![在这里插入图片描述](/assets/images/machine-learning/SupervisedLearning/pic/BP2.png)


&emsp; 我们就看一个复杂网络的一小部分的一个 $w^{(L)}_{jk}$ 表示从 $L - 1$ 层 $a^{(L - 1)}_k$ 到 $L$ 层 $a^{(L)}_j$ 的一条边，我们要求得 $C$ 关于这个的偏导首先我们要写出新的 cost function：

&emsp; 不同于第一个例子，现在我们的最后一层有了 $n_{L}$ 个节点，所以我们的 cost 理应是这 $n_{L}$ 个节点与 $y$ 只差的平方平均，也就是：

$$ C(...) = \frac12 \sum_{i = 1}^{n_{L}}(a_i^{(L)} - y_i)^2 $$

### 第一层

&emsp; 同样的，我们依旧需要写出如何从 $a_{k}^{(L - 1)}$ 计算到 $a_{j}^{(L)}$，然后一步一步计算它每一步的影响：

$$
\begin{aligned}
z^{(L)}_{j} = & \begin{bmatrix}  w_{j1}^{(L)} &  w_{j2}^{(L)} & \cdots &  w_{jk}^{(L)} & \cdots &  w_{jn_{L - 1}}^{(L)} \end{bmatrix} \begin{bmatrix} a_1^{(L - 1)} \\\\ a_2^{(L - 1)} \\ \vdots \\\\ a_k^{(L - 1)} \\ \vdots \\\\ a_{n_{L - 1}}^{(L - 1)} \end{bmatrix} + b_j^{(L)} \\
= & w_{j1}^{(L)}a_1^{(L - 1)} + w_{j2}^{(L)}a_2^{(L - 1)} + \cdots  + w_{jk}^{(L)}a_k^{(L - 1)} + \cdots + w_{jn_{L - 1}}^{(L)}a_{n_{L - 1}}^{(L - 1)} + b^{(L)}_j \\\\
a_{j}^{(L)} = & \sigma(z^{(L)}_j)
\end{aligned}
$$

&emsp; 然后就是依次求偏导：

$$
\begin{aligned}
\delta^{(L)}_j = & \frac{\partial C}{\partial a_{j}^{(L)}} = (a^{(L)}_j - y_j) \\\\
\frac{\partial C}{\partial w_{jk}^{(L)}} = &  \frac{\partial z_j^{(L)}}{\partial w_{jk}^{(L)}} \cdot \frac{\partial a_j^{(L)}}{\partial z_j^{(L)}} \cdot \frac{\partial C}{\partial a_j^{(L)}} \\\\
= & a^{(L - 1)}_k \cdot \sigma'(z_j^{(L)}) \cdot \delta^{(L)}_j \\\\
\frac{\partial C}{\partial b_{j}^{(L)}} = &  \frac{\partial z_j^{(L)}}{\partial b_{j}^{(L)}} \cdot \frac{\partial a_j^{(L)}}{\partial z_j^{(L)}} \cdot \frac{\partial C}{\partial a_j^{(L)}} \\\\
= & 1 \cdot \sigma'(z_j^{(L)}) \cdot \delta^{(L)}_j \\\\
\end{aligned} \\\\
$$

&emsp; 到这里都和我们上面写的最简单的情况是一模一样的

### 第二层

&emsp; 但是到第二层情况就会有点不一样了

![在这里插入图片描述](/assets/images/machine-learning/SupervisedLearning/pic/BP3.png)


&emsp; 到这里我们有：

$$
\begin{aligned}
z^{(L - 1)}_{k} = & \begin{bmatrix}  w_{k1}^{(L - 1)} &  w_{k2}^{(L - 1)} & \cdots &  w_{ki}^{(L - 1)} & \cdots &  w_{kn_{L - 2}}^{(L - 1)} \end{bmatrix} \begin{bmatrix} a_1^{(L - 2)} \\\\ a_2^{(L - 2)} \\ \vdots \\\\ a_i^{(L - 2)} \\ \vdots \\\\ a_{n_{L - 2}}^{(L - 2)} \end{bmatrix} + b_k^{(L - 1)} \\
= & w_{k1}^{(L - 1)}a_1^{(L - 2)} + w_{k2}^{(L - 1)}a_2^{(L - 2)} + \cdots  + w_{ki}^{(L - 1)}a_i^{(L - 2)} + \cdots + w_{kn_{L - 2}}^{(L - 1)}a_{n_{L - 2}}^{(L - 2)} + b^{(L - 1)}_k \\\\
a_{j}^{(L)} = & \sigma(z^{(L)}_j)
\end{aligned}
$$

&emsp; 于是我们有：

$$
\begin{aligned}
\delta^{(L - 1)}_k = & \frac{\partial C}{\partial a_{k}^{(L - 1)}} \\\\
\frac{\partial C}{\partial w_{ki}^{(L - 1)}} = &  \frac{\partial z_k^{(L - 1)}}{\partial w_{ki}^{(L - 1)}} \cdot \frac{\partial a_k^{(L - 1)}}{\partial z_k^{(L - 1)}} \cdot \frac{\partial C}{\partial a_k^{(L - 1)}} \\\\
= & a^{(L - 2)}_i \cdot \sigma'(z_k^{(L - 1)}) \cdot \delta^{(L - 1)}_k \\\\
\frac{\partial C}{\partial b_{k}^{(L - 1)}} = &  \frac{\partial z_k^{(L - 1)}}{\partial b_{k}^{(L - 1)}} \cdot \frac{\partial a_k^{(L - 1)}}{\partial z_k^{(L - 1)}} \cdot \frac{\partial C}{\partial a_k^{(L - 1)}} \\\\
= & 1 \cdot \sigma'(z_k^{(L - 1)}) \cdot \delta^{(L - 1)}_k \\\\
\end{aligned}
$$

&emsp; 现在我们就会发现 $\delta^{(L - 1)}_k = \frac{\partial C}{\partial a_{k}^{(L - 1)}}$ 这一项好像和一开始那个最简单的神经网络里的情况不一样了，因为现在的 $a_{k}^{(L - 1)}$ 不仅仅只影响一个单一的节点，而是影响了 $\begin{bmatrix} a^{(L)}_1 & a^{(L)}_2 & \cdots a^{(L)}_{n_L} \end{bmatrix}$ 这 $n_{L}$ 个节点的值，所以我们需要把这些影响都加起来才是 $a^{(L - 1)}_k$ 对 $C(...)$ 的总影响：

$$
\begin{aligned}
\delta^{(L - 1)}_k = & \frac{\partial C}{\partial a_{k}^{(L - 1)}} \\\\
= & \sum_{j = 1}^{n_L} \frac{\partial z_j^{(L)}}{\partial a_{k}^{(L - 1)}} \cdot \frac{\partial a_j^{(L)}}{\partial z_j^{(L)}} \cdot \frac{\partial C}{\partial a_j^{(L)}} \\\\
= & \sum_{j = 1}^{n_L} w_{jk}^{(L)} \cdot \sigma'(z_j^{(L)}) \cdot \delta_j^{(L)}
\end{aligned}
$$

&emsp; 我们把两层放在一起看一下：

$$
\begin{aligned}
& \frac{\partial C}{\partial w_{jk}^{(L)}} = a^{(L - 1)}_k \cdot \sigma'(z_j^{(L)}) \cdot \delta^{(L)}_j \;\;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial w_{ki}^{(L - 1)}} = a^{(L - 2)}_i \cdot \sigma'(z_k^{(L - 1)}) \cdot \delta^{(L - 1)}_k \\\\
& \frac{\partial C}{\partial b_{j}^{(L)}} = 1 \cdot \sigma'(z_j^{(L)}) \cdot \delta^{(L)}_j \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \frac{\partial C}{\partial b_{k}^{(L - 1)}} = 1 \cdot \sigma'(z_k^{(L - 1)}) \cdot \delta^{(L - 1)}_k \\\\
& \delta^{(L)}_j = (a^{(L)}_j - y_j) \;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; \delta^{(L - 1)}_k = \sum_{j = 1}^{n_L} w_{jk}^{(L)} \cdot \sigma'(z_j^{(L)}) \cdot \delta_j^{(L)}
\end{aligned}
$$

&emsp; 这就是完整的对于所有神经网络都适用的递推式了，关于第三层以及往后这里就不赘述，感兴趣的读者可以自行推导一下
{% endraw %}
