let renderer = new PIXI.autoDetectRenderer(
    {
        width: 256,
        height: 256,
        antialias: false, // 抗锯齿 ，平滑字体和图片的边缘 目前只有Chrome支持此属性
        backgroundColor: 0xce71e3,
    }

);
// 会生成一个定好的长宽等属性的的canvas的显示屏 renderer.view.width||height 可以获取渲染器的宽高 对于渲染器的尺寸大小，
//自适应 
renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);

document.body.appendChild(renderer.view);

// 以上是对人的renderer 的一些基本的设置 也就是渲染器目前就是按照自己的设置已经创造出来

PIXI.loader
    .add([require('../img/dog.png'), require('../img/cat.png')])
    .load(setup);

function setup() {
    let stage = new PIXI.Container();
    // 图片处理的容器
    let imgCon = new PIXI.Container();
    imgCon.backgroundColor = '0x000000';
    imgCon.interactive = true;
    imgCon.cursor = 'move';
    let img = PIXI.Texture.fromImage(require('../img/dog.png'));
    let img1 = PIXI.Texture.fromImage(require('../img/cat.png'));
    let sprite = new PIXI.Sprite(img);
    let sprite1 = new PIXI.Sprite(img1);
    sprite.y = 20;
    sprite.x = 10;
    sprite1.x = sprite.width + sprite.x;
    sprite1.y = (sprite.height - sprite1.height) / 2 + sprite.y;
    imgCon.addChild(sprite);

    imgCon.addChild(sprite1)
    stage.addChild(imgCon);
  
    imgCon.on('mousedown', (e) => {
        imgCon.on('mousemove', () => {
            console.log(22);

        })
    })
    imgCon.on('mouseup', () => {
        imgCon.on('mousemove', () => {

        })
    })
    // 文字处理的容器
    renderer.render(stage);
}
// renderer 是异步加载的 如果不用load的话，会在图片还没有加载的时候就已经渲染一次了
