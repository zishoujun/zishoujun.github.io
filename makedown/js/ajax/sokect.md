安装 sokect.io-client 包
在组件挂载完毕，进行socket连接
监听连接成功，监听错误消息，监听关闭连接
组件卸载关闭连接

`pnpm add socket.io-client
` 安装包




# 原生的写法

```
// 创建ws实例，建立连接  (ws://121.40.165.18:8800  有广告)
var ws = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

// 连接成功事件
ws.onopen = function(evt) { 
  console.log("Connection open ...");
  // 发送消息
  ws.send("Hello WebSockets!");
};
// 接受消息事件
ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  // 关闭连接  
  ws.close();
};
// 关闭连接事件
ws.onclose = function(evt) {
  console.log("Connection closed.");
};      

```
# 第三方库
如何使用客户端js库?
`pnpm add socket.io-client
`
如何确定连接成功？
`socket.on('connect', () => {
  // 建立连接成功
})`
如何发送消息？

```
// chat message 发送消息事件，由后台约定，可变
socket.emit('chat message', '消息内容')
```
如何接收消息？

```
// chat message 接收消息事件，由后台约定，可变
socket.on('chat message', (ev) => {
  // ev 是服务器发送的消息
})
```
如何关闭连接？

```
// 离开组件需要使用
socket.close()

```

#### 实例
```
import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'
import { onMounted, onUnmounted } from 'vue'
import { baseURL } from '@/utils/request'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'

const store = useUserStore()
const route = useRoute()

let socket: Socket
onUnmounted(() => {
  socket.close()
})
onMounted(async () => {
  // 建立链接，创建 socket.io 实例
  socket = io(baseURL, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })

  socket.on('connect', () => {
    // 建立连接成功
    console.log('connect')
  })

  socket.on('error', (event) => {
    // 错误异常消息
    console.log('error')
  })

  socket.on('disconnect', ()=> {
    // 已经断开连接
    console.log('disconnect')
  })
})
```

