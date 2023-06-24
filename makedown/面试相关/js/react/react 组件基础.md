- ## jsxreact 组件基础

**react 分为函数组件和类组件使用方式有所不同**

### 函数组件

 == **首字母应该要大写，react中会把首字母大写的当做组件，把小写的当作函数、**

**如果要添加class类名的话用className，用class和关键字照成冲突**==

```jsx
function Backlist() {
    //创建函数
    const list = [
        { id: 1, name: '上海黑马82期', salary: 11000 },
        { id: 2, name: '上海黑马83期', salary: 12000 },
        { id: 3, name: '上海黑马89期', salary: 18000 }
    ]
	
    return (
        <div>
            <ul>
                {list.map((item) => <li key={item.id}>{item.name}</li>)}
            </ul>
        </div>
    )
}
```





### 类组件

类名 extends   React.Component 继承自react.Component 

类式组件的定义：

- 必须继承 **React**的内置类`Component`
- 必须包含方法 `render()`
- 构造函数 `constructor()`的参数为 `props`（后面会讲），如果需要使用`constructor`则必须调用父类的构造函数 `super(props)`

```jsx
class Welcome extends React.Component { //必须继承父类
  render() { //必须写而且有返回值
      
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```



### 元素渲染

```jsx
import Backlist from './Backlist' // 引入创建好的组件
function App() {
  return (
    <div className="App">
      <Backlist></Backlist> //在准备好的父组件上引入
    </div>
  )
}
```

## 组件传值 props

`name={active}`  传值

```jsx
function Helloword() {
    const active = {
        name: 'baigaoi',
        age: 222,

    }
    return<div>
        <Userdetail name={active}></Userdetail>
        <Clok  naem="东东"/>
    </div>
}

--------------
子

function Userdetail(props) {
    console.log(props);

    return <div>
        <div> <span>用户名为</span>   {props.name.name}</div>
        {/* <span>{new Date().toLocaleTimeString()}</span> */}
        <Datas />
    </div>

}



```

==**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**==


#### props.children
props.children可用于每个组件。它包含组件的开始标签和结束标签之间的内容
```
<Welcome>Hello world!</Welcome>
```

```
function Welcome(props) {
  return <p>{props.children}</p>;
}
```





1. **父传子通信**

	> 函数中定义数据  通过调用的方式传给子组件，可以理解为函数的调用
	>
	> 子组件的函数默认就是props 

	```jsx
	 function Helloword() {
	    const active = {
	        name: 'baigaoi',
	        age: 222,
	    }
	    return <div>
	        <Userdetail name={active}></Userdetail>
	    </div>
	
	}
	function Userdetail(props) {
	    console.log(props);
	    return <div>
	        <div> <span>用户名为</span>{props.name.name}</div>  
	    </div>
	}
	```

	

2. **子传父**

	*子组件获取数据，使用夫组件的函数*

	```jsx
	function Backlist() {
	   
	    const Buyphone = (value) => {
	        console.log(value);
	        // console.log('子组件传回来的数据-》', value);
	    
	    }
	    return (
	        <div>
	            <hr />
	            <Chihtend buyphone={Buyphone}></Chihtend>
	           
	        </div>
	    )
	}
	//子组件获取数据，使用夫组件的函数
	const Chihtend = (props) => {
	    // console.log(props);
	    props.buyphone('我传递数据给了父')
	    return
	    (<div>子组件我要传递数据</div>)
	}
	```

	

3. **兄弟传值（状态提升）**

	```jsx
	class Clok extends React.Component {
	
	    constructor(props) {
	        super(props) //调用原型的constructor
	        // console.log(props);
	
	        this.state = {
	            name: props.naem ,
	            value:'111'
	        }
	        this.activateLasers=this.activateLasers.bind(this) //改变指向不然 函数没有this
	    }
	
	    activateLasers() {
	       
	         console.log(this);
	        
	        this.setState({ value: 'Hello' });
	     
	    }
	    render() {
	        console.log('this', this);
	        // console.log(this.state);
	        return (
	            <div>
	                
	                <div>Helloword{this.state.value}</div>
	                <button onClick={ this.activateLasers }>改变名字</button>
	                {this.Brother(this.state.value)}
	                {/* <Brother value={this.state.value} ></Brother> */}
	            </div>
	        )
	    }
	
	    Brother(props){
	        // console.log(props);
	        return (
	            <div>{props}</div>
	        )
	    }
	
	
	}
	```

	​		



