# TypeScript教程

## 搭建学习环境

1. 安装typescript

   `yarn global add typescript====`
```
pie
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
```

```
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
```
====

2. 安装ts-node

   `yarn global add ts-node`

3. 创建一个tsconfig.json文件

   `tsc --init` 不安装typescript的话可以使用

4. 创建一个ts文件，使用命令`ts-node xxx.ts`运行

## 数据类型

### boolean

```typescript
let isRight: boolean = true
```

### string

```typescript
let str: string = `hello, ${username}`
```

### number

```typescript
// 二进制数
const bin: number = 0b1010

// 八进制数
const oct: number = 0o744
 
// 十进制数
const integer: number = 10
const float: number = 3.14
 
// 十六进制数
const hex: number = 0xffffff

```

### null & undefined

`null`和`undefined`是所有类型的**子类型**。如果没有开启`strictNullChecks`模式，`null`和`undefined`可以复制给任意数据类型。如果开启`strictNullChecks`模式，undefined就只能赋值给undefined类型，null就只能赋值给null类型。但这种说法也不准确，undefined值和null值允许赋值给顶端类型，同时undefined值也允许赋值给void类型。

```typescript
/**
* strictNullChecks: true
*/
let m1: void = undefined; // null不能赋值给void

let m2: any     = undefined;
let m3: unknown = undefined;

let n2: any     = null;
let n3: unknown = null;
```

### bigint

```typescript
// 二进制整数
const bin: bigint = 0b1010n;

// 八进制整数
const oct: bigint = 0o744n;

// 十进制整数
const integer: bigint = 10n;

// 十六进制整数
const hex: bigint = 0xffffffn;
```

### symbol

`symbol`类型的值是通过`Symbol`构造函数创建的。Symbols是不可改变且唯一的。

```typescript
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols是唯一的
```

### void

void类型表示某个值不存在，该类型用作函数的返回值类型。若一个函数没有返回值，那么该函数的返回值类型为void类型。除了将void类型作为函数返回值类型外，在其他地方使用void类型是无意义的。

```typescript
function log(message: string): void {
    console.log(message);
}
```

注意`strictNullChecks`为true时，只有undefined可以赋值给void。

```typescript
/**
* strictNullChecks: true
*/

// 正确
function foo(): void {
   return undefined;
}

// 编译错误！类型 'null' 不能赋值给类型 'void'
function bar(): void {
   return null;
}
```

### any & unknown 顶端

* any

```typescript
let x: any;

x = true;
x = 'hi';
x = 3.14;
x = 99999n;
x = Symbol();
x = undefined;
x = null;
x = {};
x = [];
x = function () {};
```

需要注意的是，<b style="color: red;">虽然any类型是所有类型的父类型，但是TypeScript允许将any类型赋值给任何其他类型</b>

```typescript
let x: any;

let a: boolean   = x;
let b: string    = x;
let c: number    = x;
let d: bigint    = x;
let e: symbol    = x;
let f: void      = x;
let g: undefined = x;
let h: null      = x;
```

开发时，尽量少使用any，因为any会跳过类型检查，可能会导致编译错误。通过设置`noImplicitAny": true`

* unknown

```typescript
let x: unknown;

x = true;
x = 'hi';
x = 3.14;
x = 99999n;
x = Symbol();
x = undefined;
x = null;
x = {};
x = [];
x = function () {};
```

unknown类型是比any类型更安全的顶端类型，因为unknown类型只允许赋值给any类型和unknown类型，而不允许赋值给任何其他类型，该行为与any类型是不同的。

```typescript
let x: unknown;

// 正确
const a1: any = x;
const b1: unknown = x;
// 错误
const a2: boolean   = x;
const b2: string    = x;
const c2: number    = x;
const d2: bigint    = x;
const e2: symbol    = x;
const f2: undefined = x;
const g2: null      = x;
```

在unknown类型上也不允许执行绝大部分操作

```typescript
let x: unknown;

// 错误
x + 1;
x.foo;
x();
```

在程序中使用unknown类型时，我们必须将其细化为某种具体类型，缩小类型，我们可以使用`typeof`、`类型断言`等方式来缩小未知范围，否则将产生编译错误。

```typescript
function f2(message: unknown) {
  // 此处必须添加一个类型判断
  if (typeof message === 'string') {
    return message.length;
  }
}

f2(undefined);
```

使用场景：

```typescript
let res: unknown

let flag: boolean = true

if (flag) {
  res = 'hello'
} else {
  res = 123
}

let str: string = res
```

### never 尾端

`never`类型表示的是那些永不存在的值的类型。never没有子类型，所以，**其他类型都不能赋值给never类型**，除了never本身。any也不能赋值给never。

值会永不存在的两种情况：

1. 如果一个函数执行时抛出了**异常**，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）；
2. 函数中执行无限循环的代码（**死循环**），使得程序永远无法运行到函数返回值那一步，永不存在返回。

