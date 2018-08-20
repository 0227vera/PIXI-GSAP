// 对与原点和坐标的分析
let img = require('../img/dog.png');

let root = app.stage;
let container = new PIXI.Container();
app.stage.addChild(container);
let texture = PIXI.Texture.fromImage(img);
for (let i = 0; i < 25; i++) {
    let con = new PIXI.Container();
    let bunny = new PIXI.Sprite(texture);
    bunny.width = bunny.height = 40;
    bunny.anchor.set(0.5); // 设置原点（x,y）一个数值的时候x = y
    bunny.x = (i % 5) * 80;
    bunny.y = Math.floor(i / 5) * 80;
    bunny.rotation = Math.PI * 2 * Math.random();
    container.addChild(bunny);
}

//设置container的位置以其父级的原点为参照（container的原点默认是左上角）
container.x = (app.screen.width) / 2;
container.y = (app.screen.height) / 2;

// 设置container的中心点（原点）默认中心点是在左上角（0，0）的位置
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;

app.ticker.add(function (delta) {
    // console.log(delta);
    // 改变container的scela rotation position
    // rotate the container!
    // use delta to create frame-independent transform
    container.rotation -= 0.01 * delta;
    // container.scale.x = Math.random();
});
let line = {
    numX: 100,
    numY: 50,
    colorX: 0x000000,
    colorY: 0x000000,
    weightX: 1,
    weightY: 1,
};
createLine(line);



function createLine(obj = {
    numX: 50,
    numY: 50,
    colorX: 0x000000,
    colorY: 0x000000,
    weightX: 1,
    weightY: 1,
}) {
    for (let i = 0; i < obj.numX; i++) {
        let line = new PIXI.Graphics();
        line.lineStyle(obj.weightX, obj.colorX, obj.weightY);
        line.moveTo(i * document.documentElement.clientWidth / obj.numX, 0);
        line.lineTo(i * document.documentElement.clientWidth / obj.numX, document.documentElement.clientHeight);
        line.x = 0;
        line.y = 0;
        root.addChild(line);
    }
    for (let i = 0; i < obj.numY; i++) {
        let line = new PIXI.Graphics();
        line.lineStyle(obj.weightX, obj.colorX, obj.weightY);
        line.moveTo(0, i * document.documentElement.clientHeight / obj.numY);
        line.lineTo(document.documentElement.clientWidth, i * document.documentElement.clientHeight / obj.numY);
        line.x = 0;
        line.y = 0;
        root.addChild(line);
    }
}