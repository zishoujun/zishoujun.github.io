import{_ as a,o as s,c as e,O as t}from"./chunks/framework.4afe7240.js";const m=JSON.parse('{"title":"快速开始","description":"","frontmatter":{},"headers":[],"relativePath":"react/quickstart.md","filePath":"react/quickstart.md","lastUpdated":1687613994000}'),n={name:"react/quickstart.md"},p=t(`<h1 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to &quot;快速开始&quot;">​</a></h1><p>本节将介绍如何在项目中使用 Tass UI.</p><h2 id="用法" tabindex="-1">用法 <a class="header-anchor" href="#用法" aria-label="Permalink to &quot;用法&quot;">​</a></h2><h3 id="完整引入" tabindex="-1">完整引入 <a class="header-anchor" href="#完整引入" aria-label="Permalink to &quot;完整引入&quot;">​</a></h3><p>如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">// main.ts</span></span>
<span class="line"><span style="color:#A6ACCD;">import { createApp } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import App from &#39;./App.vue&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import TassUI from &#39;tass-ui&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">import &#39;tass-ui/es/style.css&#39;;</span></span>
<span class="line"><span style="color:#A6ACCD;">const app = createApp(App);</span></span>
<span class="line"><span style="color:#A6ACCD;">app.use(TassUI).mount(&#39;#app&#39;);</span></span></code></pre></div><h1 id="开始使用" tabindex="-1">开始使用 <a class="header-anchor" href="#开始使用" aria-label="Permalink to &quot;开始使用&quot;">​</a></h1><p>现在你可以启动项目了。 对于每个组件的用法，请参考单个组件对应的文档。</p>`,8),o=[p];function r(l,c,i,d,h,_){return s(),e("div",null,o)}const A=a(n,[["render",r]]);export{m as __pageData,A as default};