##  vite 构建优化

## Vite 解决项目刷新慢问题（请求量过大）

vite是热启动的原因，当项目越来越大的时候，项目的networks请求就会越来越大，造成首次启动构建的时候变慢

```shell
npm i -D vite-plugin-optimize-persist vite-plugin-package-config
```

在 vite.config.js 中使用

```js
// vite.config.ts
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

export default {
  plugins: [
    PkgConfig(),
    OptimizationPersist()
  ]
}
```

>注意： 首次加载的时候，依然会很慢，这个是正常现象，因为这个插件, 加快vite载入界面速度的原理, 也和上面说的一样，而第一次，这个插件也没法知道，哪些依赖需要预构建，他只是在vite动态引入资源的时候，将这些资源都记录下来，自动写入了package.json中，当再次启动项目的时候，插件会读取之前他写入在package.json中的数据，并告知vite，这样vite就能对这些资源进行预构建了，也就能加快进入界面的速度了，但相应的启动速度就会比原来稍微慢一点
>————————————————
>版权声明：本文为CSDN博主「pzy_666」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
>原文链接：https://blog.csdn.net/pzy_666/article/details/123017630