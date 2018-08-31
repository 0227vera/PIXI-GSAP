{
    setTimeout(() => document.body.classList.add('render'), 60);
    const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
    const total = navdemos.length;
    const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
    const navigate = (linkEl) => {
        document.body.classList.remove('render');
        document.body.addEventListener('transitionend', () => window.location = linkEl.href);
    };
    navdemos.forEach(link => link.addEventListener('click', (ev) => {
        ev.preventDefault();
        navigate(ev.target);
    }));
}


require('../css/index.css');
import TweenMax from "gsap";
import imagesLoaded from "imagesLoaded";
let $ = require('jquery');
let img1 = require('../img/1.jpg');
let img2 = require('../img/2.jpg');
let img3 = require('../img/3.jpg');
$('.img1').attr('src', img1);
$('.img2').attr('src', img2);
$('.img3').attr('src', img3);


let clouds = require('../img/dmaps/2048x2048/clouds.jpg');
(function () {

    window.CanvasSlideshow = function (options) {
        var self = this;
        options = options || {};
        options.stageWidth = options.hasOwnProperty('stageWidth') ? options.stageWidth : 1920;
        options.stageHeight = options.hasOwnProperty('stageHeight') ? options.stageHeight : 1080;
        options.pixiSprites = options.hasOwnProperty('sprites') ? options.sprites : [];
        options.centerSprites = options.hasOwnProperty('centerSprites') ? options.centerSprites : false;
        options.texts = options.hasOwnProperty('texts') ? options.texts : [];
        options.autoPlay = options.hasOwnProperty('autoPlay') ? options.autoPlay : true;
        options.autoPlaySpeed = options.hasOwnProperty('autoPlaySpeed') ? options.autoPlaySpeed : [10, 3];
        options.fullScreen = options.hasOwnProperty('fullScreen') ? options.fullScreen : true;
        options.displaceScale = options.hasOwnProperty('displaceScale') ? options.displaceScale : [200, 70];
        options.displacementImage = options.hasOwnProperty('displacementImage') ? options.displacementImage : '';
        options.navElement = options.hasOwnProperty('navElement') ? options.navElement : document.querySelectorAll('.scene-nav');
        options.displaceAutoFit = options.hasOwnProperty('displaceAutoFit') ? options.displaceAutoFit : false;
        options.wacky = options.hasOwnProperty('wacky') ? options.wacky : false;
        options.interactive = options.hasOwnProperty('interactive') ? options.interactive : false;
        options.interactionEvent = options.hasOwnProperty('interactionEvent') ? options.interactionEvent : '';
        options.displaceScaleTo = (options.autoPlay === false) ? [0, 0] : [20, 20];
        options.textColor = options.hasOwnProperty('textColor') ? options.textColor : '#fff';
        options.displacementCenter = options.hasOwnProperty('displacementCenter') ? options.displacementCenter : false;
        options.dispatchPointerOver = options.hasOwnProperty('dispatchPointerOver') ? options.dispatchPointerOver : false;


        var renderer = new PIXI.autoDetectRenderer(options.stageWidth, options.stageHeight, {
            transparent: true
        });
        var stage = new PIXI.Container();
        var slidesContainer = new PIXI.Container();
        var displacementSprite = new PIXI.Sprite.fromImage(options.displacementImage);

        var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);



        var style = new PIXI.TextStyle({
            fill: options.textColor,
            wordWrap: true,
            wordWrapWidth: 400,
            letterSpacing: 20,
            fontSize: 30
        });



        this.currentIndex = 0;

        this.initPixi = function () {

            document.body.appendChild(renderer.view);


            stage.addChild(slidesContainer);


            stage.interactive = true;

            console.log(renderer.view.style);

            if (options.fullScreen === true) {
                renderer.view.style.objectFit = 'cover';
                renderer.view.style.width = '100%';
                renderer.view.style.height = '100%';
                renderer.view.style.top = '50%';
                renderer.view.style.left = '50%';
                renderer.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)';
                renderer.view.style.transform = 'translate( -50%, -50% ) scale(1.2)';
            } else {
                renderer.view.style.maxWidth = '100%';
                renderer.view.style.top = '50%';
                renderer.view.style.left = '50%';
                renderer.view.style.webkitTransform = 'translate( -50%, -50% )';
                renderer.view.style.transform = 'translate( -50%, -50% )';
            }


            displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

            stage.filters = [displacementFilter];

            if (options.autoPlay === false) {
                displacementFilter.scale.x = 0;
                displacementFilter.scale.y = 0;
            }

            if (options.wacky === true) {

                displacementSprite.anchor.set(0.5);
                displacementSprite.x = renderer.width / 2;
                displacementSprite.y = renderer.height / 2;
            }

            displacementSprite.scale.x = 2;
            displacementSprite.scale.y = 2;

            displacementFilter.autoFit = options.displaceAutoFit;

            stage.addChild(displacementSprite);

        };

        this.loadPixiSprites = function (sprites) {


            var rSprites = options.sprites;
            var rTexts = options.texts;

            for (var i = 0; i < rSprites.length; i++) {

                var texture = new PIXI.Texture.fromImage(sprites[i]);
                var image = new PIXI.Sprite(texture);

                if (rTexts) {
                    var richText = new PIXI.Text(rTexts[i], style);
                    image.addChild(richText);

                    richText.anchor.set(0.5);
                    richText.x = image.width / 2;
                    richText.y = 400;
                }

                if (options.centerSprites === true) {
                    image.anchor.set(0.5);
                    image.x = renderer.width / 2;
                    image.y = renderer.height / 2;
                }



                if (i !== 0) {
                    TweenMax.set(image, {
                        alpha: 0
                    });
                }

                slidesContainer.addChild(image);

            }

        };




        if (options.autoPlay === true) {

            var ticker = new PIXI.ticker.Ticker();

            ticker.autoStart = options.autoPlay;

            ticker.add(function (delta) {
                displacementSprite.x += options.autoPlaySpeed[0] * delta;
                displacementSprite.y += options.autoPlaySpeed[1];

                renderer.render(stage);

            });

        } else {

            var render = new PIXI.ticker.Ticker();

            render.autoStart = true;

            render.add(function (delta) {
                renderer.render(stage);
            });

        }



        var isPlaying = false;
        var slideImages = slidesContainer.children;
        this.moveSlider = function (newIndex) {

            isPlaying = true;


            var baseTimeline = new TimelineMax({
                onComplete: function () {
                    self.currentIndex = newIndex;
                    isPlaying = false;
                    if (options.wacky === true) {
                        displacementSprite.scale.set(1);
                    }
                },
                onUpdate: function () {

                    if (options.wacky === true) {
                        displacementSprite.rotation += baseTimeline.progress() * 0.02;
                        displacementSprite.scale.set(baseTimeline.progress() * 3);
                    }

                }
            });

            baseTimeline.clear();

            if (baseTimeline.isActive()) {
                return;
            }

            baseTimeline
                .to(displacementFilter.scale, 1, {
                    x: options.displaceScale[0],
                    y: options.displaceScale[1]
                })
                .to(slideImages[self.currentIndex], 0.5, {
                    alpha: 0
                })
                .to(slideImages[newIndex], 0.5, {
                    alpha: 1
                })
                .to(displacementFilter.scale, 1, {
                    x: options.displaceScaleTo[0],
                    y: options.displaceScaleTo[1]
                });

        };




        var nav = options.navElement;

        for (var i = 0; i < nav.length; i++) {

            var navItem = nav[i];

            navItem.onclick = function (event) {

                // Make sure the previous transition has ended
                if (isPlaying) {
                    return false;
                }

                if (this.getAttribute('data-nav') === 'next') {

                    if (self.currentIndex >= 0 && self.currentIndex < slideImages.length - 1) {
                        self.moveSlider(self.currentIndex + 1);
                    } else {
                        self.moveSlider(0);
                    }

                } else {

                    if (self.currentIndex > 0 && self.currentIndex < slideImages.length) {
                        self.moveSlider(self.currentIndex - 1);
                    } else {
                        self.moveSlider(spriteImages.length - 1);
                    }

                }

                return false;

            }

        }




        this.init = function () {


            self.initPixi();
            self.loadPixiSprites(options.pixiSprites);
        };





        function rotateSpite() {
            displacementSprite.rotation += 0.001;
            rafID = requestAnimationFrame(rotateSpite);
        }

        if (options.interactive === true) {

            var rafID, mouseX, mouseY;

            // Enable interactions on our slider
            slidesContainer.interactive = true;
            slidesContainer.buttonMode = true;

            // HOVER
            if (options.interactionEvent === 'hover' || options.interactionEvent === 'both') {

                slidesContainer.pointerover = function (mouseData) {
                    mouseX = mouseData.data.global.x;
                    mouseY = mouseData.data.global.y;
                    TweenMax.to(displacementFilter.scale, 1, {
                        x: "+=" + Math.sin(mouseX) * 100 + "",
                        y: "+=" + Math.cos(mouseY) * 100 + ""
                    });
                    rotateSpite();
                };

                slidesContainer.pointerout = function (mouseData) {
                    TweenMax.to(displacementFilter.scale, 1, {
                        x: 0,
                        y: 0
                    });
                    cancelAnimationFrame(rafID);
                };

            }

            // CLICK
            if (options.interactionEvent === 'click' || options.interactionEvent === 'both') {

                slidesContainer.pointerup = function (mouseData) {
                    if (options.dispatchPointerOver === true) {
                        TweenMax.to(displacementFilter.scale, 1, {
                            x: 0,
                            y: 0,
                            onComplete: function () {
                                TweenMax.to(displacementFilter.scale, 1, {
                                    x: 20,
                                    y: 20
                                });
                            }
                        });
                    } else {
                        TweenMax.to(displacementFilter.scale, 1, {
                            x: 0,
                            y: 0
                        });
                        cancelAnimationFrame(rafID);
                    }

                };

                slidesContainer.pointerdown = function (mouseData) {
                    mouseX = mouseData.data.global.x;
                    mouseY = mouseData.data.global.y;
                    TweenMax.to(displacementFilter.scale, 1, {
                        x: "+=" + Math.sin(mouseX) * 1200 + "",
                        y: "+=" + Math.cos(mouseY) * 200 + ""
                    });
                };

                slidesContainer.pointerout = function (mouseData) {
                    if (options.dispatchPointerOver === true) {
                        TweenMax.to(displacementFilter.scale, 1, {
                            x: 0,
                            y: 0,
                            onComplete: function () {
                                TweenMax.to(displacementFilter.scale, 1, {
                                    x: 20,
                                    y: 20
                                });
                            }
                        });
                    } else {
                        TweenMax.to(displacementFilter.scale, 1, {
                            x: 0,
                            y: 0
                        });
                        cancelAnimationFrame(rafID);
                    }

                };

            }

        }

        if (options.displacementCenter === true) {
            displacementSprite.anchor.set(0.5);
            displacementSprite.x = renderer.view.width / 2;
            displacementSprite.y = renderer.view.height / 2;
        }

        this.init();


    };

})();

