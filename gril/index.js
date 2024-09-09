document.title = "韩语研";
document.querySelector(".icon").href = "./images/韩语研.jpg";
document.querySelector(".avatar").src = "./images/韩语研.jpg";
document.querySelector(".title").innerHTML = document.title;
document.querySelector(
    ".desc"
).innerHTML = `A girl who loves to laugh is always lucky! `;

const card1 = document.querySelector(".card1").querySelector('.content');
const card2 = document.querySelector(".card2").querySelector('.content');
const card3 = document.querySelector(".card3").querySelector('.content');
let bool = true;
const translater = () => {
    console.log('card1', card1)
    const en_cont1 = ` Love alters not with his brief hours and weeks; But bears it out even to the edge of doom; If this be error and upon me proved; I never writ, nor no man ever loved. `;
    const zh_cont1 = ` 沧桑轮回，爱却长生不改; 爱恒久坚定，直到末日的尽头; 假如有人能证明我说的不实; 那就算我从未写诗，世人也从未爱过 `;
    card1.innerHTML = bool ? en_cont1 : zh_cont1;
    const en_cont2 = ` She walks in beauty, like the night; Of cloudless climes and starry skies; And all that's best of dark and bright; Meet in her aspect and her eyes. `;
    const zh_cont2 = ` 她走在美的光彩中，像夜晚; 皎洁无云而且繁星漫天; 黑夜与白天最美妙的色彩; 都在她的面容和目光里显现! `;
    card2.innerHTML = bool ? en_cont2 : zh_cont2;
    const en_cont3 = ` When age chills the blood, when our pleasures are past; For years fleet away with the wings of the dove; The dearest remembrance will still be the last; Our sweetest memorial the first kiss of love. `;
    const zh_cont3 = ` 当岁月让热血冷却，让欢乐远去; 年月就像白鸽的翅膀般飞走; 然而，最深切的记忆则会永存; 我们最甜蜜的记忆，那最初的一吻 `;
    card3.innerHTML = bool ? en_cont3 : zh_cont3;
    bool = !bool
};
document.querySelector(".avatar").addEventListener("click", translater);