```typescript
// 异常
function err(msg: string): never { // OK
  throw new Error(msg); 
}

// 死循环
function loopForever(): never { // OK
  while (true) {};
}

```

在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，**使用 never 避免出现新增了联合类型没有对应的实现，目的就是写出类型绝对安全的代码。**具体示例如下：

```typescript
type Foo = string | number;

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === "string") {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === "number") {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo;
  }
}
```



### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;

// querySelector 拿不到 DOM 的时候返回 null
const ele: HTMLElement | null = document.querySelector('.main')
```

### 枚举

#### 数值型枚举

在定义数值型枚举时，可以为一个或多个枚举成员设置初始值。对于未指定初始值的枚举成员，其值为前一个枚举成员的值加1。

```typescript
enum Direction {
   Up = 1,    // 1
   Down,      // 2
   Left = 10, // 10
   Right,     // 11
}
```



```typescript
enum Direction {
   Up,
   Down,
   Left,
   Right
}
// 数值型枚举是number类型的子类型
const direction: number = Direction.Up;
```

#### 字符串枚举

```typescript
enum Direction {
   Up = 'UP',
   Down = 'DOWN',
   Left = 'LEFT',
   Right = 'RIGHT',
}
// 字符串枚举是string类型的子类型
const direction: string = Direction.Up;
```

> 注意：string类型不能能够赋值给枚举类型

```typescript
enum Direction {
   Up = 'UP',
   Down = 'DOWN',
   Left = 'LEFT',
   Right = 'RIGHT',
}

const direction: Direction = 'UP';
//    ~~~~~~~~~
//    编译错误！类型 'UP' 不能赋值给类型 'Direction'
```



### 数组

1. 简便数组类型表示法， 若**数组元素为单一原始类型或类型引用**比较适合使用

   ```typescript
   const red: (string | number)[] = ['f', f, 0, 0, 0, 0];
   
   let a: string[];
   
   let b: HTMLButtonElement[];
   ```

   

2. 泛型数组类型表示法，若**如果数组元素是复杂类型，如对象类型和联合类型等**比较适合使用

   ```typescript
   const red: Array<string | number> = ['f', f, 0, 0, 0, 0];
   let b: Array<{ x: number; y: number }>;
   
   ```

3. 接口表示

   ```typescript
   interface Arrobj {
       name: string,
       age: number
   }
   let arr3: Arrobj[] = [ { name: 'jimmy', age: 22 } ]
   
   interface NumberArray {
     [index: number]: number
   }
   let fibonacci: NumberArray = [1, 1, 2, 3, 5];
   ```

4. 类数组

   ```typescript
   function sum() {
     let args: {
       [index: number]: number;
       length: number;
       callee: Function;
     } = arguments;
   }
   
   function sum() {
     let args: IArguments = arguments;
   }
   ```

   

### 元组

元组表示由有限元素构成的有限列表。组最重要的特性是可以限制**数组元素的个数和类型**。

```typescript

const score: [string, number] = ['math', 100];

// 只读元组
const point: Readonly<[number, number]> = [0, 0];

// 元组的可选类型
type Point = [number, number?, number?];
const x: Point = [10]; // 一维坐标点
const xy: Point = [10, 20]; // 二维坐标点
const xyz: Point = [10, 20, 10]; // 三维坐标点


