var renderer = new PIXI.autoDetectRenderer(document.documentElement.clientWidth, document.documentElement.clientHeight, {
    transparent: true
});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var displacementSprite = new PIXI.Sprite.fromImage(require('../img/dmaps/2048x2048/fibers.jpg'));


var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
displacementSprite.scale.x = 2;
displacementSprite.scale.y = 2;
stage.filters = [displacementFilter];
stage.addChild(displacementSprite);

var container = new PIXI.Container();

stage.interactive = true;
// debugger
let texture = PIXI.Texture.fromImage(require('../img/dog.png'));
var sprite = new PIXI.Sprite(texture);
container.addChild(sprite);
container.pivot.x = container.width / 2;
container.pivot.y = container.height / 2;
container.x = document.documentElement.clientWidth / 2;
container.y = document.documentElement.clientHeight / 2;
stage.addChild(container);
var ticker = new PIXI.ticker.Ticker();
ticker.autoStart = true;
ticker.add(function (delta) {
    displacementSprite.x += 5 * delta;
    displacementSprite.y += 3* delta;
    console.log(delta);
    renderer.render(stage);
});

