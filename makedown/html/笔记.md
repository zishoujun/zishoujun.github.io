## 网页构成

1. HTML - 网页内容
2. CSS - 网页化妆
3. Javascript - 网页动态



## 掌握vs code使用

1. 学会安装插件

   1. Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
   2. Auto Close Tag
   3. Auto Complete Tag
   4. Auto Rename Tag
   5. Bracket Pair Colorizer 2
   6. indent-rainbow
   7. Live Server
   8. Mithril Emmet

2. 如何创建文件夹 / 文件

   ![image-20220226103336003](C:\Users\Alan\AppData\Roaming\Typora\typora-user-images\image-20220226103336003.png)

3. 快捷方式（TODO）

   1. 添加注释 ctrl + /
   2. 跳转到下一行 ctrl + enter
   3. 格式化 shift + alt + f
   4. 复制 alt + shift + 方向键上下

## 浏览器调试

1. 按f12 或者 ctrl + shift + i
2. 点击选项栏中的`Elements`

## 页面基本结构生成

1. 生成：英文感叹号 + tab键或者enter键即可
2. 预览： 点击右键 -> 点击Open With LiveServer

```html
<!-- 声明文档类型为html -->
<!DOCTYPE html>
<!-- 网页的载体，所有网页内容全部放html里面 -->
<html lang="en">

<!-- 网页的头 -->
<head>
  <!-- 网页的标题 -->
  <title>itcast</title>
</head>

<!-- 网页的身体 -->
<body>
  hello world
</body>

</html>
```

## 标签(元素)

书写方式： 打出标签名称 -> tab键或者enter键即可

![image-20220226111206236](C:\Users\Alan\AppData\Roaming\Typora\typora-user-images\image-20220226111206236.png)

### ⭐h系列标题标签  -> head

作用：展示标题用的

h1 - h6

特点：

1. 文字都有加粗
2. 独占一行显示
3. 字体大小从h1 到 h6 由大到小

> 注意：
>
> 1. 一个网页中只能存在一个大标题h1；
> 2. h1一般可以用来放网页的logo   --> 为什么要这么放？ --> 因为对SEO（搜索引擎优化）友好，说白话就是让你的网页搜索结果更靠前

### ⭐p标签 -> paragraph

作用：展示段落

特点：独占一行显示

>注意： 
>
>p标签不能放p标签

### br标签 -> break

作用：用来换行

### hr标签  -> horizontal

作用：水平线，一般用来表示场景的切换

### ⭐文本格式化标签

左边的这些标签是没有语义的，右边这些是有语义的。

- b → strong 强调的语气
- u → ins 插入
- i → em 强调
- s → del 删除

> 实际开发不用他们来修饰文本的样式，而用他们来做一些小图标。

### ⭐img图片标签

src属性表示图片路径

alt属性表示图片出错时的显示文字

title属性表示鼠标放在图片上的提示信息

```html
<img src="phone.webp" alt="图片显示出错了" title="这是一个手机">
```

>路径： 相对路径 和 绝对路径
>
>相对路径：1. 同一级 ./  2. 上一级 ../
>
>绝对路径： 1. 直接以 / 开头； 2. 以一个网址开头的

### ⭐a标签 -> anchor

作用：创建用于跳转的超链接，例如：

```html
  <a href="https://www.baidu.com">
    <img src="./phone.webp" alt="">
  </a>
```

锚点: 可以跳转到同一个页面指定的位置

```html
  <!-- 2. 通过 #标记名 就可以跳转了 注意这个标记名必须和下面打标记的id名一模一样 -->
  <a href="#one">11111</a>

  <!-- 1. 在需要跳转的地方打标记，通过id属性 -->
  <h2 id="one">应用层</h2>
```

### ⭐ol标签 有序列表 -> ordered list

> 列表标签下面只能放li标签

### ⭐ul标签 无序列表 -> unordered list

> 列表标签下面只能放li标签

