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




// 纹理，材质，图像
let cat = require('../img/cat.png');
let dog = require('../img/dog.png');
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
    .add([{
        name: 'littleCat',
        url: cat,
        onComplete: () => {
            console.log('猫加载完了')
        }
    }, {
        name: 'littleDog',
        url: dog,
        onComplete: () => {
            console.log('狗加载完了')
        }
    }])
    .on('progress', loadProgressHandler)
    .load(setup);

// 在 loader之后还有reload  PIXI.loader.reset()

// cat 加载完成之后运行setup函数
function setup() {
    // 材质
    // let texture = TextureCache[cat];
    // 精灵图 你也可以叫她雪碧图
    // onComplete();
    let catSprite = new Sprite(TextureCache[cat]);
    let dogSprite = new Sprite(TextureCache[dog]);
    // dogSprite.visible = false;
    let con = new PIXI.Container();
    con.addChild(catSprite);
    con.addChild(dogSprite);
    con.x = (document.documentElement.clientWidth - con.width) / 2;
    con.y = (document.documentElement.clientHeight - con.height) / 2;
    dogSprite.y = catSprite.width;
    catSprite.x -= catSprite.width;

    let line = new PIXI.Graphics();



    let circle = new PIXI.Graphics();
    // circle.beginFill(0x9966FF);
    circle.lineStyle(1, 0xFF3300);
    circle.drawCircle(0, 0, 50);
    circle.endFill();
    circle.x = 50;
    circle.y = 50;
    app.stage.addChild(circle);

    // line.beginFill(0xFF3300);
    line.lineStyle(1, 0xFF3300);
    // line.drawShape();
    // line.moveTo(0, 0);
    line.moveTo(-1, 0);
    let obj = {
        x: -1,
        y: 0
    }
    TweenMax.to(obj, 1, {
        x: 1,
        onUpdate: () => {
            obj.y = Math.sqrt(1 - Math.pow(Math.abs(obj.x) - 1, 2));
            line.lineTo(obj.x, obj.y);
            line.endFill();
        },
        onComplete: () => {
            line.scale.set(20);
            line.position.set(1000, 700);
            app.stage.addChild(line);
            TweenMax.to(obj, 1, {
                x: -1,
                onUpdate: () => {
                    obj.y = Math.acos(1 - Math.abs(obj.x)) - Math.PI;
                    line.lineTo(obj.x, obj.y);
                },
                onComplete: () => {
                    console.log('完成');

                }
            });

        }
    });



    TweenMax.to(catSprite, 2, {
        x: dogSprite.x + dogSprite.width,
        onComplete: () => {
            TweenMax.to(catSprite, 2, {
                y: dogSprite.y + dogSprite.height,
                onComplete: () => {

                    TweenMax.to(catSprite, 2, {
                        x: dogSprite.x - catSprite.width,
                        onComplete: () => {
                            TweenMax.to(catSprite, 2, {
                                y: dogSprite.y - catSprite.height,
                                onComplete: () => {
                                    console.log('animation finish!!');
                                }
                            })
                        }
                    });
                }
            });
        }
    });
    // dogSprite.anchor.set(x, y) 设置锚点，实际上就是设置旋转中心，也就是自己的中心，这对于sprite的rotation和scale来讲是作用非常大的
    // dogSprite.pivot.set(32, 32) 设置中心点，单从效果来讲，anchor和pivot是有重复的
    root.addChild(con);




    // TweenMax.to(line, 2, {
    //     onUpdate: () => {
    //         lineX += 10;
    //         line.lineTo(lineX, 50);
    //         console.log(lineX);
    //     }
    // });


    // root.addChild(dogSprite);
    // let line = {
    //     numX: 100,
    //     numY: 50,
    //     colorX: 0x000000,
    //     colorY: 0x000000,
    //     weightX: 1,
    //     weightY: 1,
    // };
    // createLine(line);
}
// 正在加载的时候会运行的函数
function loadProgressHandler(loader, resource) {
    // console.log('loading');
    // // 方便在加载的时候添加一些方法
    // console.log("loading: " + resource.url);
    // console.log("progress: " + loader.progress + "%");
    // if (loader.progress == 50) {
    //     console.log(root.con);
    // }
}

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






var movieClip = null;

function onComplete() {
    var texture = PIXI.Texture.fromImage(dog);
    var cutnum = 8;
    //将图片拆分为8帧
    var width = parseInt(texture.width / cutnum);
    var height = parseInt(texture.height);
    var frameArray = [];
    for (var i = 0; i < cutnum; i++) {
        var rectangle = new PIXI.Rectangle(i * width, 0, width, height);
        var frame = new PIXI.Texture(texture, rectangle);
        frameArray.push(frame);
    }
    //播放动画
    movieClip = new PIXI.extras.AnimatedSprite(frameArray);
    movieClip.position.x = 100;
    movieClip.position.y = 100;
    movieClip.animationSpeed = parseFloat((20 / 120).toFixed(2));
    movieClip.play();
    app.stage.addChild(movieClip);
}




//  可以拿到任何已经存在canvas上面的纹理
// let base = new PIXI.BaseTexture(anyImageObject);