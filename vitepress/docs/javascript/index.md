# Vue



# Vue 多页面

```js
const { defineConfig } = require("@vue/cli-service");
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const pages = {
  teacher: {
    entry: "./src/views/teacher/main.js",
    template: "public/teacher.html",
    filename: "teacher.html",
    chunks: ["chunk-teachervendors", "chunk-teachercommon", "teacher"],
  },
  student: {
    entry: "./src/views/student/main.js",
    template: "public/student.html",
    filename: "student.html",
    chunks: ["chunk-studentvendors", "chunk-studentcommon", "student"],
  },
};
module.exports = defineConfig({
  transpileDependencies: true,
  // pages: pages,
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  filenameHashing: true,
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@a", resolve("src/api"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"))
      .set("@u", resolve("src/utils"))
      .set("@s", resolve("src/service"));
    config.optimization.runtimeChunk("single");
  },
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin(),
      // new HtmlWebpackPlugin({
      //     entry: './src/views/home/main.js',
      //     template: './public/index.html',
      //     filename: 'index.html',
      //     chunks: ['chunk-homevendors', 'chunk-homecommon', 'home']
      // })
    ],
  },
});
```

# Vue2.7 升级

## vue-router 处理

```js
// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;

// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch((err) => err);
};
```

## vuex 处理

```js
import { computed } from "vue";
import { mapGetters, mapState, useStore, createNamespacedHelpers } from "vuex";

const useMapper = (mapper, mapFn) => {
  const store = useStore();
  const storeStateFns = mapFn(mapper);
  const storeState = {};
  Object.keys(storeStateFns).forEach((keyFn) => {
    const fn = storeStateFns[keyFn].bind({ $store: store });
    storeState[keyFn] = computed(fn);
  });
  return storeState;
};
export const useState = (moduleName, mapper) => {
  let mapperFn = mapState;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapState;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
};

export const useGetters = (moduleName, mapper) => {
  let mapperFn = mapGetters;
  if (typeof moduleName === "string" && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters;
  } else {
    mapper = moduleName;
  }
  return useMapper(mapper, mapperFn);
};
```

## router 和 vuex 的 hook

```js
import { getCurrentInstance } from "vue";
// 访问vuex
export const useStore = () => {
  const vm = getCurrentInstance();
  if (!vm) throw new Error("must be called in setup");
  return vm.proxy.$store;
};
// 访问router
export const useRouter = () => {
  const vm = getCurrentInstance();
  if (!vm) throw new Error("must be called in setup");
  return vm.proxy.$router;
};
// 访问route
export const useRoute = () => {
  const vm = getCurrentInstance();
  if (!vm) throw new Error("must be called in setup");
  return vm.proxy.$route;
};
```
