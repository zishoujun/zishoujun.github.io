# styled-components

> tyled-components 是作者对于如何增强 React 组件中 CSS 表现这个问题的思考结果 通过聚焦于单个用例,设法优化了开发者的体验和面向终端用户的输出.

- Automatic critical CSS: styled-components 持续跟踪页面上渲染的组件,并向自动其注入且仅注入样式. 结合使用代码拆分, 可以实现仅加载所需的最少代码.
- 解决了 class name 冲突: styled-components 为样式生成唯一的 class name. 开发者不必再担心 class name 重复,覆盖和拼写错误的问题.
- CSS 更容易移除: 想要确切的知道代码中某个 class 在哪儿用到是很困难的. 使用 styled-components 则很轻松, 因为每个样式都有其关联的组件. 如果检测到某个组件未使用并且被删除,则其所有的样式也都被删除.
- 简单的动态样式: 可以很简单直观的实现根据组件的 props 或者全局主题适配样式,无需手动管理数十个 classes.
- 无痛维护: 无需搜索不同的文件来查找影响组件的样式.无论代码多庞大，维护起来都是小菜一碟。
- 自动提供前缀: 按照当前标准写 CSS,其余的交给 styled-components handle 处理.



**styled-components以组件的形式来声明样式，让样式也成为组件。它是一种 CSS-in-JS 的实现。**

# install

``` shell
npm install --save styled-components
```

1. 基本用法

```js
import React from 'react';
import styled from 'styled-components';


const Button = styled.button`
  color: red;
  background: white;
`;
//定义直接包裹
export default () => {
    return (
        <Button>1111</Button>
    )
}
```

## 缺点

1. 因为css-in-js，所以可能会让组件的tsx文件变得很长
2. 没有css语法高亮提示

不过这个可以在vscode中安装`vscode-styled-components`插件就可以了

3.生成的className是随机字符串，不方便debug





# 原理





```js
alert`hahaha`
// 等同于
alert(['hahaha'])
```

如果模板字符串里有变量

```js
const a=1;
const b=2;
alertNew`hahaha${a}hello${b+1}bye`
// 等同于
alertNew(['hahaha','hello','bye'],1,3)
```

第一个参数是没有变量替换的部分组成的数组，后面的参数是各个变量被替换后的值

```js
const Button = styled.button`
  color: red;
  font-size: 16px;
`;
// 等同于
const Button = styled('button')([
    'color: red;' +
    'font-size: 16px;'
])


```

1. 扩展样式

```
const NewButton = styled(Button)`
    color: blue;
`;
```