// 元组的剩余元素
type RestTupleType = [number, ...string[]];
let restTuple: RestTupleType = [666, "Semlinker", "Kakuqo", "Lolo"];
```



### 对象 object Object {}

#### object

object类型能够准确地表示非原始类型，因为原始类型不允许赋给object类型。

```typescript
let o: object = {}
```



#### Object

Object 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。注意严格模式下，null和undefined不能赋值给Object

```typescript
let o: Object = {}
let o2: Object = 1
```

#### {}

{}和Object一样，也是表示原始类型和非原始类型的集合。注意严格模式下，null和undefined不能赋值给{}

```typescript
let o: {} = {username: 'jack'}
```



### 函数

#### 函数声明

```typescript
function sum(x: number, y: number): number {
  return x + y;
}
```

#### 函数表达式

注意不要混淆了 TypeScript 中的 `=>` 和 ES6 中的 `=>`。在 TypeScript 的类型定义中，`=>` 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

```typescript
let mySum: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```

#### 接口定义函数形状

```typescript
interface SearchFunc {
  (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
}
```

#### 可选参数

**函数的可选参数必须位于函数参数列表的末尾位置**

```typescript
function add(x: number, y?: number, z?: number) {
   return x + (y ?? 0) + (z ?? 0);
}
```

在`strictNullChecks`模式下，TypeScript会自动为可选参数添加undefined类型。

```typescript
/**
* --strictNullChecks=true
*/
function add(x: number, y?: number | undefined) {
  return x + (y ?? 0);
}
```



#### 默认参数

**如果函数定义了默认参数，并且默认参数处于函数参数列表末尾的位置（不是末尾不行），那么该参数将被视为可选参数**，在调用该函数时可以不传入对应的实际参数值。但是不允许既是可选参数，又是默认参数。

```typescript
function add(x: number, y: number = 0) {
   return x + y;
}

add(1);    // 1
// 第二个参数传与不传都是可以的
add(1, 2); // 3
```



#### 剩余参数

```typescript
function f0(...args: [boolean, number, string]) {}
f0(true, 0, '');

function f1(...args: [boolean, number, string?]) {}
f1(true, 0, '');
f1(true, 0);

function f2(...args: [boolean, number, ...string[]]) {}
f2(true, 0);
f2(true, 0, '');
f2(true, 0, '', 'coolcou');

function f3(...args: [boolean, number?, ...string[]]) {}
f3(true);
f3(true, 0);
f3(true, 0, '');
f3(true, 0, '', 'coolcou');
```

#### 函数类型字面量

```typescript
let f: () => void;
//     ~~~~~~~~~~
//     函数类型字面量

f = function () { /* no-op */ };
```

#### 调用签名

函数在本质上是一个对象，但特殊的地方在于函数是可调用的对象。若在对象类型中定义了调用签名类型成员，那么我们称该对象类型为函数类型。语法如下所示：

```typescript
let add: { (x: number, y: number): number };

add = function (x: number, y: number): number {
   return x + y;
};
```

为什么使用调用签名，因为它可以描述函数字面量无法描述的一些属性，比如函数身上的静态属性。

```typescript
function f(x: number) {
   console.log(x);
}
f.version = '1.0';

let foo: { (x: number): void; version: string } = f;

const version = foo.version;  // string类型
```

#### 构造函数类型字面量

```typescript
let ErrorConstructor: new (message?: string) => Error;
```

#### 构造函数签名

```typescript
let Dog: { new (name: string): object };

Dog = class {
   private name: string;
   constructor(name: string) {
       this.name = name;
   }
};

let dog = new Dog('coolcou');
```

```typescript
declare const F: {
   new (x: number): Number;  // <- 构造签名
   (x: number): number;      // <- 调用签名
};

// 作为普通函数调用
const a: number = F(1);

// 作为构造函数调用
const b: Number = new F(1);
```

#### 函数重载

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

```typescript
// 不带有函数体的函数声明语句叫作函数重载。这里只能传递两个number或者两个数组。不能一样一个
function add(x: number, y: number): number;
function add(x: any[], y: any[]): any[];
// 只有一条实现语句
function add(x: number | any[], y: number | any[]): any {
   if (typeof x === 'number' && typeof y === 'number') {
       return x + y;
   }
   if (Array.isArray(x) && Array.isArray(y)) {
       return [...x, ...y];
   }
}

const a: number = add(1, 2);
const b: number[] = add([1], [2]);
```

在函数重载中，不允许使用默认参数。

函数重载应该位于函数实现之前，每一个函数重载中的函数名和函数实现中的函数名必须一致。

再看一个例子：

```typescript
type Types = number | string
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Types, b: Types) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
const result = add('Semlinker', 'Kakuqo');
result.split(' ');
```

例子：

```typescript
// 对单人或者多人打招呼
function greet(name: string | string[]): string | string[] {
  if (Array.isArray(name)) {
    return name.map((n) => `Welcome, ${n}!`)
  }
  return `Welcome, ${name}!`
}
// 虽然代码逻辑部分还是比较清晰的，区分了入参的数组类型和字符串类型，返回不同的结果，但是，在入参和返回值的类型这里，却显得非常乱。
// 这一次用了函数重载
function greet(name: string): string  // TS 类型
function greet(name: string[]): string[]  // TS 类型
function greet(name: string | string[]) {
  if (Array.isArray(name)) {
    return name.map((n) => `Welcome, ${n}!`)
  }
  return `Welcome, ${name}!`
}
```



#### 函数this

TypeScript支持在函数形式参数列表中定义一个特殊的this参数来描述该函数中this值的类型。

this参数固定使用this作为参数名。**this参数是一个可选的参数，若存在，则必须作为函数形式参数列表中的第一个参数。**

```typescript
function foo(this: { name: string }) {
   this.name = 'Patrick';

   this.name = 0;
//  ~~~~~~~~~
//  编译错误！类型 0 不能赋值给类型 'string'
}
```

如果我们想要定义一个纯函数或者是不想让函数代码依赖于this的值，那么在这种情况下可以明确地将this参数定义为void类型。这样做之后，在函数体中就不允许读写this的属性和方法。

```typescript
function add(this: void, x: number, y: number) {
   this.name = 'Patrick';
   //   ~~~~
   //   编译错误：属性 'name' 不存在于类型 'void'
}
```

如果参数类型不匹配，会产生编译错误。比如

```typescript
function foo(this: { bar: string }, baz: number) {
   // ...
}

