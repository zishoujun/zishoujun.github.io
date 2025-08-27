function getL() {
    const sentences = [
        "入眼尽是你，连呼吸都带着你的影子。",
        "四季更迭，我的世界始终围绕着你旋转。",
        "心中所有的风景，都不及你一颦一笑。",
        "万物有声，却不及你低语动人。",
        "每一次回眸，都像是整个宇宙为你停顿。",
        "日落再美，也比不上你眼里的光。",
        "我的世界很大，但装得下的，唯有你。",
        "春风十里，不及你一人入心。",
        "所有的路，都通向你所在的地方。"
    ];

    // 随机获取一条
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];

    return randomSentence
}

console.log( getL() );
