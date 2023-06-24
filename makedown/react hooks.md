

### react hooks

钩子 `hooks`  为函数式组件提供状态

在使用hooks之前 ，用mixsin 混入等方式管理造城数据无法追踪，数据混乱等现象，

不使用hooks 不利于ts的类型推导



Hooks

以为钩子状态，封装好的一种状态，

**usestate**

[state,state] =userstate({})  定义数据的地方

state，数据  setstate 操作数据的函数

*Effect Hook*  副作用

函数中的副作用

```jsx
    useEffect(() => {
        //可以更新数据的函数，请求这些
        
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
```

> 提示
>
> 如果你熟悉 React class 的生命周期函数，你可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合