imagesLoaded(document.body, () => document.body.classList.remove('loading'));



var spriteImagesSrc = [img1, img2, img3];

var initCanvasSlideshow = new CanvasSlideshow({
    sprites: spriteImagesSrc,
    displacementImage: clouds,
    autoPlay: true,
    autoPlaySpeed: [10, 3],
    displaceScale: [200, 70],
    displaceAutoFit: true,



    texts: ['水母', '海星', '毛腿'],
    interactive: true,
    interactionEvent: 'hover',
    dispatchPointerOver: true,
    centerSprites: true,
});



let animateArr = $('.animate');
let animateBackArr = $('.animate1');
let jian = 6;
let count = 0;
let type = 'go';

function animatePlay() {
    if (animateArr && animateArr.length != 0) {
        TweenMax.to(animateArr, .15, {
            left: 75 * count + 10,
            onComplete: () => {
                count++;
                animateArr.splice(0, 1);
                animatePlay();
                if (animateArr.length == 1) {
                    type = 'back';
                    TweenMax.to($('#clickme'), 1, {
                        opacity: 1,
                    });
                }
            }
        });
        TweenMax.to(animateArr[0], .5, {
            opacity: 1
        })
    } else {
        animateArr = $('.animate');
        count = 0;
    }
}
$('#clickme').click(() => {
    if (type == 'go') {
        TweenMax.to($('#clickme'), 0.5, {
            opacity: 0,
            onComplete: () => {
                $('#rota').html('&lt;&lt;');
                animatePlay();
            }
        });
    } else {
        TweenMax.to($('#clickme'), 0.5, {
            opacity: 0,
            onComplete: () => {
                $('#rota').html('&gt;&gt;');
                animateBack();
                $('#clickme').css({
                    left: 10
                });
            }
        });
    }
});

function animateBack() {
    TweenMax.to(animateBackArr, 1, {
        left: -10,
        opacity: 0,
        onComplete: () => {
            type = 'go';
            TweenMax.to($('#clickme'), 0.2, {
                opacity: 1,
            });
        }
    });
}