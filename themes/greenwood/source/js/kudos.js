var Kudos = (function(){
  'use strict';
  //todo
  // - callback
  // - display funkce pro menu, asi urpavit generate numbers
  var visible = {};

  var config = {
    startingNumber: 56,
    wrapper: document.querySelector(".js-kudos"),
    container: document.querySelector(".kudos-counter"),
    numberClass: 'kudos-number',
    animateClass: 'kudos-animate',
    animation: {
      speed: 300,
      numberPosition: [25,0],
      helperPosition: [0,0]
    }
  };

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
          element.innerHTML = '<p class="kudos-number-helper" style="top:'+config.animation.helperPosition[0]+'px; opacity: .1;">'+ numbers.helpers[i] +'</p>' +
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

      var start = null;


      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        number.style.top = Math.min(progress/10, 60) + "px";
        console.log(number.style.top);
        if (progress < 2000) {
          window.requestAnimationFrame(step);
        }
      }

      window.requestAnimationFrame(step);
    });
  };
  //make public
  visible.animate = animate;


  init(config.startingNumber);
  return visible;
})();
console.log(Kudos.numbers);
