

zustand 替代redux 变得更加好用


在任何位置都可以使用，单独控制状态

create（） 设置值 在函数外部定义最好

>const useStore = create((set) => ({
  count: {naem:'22'}, //定义值
  add: () => set((state) => ({ count: state.count + 1 })),
  //修改的方法
  handercount: (value) => set((state) => ({ count: value })),
  //传递新值修改的方法
}));


```
import create from "zustand";
//引入
const useStore = create((set) => ({
  count: {naem:'22'},
  add: () => set((state) => ({ count: state.count + 1 })),
  
  //修改方法
  handercount: (value) => set((state) => ({ count: value })),
}));
//函数组件
function App(props) {
  const count = useStore((state) => state.count);
  // 拿到不同的值
  const add = useStore((state) => state.add);
  const handeradd = useStore((state) => state.handercount);
  const startt = () => {
    console.log(handeradd);
    handeradd({nameL:'sss'});
  };
  return (
    <div className="App">
      <span>{count.naem}</span>
      //添加操作和传值的操作
      <button onClick={add}>+</button>
      <button onClick={startt}>传值</button>
    </div>
  );
}
```
