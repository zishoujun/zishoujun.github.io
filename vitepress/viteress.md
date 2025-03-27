# 创建项目

- `mdkir vite-press & cd vite-press`

- `pnpm init`

- `pnpm add vitepress vue -D`

- `package.json `

```json
{
  // ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
  // ...
}
```

> vite-press 目录结构

```sh
vite-press
  ├─ docs
  │  ├─ .vitepress
  │  │   ├─ cache #自带
  │  │   ├─ theme #主题
  │  │   │  └─ index.js
  │  │   └─ config.js #配置
  │  └─ index.md #入口
  ├─ .gitignore
  ├─ node_modules
  └─ package.json

```

## 首页配置 index.md

```yaml
layout: home

hero:
  name: Tass
  text: 一个Vue3组件库
  tagline: 基于Vue3,简洁高效的组件库
  image:
    src: /images/logo.png
    alt: tass-ui
  actions:
    - theme: brand
      text: Get Started
      link: /guide/install
    - theme: alt
      text: View on GitHub
      link: https://github.com/huccct/echo-ui
```

> Hero 部分

- Hero 部分位于主页顶部，下面是如何配置 Hero 部分。


# 