// 编译错误
// 'this'类型为'void'，不能赋值给 '{ bar: string }' 类型的this
foo(0);

foo.call({ bar: 'hello' }, 0); // 正确
```

### 类型别名

类型别名用来给一个类型起个新名字。类型别名经常用于联合类型。首字母大写，不能是typescript内置类型。

```typescript
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n;
  } else {
    return n();
  }
}
```

### 字面量类型

#### 字符串字面量

```typescript
let hello: 'hello' = 'hello';
hello = 'hi'; // ts(2322) Type '"hi"' is not assignable to type '"hello"'
```

定义单个的字面量类型并没有太大的用处，它真正的应用场景是可以把多个字面量类型组合成一个联合类型。

```typescript
type EventNames = 'click' | 'scroll' | 'mousemove';
```

#### 数字字面量

#### 布尔字面量

```typescript
interface Config {
    size: 'small' | 'big';
    isEnable:  true | false;
    margin: 0 | 2 | 4;
}
```

通过let和const声明的变量，如果不标注类型，那么const声明的变量会被推导为字面量。

### 字面量推理

```typescript

type Method = 'GET' | 'POST'
function request(url: string, method: Method) { }

type Request = {
  url: string,
  method: Method
}

// 如果没有Request类型的限制，method被推导为了string
const options: Request = {
  url: 'http://www.xxx.com',
  method: 'GET'
}

request(options.url, options.method)

export {}
```



### 类型断言

语法：

```typescript
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;



// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

const el = document.getElementById("avatar") as HTMLImageElement
el.src = "url地址"


class Person {}
class Student extends Person {
  studying() {
    console.log('学习中');
  }
}
function work(p: Person) {
  (p as Student).studying()
}
const stu = new Student()
work(stu)
```



```typescript
const arrayNumber: number[] = [1, 2, 3, 4];
const greaterThan2: number = arrayNumber.find(num => num > 2) as number;
```

#### 非空断言 

非空类型断言运算符“!”是TypeScript特有的类型运算符，它是非空类型断言的一部分。非空类型断言能够从某个类型中剔除undefined类型和null类型。

```typescript
function printLen(message?:string) {
  console.log(message!.length);

}
printLen('aaa')



type NumGenerator = () => number;

function myFunc(numGenerator: NumGenerator | undefined) {
  // Object is possibly 'undefined'.(2532)
  // Cannot invoke an object which is possibly 'undefined'.(2722)
  // const num1 = numGenerator(); // Error
  const num2 = numGenerator!(); //OK
}
```

#### 确定赋值断言

```typescript
let x!: number;
initialize();
console.log(2 * x); // Ok

function initialize() {
  x = 10;
}
```



### 接口

接口是对行为的抽象，由类去实现。

#### 属性签名

属性签名声明了对象类型中属性成员的名称和类型。

```typescript
interface IPoint {
   x: number;
   y: number;
}
```

#### 调用签名

调用签名定义了该对象类型表示的**函数在调用时**的类型参数、参数列表以及返回值类型。

````typescript
interface IErrorConstructor {
   (message?: string): Error;
}
````

#### 构造签名

构造签名定义了该对象类型表示的**构造函数在使用new运算符调用时**的参数列表以及返回值类型。

```typescript
interface IErrorConstructor {
   new (message?: string): Error;
}
```

#### 方法签名

```typescript
interface A {
    f(x: boolean): string;       // 方法签名
}

interface B {
    f: { (x: boolean): string }; // 属性签名和对象类型字面量
}

interface C {
    f: (x: boolean) => string;   // 属性签名和函数类型字面量
}

```

#### 索引签名

1. 字符串索引签名

   一个接口中最多只能定义一个字符串索引签名

```typescript
interface A {
    [prop: string]: number;
		
  	// 下面的abc必须是number类型，不然就会出现编译错误
    a: number;
    b: 0;
    c: 1 | 2;
}
```

> 注意一旦定义了上面的任意属性，那么确定的属性和可选属性都必须是它的类型子集，不然会报错。比如
>
> ```typescript
> interface Person {
>     name: string;
>     age?: number;
>     [propName: string]: string;
> }
> 
> let tom: Person = {
>     name: 'Tom',
>     age: 25,
>     gender: 'male'
> };
> ```
>
> 

2. 数值索引签名

   一个接口中最多只能定义一个数值索引签名

```typescript
interface A {
    [prop: number]: string;
}

const obj: A = ['a', 'b', 'c'];

obj[0];  // string
```

#### 接口的继承

```typescript
interface Ibird {
  fly: () => void
}

interface Ifish {
  swim: () => void
}

interface IFlyfish extends Ibird, Ifish {
  name: string
}

let ff: IFlyfish = {
  fly() {
    console.log('我会飞');
  },
  swim() {
    console.log('我会游泳');
  },
  name: '我是飞鱼'
}

console.log(ff);

