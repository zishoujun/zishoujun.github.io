const json = {
    en: {
        title: "rui·rui",
        desc: "A girl who loves to laugh is always lucky!",
        card: [
            {
                title: "Sonnet 116 by William Shakespeare",
                content: `Love alters not with his brief hours and weeks; But bears it out even to the edge of doom; If this be error and upon me proved; I never writ, nor no man ever loved. `,
            },
            {
                title: "She Walks in Beauty by Lord Byron",
                content: `She walks in beauty, like the night; Of cloudless climes and starry skies; And all that's best of dark and bright; Meet in her aspect and her eyes. `,
            },
            {
                title: "The first kiss of love by Lord Byron",
                content: `When age chills the blood, when our pleasures are past; For years fleet away with the wings of the dove; The dearest remembrance will still be the last; Our sweetest memorial the first kiss of love. `,
            },
        ],
    },
    zh: {
        title: "蕊蕊呐~",
        desc: "爱笑的女孩总是幸运的！",
        card: [
            {
                title: "十四行诗·莎士比亚",
                content: `沧桑轮回，爱却长生不改; 爱恒久坚定，直到末日的尽头; 假如有人能证明我说的不实; 那就算我从未写诗，世人也从未爱过. `,
            },

            {
                title: "她在美丽中漫步·拜伦勋爵",
                content: `她走在美的光彩中，像夜晚; 皎洁无云而且繁星漫天; 黑夜与白天最美妙的色彩; 都在她的面容和目光里显现! `,
            },
            {
                title: "初吻·拜伦勋爵",
                content: `当岁月让热血冷却，让欢乐远去; 年月就像白鸽的翅膀般飞走; 然而，最深切的记忆则会永存; 我们最甜蜜的记忆，那最初的一吻. `,
            },
        ],
    },
};




const cards = document.querySelectorAll(".card")
const translater = (json) => {
    for (let index = 0; index < cards.length; index++) {
        const card = cards[index];
        const title = card.querySelector('.card-title')
        title.innerText = String(json[index].title)
        const content = card.querySelector('.content')
        content.innerText = String(json[index].content)
    }
};
const title = document.querySelector(".title")
const desc = document.querySelector(".desc")
const render = (json) => {
    document.title = json.title
    title.innerText = json.title
    desc.innerText = json.desc
    translater(json.card)
}


function copyText(url) {
    const oldCopy = () => {
        let copyInput = document.createElement('input')
        document.body.appendChild(copyInput)
        copyInput.setAttribute('value', url)
        copyInput.select()
        document.execCommand('Copy')
        copyInput.remove()
    }
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(url)
    } else {
        oldCopy()
    }
}

let bool = true;
const images = ['./bg.jpg', './bg2.jpg', './bg3.png']
document.querySelector(".avatar").addEventListener("click", () => {

    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                const msg = ` Latitude: ${latitude} Longitude: ${longitude} `;
                copyText(msg)
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        bool = !bool;
        render(bool ? json.en : json.zh)
    } catch (error) {
        console.log('error',error)
    }
});
render(bool ? json.en : json.zh)
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




(function (window, document, undefined) {
    var hearts = [];
    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                setTimeout(callback, 1000 / 60);
            }
    })();
    init();
    function init() {
        css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        attachEvent();
        gameloop();
    }
    function gameloop() {
        for (var i = 0; i < hearts.length; i++) {
            if (hearts[i].alpha <= 0) {
                document.body.removeChild(hearts[i].el);
                hearts.splice(i, 1);
                continue;
            }
            hearts[i].y--;
            hearts[i].scale += 0.004;
            hearts[i].alpha -= 0.013;
            hearts[i].el.style.cssText = "left:" + hearts[i].x + "px;top:" + hearts[i].y + "px;opacity:" + hearts[i].alpha + ";transform:scale(" + hearts[i].scale + "," + hearts[i].scale + ") rotate(45deg);background:" + hearts[i].color;
        }
        requestAnimationFrame(gameloop);
    }
    function attachEvent() {
        let date = new Date().getTime()
        function move(event) {
            requestAnimationFrame(() => {
                const time = new Date().getTime()
                if ((time - date) >= 50) {
                    date = time
                    createHeart(event);
                }
            })
        }
        window.onclick = function (event) {
            createHeart(event);
        }
        window.onmousemove = move
        window.ontouchmove = move
    }
    function createHeart(event) {
        var d = document.createElement("div");
        d.className = "heart";
        hearts.push({
            el: d,
            x: event.clientX - 5,
            y: event.clientY - 5,
            scale: 1,
            alpha: 1,
            color: randomColor()
        });
        document.body.appendChild(d);
    }
    function css(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    function randomColor() {
        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";
    }
})(window, document);