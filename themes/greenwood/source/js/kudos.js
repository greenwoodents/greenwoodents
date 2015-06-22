var Kudos = (function(){
  'use strict';
  //todo
  // - callback
  // - display funkce pro menu, asi urpavit generate numbers
  var visible = {};

  var config = {
    startingNumber: 58,
    wrapper: document.querySelector(".js-kudos"),
    container: document.querySelector(".kudos-counter"),
    text: document.querySelector('.js-kudos > p'),
    numberClass: 'kudos-number',
    animateClass: 'kudos-animate',
    animation: {
      speed: 300,
      numberPosition: [25,0],
      helperPosition: [13,0]
    }
  };

  var animationRuning = false;

  console.log(config);

  var numbers = {
    raw: [],
    helpers: []
  };
  //make public
  visible.numbers = numbers;
  visible.config = config;

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

  var init = function(startingNumber){

    if(startingNumber){
      config.startingNumber = startingNumber;
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
    config.wrapper.addEventListener("mouseout", hoverOutListener, false);

    //generate numbers
    generateNumbers();
  };
  //make public
  visible.init = init;


  var animate = function() {
    var elToAnimate = document.querySelectorAll('.'+config.animateClass);

    [].forEach.call(elToAnimate, function(el,i,a) {
      var helper = el.querySelector('.kudos-number-helper');
      var number = el.querySelector('.kudos-number-visible');

      Velocity(number, {top: [36, 26], opacity: [1,1]}, {duration: 500, easing: "easeIn",
        complete: function(){
          Velocity(helper, {top: [26, 8]}, {delay: 500, duration: 2200, easing: [ 500, 12 ], begin: function(){
            helper.classList.add('showme');
            done();
          }});
          Velocity(number, {top: [46, 36], opacity: [0, 1]}, {delay: 100, duration: 500, easing: "easeIn"});
        }
      });
    });
  };
  //make public
  visible.animate = animate;

  var hoverListener = function(e) {
    console.log(e);

    if(!(animationRuning === 'finished')){
      config.text.innerHTML = "Don't move!";
    }


    if(animationRuning === false){
      animate();
      animationRuning = true;
    }
  };

  var hoverOutListener = function(e) {

  };

  var done = function() {
    animationRuning = 'finished';
    config.text.innerHTML = "Thanks!";
    console.log('animation done');
  }
  visible.done = done;


  init(config.startingNumber);
  return visible;
})();
console.log(Kudos.numbers);