```



### 类型别名与接口区别

#### 对象 / 方法

二者均可被用来声明`对象`和`方法`的签名，但语法不同

* 接口

  ```typescript
  interface Point {
    x: number;
    y: number;
  }
  
  interface SetPoint {
    (x: number, y: number): void;
  }
  ```

* 类型别名

  ```typescript
  type Point = {
    x: number;
    y: number;
  };
  
  type SetPoint = (x: number, y: number) => void;
  ```

#### 其他类型

类型别名能够表示非对象类型，例如原始类型、联合类型和元组，而接口则只能表示对象类型

```typescript
// 基本类型
type Name = string;

// object
type PartialPointX = { x: number; };
type PartialPointY = { y: number; };

// 联合类型
type PartialPoint = PartialPointX | PartialPointY;

// 元组
type Data = [number, string];

```

#### 拓展

二者均可扩展，但语法不同。另外，请注意`接口`和`类型别名`并不是互斥的。`接口`可以扩展`类型别名`，反之亦然。

* interface 拓展 interface

  ```typescript
  interface PartialPointX { x: number; }
  interface Point extends PartialPointX { y: number; }
  ```

* type 拓展 type

  ```typescript
  type PartialPointX = { x: number; };
  type Point = PartialPointX & { y: number; };
  ```

* interface 拓展 type

  ```typescript
  type PartialPointX = { x: number; };
  interface Point extends PartialPointX { y: number; }
  ```

* type 拓展 interface

  ```typescript
  interface PartialPointX { x: number; }
  type Point = PartialPointX & { y: number; };
  ```

#### 实现

`类`可以以完全相同的方式实现`接口`或`类型别名`。 但是请注意，`类`和`接口`被视为静态蓝图。 因此，他们不能实现或扩展被定义为`联合类型`的`类型别名`。

```typescript
interface Point {
  x: number;
  y: number;
}

class SomePoint implements Point {
  x = 1;
  y = 2;
}

type Point2 = {
  x: number;
  y: number;
};

class SomePoint2 implements Point2 {
  x = 1;
  y = 2;
}

type PartialPoint = { x: number; } | { y: number; };

// FIXME: 不可以实现一个联合类型
class SomePartialPoint implements PartialPoint {
  x = 1;
  y = 2;
}

```

#### 声明合并

```typescript
// 这里的两个定义将合并为：
// interface Point { x: number; y: number; }
interface Point { x: number; }
interface Point { y: number; }

const point: Point = { x: 1, y: 2 };
```

### 类

#### 类声明

```typescript
class Circle {
   radius: number;
}

const c = new Circle();
```



#### 类表达式

```typescript
const Circle = class {
   radius: number;
};

const a = new Circle();
```

#### 类成员变量

如果配置了`strictPropertyInitialization`,则必须对类成员变量进行初始化。

```typescript
class Circle {
   radius: number = 1;
}


class Circle {
   radius: number;

   constructor() {
       this.radius = 1;
   }
}
```

在一些场景中，我们确实想要通过调用某些方法来初始化类的成员变量。这时可以使用非空类型断言`“!”`来通知编译器该成员变量已经进行初始化，以此来避免产生编译错误。

```typescript
/**
* --strictNullChecks=true
* --strictPropertyInitialization=true
*/
class A {
   a!: number;
//   ~
//   非空类型断言

   init() {
       this.a = 0;
   }

   constructor() {
       this.init();
   }
}
```

#### readonly属性

**只读成员变量必须在声明时初始化或在构造函数里初始化**。

```typescript
class A {
   readonly a = 0;
   readonly b: number;
   readonly c: number; // 编译错误

   constructor() {
       this.b = 0;
   }
}
```

####  类成员函数

```typescript
class Circle {
   radius: number = 1;

   area(): number {
       return Math.PI * this.radius * this.radius;
   }
}
```

#### 类成员存取器

如果一个类属性同时定义了`get`方法和`set`方法，那么`get`方法的返回值类型必须与`set`方法的参数类型一致，否则将产生错误。

```typescript
class C {
   /**
    * 正确
    */
   private _foo: number = 0;
   get foo(): number {
       return this._foo;
   }
   set foo(value: number) {}

   /**
    * 错误！'get' 和 'set' 存取器必须具有相同的类型
    */
   private _bar: string = '';
   get bar(): string {
       return this._bar;
   }
   set bar(value: number) {}
}
```

如果一个类属性同时定义了`get`方法和`set`方法，那么`get`方法和`set`方法必须具有相同的可访问性。

```typescript
class C {
   /**
    * 正确
    */
   private _foo: number = 0;
   private get foo(): number {
       return this._foo;
   }
   private set foo(value) {}

   /**
    * 正确
    */
   private _bar: number = 0;
   public get bar(): number {
       return this._bar;
   }
   public set bar(value) {}

