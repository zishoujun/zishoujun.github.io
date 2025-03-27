# redux

```js
import { legacy_createStore as createStore } from "redux";

const types = {
  SET_USER: "SET_USER",
};
const initialState = {
  user: {
    name: "xxx",
  },
};
// 创建一个“reducer”函数
function counterReducer(state = initialState, action) {
  // 修改user
  const SET_USER = (params) => {
    return Object.assign(state.user, params);
  };
  // 根据 action 的类型来更新状态
  switch (action.type) {
    case types.SET_USER:
      return SET_USER(action.params);
    default: {
      return state;
    }
  }
}
// 通过 createStore 方法创建一个新的 Redux store，使用 counterReducer 进行更新逻辑
const store = createStore(counterReducer);
const change = () =>
  store.dispatch({ type: types.SET_USER, params: { name: "yyy" } });
store.subscribe(() => {
  console.log("数据更新", store.getState());
});
change();
```

# redux-toolkit

```js
// Redux Toolkit 配置
import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    change: (state, action) => {
      state.value += action.payload;
    },
  },
});
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

store.subscribe(() => {
  console.log("数据更新", store.getState());
});

const change = () => {
  store.dispatch(counterSlice.actions.change(10));
};
change();
```

# react 扩展

```sh
yarn add redux-persist
yarn add react-redux
```

```js
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage
const persistConfig = { key: "root", storage };
export const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    change: (state, action) => {
      state.value += action.payload;
    },
  },
});
// 创建 store
export const store = configureStore({
  reducer: {
    counter: persistReducer(persistConfig, counterSlice.reducers);
  }
});
// 外部修改
export const change = () => {
  store.dispatch(counterSlice.actions.change(10));
};
// 创建持久化 store
export const persistor = persistStore(store);
store.subscribe(() => {
  console.log("数据更新", store.getState());
});
```
```jsx
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useSelector, useDispatch } from 'react-redux';
import { counterSlice,persistor } from './store.js';

function App() {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    return (
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <div>
                <h1>Count: {count}</h1>
                <button onClick={() => dispatch(counterSlice.actions.change(10))}>change</button>
            </div>
        </PersistGate>
        </Provider>
    );
}
```
