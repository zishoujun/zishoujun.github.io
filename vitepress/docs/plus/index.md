## 基本操作

```js
plus.runtime.restart(); /* 重启 */

plus.runtime.quit(); /* 退出 */

plus.os.name == "Android" || "iOS";

plus.runtime.openURL(encodeURI(url)); /* 浏览器打开网页 */
```

## 监听手机返回

- ios 不需要

```js
window.plus.key.addEventListener("backbutton", () => {
  // 给手机的back按键重新绑定监听(1s内，连续点击两次返回键，则退出应用)
  if (this.isQuit) {
    // 连续按两次返回键且时间小于1s
    plus.runtime.quit(); //退出app
  }
  // 首次按返回键
  if (!this.isQuit) {
    //记录第一次按返回键的时间
    this.isQuit = true;
    if (this.$route.name == "home") {
      this.$toast("再次返回退出程序");
    } else {
      history.go(-1);
    }
    setTimeout(() => {
      this.isQuit = false;
    }, 1000);
  }
});
```

## 获取版本号

- 在进行版本号对比时建议使用第一种获取版本号

```js
// 第一种
plus.runtime.getProperty(plus.runtime.appid, function (info) {
  const v = info.version;
  console.log("当前应用版本：" + v);
});

// 第二种
plus.runtime.version;
```

## 设置角标

- 存在兼容性

```js
plus.runtime.setBadgeNumber(-1);
plus.runtime.setBadgeNumber(50);
alert("设置程序图标右上角显示的提示数字为50\n请返回桌面查看");
if (plus.os.name == "iOS") {
  alert('*如果无法设置提示数字，请到"设置"->"通知"中配置应用在通知中心显示!');
} else {
  alert("注：仅支持小米(MIUI v5)，其它设备暂不支持此功能!");
}
```

## 下载

- 用于版本更新下载

```js
const url = "https://www.codingo.site/static/app.wgt";
plus.downloader.createDownload(
  url,
  { method: "GET" },
  function (download, status) {
    if (status == 200) {
      console.log("下载成功安装: " + download.filename);
      plus.runtime.install(
        download.filename,
        {
          /* force: true */
        },
        function (success) {
          console.log(success);
          plus.runtime.restart();
        },
        function (fail) {
          console.log(fail);
        }
      );
    } else {
      alert("安装失败，请稍候重试: " + status);
    }
  }
);
// 下载监听
task.addEventListener(
  "statechanged",
  function (download, status) {
    if (status == 200) {
      const scale =
        Number(download.downloadedSize) / Number(download.totalSize);
      const progress = Math.floor(scale.toFixed(2) * 100);
      progressBox.textContent = `${progress}%`;
    }
  },
  false
);
task && task.start();
```

## 设置状态栏

```js
plus.navigator.setStatusBarStyle("light"); /* 文字颜色 */
plus.navigator.setStatusBarBackground("#d71f1e"); /* 背景图 */
```

## 消息推送

<!--
    cover  是否覆盖上一条
    icon: (String 类型 )推送消息的图标 iOS - ALL (不支持) :
    sound: (String 类型 )推送消息的提示音 [system , none]
    delay: (Number 类型 )提示消息延迟显示的时间
    subtitle: (String 类型 )
    when: (Date 类型 )消息上显示的提示时间  iOS - ALL (不支持) :
-->

```js
// 创建信息
plus.push.setAutoNotification(true); /* 是否在系统显示*/
plus.push.createMessage(
  "content",
  { id: 12 } /* 监听点击到信息 */,
  { title: "测试", cover: false, icon: "./logo.ico", sound: "system" }
);
// 监听信息
plus.push.addEventListener(
  "click",
  (data) => {
    console.log(data); /* { id: 12, } */
  },
  false
);

```

## 打开其他 app

```js
// 第一种
<a href="gxb://com.gangxinbao.gxb?path=user&id=">gxb</a>
// 第二种
plus.runtime.launchApplication( { action: 'gxb://com.gangxinbao.gxb?path=user&id=', },
  function (e) {
    console.log("Open system default browser failed: " + e.message);
  }
);

// 处理从后台恢复 监听传过来的值  
export const onPlusListenerNewIntent = () => {
    document.addEventListener('newintent', function () {
        const launcher = plus.runtime.launcher
        const args = plus.runtime.arguments
        const id = args.split("=")[1]
        router.push({ path: "/home/company", query: { companyId: id } })
    }, false);
};
```