### 改变state的值

state  组件状态，类似vue组件的data



```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};//使用定义state
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

要修改state 不能直接修改，借用函数setState（）直接修改并不能触发视图的更新

```jsx
this.setState({comment: 'Hello'});
```

==构造函数是唯一可以给 `this.state` 赋值的地方。==

### 

### State 的更新可能是异步的



```jsx
// Correct
this.setState((state, props) => ({
    //通过函数的方式改变，异步更新state
  counter: state.counter + props.increment
}));
```















### refs （返回实例）

```jsx
class Demo extends React.Component{
    showData(){
        const {myInput} = this;   // 返回该元素
        alert(myInput.value)
    }
    render(){
        return (
            <div>
                {/* 回调函数的参数为该元素本身，通过函数绑定在 this上 */}
                <input type="text" ref={ e => this.myInput = e } placeholder="search something" />
                <button onClick={this.showData}>Show Data</button>
            </div>
        )
    }
}

```

## 事件绑定

可以在函数中定义另外一个函数（内置函数）然后进行调用即可

```jsx
function Demo(props){
    function showData(){
        console.log(props);
        alert("触发了事件");
    }
    return (
        <div>
            <button onClick={showData}>点击触发</button>
        </div>
    )
}


```

### 2. 在类式组件中进行事件绑定

在类式组件中可以通过类本身的方法来调用

```jsx
class Demo extends React.Component{
    state = { count: 0 }    // 定义 state
    showData(){
        alert("触发了事件")
        console.log(this.state.count);; 报错
    }
    render(){
        return (
            <div>
                <button onClick={this.showData}></button>
            </div>
        )
        // 成功弹出弹窗，但是输出报错
    }
}



```

==重点：为啥拿不到this==



>
>
>*这里你会发现，虽然成功 `alter`，但是输出 `state`会报错，这是为什么呢？*

> 平时在组件内使用 `this.state`的时候，此时 `this`的指向都是作用于类的**原型对象**，即类本身。
>  而在函数中，因为使用了 `babel.js`的缘故，`js`默认开启了**严格模式**，所以函数体的 `this`为 `undefined`，自然找不到在原型对象上的 `state`。
>  此时有两种解决方法：

- > 使用 `bind`、`apply`等方法改变 `this`指向

- > 使用**箭头函数**，改变 `this`指向（推荐）

	**简写方式**

	```jsx
	 //直接赋值 batanter 相当于this.batanter
	    //handerbatan 的this 相当于react的组件实例，因为箭头函数没有this
	    batanter = { name: 'jianxie', age: 11 }
	    handerbatan = () => {
	        console.log(this.batanter);
	    }
	
	```

	






## 组件的生命周期

```jsx
constructor()   //构造时候
static getDerivedStateFromProps()
render() //返回jsx div
componentDidMount() //渲染组件后 请求和异步最好放在这

更新
static getDerivedStateFromProps()
shouldComponentUpdate()
render()
getSnapshotBeforeUpdate()
componentDidUpdate()


卸载
componentWillUnmount()



```

列表渲染

```jsx
class Demo extends React.Component{
    state = {
        stus: [
            {id: "001", name: "小明", age: "28"},
            {id: "002", name: "小红", age: "26"},
        ],
    }
    render(){
        return (
            <div>
                <ul>
                    {
                        //用Map进行遍历
                        this.state.stus.map(item =>{
                            return <li key={item.id}>{item.name}---{item.age}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

```

###### 条件渲染

```jsx
function(){
     let isshow=false
    if (isshow) {
        return <div>显示</div>
    }
    else{
        return <div>meiyou </div>
    }

}
```



### key 的使用

> 和vue 的 key一样具有唯一标识，用来优化diff算法

