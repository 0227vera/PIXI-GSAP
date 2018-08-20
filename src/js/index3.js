// 纹理，材质，图像 // 化整为零在拼接 主要来讲就相当于自己切图 但这个的技术含量会高很多
let roc = require('../img/roc.png');

import TweenMax from 'gsap';

// 方便引入图片
let TextureCache = PIXI.utils.TextureCache,
    // 加载器
    loader = PIXI.loader,
    // 资源
    resources = PIXI.loader.resources,
    // 精灵
    Sprite = PIXI.Sprite;





let root = app.stage;
loader
    .add([roc])
    .on('progress', loadProgressHandler)
    .load(setup);


function setup() {
    let texture = TextureCache[roc];
    let rectangle = new PIXI.Rectangle(32 * 3, 32 * 2, 32, 32);
    // Rectangle(x, y, width, height);
    texture.frame = rectangle; // 可以理解texture是一帧从texture上面选取的一帧
    texture.x = 600;
    texture.y = 400;
    // texture.scale.x = 2;
    // texture.scale.y = 2 
    let rocSprite = new Sprite(texture);
    let Con = new PIXI.Container(rocSprite);
    // Con.addChild(rocSprite);
    root.addChild(rocSprite);
    // root.addChild(dogSprite);
}


function loadProgressHandler(loader, resource) {
    console.log('loading');

    console.log("loading: " + resource.url);
    console.log("progress: " + loader.progress + "%");
    if (loader.progress == 50) {
        console.log(root.Con);
    }
}




//  可以拿到任何已经存在canvas上面的纹理
// let base = new PIXI.BaseTexture(anyImageObject);