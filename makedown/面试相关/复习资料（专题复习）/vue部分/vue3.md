# vue3.0 面试题总结

### 一、Vue 3.0 性能提升主要是通过哪几方面体现的？

```
1. 响应式系统提升
vue2在初始化的时候，对data中的每个属性使用definepropery调用getter和setter使之变为响应式对象。如果属性值为对象，还会递归调用defineproperty使之变为响应式对象。

vue3使用proxy对象重写响应式。proxy的性能本来比defineproperty好，proxy可以拦截属性的访问、赋值、删除等操作，不需要初始化的时候遍历所有属性，另外有多层属性嵌套的话，只有访问某个属性的时候，才会递归处理下一级的属性。
优势：
可以监听动态新增的属性；
可以监听删除的属性 ；
可以监听数组的索引和 length 属性； 
2. 编译优化
（1）优化编译和重写虚拟dom，让首次渲染和更新dom性能有更大的提升
   vue2 通过标记静态根节点,优化 diff 算法
   vue3 标记和提升所有静态根节点,diff 的时候只比较动态节点内容
（2）Fragments, 模板里面不用创建唯一根节点,可以直接放同级标签和文本内容
（3）静态提升
（4）patch flag, 跳过静态节点,直接对比动态节点
（5）缓存事件处理函数
3. 源码体积的优化
  (1)vue3移除了一些不常用的api，例如：inline-template、filter等
  (2)使用tree-shaking
```

### 二. Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

##### Options Api

>  包含一个描述组件选项（data、methods、props等）的对象 options；
> API开发复杂组件，同一个功能逻辑的代码被拆分到不同选项 ；
> 使用mixin重用公用代码，也有问题：命名冲突，数据来源不清晰； 

##### composition Api

>  vue3 新增的一组 api，它是基于函数的 api，可以更灵活的组织组件的逻辑。
> 解决options api在大型项目中，options api不好拆分和重用的问题。 

### 三. Proxy 相对于 Object.defineProperty 有哪些优点？

 proxy的性能本来比defineproperty好，proxy可以拦截属性的访问、赋值、删除等操作，不需要初始化的时候遍历所有属性，另外有多层属性嵌套的话，只有访问某个属性的时候，才会递归处理下一级的属性。 

>  可以监听数组变化
> 可以劫持整个对象
> 操作时不是对原对象操作,是 new Proxy 返回的一个新对象
> 可以劫持的操作有 13 种 

### 四. Vue 3.0 在编译方面有哪些优化？

```
(1) vue.js 3.x中标记和提升所有的静态节点，diff的时候只需要对比动态节点内容；
(2) Fragments（升级vetur插件): template中不需要唯一根节点，可以直接放文本或者同级标签
(3) 静态提升(hoistStatic),当使用 hoistStatic 时,所有静态的节点都被提升到 render 方法之外.只会在应用启动的时       候被创建一次,之后使用只需要应用提取的静态节点，随着每次的渲染被不停的复用。
(4)patch flag, 在动态标签末尾加上相应的标记,只能带 patchFlag 的节点才被认为是动态的元素,会被追踪属性的修改,能快速的找到动态节点,而不用逐个逐层遍历，提高了虚拟dom diff的性能。
(5)缓存事件处理函数cacheHandler,避免每次触发都要重新生成全新的function去更新之前的函数
(6)tree shaking 通过摇树优化核心库体积,减少不必要的代码量
```

### 五. Vue.js 3.0 响应式系统的实现原理？

```
1. reactive
   设置对象为响应式对象。接收一个参数，判断这参数是否是对象。不是对象则直接返回这个参数，不做响应式处理。
   创建拦截器handerler，设置get/set/deleteproperty。
   get
   收集依赖（track）；
   如果当前 key 的值是对象，则为当前 key 的对象创建拦截器 handler, 设置 get/set/deleteProperty；
   如果当前的 key 的值不是对象，则返回当前 key 的值。
   set
   设置的新值和老值不相等时，更新为新值，并触发更新（trigger）。
   deleteProperty
   当前对象有这个 key 的时候，删除这个 key 并触发更新（trigger）。

2. effect
   接收一个函数作为参数。作用是：访问响应式对象属性时去收集依赖

3. track
   接收两个参数：target 和 key
   －如果没有 activeEffect，则说明没有创建 effect 依赖
   －如果有 activeEffect，则去判断 WeakMap 集合中是否有 target 属性
   －WeakMap 集合中没有 target 属性，则 set(target, (depsMap = new Map()))
   －WeakMap 集合中有 target 属性，则判断 target 属性的 map 值的 depsMap 中是否有 key 属性
   －depsMap 中没有 key 属性，则 set(key, (dep = new Set()))
   －depsMap 中有 key 属性，则添加这个 activeEffect

４.trigger
判断 WeakMap 中是否有 target 属性，WeakMap 中有 target 属性，则判断 target 属性的 map 值中是否有 key 属性，有的话循环触发收集的 effect()。
```

### 六.vue3有哪些新特新

```
1、响应系统的变动
由原来的Object.defineProperty 的getter 和 setter，改变成为了ES2015 Proxy 作为其观察机制。
Proxy的优势：消除了以前存在的警告，使速度加倍，并节省了一半的内存开销。
2、虚拟DOM重写（Virtual DOM Rewrite）
虚拟 DOM 从头开始重写，我们可以期待更多的编译时提示来减少运行时开销。重写将包括更有效的代码来创建虚拟节点。
3、组件渲染的优化（优化插槽生成）
Vue2当中在父组件渲染同时，子组件也会渲染。 Vue3就可以单独渲染父组件、子组件。
4、静态树提升（Static Tree Hoisting）
使用静态树提升，这意味着 Vue 3 的编译器将能够检测到什么是静态组件，然后将其提升，从而降低了渲染成本。它将能够跳过未整个树结构打补丁的过程。
5、静态属性提升（Static Props Hoisting）
此外，我们可以期待静态属性提升，其中 Vue 3 将跳过不会改变节点的打补丁过程。
总体来说：1. 更快 2. 更小 3. 更容易维护 4. 更加友好 5. 更容易使用
```
