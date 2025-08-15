// server.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // 需要跨域就开；同域可删

// 一个内存里的全局自增 id，用于事件编号（可换成你的业务 id）
let globalEventId = 1;

// SSE endpoint
app.get('/sse', (req, res) => {
    // 必须的 SSE 头
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform'); // no-transform 防止代理改动
    res.setHeader('Connection', 'keep-alive');

    // 可选：告诉浏览器重连等待时间（毫秒）
    res.write(`retry: 3000\n\n`);

    // 断线续传：客户端可能带上 Last-Event-ID
    const lastEventId = Number(req.get('Last-Event-ID') || 0);

    // 如果需要，先把遗漏的历史消息补发（这里演示用简单提示）
    if (lastEventId && lastEventId < globalEventId - 1) {
        const missedFrom = lastEventId + 1;
        res.write(`id: ${globalEventId++}\n`);
        res.write(`event: notice\n`);
        res.write(`data: {"type":"resync","missedFrom":${missedFrom}}\n\n`);
    }

    // 心跳：防止中间代理/浏览器断开空闲连接
    const heartbeat = setInterval(() => {
        // 注：注释行或单个换行有的代理会吞，这里发一条 event: ping
        res.write(`event: ping\n`);
        res.write(`data: {}\n\n`);
    }, 15000);

    // 示例：每 2 秒推送一条计数
    let n = 1;
    const ticker = setInterval(() => {
        const payload = { n, ts: Date.now() };
        res.write(`id: ${globalEventId++}\n`);
        // 默认事件名是 "message"，也可以自定义： res.write(`event: counter\n`);
        res.write(`data: ${JSON.stringify(payload)}\n\n`);
        n += 1;
    }, 2000);

    // 客户端断开时清理
    req.on('close', () => { clearInterval(heartbeat); clearInterval(ticker); }); 
});

// 一个普通接口，演示触发自定义事件（可选）
app.get('/push', (req, res) => {
    // 这里通常会把消息放到某个广播机制；为了简单我们不做共享。
    res.json({ ok: true, hint: '把业务消息放入内存/队列并在 /sse 循环中发送' });
});

app.listen(3000, () => {
    console.log('SSE server on http://localhost:3000');
});
