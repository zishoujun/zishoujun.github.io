
websocket  长连接


```
var Socket = new WebSocket(url, [protocol] );
```

| 属性 | 	描述 |
| Socket.readyState |只读属性 readyState 表示连接状态，可以是以下值：

0 - 表示连接尚未建立。

1 - 表示连接已建立，可以进行通信。

2 - 表示连接正在进行关闭。

3 - 表示连接已经关闭或者连接不能打开。

 |
|  Socket.bufferedAmount| 只读属性 bufferedAmount 已被 send() 放入正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数。 |


##### WebSocket 事件
以下是 WebSocket 对象的相关事件。假定我们使用了以上代码创建了 Socket 对象：

---

| 
事件 | 事件处理程序 | 描述 |
| --- | --- | --- |
| open | Socket.onopen | 连接建立时触发 |
| message | Socket.onmessage| 客户端接收服务端数据时触发 |
|error  | Socket.onerror |通信发生错误时触发  |
| close |  	Socket.onclose| 连接关闭时触发 |

##### WebSocket 方法

| 方法 | 描述 |
| --- | --- |
|   Socket.send() | 使用连接发送数据  | 
| Socket.close() | 关闭连接  |




```
 var ws = new WebSocket("ws://localhost:9998/echo");
 
 
 //发送
   ws.onopen = function()
               {
                  // Web Socket 已连接上，使用 send() 方法发送数据
                  ws.send("发送数据");
                  alert("数据发送中...");
               };
               //接受
               
  ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  alert("数据已接收...");
               };
               //关闭
    ws.onclose = function()
               { 
                  // 关闭 websocket
                  alert("连接已关闭..."); 
               };
 
```


