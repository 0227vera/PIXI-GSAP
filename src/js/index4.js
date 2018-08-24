let type = "WebGL";
// 创建pixi应用
let Application = PIXI.Application;
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas"
}
PIXI.utils.sayHello(type);
let app = new Application({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    backgroundColor: 0xEEEEEE,
    antialias: true,
    resolution: 1
});
window.app = app;
document.body.appendChild(app.view);














let cat = require('../img/cat.png');
let dog = require('../img/dog.png');
app.stage.interactive = true;
//建立显示精灵1
var bGrotate = PIXI.Sprite.fromImage(dog);
bGrotate.anchor.x = 0.5;
bGrotate.anchor.y = 0.5;
bGrotate.position.x = app.renderer.width / 2;
bGrotate.position.y = app.renderer.height / 2;
//建立显示精灵2
var bgFront = PIXI.Sprite.fromImage(cat);
bgFront.anchor.x = 0.5;
bgFront.anchor.y = 0.5;
bgFront.position.x = app.renderer.width / 2;
bgFront.position.y = app.renderer.height / 2;
//建立显示容器
var container = new PIXI.Container();
container.addChild(bGrotate);
container.addChild(bgFront);
app.stage.addChild(container);

//建立画笔
var thing = new PIXI.Graphics();
app.stage.addChild(thing);
thing.position.x = app.renderer.width / 2;
thing.position.y = app.renderer.height / 2;
thing.clear();
thing.beginFill(0x8bc5ff, 0.4);
thing.drawCircle(0, 0, 0);
thing.lineStyle(0);
//设置遮罩层属性后，将会隐藏，只有赋值该属性的对象区域能显示
// bgFront.mask = thing;

var r = 0;
app.ticker.add(function () {
    r += 10;
    thing.clear();
    thing.beginFill(0x8bc5ff, 0.4);
    thing.drawCircle(0, 0, r);
    thing.lineStyle(1);
});