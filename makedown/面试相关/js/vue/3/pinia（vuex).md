>Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。如果您熟悉 Composition API，您可能会认为理解为vuex


#### 安装

```
yarn安装
yarn add pinia
# or with npm
npm install pinia
```
引入
```
mian.ts
---

import { createPinia } from 'pinia'
const pinia = createPinia()

//直接use后面添加一项即可。use（）
createApp(App).use(router).use(pinia).mount('#app')
```
定义state
>创建state.ts 文件
```
//引入pinia
import { defineStore } from 'pinia'

export const useStore = defineStore(
//第一个参数唯一的id
//
  'cou', {
  
  //state数据
    state: () => ({ count: 0 }),
    //操作的函数
    actions: {
      countadd () {
        this.count++
      }
    }
  }
)
```
##### 组件中去引入

```
//引入
import { useStore } from '@/state/index'
//直接使用
const store = useStore()
console.log(store)
```
##### 访问state

```
const store = useStore()

store.counter++

//您还可以调用该$patch方法。state它允许您对部分对象同时应用多个更改：
//同时更改多个对象的值
store.$patch({
  counter: store.counter + 1,
  age: 120,
  name: 'DIO',
})
//对单个对象
store.$patch({ count: store.count + 1 })

//使用函数
const updatepana = () => {
  store.countadd()
}
```
##### #### 更换state
//替换state的对象为新对象
`store.$state = { counter: 24 }`

##### $subscribe() 订阅状态
理解为pinia的watch监听

```
cartStore.$subscribe((mutation, state) => {
  console.log(mutation,state)
//(改变的信息，改变的值)//动态的

})
```

##### 访问其他**getter**
>与计算属性一样，您可以组合多个 getter。 通过 this 访问任何其他 getter




```
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  getters: {
  
  //定义一个计算属性getters
    doubleCount: (state) => state.counter * 2,
  },
})

---
//组件直接调用即可      
<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

---









#### Actions
>Actions 相当于组件中的 methods  它们可以使用 defineStore() 中的 actions 属性定义，并且它们非常适合定义业务逻辑：


```
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
  //定义函数
  actions: {
  //添加
    increment() {
      this.counter++
    },
    //随机数这里的**++this++**为普通函数才有，箭头函数的this指向为undeifend
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})

---
在组件中使用
---
    const store = useStore()
    //直接使用函数即可
    store.randomizeCounter()


```
##### 与其他state一起使用

```
//引入
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // ...
  }),
  actions: {
    async fetchUserPreferences(preferences) {
    //在这个里面直接使用其他state的函数就行
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```
