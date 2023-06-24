# react路由v6

##### install

``` shell
npm install react-router-dom@6
```

#### 配置

```jsx
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />          //默认
        <Route path="teams" element={<Teams />}>
          <Route path=":teamId" element={<Team />} />
          <Route path="new" element={<NewTeamForm />} />
          <Route index element={<LeagueStandings />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
```

#### 导航跳转

```jsx
import { Link } from "react-router-dom";
//link 跳转
function Home() {
  return (
    <div>
      <h1>Home</h1>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="about">About</Link>
      </nav>
    </div>
  );
}
```

```jsx
import { useNavigate } from "react-router-dom";
//编程式跳转
function Invoices() {
  let navigate = useNavigate(); //创建实例
  return (
    <div>
      <NewInvoiceForm
        onSubmit={async (event) => {
          let newInvoice = await createInvoice(
            event.target
          );
          navigate(`/invoices/${newInvoice.id}`);
        }}
      />
    </div>
  );
}
```

###### 读取参数

```jsx
import { Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="invoices/:invoiceId" //和下面的对应
        element={<Invoice />}
      />
    </Routes>
  );
}

function Invoice() {
  let params = useParams();
  return <h1>Invoice {params.invoiceId}</h1>; //拿到prams
    
}
```

### 路由嵌套

路由可以相互嵌套，它们的路径也会嵌套（子继承父）

```jsx
function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}
```

#### Outlet 

和 router-view 一样显示路由匹配结果的地方 

```jsx
mport { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="invoices" element={<Invoices />}>
        <Route path=":invoiceId" element={<Invoice />} />
        <Route path="sent" element={<SentInvoices />} />
      </Route>
    </Routes>
  );
}

function Invoices() {
  return (
    <div>
      <h1>Invoices</h1>
      <Outlet />  //展示
    </div>
  );
}

function Invoice() {
  let { invoiceId } = useParams();
  return <h1>Invoice {invoiceId}</h1>;
}

function SentInvoices() {
  return <h1>Sent Invoices</h1>;
}
```

## 路由懒加载





```jsx

import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/home")); //懒加载 函数
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App store={store} />}>
          <Route
            path="home"
            element={
              <Suspense> //需要包装
                <Home />
              </Suspense>
            }
          />
          <Route index element={<LeagueStandings />} />
        </Route>
        {/* <Route index element={<LeagueStandings />} /> */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


```

