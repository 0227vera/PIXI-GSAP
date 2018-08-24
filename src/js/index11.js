require('../css/index11.css');


import TweenMax from "gsap";
console.log(TweenMax)
function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    } else {
        return Array.from(arr);
    }
}
var POT_BOTTOM_Y = 585;
var POTS_TIMES = [{
        duration: 0.5 + Math.random() * 0.3,
        delay: 0
    },

    {
        duration: 0.5 + Math.random() * 0.3,
        delay: 0.5
    },

    {
        duration: 0.5 + Math.random() * 0.3,
        delay: 0.2
    }
];


var masterTimeline = new TimelineMax();

var potsTimeline = [].concat(_toConsumableArray(document.querySelectorAll('.pot'))).map(function (pot, i) {
    var timeline = new TimelineMax();

    timeline.from(
        pot,
        POTS_TIMES[i].duration, {
            delay: POTS_TIMES[i].delay,
            y: -POT_BOTTOM_Y
        });



    return timeline;
});
var shadowsTimeline = [].concat(_toConsumableArray(document.querySelectorAll('.pot-shadow'))).map(function (shadow, i) {
    var timeline = new TimelineMax();

    timeline.from(
        shadow,
        POTS_TIMES[i].duration, {
            ease: Power0.easeInOut,
            delay: POTS_TIMES[i].delay,
            scale: 0,
            transformOrigin: 'center center'
        });



    return timeline;
});
var leafsTimeline = [].concat(_toConsumableArray(document.querySelectorAll('.leaf'))).map(function (leaf) {
    var isBack = leaf.classList.contains('leaf-back');

    var timeline = new TimelineMax();

    timeline.from(
        leaf,
        0.5 + Math.random() * 0.8, {
            delay: isBack ? 0.5 : 0,
            ease: Back.easeOut.config(0.5 + Math.random()),
            scale: 0,
            yPercent: 10 * Math.random(),
            transformOrigin: 'center bottom'
        });



    return timeline;
});
var flowersTimeline = [].concat(_toConsumableArray(document.querySelectorAll('.flower'))).map(function (flower) {
    var isLeft = flower.classList.contains('flower-left');

    var timeline = new TimelineMax();

    timeline.from(
        flower,
        1 + Math.random() * 1, {
            ease: Circ.easeOut,
            scale: 0,
            transformOrigin: isLeft ? 'right bottom' : 'left bottom'
        });



    return timeline;
});

masterTimeline.
to('.replay-text', 0, {
    opacity: 0
}).
add(potsTimeline, 0).
add(shadowsTimeline, 0).
add(leafsTimeline).
add(flowersTimeline).
to('.replay-text', .5, {
    opacity: 1
});



document.body.addEventListener('click', function () {
    if (!masterTimeline.isActive()) {
        masterTimeline.restart();
    }
});