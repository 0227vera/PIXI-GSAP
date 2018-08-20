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


import TweenMax from "gsap";
import imagesLoaded from "imagesLoaded";
let $ = require('jquery');
let img1 = require('../img/10.jpg');
let img2 = require('../img/11.jpg');
let img3 = require('../img/12.jpg');
$('.img1').attr('src', img1);
$('.img2').attr('src', img2);
$('.img3').attr('src', img3);


(function () {

  window.CanvasSlideshow = function (options) {

    // 保存this指针
    var self = this;



    //  OPTIONS的各种默认值设置

    options = options || {};
    options.stageWidth = options.hasOwnProperty('stageWidth') ? options.stageWidth : 1920;
    options.stageHeight = options.hasOwnProperty('stageHeight') ? options.stageHeight : 1080;
    options.pixiSprites = options.hasOwnProperty('sprites') ? options.sprites : [];
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
    options.displaceScaleTo = (options.autoPlay === false) ? [0, 0] : [20, 20];
    options.textColor = options.hasOwnProperty('textColor') ? options.textColor : '#fff';
    options.displacementCenter = options.hasOwnProperty('displacementCenter') ? options.displacementCenter : false;
    options.dispatchPointerOver = options.hasOwnProperty('dispatchPointerOver') ? options.dispatchPointerOver : false;

    console.log('是否允许交互--------------->', options.interactive);
    //  创建一个渲染器 给定宽高 背景是透明的（默认值是0X000000） 创建的是一个canvas标签 
    var renderer = new PIXI.autoDetectRenderer(options.stageWidth, options.stageHeight, {
      transparent: true
    });
    // 将stage舞台作为跟容器root
    var stage = new PIXI.Container();
    // 这个是滑动容器
    var slidesContainer = new PIXI.Container();
    // 获取雪碧图（材质）init需要传参进入默认值是空
    var displacementSprite = new PIXI.Sprite.fromImage(options.displacementImage);

    // filtes添加一个过滤器  DisplacementFilter 使用纹理中的指定像素来替换displacementFilter这个对象
    var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);



    //  TEXTS 给定stage上面的字体样式

    var style = new PIXI.TextStyle({
      fill: options.textColor,
      wordWrap: true,
      wordWrapWidth: 400,
      letterSpacing: 20,
      fontSize: 14
    });



    //  SLIDES ARRAY INDEX
    // 当前的位置
    this.currentIndex = 0;



    //  INITIALISE PIXI
    // 初始化配置
    this.initPixi = function () {
      // 将canvas加入页面上
      document.body.appendChild(renderer.view);


      // 将滑动容器加入根容器，最好不要直接对根容器进行操作
      stage.addChild(slidesContainer);

      // 是否允许对stage进行交互
      stage.interactive = true;


      // Fit renderer to the screen
      if (options.fullScreen === true) {
        renderer.view.style.objectFit = 'cover';
        renderer.view.style.width = '100%';
        renderer.view.style.height = '100%';
        renderer.view.style.top = '50%';
        renderer.view.style.left = '50%';
        // 样式兼容
        renderer.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1.2)';
        renderer.view.style.transform = 'translate( -50%, -50% ) scale(1.2)';
      } else {
        renderer.view.style.maxWidth = '100%';
        renderer.view.style.top = '50%';
        renderer.view.style.left = '50%';
        // 样式兼容
        renderer.view.style.webkitTransform = 'translate( -50%, -50% )';
        renderer.view.style.transform = 'translate( -50%, -50% )';
      }


      displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;


      // 将纹理贴到stage上面
      stage.filters = [displacementFilter];

      //  根据默认值不一样设置一些不同的默认动画
      if (options.autoPlay === false) {
        displacementFilter.scale.x = 0;
        displacementFilter.scale.y = 0;
      }

      if (options.wacky === true) {
        // 设置中心点为自己的中心 将精灵放在舞台的正中间
        displacementSprite.anchor.set(0.5);
        displacementSprite.x = renderer.width / 2;
        displacementSprite.y = renderer.height / 2;
      }

      displacementSprite.scale.x = 2;
      displacementSprite.scale.y = 2;

      // PIXI tries to fit the filter bounding box to the renderer so we optionally bypass
      displacementFilter.autoFit = options.displaceAutoFit;

      // 将获取的精灵加入stage可以理解displacementSprite是上层的精灵
      stage.addChild(displacementSprite);

    };


    //  LOAD SLIDES TO CANVAS
    //  将需要滑动的若干张图片加入滑动容器         
    this.loadPixiSprites = function (sprites) {

      var rSprites = options.sprites;
      var rTexts = options.texts;

      for (var i = 0; i < rSprites.length; i++) {

        var texture = new PIXI.Texture.fromImage(sprites[i]);
        var image = new PIXI.Sprite(texture);

        if (rTexts) {
          console.log('---------->', rTexts)
          var richText = new PIXI.Text(rTexts[i], style);
          image.addChild(richText);
          richText.anchor.set(0.5);
          richText.x = image.width / 2;
          richText.y = image.height / 2;
        }


        if (options.centerSprites === true) {
          image.anchor.set(0.5);
          image.x = renderer.width / 2;
          image.y = renderer.height / 2;
        }
        //image.transform.scale.x = 1.3;
        //image.transform.scale.y = 1.3;


        if (i !== 0) {
          TweenMax.set(image, {
            alpha: 0
          });
        }

        slidesContainer.addChild(image);

      }

    };



    /// ---------------------------
    //  DEFAULT RENDER/ANIMATION
    //  设置默认的动画是否播放       
    if (options.autoPlay === true) {
      var ticker = new PIXI.ticker.Ticker();
      // 使用初始化播放
      ticker.autoStart = options.autoPlay;

      ticker.add(delta => {

        displacementSprite.x += options.autoPlaySpeed[0] * delta;
        displacementSprite.y += options.autoPlaySpeed[1];

        displacementSprite.x += 2.14 * delta;
        displacementSprite.y += 22.24 * delta;
        // displacementSprite.rotation.x += 20.3;

        renderer.render(stage);

      });

    } else {

      var render = new PIXI.ticker.Ticker();

      render.autoStart = true;

      render.add(delta => {
        renderer.render(stage);
      });

    }


    /// ---------------------------
    //  TRANSITION BETWEEN SLIDES
    //  做自动变化的 

    var transitionAnimation = new PIXI.ticker.Ticker();
    transitionAnimation.autoStart = false;
    transitionAnimation.add(function (delta) {
      displacementSprite.x += 2.14 * delta;
      displacementSprite.y += 22.24 * delta;
      console.log('----------->', 20.3 * delta);
      // displacementSprite.rotation.x += 20.3 * delta;
    });


    var isPlaying = false;
    var slideImages = slidesContainer.children;
    self.currentIndex = 0;
    this.moveSlider = function (newIndex = self.currentIndex) {

      isPlaying = true;
      transitionAnimation.start();

      var baseTimeline = new TimelineMax({
        onComplete: function () {
          self.currentIndex = newIndex;
          isPlaying = false;
          transitionAnimation.stop();
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
          y: "+=" + 1280 + "",
          ease: Power3.easeOut
        })
        .to(slideImages[self.currentIndex], 0.5, {
          alpha: 0,
          ease: Power3.easeOut
        }, 0.4)
        .to(slideImages[newIndex], 0.5, {
          alpha: 1,
          ease: Power3.easeInOut
        }, 0.7)
        .to(displacementFilter.scale, 1, {
          y: 20,
          ease: Power3.easeOut
        }, 1);

    };



    /// ---------------------------
    //  CLICK HANDLERS
    //  类似于轮播图的切换的交互      
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



    /// ---------------------------
    //  INIT FUNCTIONS
    /// ---------------------------     
    this.init = function () {


      self.initPixi();
      self.loadPixiSprites(options.pixiSprites);

      /*
      if ( options.fullScreen === true ) {
        window.addEventListener("resize", function( event ){ 
          scaleToWindow( renderer.view );
        });
        scaleToWindow( renderer.view );  
      }
      */


    };


    /// ---------------------------
    //  INTERACTIONS
    /// ---------------------------
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
        // 鼠标进入container 手指滑动
        slidesContainer.pointerover = function (mouseData) {
          mouseX = mouseData.data.global.x;
          mouseY = mouseData.data.global.y;
          TweenMax.to(displacementFilter.scale, 1, {
            x: "+=" + Math.sin(mouseX) * 100 + "",
            y: "+=" + Math.cos(mouseY) * 100 + ""
          });
          rotateSpite();
        };
        // 鼠标离开container 手指滑动结束并离开
        slidesContainer.pointerout = function (mouseData) {
          console.log('---------->', '离开的事件');
          if (options.dispatchPointerOver === true) {
            TweenMax.to(displacementFilter.scale, 1, {
              x: 0,
              y: 0,
              onComplete: function () {
                TweenMax.to(displacementFilter.scale, 1, {
                  x: 20,
                  y: 20,
                  onComplete: () => {
                    transitionAnimation.start();
                  }
                });
              }
            });
          } else {
            TweenMax.to(displacementFilter.scale, 1, {
              x: 0,
              y: 0,
              onComplete: () => {
                transitionAnimation.start();
              }
            });
            // cancelAnimationFrame(rafID);

          }

        };

      }

      // CLICK
      if (options.interactionEvent === 'click' || options.interactionEvent === 'both') {
        // console.log('---------->', '抬起的事件');
        slidesContainer.pointerup = function (mouseData) {
          if (options.dispatchPointerOver === true) {
            TweenMax.to(displacementFilter.scale, 1, {
              x: 0,
              y: 0,
              onComplete: function () {
                TweenMax.to(displacementFilter.scale, 1, {
                  x: 20,
                  y: 20,
                  onComplete: () => {
                    transitionAnimation.start();
                  }
                });
              }
            });
          } else {
            TweenMax.to(displacementFilter.scale, 1, {
              x: 0,
              y: 0,
              onComplete: () => {
                transitionAnimation.start();
              }
            });
            // cancelAnimationFrame(rafID);
            // self.moveSlider();

          }

        };
        // console.log('---------->', '按下的事件');
        slidesContainer.pointerdown = function (mouseData) {
          mouseX = mouseData.data.global.x;
          mouseY = mouseData.data.global.y;
          TweenMax.to(displacementFilter.scale, 1, {
            x: "+=" + Math.sin(mouseX) * 1200 + "",
            y: "+=" + Math.cos(mouseY) * 200 + ""
          });
        };


      }

    }



    /// ---------------------------
    //  CENTER DISPLACEMENT
    //  
    if (options.displacementCenter === true) {
      displacementSprite.anchor.set(0.5);
      displacementSprite.x = renderer.view.width / 2;
      displacementSprite.y = renderer.view.height / 2;
    }


    /// ---------------------------
    //  START 
    /// ---------------------------           
    this.init();


    /// ---------------------------
    //  HELPER FUNCTIONS
    /// ---------------------------
    function scaleToWindow(canvas, backgroundColor) {
      var scaleX, scaleY, scale, center;

      //1. Scale the canvas to the correct size
      //Figure out the scale amount on each axis
      scaleX = window.innerWidth / canvas.offsetWidth;
      scaleY = window.innerHeight / canvas.offsetHeight;

      //Scale the canvas based on whichever value is less: `scaleX` or `scaleY`
      scale = Math.min(scaleX, scaleY);
      canvas.style.transformOrigin = "0 0";
      canvas.style.transform = "scale(" + scale + ")";

      //2. Center the canvas.
      //Decide whether to center the canvas vertically or horizontally.
      //Wide canvases should be centered vertically, and 
      //square or tall canvases should be centered horizontally
      if (canvas.offsetWidth > canvas.offsetHeight) {
        if (canvas.offsetWidth * scale < window.innerWidth) {
          center = "horizontally";
        } else {
          center = "vertically";
        }
      } else {
        if (canvas.offsetHeight * scale < window.innerHeight) {
          center = "vertically";
        } else {
          center = "horizontally";
        }
      }

      //Center horizontally (for square or tall canvases)
      var margin;
      if (center === "horizontally") {
        margin = (window.innerWidth - canvas.offsetWidth * scale) / 2;
        canvas.style.marginTop = 0 + "px";
        canvas.style.marginBottom = 0 + "px";
        canvas.style.marginLeft = margin + "px";
        canvas.style.marginRight = margin + "px";
      }

      //Center vertically (for wide canvases) 
      if (center === "vertically") {
        margin = (window.innerHeight - canvas.offsetHeight * scale) / 2;
        canvas.style.marginTop = margin + "px";
        canvas.style.marginBottom = margin + "px";
        canvas.style.marginLeft = 0 + "px";
        canvas.style.marginRight = 0 + "px";
      }

      //3. Remove any padding from the canvas  and body and set the canvas
      //display style to "block"
      canvas.style.paddingLeft = 0 + "px";
      canvas.style.paddingRight = 0 + "px";
      canvas.style.paddingTop = 0 + "px";
      canvas.style.paddingBottom = 0 + "px";
      canvas.style.display = "block";

      //4. Set the color of the HTML body background
      document.body.style.backgroundColor = backgroundColor;

      //Fix some quirkiness in scaling for Safari
      var ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf("safari") != -1) {
        if (ua.indexOf("chrome") > -1) {
          // Chrome
        } else {
          // Safari
          //canvas.style.maxHeight = "100%";
          //canvas.style.minHeight = "100%";
        }
      }

      //5. Return the `scale` value. This is important, because you'll nee this value 
      //for correct hit testing between the pointer and sprites
      return scale;
    } // http://bit.ly/2y1Yk2k      


  };

})();

let clouds = require('../img/dmaps/2048x2048/ripple.jpg');
imagesLoaded(document.body, () => document.body.classList.remove('loading'));

var spriteImagesSrc = [img1, img2, img3];
// for (var i = 0; i < spriteImages.length; i++) {
//     var img = spriteImages[i];
//     console.log(img);
//     spriteImagesSrc.push(img.attr('src'));
// }


var initCanvasSlideshow = new CanvasSlideshow({
  sprites: spriteImagesSrc,
  displacementImage: clouds,
  autoPlay: true,
  autoPlaySpeed: [10, 3],
  displaceScale: [200, 70],
  texts: ['这是第一个精灵', '这是第二个精灵', '这是第三个精灵'],
  autoPlay: true,
  interactive: true,
  interactionEvent: 'both',
  dispatchPointerOver: 'true',
});