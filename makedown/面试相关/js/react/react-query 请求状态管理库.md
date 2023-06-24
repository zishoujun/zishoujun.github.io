## react-query 请求状态管理库

react-query 用来管理 react的异步请求

```jsx
import { useQuery,QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();  //初始化配置

//jsx 
<QueryClientProvider client={queryClient}>
    //QueryClientProvider 必须包裹根组件
    <StrictMode>
      <App />
    </StrictMode>
  </QueryClientProvider>
```

### react-query 三大核心概念

- **查询** Queries
- **修改** Mutation
- **查询错误处理** Query Invalidation

#### 查询 

查询是一种对于唯一键值相关联的异步数据源的声明性依赖查询查询可以与任何基于 Promise 的方法（包括 GET 和 POST 方法）一起使用，以从服务器获取数据 （**比如axios 返回的是promise 所以可以管理axios请求**）。 如果您的方法修改了服务器上的数据，建议您改用[Mutations](https://react-query.tanstack.com/docs/guides/mutations)。

```jsx
import { useQuery } from "react-query"; //引入

function App() {
  const info = useQuery("todos", fetchTodoList);  //三个参数，唯一键，可以理解为唯一的变量，请求函数（promise），
    //第三个配置项options
}
```

`useQuery`返回的查询结果将包含有所有关于排版(templating)和**数据**所需要的信息：



```jsx
const result = useQuery("todos", fetchTodoList);

//返回数据

```

`isLoading`或者 `status===loading` --- 查询没有数据正在获取结果中

`isError`  或者 `status===error ` --- 查询遇到一个错误

`issuccess`或者 `status===success` --- 查询成功并且数据可用

`isidle  ` 或者  `status===success` --- 查询处于禁用状态



````````jsx
function Todos() {
  const { isLoading, isError, data, error } = useQuery("todos", fetchTodoList);
		//获取成功的状态 ，错误的状态  错误的信息 没有数据的状态
  if (isLoading) {
    return <span>Loading...</span>;
  }
//分别为不通的状态，返回不同的组件
  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  // 现在我们可以假设 `isSuccess === true`
  return (
      //从data里面获取数据
    <ul>
      {data.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}
````````

# 修改 mutations

与查询不同，修改通常意味着用于**创建/更新/删除数据或执行服务器**命令等副作用。 为此，React Query 导出了`useMutation` hook。

管理（axios的post，put等这种请求）



```jsx
function App() {
    				//添加新的值
  const mutation = useMutation((newTodo) => axios.post("/todos", newTodo));

  return (
    <div>
      {mutation.isLoading ? (
              //修改目前正在进行操作
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}
```

- `isIdle` 或 `status === 'idle'` - 修改目前处于闲置状态或处于全新/重置状态
- `isLoading` 或 `status === 'loading'` - 修改目前正在进行操作
- `isError` 或 `status === 'error'` - 修改遇到了错误
- `isSuccess` 或 `status === 'success'` - 修改是成功的，且数据可用

**在上面的示例中，您还看到可以通过使用单个变量或对象调用 `mutate` 函数来将变量传递给您的修改函数**



改动后更新值：

```jsx
queryClient.setQueryData(queryKey, updater);
							//键名，更新函数
							
 const { mutate, data, isSuccess, error } = useSaveOrUpdateSysOrganization({
    mutation: {
      onSuccess() {
        message.success('修改成功');
        queryClient.invalidateQueries(getQuerySysOrganizationQueryKey(params));
      },
    },
  });


```

`setQueryData`是一个同步函数，可用于**立即更新查询的缓存数据**。如果查询不存在，则会**创建它**。**如果查询钩子在默认`cacheTime`的 5 分钟内没有使用该查询，则该查询将被垃圾回收**。