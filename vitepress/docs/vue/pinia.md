# 使用

## 下载 引入

- npm i pinia -S

- main.js

```js
import App from "./App.vue";
import { createApp } from "vue";
import { createPinia } from "pinia";
const pinia = createPinia();
createApp(App).use(pinia).mount("#app");
```

## 创建 store 并使用

- 创建 store.js

```ts
import { defineStore } from "pinia";
// 1.定义容器
// 参数1 ：容器的名字 Id， 必须唯一， 将来pinia 会把所有的容器挂在到根容器
export const useMainStore = defineStore("main", {
  /* state 用来存放数据 必须是函数：这样是为了在服务器端渲染避免交叉请求导致数据状态污染 */
  state: (): any => {
    return {
      count: 100,
      foo: "main",
      arr: [],
    };
  },
  /* getters 用来计算数据 */
  getters: {
    count1(): number {
      return this.count + 1;
    },
    count2(state) {
      return state.count + 1;
    },
  },
  /* actions 请求数据，修改数据 */
  actions: {
    changeState() {
      // 1.直接更新
      this.count++;
      this.foo = "hell0";
      this.arr.push(4);
      // 2.用$patch ()
      this.$patch((state: any) => {
        state.count++;
        state.foo = "hell0";
        state.arr.push(4);
      });
    },
  },
});
```

- vue 中使用

```vue
<template>
  <div>
    <p>{{ count }}</p>
    <p>{{ foo }}</p>
    <p>{{ mainStore.arr }}</p>
    <p>{{ mainStore.count1 }}</p>
    <p>{{ mainStore.count2 }}</p>
    <p><button @click="handleChangeState">更改</button></p>
    <p>
      <button @click="actionChangeState">action更改</button>
    </p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMainStore } from "../../store";

const mainStore = useMainStore();

const { count, foo } = storeToRefs(mainStore);

const handleChangeState = () => {
  // 修改方式1：直接修改
  mainStore.count++;
  // 修改方式2：$patch
  mainStore.$patch({
    count: mainStore.count + 1,
    foo: "hello",
    arr: [...mainStore.arr, 4],
  });
  // 修改方式3：$patch 函数
  mainStore.$patch((state) => {
    state.count++;
    state.foo = "hell0";
    state.arr.push(4);
  });
};
// 通过 action 去修改 逻辑比较多的情况下
const actionChangeState = () => {
  mainStore.changeState();
};
</script>
```

# 实现

## 导出

> 我们一般在使用

```js
import createPinia from "./CreatePinia";
import defineStore from "./DefineStore";
export { createPinia, defineStore };
```

## 实现 CreatePinia

```js
import { reactive } from "vue";
import { patch } from "./apis";

export default function CreatePinia() {
  const PiniaStore: any = reactive({});

  function setSubStore(id: string, store: any) {
    if (!PiniaStore[id]) {
      PiniaStore[id] = store;
      PiniaStore[id].$patch = patch;
    }
    return PiniaStore;
  }

  function install(app: any) {
    app.provide("setSubStore", setSubStore);
  }

  return {
    install,
  };
}
```

## 实现 DefineStore

```js
import { reactive, inject } from "vue";
import { createState, createActions, createGetters } from "./options";

export default function DefineStore(id: string, options: any) {
  const { state, actions, getters } = options;
  const store = {};
  if (state && typeof state == "function") {
    createState(store, state);
  }

  if (actions && Object.keys(actions).length > 0) {
    createActions(store, actions);
  }

  if (getters && Object.keys(getters).length > 0) {
    createGetters(store, getters);
  }

  return () => {
    const setSubStore: any = inject("setSubStore");
    const PiniaStore = setSubStore(id, reactive(store));

    return PiniaStore(id);
  };
}
```

### 实现 state actions getters

```js
import { reactive, toRef, computed } from "vue";

export function createState(store: any, state: any) {
  const _state: any = state();
  store.$state = reactive(_state);
  for (const key in _state) {
    store[key] = toRef(store.$state, key);
  }
}

export function createActions(store: any, actions: any) {
  for (const key in actions) {
    store[key] = actions[key];
  }
}

export function createGetters(store: any, getters: any) {
  for (const key in getters) {
    store[key] = computed(getters[key].bind(store.$state, store.$state));
    store.$state[key] = store[key];
  }
}
```

## apis - storeToRefs 扩展

```js
import { toRaw, isReactive, isRef, toRef } from "vue";
function storeToRefs(store) {
  store = toRaw(store);
  const refs = {};
  for (const key in store) {
    const value = store[key];
    if (isRef(value) || isReactive(value)) {
      // @ts-expect-error: the key is state or getter
      refs[key] =
        // ---
        toRef(store, key);
    }
  }
  return refs;
}
```