### ⭐li标签 列表项 -> list item



### dl 自定义列表 -> define list

### dt 自定义列表标题 -> define title

### dd自定义列表数据  -> define data

```html
  <dl>
    <dt>购物指南</dt>
    <dd>购物流程</dd>
    <dd>会员介绍</dd>
  </dl>
```



### table 表格

![image-20220227093914424](C:\Users\Alan\AppData\Roaming\Typora\typora-user-images\image-20220227093914424.png)

表格的属性

需求：

![image-20220227101748808](C:\Users\Alan\AppData\Roaming\Typora\typora-user-images\image-20220227101748808.png)

实现步骤：

1. 先画出完整的表格
2. 合并表格先搞清楚到底是合并的行还是合并的列
3. 合并行使用属性rowspan 合并列使用colspan 合并之后多余的标签需要删掉

### 表单标签

```html
  <!--
    action 表示表单需要提交的地址
    method 表示提交数据的方法 一般是POST 或者 GET 默认是GET
    如果使用get的方式，用户输入的数据到时候会展示在url窗口中
   -->
  <form action="/aa.html" method="GET">
    <!--
      文本输入框
      name 和 value属性 必须要有
      name表示表单元素input的名字
      value表示表单元素input的值
    -->
    <label for="user">用户名：</label>
    <input type="text" name="username" value="" id="user"> <br>

    <!-- 密码输入框 -->
    <label for="mima">
      密码：<input type="password" name="pwd" value="" id="mima" placeholder="密码"> <br>
    </label>

    <!-- 单选按钮 name值是相同的，因为他们表示相同的东西 -->
    <input type="radio" name="sex" value="nan" checked>男
    <input type="radio" name="sex" value="nv">女
    <input type="radio" name="sex" value="others">保密 <br>

    <!-- 多选按钮 checkbox name必须相同 -->
    <input type="checkbox" name="hobby" value="basketball" checked> 篮球
    <input type="checkbox" name="hobby" value="football" checked> 足球
    <input type="checkbox" name="hobby" value="coding"> 敲代码 <br>

    <!-- 下拉选框 -->
    <select name="country" value="">
      <!-- 下拉选项 注意option的value属性一定要给值 -->
      <option value="00001">中国</option>
      <option value="00002">法国</option>
      <option value="00003" selected>美国</option>
    </select>
    <br>

    <!-- 上传文件 -->
    <input type="file" name="profile"> <br>

    <!-- 隐藏域 -->
    <input type="hidden" name="idcard" value="sdffsrewrotljljf">

    <!-- 文本域 -->
    <textarea name="personalinfo" cols="30" rows="10" value=""></textarea>

    <!-- 提交按钮 -->
    <input type="submit">
    <button>按钮button</button>
    <br>


    <!-- 下面的按钮默认是不会提交表单数据的 -->
    <input type="button" value="提交按钮">


    <!-- 重置按钮 -->
    <input type="reset">
  </form>
```

### div标签

### span标签

> div 和 span没语义 div一般用于包裹元素的大盒子 span一般用于放置一小段文本或者图标



### html5新增标签

video 视频标签

audio 音频标签

![img](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fupload-images.jianshu.io%2Fupload_images%2F15922744-3d841de4d7f7640e.jpg&refer=http%3A%2F%2Fupload-images.jianshu.io&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1648541690&t=393a00a3438bbab8896b879d67d8b856)

## CSS

### CSS三种使用方式

- 行内样式
- 内联样式
- 外嵌样式 （推荐）

### 简单选择器

* 标签选择器
* 类选择器
* id选择器
* 通配符选择器

### 组合选择器

* 子代选择器

  语法： `选择器A > 选择器B {}`

* 后代选择器

  语法：`选择器A 选择器B {}`

> 注意：1. 嵌套层级不能太深了，会影响性能； 2. 浏览器是从右到左解析

