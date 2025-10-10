const json = {
  en: {
    title: "cheng·zi",
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
    title: "橙子呐~",
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

const cards = document.querySelectorAll(".card");
const translater = (json) => {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    const title = card.querySelector(".card-title");
    title.innerText = String(json[index].title);
    const content = card.querySelector(".content");
    content.innerText = String(json[index].content);
  }
};
const title = document.querySelector(".title");
const desc = document.querySelector(".desc");
const render = (json) => {
  document.title = json.title;
  title.innerText = json.title;
  desc.innerText = json.desc;
  translater(json.card);
};

let bool = true;
const images = ["./bg.jpg", "./bg2.jpg", "./bg3.png"];
document.querySelector(".avatar").addEventListener("click", async () => {
  try {
    if (audioElement.paused) {
      audioElement.play();
    }
  } catch (error) {
    console.log("error", error);
  } finally {
    bool = !bool;
    render(bool ? json.en : json.zh);
  }
});
render(bool ? json.en : json.zh);
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

