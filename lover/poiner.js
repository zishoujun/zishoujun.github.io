var hearts = [];
window.requestAnimationFrame = (function () {
    return window.requestAnimationFrame || function (callback) {
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
        const time = new Date().getTime()
        if ((time - date) < 50) {
            return
        }
        const x = event.clientX || (event.touches && event.touches[0].clientX);
        const y = event.clientY || (event.touches && event.touches[0].clientY);
        createHeart({ clientX: x, clientY: y });
        date = time
    }
    window.onclick = function (event) {
        createHeart(event);
    }
    window.onmousemove = move
    window.ontouchmove = move
}

function createHeart(event) {
    let x, y;
    if (event.touches && event.touches.length > 0) {
        x = event.touches[0].clientX;
        y = event.touches[0].clientY;
    } else {
        x = event.clientX;
        y = event.clientY;
    }
    var d = document.createElement("div");
    d.className = "heart";
    hearts.push({
        el: d,
        x: x - 5,
        y: y - 5,
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

function randomPositionHeart() {
    const x = Math.random() * window.innerWidth-100;
    const y = Math.random() * window.innerHeight-100;
    createHeart({ clientX: x, clientY: y });
}

setInterval(randomPositionHeart, 100);