* 相邻兄弟选择器（选中关系最好的兄弟）

  语法：`兄弟选择器A + 兄弟选择器B {}`

* 通用兄弟选择器 （选中所有兄弟）

  语法：``兄弟选择器A ~ 兄弟选择器B {}``

### 伪类选择器

以下几个伪类的顺序不要搞错了，不然可能会出现意想不到的情况

* :link 初始状态

* :visited 访问过后的状态

* :hover 鼠标放上去的状态

* :active 鼠标按住不放的状态

   记忆方式：`lv haha`

注意：:hover伪类可以给任何标签使用

> 过渡 transition： all 0.3s;

* :focus 聚焦的状态
* :target 锚点命中的状态
* :root 根
* :not 不是
* :disabled 按钮禁用的状态
* :nth-child(n) 第n个孩子 , n 取值 0，1，2，3，4，5，6……
* :nth-last-child(n) 倒数第n个孩子 , n 取值 0，1，2，3，4，5，6……

### 伪元素选择器

* ::after
* ::before

### 属性选择器

* [属性="某个值"]  精确匹配某个值
* [属性^="某个值"] 以某个值开头的属性

## CSS三大特性

1. 层叠性

   作用在同一个标签上的同一个属性会发生覆盖。

2. 继承

   作用在父级标签上的属性，会继承给子元素。常见的可以继承的属性比如有color.... 💖

3. 优先级 （面试题）

   !important > 行内样式 > id > 类 > 标签 > * > 标签默认 > 继承



* 权重计算

*    css的权重计算 !important 无穷大的

  

     style     id      class    标签
    
     1000   100     10         1

  






  > 注意：上面关系只是给大家理解的，并不存在十进1的关系，权重一样，后面的会覆盖前面的

## 元素显示模式

*  block (div h p ul li section header footer article nav hr)

1. 独占一行

2. 可以设置宽高

* inline (文本格式格式标签 span img❤ a br❤)

1. 不是独占一行

2. 不能设置盒子大小 （图片除外）

* inline-block (input button)

1. 不是独占一行

2. 可以设置宽高

## 盒模型

盒模型包含四部分： 

* margin（外边距） 盒子与盒子之间的距离
* border（边框）纸盒子的厚度
* padding （内边距） 盒子里面的泡沫
* content （内容）

>  border padding content 会影响盒子的大小

![image-20220302115107132](C:\Users\Alan\AppData\Roaming\Typora\typora-user-images\image-20220302115107132.png)

>注意：
>
>1. margin的塌陷  和 合并问题
>2. margin和padding在inline元素上使用时，上下方向要注意，存在问题。

<div style="color: red;">margin: 0 auto; 居中必须要保证1. 块级元素； 2. 有固定宽度；<div>

margin和padding设置可以简写，表示上右下左四个方向，也可以单独设置。示例代码如下：

```css
margin: 0px;

padding: 0px;

margin-top: 10px;
margin-right: 10px;
margin-bottom: 10px;
margin-left: 10px;
```



## 浮动

浮动最原始的用法是用来实现 文字环绕图片效果的，但现在基本不用这个用法了，现在用浮动来布局。

```css
float: left; /* 左浮动*/
float: right; /* 左浮动*/
```



浮动特点

1. 当浮动的元素在一行放不下时，就自动跑到下一行
2. 浮动之后，父盒子的高度会受影响（如果父盒子没有设置高度的话）
3. 浮动的元素会盖在没有浮动的元素上（浮动会脱离标准流 简称脱标）
4. 浮动的元素会转换为块元素

## 清除浮动

1. 父盒子设置宽度

2. 额外标签 + clear: both

3. 伪元素 (推荐⭐)

   ```css
       .clearfix:after {
         content: '';
         display: block;
         clear: both;
   
         height: 0;
         visibility: hidden;
       }
       .clearfix {
         /* 兼容ie */
         *zoom: 1;
       }
   ```

   

4. overflow: hidden



