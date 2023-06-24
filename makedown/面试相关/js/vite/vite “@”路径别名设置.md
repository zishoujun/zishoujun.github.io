# viteconfig.ts 中配置

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path' //引入path模块
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
    //设置别名 “@”     地址
      '@': path.resolve(__dirname, './src')
    }
  },
  
  
})

```


`npm i @types/node -d` 下载类型声明文件


==项目能运行，但是vscord报错没有声明==
## 需要在tsconfig.ts中配置 解决vscord报错

```
{
  "compilerOptions": {
    //....之前的配置不变
    "baseUrl": "./",
    "paths": {
      "@/*":["src/*"]
    }
    
  },
```
