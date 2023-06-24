# app-info-parser

## 介绍

> app-info-parser 是一个用于解析应用程序的信息（如名称、版本、包名、图标等）的 Node.js 模块。通过使用该模块，开发者可以方便地获取一个应用程序的基本信息，并在开发过程中使用这些信息进行相关的操作，比如生成二维码、获取应用程序的更新信息等。
> app-info-parser 支持多种应用程序的解析，包括 iOS 和 Android 平台上的应用程序，同时还支持解析 Mac 和 Windows 上的桌面应用程序。该模块可以通过 npm 安装并使用，具有使用简单、解析准确等优点，是开发者在开发过程中常用的工具之一。

## 快速上手

1. 在 UniApp 项目的根目录下，使用 npm 命令安装 app-info-parser 模块。具体命令如下：

```bash
npm install app-info-parser --save
```

2. 在需要使用该模块的页面或组件中，使用 require 方法引入该模块。具体代码如下：

```js
const appInfoParser = require("app-info-parser");
appInfoParser.parse().then((info) => {
  console.log(info.name); // 输出应用程序的名称
  console.log(info.version); // 输出应用程序的版本号
  console.log(info.bundleId); // 输出应用程序的包名
});
```

## api 大全

- `parse()`：解析应用程序信息的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序的信息对象。

```js
const appInfoParser = require("app-info-parser");
appInfoParser.parse().then((info) => {
  const appName = info.name; /* 名称 */
  const appVersion = info.version; /* 版本号 */
  const appPackageName = info.packageName; /*  */
  const appBuildNumber = info.buildNumber; /*  */
});
```

- `getAppIcon()`：获取应用程序图标的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序图标的 Buffer 数据。

- `getAppName()`：获取应用程序名称的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序的名称。

- `getAppVersion()`：获取应用程序版本号的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序的版本号。

- `getAppBuildNumber()`：获取应用程序构建号的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序的构建号。

- `getAppPackageName()`：获取应用程序包名的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序的包名。

- `getAppPackagePath()`：获取应用程序包路径的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序的包路径。

- `getAppResourcesPath()`：获取应用程序资源路径的方法，返回一个 Promise 对象，通过 then 方法可以获取应用程序的资源路径。

> 需要注意的是，不同平台上可能支持的 API 不完全相同，开发者在使用时需要根据具体需求进行选择。同时，app-info-parser 模块还支持自定义解析方法和选项，可以通过相应的 API 进行相关配置。