   /**
    * 错误！'get' 和 'set' 存取器具有不同的可见性
    */
   private _baz: number = 0;
   public get baz(): number {
       return this._baz;
   }
   private set baz(value) {}
}
```

存取器是实现数据封装的一种方式，它提供了一层额外的访问控制。**类可以将成员变量的访问权限制在类内部，在类外部通过存取器方法来间接地访问成员变量**。在存取器方法中，还可以加入额外的访问控制等处理逻辑。

```typescript
class Circle {
   private _radius: number = 0;
   get radius(): number {
       return this._radius;
   }
   set radius(value: number) {
       if (value >= 0) {
           this._radius = value;
       }
   }
}

const circle = new Circle();
circle.radius; // 0

circle.radius = -1;
circle.radius; // 0

circle.radius = 10;
circle.radius; // 10
```

#### 类成员可访问性

1. public

   类的公有成员没有访问限制，可以在当前类的内部、外部以及派生类的内部访问。

   ```typescript
   class Base {
      public a: string = '';
   }
   
   class Derived extends Base {
      public b() {
          return this.a; // 允许访问
      }
   }
   
   const derived = new Derived();
   
   derived.a;            // 允许访问
   derived.b();          // 允许访问
   ```

2. Protected

   类的受保护成员允许在当前**类的内部和派生类的内部**访问，但是不允许在当前类的外部访问。

   ```typescript
   class Base {
      protected x: string = '';
   
      a() {
          this.x; // 允许访问
      }
   }
   
   class Derived extends Base {
      b() {
          this.x; // 允许访问
      }
   }
   
   const base = new Base();
   base.x;        // 不允许访问
   ```

3. Private

   类的私有成员只允许在当前**类的内部被访问**，在当前类的外部以及派生类的内部都不允许访问。

   ```typescript
   class Base {
      private x: string = '';
   
      a() {
          this.x; // 允许访问
      }
   }
   
   class Derived extends Base {
      b() {
          this.x; // 不允许访问
      }
   }
   
   const base = new Base();
   base.x;   // 不允许访问
   
   const derived = new Derived();
   derived.x;  // 不允许访问
   ```

   

#### 类构造函数

   类的构造函数不允许有返回值

   ```typescript
   class A {
      constructor(a: number = 0, b?: boolean, ...c: string[]) {}
   }
   
   class B {
      constructor(): object {}
      //       ~~~~~~~
      //       编译错误！不允许指定构造函数的返回值类型
   }
   ```

   如果将构造函数设置成私有的，则只允许在类的内部创建该类的对象。

   ```typescript
   class Singleton {
      private static instance?: Singleton;
   
      private constructor() {}
   
      static getInstance() {
          if (!Singleton.instance) {
              // 允许访问
              Singleton.instance = new Singleton();
          }
          return Singleton.instance;
      }
   }
   
   new Singleton(); // 编译错误
   ```

   构造函数也支持重载

   ```typescript
   class A {
      constructor(x: number, y: number);
      constructor(s: string);
      constructor(xs: number | string, y?: number) {}
   }
   
   const a = new A(0, 0);
   const b = new A('foo');
   ```

   #### 类参数成员

   `TypeScript`提供了一种简洁语法能够把构造函数的形式参数声明为类的成员变量，它叫作**参数成员**。在构造函数参数列表中，为形式参数添加任何一个可访问性修饰符或者`readonly`修饰符，该形式参数就成了参数成员，进而会被声明为类的成员变量。

   ```typescript
   class A {
      constructor(public x: number) {}
   }
   
   const a = new A(0);
   a.x; // 值为0
   ```

   #### 类继承

1. 重写基类成员

   ```typescript
   class Shape {
      color: string = 'black';
   
      switchColor() {
          this.color =
              this.color === 'black' ? 'white' : 'black';
      }
   }
   
   class Circle extends Shape {
      color: string = 'red';
   
      switchColor() {
          this.color = this.color === 'red' ? 'green' : 'red';
      }
   }
   
   const circle = new Circle();
   
   circle.color; // 'red'
   circle.switchColor();
   circle.color; // 'green'
   ```

在派生类中，可以通过`super`关键字来访问基类中的非私有成员。当派生类和基类中存在同名的非私有成员时，在派生类中只能通过super关键字来访问基类中的非私有成员，无法使用this关键字来引用基类中的非私有成员。

```typescript
class Shape {
   color: string = 'black';

   switchColor() {
       this.color =
           this.color === 'black' ? 'white' : 'black';
   }
}

class Circle extends Shape {
   switchColor() {
       super.switchColor();
       console.log(`Color is ${this.color}.`);
   }
}

const circle = new Circle();

circle.switchColor(); // Color is white.
circle.switchColor(); // Color is black.

```

注意派生类在改写基类的属性时，类成员的访问性 以及 类型。

```typescript
class Base {
   protected x: string = '';
   protected y: string = '';
   protected z: string = '';
}

class Derived extends Base {
   // 正确
   public x: string = '';