## [BFC](https://juejin.cn/post/6950082193632788493)（块级 格式化 上下文）

Block Formating Context

BFC的作用：

1. 清除浮动
2. 解决外边距叠加和塌陷问题

## 其他属性学习

### overflow

```css
      /* 溢出隐藏 */
      /* overflow: hidden; */

      /* 溢出自动出现滚动条 */
      /* overflow: auto; */

      /* 不管内容溢没溢出，都会出现一个滚动条 */
      /* overflow: scroll; */

      /* 单独设置溢出效果 */
      overflow-x: scroll;
      overflow-y: auto;
    
```

### visibility:hidden --> display:none;

### font-size

px 绝对单位

em 相对单位 相对于元素本身的字体大小倍数

rem 相对单位 相对于根元素（html）字体大小的倍数

### font-weight

```css
font-weight: bold;
font-weight: 700;
```

### font-style

字体样式

```css
font-style: italic;
```

### font-family

设置字体，多设几个，为了兼容，前面用不了可以用后面的

记得加上引号

```css
font-family: "aaa", "宋体";
```

### line-height

记住：开发时一般设置line-height = height来让文字垂直居中。

>font相关的配置可以简写，顺序是：
>
>font: font-style font-weight font-size/line-height font-family;
>
>注意：如果不熟请不要这样写，因为容易出错。

### text-align

让文字居中

```css
text-align: center;
```

除了让文字居中以外，还可以让inline-block或者inline的元素居中


### text-indent

可以用于设置文本缩进。高级用法是在设置logo时，可以让a标签里面的文字隐藏到屏幕外

```html
  <style>
    h1 {
      width: 176px;
      height: 69px;
      background-color: pink;
    }
    a {
      width: 176px;
      height: 69px;
      display: block;
      background-image: url(./logo.png);
      background-repeat: no-repeat;
      background-position: center;

	  /* 让文本跑到屏幕外面去 */
      text-indent: -9999px;
    }
  </style>
  
  <h1>
    <a href="#">
      网易云音乐	
    </a>
  </h1>
```

### vertical-align

设置文字的垂直方向对齐方式

```
vertical-align: middle;
vertical-align: top;
vertical-align: botton;
```

>它可以解决图片下面几像素的缝隙问题。
>
>另外一种解决办法：给图片设置display: block;



### text-decoration

设置文本装饰，比如上划线 中划线 下划线

```css
text-decoration: none;  /* 清除下划线 */
text-decoration: underline;  /*下划线*/
text-decoration: overline;  /*上划线*/
```

## 定位

固定元素位置。

定位分类

* position: static 静态定位  默认的
* position: relative 相对定位           相对于自身原来的位置    不脱离文档标准流  （通常不会单独使用）
* postion: absolute 绝对定位          相对的参照物分两种情况：1. 如果没有设置参照物，那么就以html根节点来定位；2. 设置参照物（给参照物加上不是static定位的定位方式），就相对于参照物来定位。 会脱离文档标准流。  <strong style="color:red;">口诀：子绝父相</strong>  加了绝对定位的inline元素会自动转换为block元素
* position: fixed 固定定位   相对的是浏览器的窗口   会脱离文档标准流



z-index 表示堆叠层级，默认是后面的比前面的要高。如果自己调的话，数字越大，越靠上面。<b>注意：只有非static定位的元素才有z-index属性。</b>



### 定位的高级用法

```html
  <style>
    .father {
      width: 300px;
      height: 300px;
      background-color: pink;
      /* position: relative; */
    }
    .son {
      position: absolute;
      width: 250px;
      /* top: 0 和bottom: 0可以在竖直方向上撑满屏幕高度。 left: 0和 right: 0同理 */
      top: 0;
      bottom: 0;
      left: 0;
      /* right: 0;
      left: 0; */
      background-color: rgba(255, 0, 0, 0.335);
    }
  </style>


  <div class="father">
    <div class="son"></div>
  </div>
```



