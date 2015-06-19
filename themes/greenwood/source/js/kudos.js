var Kudos = (function(){
  'use strict';

  var visible = {};

  var config = {
    startingNumber: 56,
    wrapper: document.querySelector(".js-kudos"),
    container: document.querySelector(".kudos-counter"),
    numberClass: 'kudos-number',
    animateClass: 'kudos-animate'
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
          element.innerHTML = '<p class="kudos-number-helper">'+ numbers.helpers[i] +'</p>' +
                              '<p class="kudos-number-visible">'+ numbers.raw[i] || 0 +'</p>';

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


  var add = function() {

  };
  //make public
  visible.add = add;


  init(config.startingNumber);
  return visible;
})();
console.log(Kudos.numbers);