   // 正确
   protected y: string = '';

   // 错误！派生类不能够将基类的受保护成员重写为更严格的可访问性
   private z: string = '';
}
```

```typescript
class Shape {
   color: string = 'black';

   switchColor() {
       this.color =
           this.color === 'black' ? 'white' : 'black';
   }
}

class Circle extends Shape {
   // 编译错误
   // 类型'(color: string) => void'不能赋值给类型'() => void'
   switchColor(color: string) {}
}
```

2. 派生类实例化

```typescript
class Shape {
   color: string = 'black';

   constructor() {
       this.color = 'black';
   }

   switchColor() {
       this.color =
           this.color === 'black' ? 'white' : 'black';
   }
}

class Circle extends Shape {
   radius: number;

   constructor() {
       super();

       this.radius = 1;
   }
}
```

3. 接口继承类

**TypeScript允许接口继承类**。若接口继承了一个类，那么该接口会继承基类中所有成员的类型。例如，下例中接口B继承了类A

```typescript
class A {
   x: string = '';

   y(): boolean {
       return true;
   }
}

interface B extends A {}

declare const b: B;

b.x;   // 类型为string
b.y(); // 类型为boolean
```

在接口继承类时，接口不但会继承基类的公有成员类型，还会继承基类的受保护成员类型和私有成员类型。如果接口从基类继承了非公有成员，那么该接口只能由基类或基类的子类来实现。

```typescript
// 正确，A 可以实现接口 I，因为私有属性和受保护属性源自同一个类 A
class A implements I {
    private x: string = '';
    protected y: string = '';
}

// 接口 I 能够继承 A 的私有属性和受保护属性
interface I extends A {}

// 正确，B 可以实现接口 I，因为私有属性和受保护属性源自同一个类 A
class B extends A implements I {}

// 错误！C 不是 A 的子类，无法实现 A 的有属性和受保护属性
class C implements I {}
```

4. 单继承，也就是一次不能继承多个类

#### 类接口实现

一个类可以实现多个接口。如果类的定义中声明了要实现的接口，那么这个类就需要实现接口中定义的类型成员。

```typescript
interface IColor {
    color: string;
 }

 interface IShape {
    area(): number;
 }

 class Circle implements IShape, IColor {
    radius: number = 1;
		// 下面的color和area属性必须都有
    color: string = 'black';

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
 }

  const c  = new Circle()

 console.log(c.color)
 console.log(c.radius)
```

#### 多态

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
  action() {
    console.log('persons');

  }
}

class Teacher extends Person {
  title: string;
  constructor(name: string, age: number, title: string) {
    super(name, age)
    this.title = title
  }
  action() {
    console.log('teacher');

  }
}


function mackactions(persons: Person[]): void {
  persons.forEach(p => {
    p.action()
  })
}

let p1 = new Person('jack', 19)
let t1 = new Teacher('rose', 30, '大学教授')
mackactions([p1, t1])

```



#### 类静态成员

```typescript
class Circle {
   static version: string = 'coolcou.com';
}

// 正确，结果为 'coolcou.com'
const version = Circle.version;

const circle = new Circle();
circle.version;
//     ~~~~~~~
//     编译错误！'version' 属性是 'Circle' 类的静态属性
```

**类的public静态成员对访问没有限制，可以在当前类的内部、外部以及派生类的内部访问**。

```typescript
class Base {
    public static x: string = 'coolcou.com';

    a() {
        // 正确，允许在类内部访问公有静态成员 x
        Base.x;
    }
}

class Derived extends Base {
    b() {
        // 正确，允许在派生类内部访问公有静态成员 x
        Base.x;
    }
}

// 正确，允许在类外部访问公有静态成员 x
console.log(Base.x)
```

**类的protected静态成员允许在当前类的内部和派生类的内部访问，但是不允许在当前类的外部访问**。

```typescript
class Base {
    protected static x: string = 'coolcou.com';

    a() {
        // 正确，允许在类内部访问受保护的静态成员 x
        Base.x;
    }
}

class Derived extends Base {
    b() {
        // 正确，允许在派生类内部访问受保护的静态成员 x
        Base.x;
    }
}

// 错误！不允许在类外部访问受保护的静态成员 x
Base.x;
```

**类的private静态成员只允许在当前类的内部访问**。

```typescript
class Base {
    private static x: string = 'coolcou.com';

    a() {
        // 正确，允许在类内部访问受保护的静态成员 x
        Base.x;
    }
}

class Derived extends Base {
    b() {
        // 错误！不允许在派生类内部访问受保护的静态成员 x
        Base.x;
    }
}

// 错误！不允许在类外部访问受保护的静态成员 x
Base.x;
```

**类的public静态成员和protected静态成员也可以被继承**。

