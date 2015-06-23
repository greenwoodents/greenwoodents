var Kudos = (function(){
  'use strict';
  //todo
  // - callback
  // - display funkce pro menu, asi urpavit generate numbers
  var visible = {},

  config = {
    startingNumber: 58,
    wrapper: ".js-kudos",
    container: ".kudos-counter",
    text: '.js-kudos > p',
    numberClass: 'kudos-number',
    animateClass: 'kudos-animate',
    animation: {
      numberPosition: [25,0],
      helperPosition: [8,0]
    },
    dialog: {
      intro: "Kudos",
      hover: "Don't move!",
      finish: "Thanks!",
    }
  },

  configInit =  false,
  animations = [],
  animationRuning = false,
  animationFinish = false,

  numbers = {
    raw: [],
    helpers: []
  };
  //make config public
  visible.config = config;

  var init = function(startingNumberUser){

    if(configInit === false){
      config.wrapper = document.querySelector(config.wrapper);
      config.container = document.querySelector(config.container);
      config.text = document.querySelector(config.text);

      configInit = true;
    }

    if(startingNumberUser){
      config.startingNumber = startingNumberUser;
    }

    //make raw numbers
    var number = config.startingNumber.toString();
    for (var i = 0; i < number.length; i++) {
      numbers.raw[i] = number.charAt(i);
    };

    //make helpers
    var helperNumber = (config.startingNumber + 1).toString();
    for (var o = 0; o < helperNumber.length; o++) {
      numbers.helpers[o] = helperNumber.charAt(o);
    };

    //add liteners
    config.wrapper.addEventListener("mouseover", hoverListener, false);
    config.wrapper.addEventListener("mouseleave", hoverOutListener, false);

    //generate numbers
    generateNumbers();

    //prepareAnimation
    prepareAnimation();
  };
  //make public
  visible.init = init;

  var generateNumbers = function() {
    var docFrag = document.createDocumentFragment();

    [].forEach.call(numbers.helpers, function(num,i,a) {
      if(numbers.raw[i] === undefined){
        numbers.raw[i] = "";
      }

      var element = document.createElement('DIV');
          element.classList.add(config.numberClass);
          element.innerHTML = '<p class="kudos-number-helper" style="top:'+config.animation.helperPosition[0]+'px; opacity: 0;">'+ numbers.helpers[i] +'</p>' +
                              '<p class="kudos-number-visible" style="top:'+config.animation.numberPosition[0]+'px; opacity: 1;">'+ numbers.raw[i] || 0 +'</p>';

          if(!(numbers.helpers[i] === numbers.raw[i])){
            element.classList.add(config.animateClass);
          }

          docFrag.appendChild(element);
    });
    config.container.innerHTML = "";
    config.container.appendChild(docFrag);
  };
  var prepareAnimation = function() {
    var elToAnimate = document.querySelectorAll('.'+config.animateClass);

    [].forEach.call(elToAnimate, function(el,i,a) {
      var helper = el.querySelector('.kudos-number-helper');
      var number = el.querySelector('.kudos-number-visible');

      var tl = new TimelineLite({paused:true});
      tl.to(number, 0.5, {top: 36})
      .to(number, 0.5, {top: 46, opacity: 0})
      .call(function(){done();})
      .to(helper, 1, {opacity: 1}, '-=0.25')
      .to(helper, 2.2, {top: 25, ease:Elastic.easeOut}, '-=1');

      animations[i] = tl;
    });
  };
  var animate = function() {
    if(animationFinish === false){
      [].forEach.call(animations, function(anim,i,a) {
        anim.restart();
      });
    }
  };
  var hoverListener = function(e) {
    if(animationFinish === false){
      config.text.innerHTML = config.dialog.hover;
    }
    if(animationRuning === false){
      animate();
      animationRuning = true;
    }
  };
  var hoverOutListener = function(e) {
    if(animationFinish === false){
      [].forEach.call(animations, function(anim,i,a) {
        anim.reverse();
      });
      animationRuning = false;
      config.text.innerHTML = config.dialog.intro;
    }
  };
  var done = function() {
    animationFinish = true;
    animationRuning = false;
    config.text.innerHTML = config.dialog.finish;

    //user code
    extendDone();
  }


  //callback
  var extendDone = function() {}
  visible.extendDone = extendDone;

  init(config.startingNumber);
  return visible;
})();
console.log(Kudos);