## 跳转支付
```js
const MixinPayment = {
    data() {
        return {
            channels: {},
        };
    },
    created() {
        window.plus && this.getPaymentChannels()
    },
    methods: {
        // 获取支付通道
        getPaymentChannels() {
            this.$plus.payment.getChannels(
                (channels) => {
                    for (let i in channels) {
                        let _chan = channels[i];
                        if (_chan.id == "wxpay") {
                            this.chan.wx = _chan;
                        }
                        if (_chan.id == "alipay") {
                            this.chan.ali = _chan;
                        }
                    }
                },
                (e) => {
                    this.$toast.fail("获取支付通道失败"); console.log(e.message);
                }
            );
        },
        // 微信支付
        async onWeChatPayment(id, params, success,error) {
            console.log(id, params, callback);
            const _chan = id == "ali" ? this.chan.ali : this.chan.wx;
            const bool = this.isPayment(_chan)
            bool && this.$plus.payment.request(_chan, params,success,error);
        },
        // 校验通道
        isPayment(chan) {
            if (chan.serviceReady) return true;
            let text = null
            switch (chan.id) {
                case 'alipay':
                    text = "检测到系统未安装“支付宝”，无法完成支付操作，是否立即安装？";
                    break;
                default:
                    text = `检测到系统未安装“${chan.description}服务”，无法完成支付操作，是否立即安装？`;
                    break;
            }
            this.$plus.nativeUI.confirm(text, function (e) { if (e.index == 0) { chan.installService(); } }, chan.description);
            return false
        },
    }
};

export default MixinPayment
```


## 获取坐标
```js
// api: 获取坐标
export function getAddress() {
    const promise = new Promise((resolve, reject) => {
        plus.geolocation.getCurrentPosition(
            function (p) {
                resolve([p.coords.longitude, p.coords.latitude])
            },
            function (e) {
                let error = "Geolocation error: " + e.message
                console.log(error);
            }, {
            provider: "amap",
            coordsType: "gcj02",
        });
    })
    return promise
}
```

## 微信登录
```js
import axios from 'axios';
const Login = async (type) => {
    const service = await LoginServices();
    const Phone = service.filter((item) => item.id === "univerify")[0];
    const WeiXin = service.filter((item) => item.id === "weixin")[0];
    if (type == "univerify") {
        return PhoneLogin(Phone)
    }
    if (type == "weixin") {
        return WXLogin(WeiXin)
    }
}
function LoginServices() {
    const promise = new Promise((resolve, reject) => {
        plus.oauth.getServices(
            function (services) {
                resolve(services);
            },
            function (e) {
                reject(e);
            }
        );
    });
    return promise;
}
function WXLogin(WeiXin) {
    if (!WeiXin) {
        plus.nativeUI.alert("当前环境不支持微信登录");
        return;
    }
    TestPreLogin(WeiXin)
}
function PhoneLogin(Phone) {
    if (!Phone) {
        plus.nativeUI.alert("当前环境不支持一键登录");
        return;
    }
    TestPreLogin(Phone)
}
function TestPreLogin(that) {
    that.preLogin(
        function () {
            // 预登录成功,显示一键登录选项

            GoLogin(that)
            console.log(JSON.stringify(that));
        },
        function (error) {
            // 预登录失败,不显示一键登录选项（或置灰）
            console.log("preLogin:Error", JSON.stringify(error));
        })
}
function GoLogin(that) {
    that.login(
        function (e) {
            //登录成功
            that.closeAuthView();
            console.log(JSON.stringify(that));
            console.log(that.authResult.openid, that.authResult.access_token);
            getLoginInfo(that)
        },
        function (err) {
            console.log("Error:login", JSON.stringify(err));
        }
    );
}
function getLoginInfo(that) {
    console.log();
    JSON.stringify
    let url = `https://5e380692-8dd7-463d-bfc2-d1946c4ff956.bspapp.com/phone/oauth`
    axios.post(`${url}?openid=${that.authResult.openid}&access_token=${this.authResult.access_token}`).then((ok) => {

        console.log(JSON.stringify(ok));
    })
        .catch((err) => {
            console.log(err);
        });
}

```

## 视频拍摄
```js
import axios from 'axios';
import SparkMD5 from "spark-md5";
const qs = require('qs');