```typescript
class Base {
   public static x: string = 'coolcou.com';
   protected static y: string = '';
}

class Derived extends Base {
   b() {
       // 继承了基类的静态成员 x
       Derived.x;

       // 继承了基类的静态成员 y
       Derived.y;
   }
}
```

#### 抽象类

**抽象类不能被实例化**。抽象类的作用是作为基类使用，派生类可以继承抽象类。

```typescript
abstract class Base {}

class Derived extends Base {}

const derived = new Derived();
```

抽象类也可以继承其他抽象类。

```typescript
abstract class Base {}

abstract class Derived extends Base {}
```

抽象类中允许（通常）包含抽象成员，也允许包含非抽象成员。

```typescript
abstract class Base {
   abstract a: string;

   b: string = '';
}
```

抽象成员

在抽象类中允许声明抽象成员，抽象成员不允许包含具体实现代码。

```typescript
// 以下用法均为正确用法
abstract class A {
   abstract a: string;
   abstract b: number = 0;

   abstract method(): string;

   abstract get accessor(): string;
   abstract set accessor(value: string);
}

abstract class B {
   // 编译错误！抽象方法不能带有具体实现
   abstract method() {}

   // 编译错误！抽象存取器不能带有具体实现
   abstract get c(): string { return ''; };
   abstract set c(value: string) {};
}
```

**如果一个具体类继承了抽象类，那么在具体的派生类中必须实现抽象类基类中的所有抽象成员**。因此，抽象类中的抽象成员不能声明为private，否则将无法在派生类中实现该成员。

```typescript
abstract class Base {
   abstract a: string;

   abstract get accessor(): string;
   abstract set accessor(value: string);

   abstract method(): boolean;
}

class Derived extends Base {
   // 实现抽象属性 a
   a: string = '';

   // 实现抽象存取器accessor
   private _accessor: string = 'www.coolcou.com';

   get accessor(): string {
       return this._accessor;
   }
   set accessor(value: string) {
       this._accessor = value;
   }

   // 实现抽象方法 method
   method(): boolean {
       return true;
   }
}
```

### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

#### 泛型函数

```typescript
function identity <T, U>(value: T, message: U) : T {
  console.log(message);
  return value;
}
identity<number, string>(68, "Semlinker") // 尖括号可以省略不写
```

#### 泛型接口

```typescript
interface GenericIdentityFn<T> {
  (arg: T): T;
}
```



#### 泛型类

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

```



#### 泛型约束

```typescript
interface Sizeable {
  size: number;
}
function trace<T extends Sizeable>(arg: T): T {
  console.log(arg.size);
  return arg;
}
```



### 类型谓词

keyof

### 声明文件



### 常用内置工具类型

#### Pick<T, K>

该工具类型能够从已有对象类型中选取给定的属性及其类型，然后构建出一个新的对象类型。

```typescript
interface A {
  x: number;
  y: number;
}

type T0 = Pick<A, 'x'>;        // { x: number }
type T1 = Pick<A, 'y'>;        // { y: number }
type T2 = Pick<A, 'x' | 'y'>;  // { x: number; y: number }

type T3 = Pick<A, 'z'>;
//                ~~~
//                编译错误：类型'A'中不存在属性'z”

```

#### Omit<T, K>

“Omit<T, K>”工具类型与“Pick<T, K>”工具类型是互补的，它能够从已有对象类型中剔除给定的属性，然后构建出一个新的对象类型。

```typescript
interface A {
  x: number;
  y: number;
}

type T0 = Omit<A, 'x'>;       // { y: number }
type T1 = Omit<A, 'y'>;       // { x: number }
type T2 = Omit<A, 'x' | 'y'>; // { }
type T3 = Omit<A, 'z'>;       // { x: number; y: number }”


interface UserItem {
  name: string
  age: number
  enjoyFoods: string[]
  friendList?: UserItem[]
}

// 这里在继承 UserItem 类型的时候，删除了两个多余的属性
interface Admin extends Omit<UserItem, 'enjoyFoods' | 'friendList'> {
  permissionLevel: number
}

// 现在的 admin 就非常精简了
const admin: Admin = {
  name: 'Petter',
  age: 18,
  permissionLevel: 1,
}

```

#### Partial< T >

该工具类型能够构造一个新类型，并将实际类型参数T中的所有属性变为可选属性

```typescript
interface A {
  x: number;
  y: number;
}

type T = Partial<A>; // { x?: number; y?: number; }

const a: T = { x: 0, y: 0 };
const b: T = { x: 0 };
const c: T = { y: 0 };
const d: T = {};
```

#### InstanceType< T >

该工具类型能够获取构造函数的返回值类型，即实例类型。

```
class C {
  x = 0;
}
type T0 = InstanceType<typeof C>;         // C

type T1 = InstanceType<new () => object>; // object

type T2 = InstanceType<any>;              // any

type T3 = InstanceType<never>;            // any

type T4 = InstanceType<string>;           // 编译错误
type T5 = InstanceType<Function>;         // 编译错误
```

