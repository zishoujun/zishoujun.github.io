## react 基础

>React 是一个用于构建用户界面的 JavaScript 库

react 核心库 
**react** **react**-**dom** 
###### jsx
> 这个有趣的标签语法既不是字符串也不是 HTML。

它被称为 JSX，是一个 JavaScript 的语法扩展。我们建议在 React 中配合使用 JSX，JSX 可以很好地描述 UI 应该呈现出它应有交互的本质形式。JSX 可能会使人联想到模版语言，但它具有 JavaScript 的全部功能。

```
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```
 =={} 大括号内放置任何有效的 JavaScript 表达式==
`const element = <img src={user.avatarUrl}></img>;`
==react元素一旦创建不能更改==