function startVideoCapture() {
    if (!window.plus) { return this.$toast.fail('请在移动端进行拍摄！'); }
    const cmr = plus.camera.getCamera();
    const options = { filename: "_doc/camera/", index: 1, videoMaximumDuration: 10 }
    const success = (path) => getVideoFile(path)
    const error = (e) => console.log('error:' + e);
    cmr.startVideoCapture(success, error, options);
}
function dataURLtoBlob(base64, name) {
    var arr = base64.split(","), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) { u8arr[n] = bstr.charCodeAt(n); }
    const _file = new File([u8arr], name, { type: mime })
    const _blob = new Blob([u8arr], { type: mime });
    return { _file, _blob }
}
// 获取视频文件
function getVideoFile(path) {
    const success = (entry) => {
        entry.file(function (file) {
            const fileReader = new plus.io.FileReader();
            // fileReader.readAsText(file, "utf-8");
            fileReader.readAsDataURL(file);
            fileReader.onloadend = function (e) {
                const { _file, _blob } = dataURLtoBlob(e.target.result, file.name)
                onUploadVideo(_file)
            };
        });
    }
    const error = (e) => console.log('读取文件错误：:' + e);
    plus.io.resolveLocalFileSystemURL(path, success, error,);
}
function onUploadVideo(file) {
    let _file = file;//保存文件对象的容器  // progress = document.querySelector('.progress'); // 进度条
    const uploadInfo = {
        max: 1024 * 100,
        count: 100,
        finished: [], // 总切片
        current: 0,
        already: [] // 从服务器拉过来已经上传的切片数据
    }
    let index = 0, HASH, suffix;
    setUploadCount(file.size)
    // 设置切片的数量的函数
    function setUploadCount(size) {
        if (Math.ceil(size / uploadInfo.max) > 100) {
            // 如果超过了最大切片数量 100 
            uploadInfo.max = size / 100 //每一个切片的尺寸
            uploadInfo.count = 100 // 共需要多少切片
        } else {
            // 如果没有超过最大切片数量的话 那么就设置切片的数量
            uploadInfo.count = Math.ceil(size / uploadInfo.max)
        }
        onBeforeUpload()
    }
    // 文件转Buffer
    function changeBuffer(file) {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader()
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = function (ev) {
                let buffer = ev.target.result,
                    spark = new SparkMD5.ArrayBuffer(),
                    HASH,
                    suffix;
                spark.append(buffer) // 把buffer 类型的文件给它 它会生成一个独一无二的姓名
                HASH = spark.end()
                suffix = /\.([a-zA-Z0-9]+$)/.exec(file.name)[1]
                resolve({
                    buffer,
                    spark,
                    HASH,
                    suffix
                })
            }
        })
    }
    // 上传前
    async function onBeforeUpload() {

        const fileParams = await changeBuffer(_file)
        HASH = fileParams.HASH;
        suffix = fileParams.suffix

        try {
            // 获取已经上传的 切片
            let res = await axios.get('http://192.168.0.5:8888/upload_already', {
                params: {
                    HASH
                }
            })
            if (+res.data.code === 0) {
                console.log(res);
                uploadInfo.already = res.data.fileList
            }
        } catch (error) {
            console.log(error);

        }



        // 如果已经上传的切片数量大与计算出来的总能的切片数量，说明已经完成上传了
        if (uploadInfo.current < uploadInfo.count) {
            let temp = {
                file: _file.slice(uploadInfo.current * uploadInfo.max, (uploadInfo.current + 1) * uploadInfo.max),
                fileName: `${HASH}_${uploadInfo.current + 1}.${suffix}`
            }
            uploadInfo.finished.push(temp)
            uploadInfo.current += 1
        }

        // 循环切片数组 然后去上传切每一个切片
        uploadInfo.finished.forEach(item => {

            // 判断是不是有一些切片已经上传完毕了 如果上传成功了 不需要重新上传了
            if (uploadInfo.already.length > 0 && uploadInfo.already.includes(item.fileName)) {
                console.log('这个已经正在上传了....');
                onSubUpload()
                return
            }
            let fm = new FormData()
            fm.append('file', item.file)
            fm.append('filename', item.fileName)
            axios.post('http://192.168.0.5:8888/upload_chunk', fm).then(res => {
                if (+res.data.code === 0) {
                    onSubUpload()
                } else {
                    return Promise.reject(res.codeText)
                }
            }).catch(err => {
                console.log('当前切片上传失败，请您稍后在试~')
            })
        })

    }
    // 进行上传
    async function onSubUpload() {

        index++
        // 如果有切换上传完成了就要调用这个方法
        // progress.style.width = `${index / uploadInfo.count * 100}%`
        if (index < uploadInfo.count) return
        try {
            // progress.style.width = '100%'
            let res = await axios.post('http://192.168.0.5:8888/upload_merge', qs.stringify({ HASH, count: uploadInfo.count }), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            if (+res.data.code === 0) {
                index = 0;
                return
            } else {
                throw data.codeText
            }
        } catch (error) {
            this.$toast.fail('切片合并失败，请稍后重试')
        }

    }



    // 得到之前文件名的后缀
    function getOriginFileSuffix(fileName) {
        return /\.([a-zA-Z0-9]+)$/.exec(fileName)[1] // 捕获到后缀名
    }
}

export default startVideoCapture
```

## 获取网速
```js

 // 获取网速 仅限 Android
function getCurrentNetworkSpeed() {
    window.setInterval(() => getCurrentNetworkSpeed(), 1000);
    const TrafficStats = plus.android.importClass("android.net.TrafficStats");
    const total_data = TrafficStats.getTotalRxBytes(); //总共接收到的流量  
    const traffic_data = TrafficStats.getTotalRxBytes() - total_data; //一定时间内接收到的流量  
    // const total_data = TrafficStats.getTotalRxBytes();

    function bytesToSize(bytes) {
        if (bytes === 0) return '0 B/s';
        var k = 1000, // or 1024  
            sizes = ['B/s', 'KB/s', 'MB/s', 'GB/s', 'TB/s', 'PB/s', 'EB/s', 'ZB/s', 'YB/s'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }
    const cur_net_speed = bytesToSize(traffic_data)
}
```