const searchURL = "https://a.buguyy.top/newapi/search.php?keyword="
const musicURL = "https://a.buguyy.top/newapi/geturl2.php"
async function apiSearchList(value) {
  const list =  await fetch(searchURL + encodeURIComponent(value)).then(res => res.json()).then(res => res.data.list)
  return list
}

async function apiMusicData(id) {
    await fetch(`https://a.buguyy.top/newapi/geturl2.php?id=${id}`, {
        method: "GET",
        headers: {
            "accept": "application/json, text/plain, */*",
            "accept-encoding": "gzip, deflate, br, zstd",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-US;q=0.7,sq;q=0.6,ar;q=0.5,ak;q=0.4,an;q=0.3,am;q=0.2,as;q=0.1,az;q=0.1,pt-BR;q=0.1,pt;q=0.1",
            "cache-control": "no-cache",
            "origin": "https://www.buguyy.top",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "referer": "https://www.buguyy.top/",
            "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

function downloadFile(content, filename, isUrl = false) {
    const link = document.createElement('a');
    if (isUrl) {
        // 如果是 URL
        link.href = content;
    } else {
        // 如果是文本内容，创建 Blob
        const blob = new Blob([content], { type: 'application/octet-stream' });
        link.href = URL.createObjectURL(blob);
    }

    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (!isUrl) {
        URL.revokeObjectURL(link.href); // 释放对象 URL
    }
}

console.log(searchURL + encodeURIComponent('玫瑰窃贼'));
