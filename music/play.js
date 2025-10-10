// ...existing code...
function loadmusic(url, play = false) {
  try {
    const src = new URL(url, location.href).href;
    const music = document.createElement("audio");
    music.src = src;
    music.preload = "auto";
    music.loop = true;
    music.muted = true; // 静音以提高自动播放成功率
    music.playsInline = true;
    music.addEventListener("error", (e) => console.error("audio error", e));
    document.body.appendChild(music);

    if (play) {
      const p = music.play();
      if (p && typeof p.catch === "function") {
        // 自动播放被阻止时静默处理，保持静音，等待用户手势
        p.catch(() => {});
      } else {
        // 极少见的同步成功情形，尝试解除静音
        try { music.muted = false; } catch (e) {}
      }
    }

    // 在用户手势下调用以可靠解除静音并播放
    music.unmute = async function () {
      music.muted = false;
      try { await music.play(); } catch (e) { /* 仍可能被阻止 */ }
    };

    return music;
  } catch (error) {
    console.error("loadmusic error", error);
    return null;
  }
}
// ...existing code...