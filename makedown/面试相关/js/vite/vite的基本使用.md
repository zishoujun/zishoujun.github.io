Vite 的基本操作

###  为什么要使用vite?

热更新 ，启动速度变快

> ## 模块热替换[¶](https://cn.vitejs.dev/guide/features.html#hot-module-replacement)
>
> Vite 提供了一套原生 ESM 的 [HMR API](https://cn.vitejs.dev/guide/api-hmr.html)。 具有 HMR 功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。Vite 内置了 HMR 到 [Vue 单文件组件（SFC）](https://github.com/vitejs/vite/tree/main/packages/plugin-vue) 和 [React Fast Refresh](https://github.com/vitejs/vite/tree/main/packages/plugin-react) 中。也通过 [@prefresh/vite](https://github.com/JoviDeCroock/prefresh/tree/main/packages/vite) 对 Preact 实现了官方集成。
>
> 注意，你不需要手动设置这些 —— 当你通过 [`create-vite`](https://cn.vitejs.dev/guide/) 创建应用程序时，所选模板已经为你预先配置了这些。

## 搭建第一个 Vite 项目

`npm create vite@latest`   使用npm   `npm create vite`   选择模板

## `index.html` 与项目根目录

> 在开发期间 Vite 是一个服务器，而 `index.html` 是该 Vite 项目的入口文件。

### 运行vite

在安装了 Vite 的项目中，可以在 npm scripts 中使用 `vite` 可执行文件，或者直接使用 `npx vite` 

```json
{
  "scripts": {
    "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
    "build": "vite build", // 为生产环境构建产物
    "preview": "vite preview" // 本地预览生产构建产物
  }
}
```

## 构建应用[¶](https://cn.vitejs.dev/guide/static-deploy.html#building-the-app)

你可以运行 `npm run build` 命令来执行应用的构建。

### 本地测试应用[¶](https://cn.vitejs.dev/guide/static-deploy.html#testing-the-app-locally)

当你构建完成应用后，你可以通过运行 `npm run preview` 命令，在本地测试该应用。



```
$ npm run build
$ npm run preview
```