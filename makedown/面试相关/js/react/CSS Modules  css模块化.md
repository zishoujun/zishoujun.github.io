# CSS Modules
> 在样式开发过程中，有两个问题比较突出：

> 全局污染 —— CSS 文件中的选择器是全局生效的，不同文件中的同名选择器，根据 build 后生成文件中的先后顺序，后面的样式会将前面的覆盖；
选择器复杂 —— 为了避免上面的问题，我们在编写样式的时候不得不小心翼翼，类名里会带上限制范围的标识，变得越来越长，多人开发时还很容易导致命名风格混乱，一个元素上使用的选择器个数也可能越来越多。
  
```
// example.ts
//引入css
import styles from './example.less';
export default ({ title }) => <div className={styles.title}>{title}</div>;
//直接文件变量+css类名


//css文件
/*  example.less */
.title {
  margin-bottom: 16px;
  color: @heading-color;
  font-weight: 600;
}
```
### 样式穿透，使用全局css :global

```
/* example.less */
.title {
  margin-bottom: 16px;
  color: @heading-color;
  font-weight: 600;
}

/* 定义全局样式 */
:global(.text) {
  font-size: 16px;
}

/* 定义多个全局样式 */
:global {
  .footer {
    color: #ccc;
  }
  .sider {
    background: #ebebeb;
  }
}
```
