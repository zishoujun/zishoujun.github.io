# Vue Query

# install

```powershell
npm install vue-query
# or
yarn add vue-query
```

## init （初始化）

```ts
import { VueQueryPlugin } from "vue-query";

app.use(VueQueryPlugin);
```

`useQueryProvider`在根组件中调用



## query



```ts
const result = useQuery("todos", fetchTodoList);
```

- `isLoading`or `status === 'loading'`- 查询没有数据，当前正在获取
- `isError`或`status === 'error'`- 查询遇到错误
- `isSuccess`or `status === 'success'`- 查询成功，数据可用
- `isIdle`或`status === 'idle'`- 查询当前已禁用（稍后您将了解更多相关信息）

#  useMutation

与查询不同，突变通常用于创建/更新/删除数据或执行服务器副作用。为此，Vue Query 导出了一个`useMutation`钩子。

```vue
<script setup>
import { useMutation } from "vue-query"; //导出得的 钩子

function useAddTodoMutation() {
  return useMutation((newTodo) => axios.post("/todos", newTodo));  //钩子函数
}

const { isLoading, isError, error, isSuccess, mutate } = useAddTodoMutation(); //结构出多种状态

function addTodo() {
  mutate({ id: new Date(), title: "Do Laundry" }); //使用钩子添加
}
</script>
```

在任何给定时刻，突变只能处于以下状态之一：

- `isIdle`或`status === 'idle'`- 突变当前处于空闲状态或处于新鲜/重置状态
- `isLoading`或`status === 'loading'`- 突变当前正在运行
- `isError`或`status === 'error'`- 突变遇到错误
- `isSuccess`或`status === 'success'`- 突变成功且突变数据可用

除了这些主要状态之外，还可以根据突变状态获得更多信息：

- `error`- 如果突变处于某种`error`状态，则错误可通过`error`属性获得。
- `data`- 如果突变处于某种`success`状态，则数据可通过`data`属性获得。

### [重置突变状态  Mutation

有时您需要清除变更请求的`error`or `data`。为此，您可以使用`reset`函数来处理：

```vue
<script>
import { useMutation } from "vue-query";

function useAddTodoMutation() {
  return useMutation((newTodo) => axios.post("/todos", newTodo));
}

const { error, mutate, reset } = useAddTodoMutation();

function addTodo() {
  mutate({ id: new Date(), title: "Do Laundry" });
}
</script>

<template>
  <span v-else-if="error">
    <span>An error occurred: {{ error.message }}</span>
      //reset 直接调用 重置
    <button @click="reset">Reset error</button>
  </span>
  <button @click="addTodo">Create Todo</button>
</template>
```

### [突变副作用](https://vue-query.vercel.app/#/guides/mutations?id=mutation-side-effects)

```ts
function useAddTodoMutation() {
  return useMutation((newTodo) => axios.post("/todos", newTodo), {
    onSuccess: (data, variables, context) => {
      // I will fire first
    },
    onError: (error, variables, context) => {
      // I will fire first
    },
    onSettled: (data, error, variables, context) => {
      // I will fire first
    },
  });
}

const { mutate } = useAddTodoMutation();

mutate(todo, {
  onSuccess: (data, variables, context) => {
  //多种状态
    // I will fire second!
  },
  onError: (error, variables, context) => {
    // I will fire second!
  },
  onSettled: (data, error, variables, context) => {
    // I will fire second!ts
  },
});
```

### Promises

```ts
const { mutateAsync } = useAddTodoMutation();

function myAction() {
  try {
    const todo = await mutateAsync(todo);
    console.log(todo);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("done");
  }
}
```

