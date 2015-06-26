var Kudos = (function(){
  'use strict';
  //todo
  // - callback
  // - display funkce pro menu, asi urpavit generate numbers
  var visible = {},

  config = {
    startingNumber: 0,
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

  wrapper,
  container,
  text,

  animations = [],
  animationRuning = false,
  animationFinish = false,

  numbers = {
    raw: [],
    helpers: []
  };
  //make config public
  visible.config = config;

  var init = function(startingNumberUser, initiDone){
    console.log('<INITKUDOS></INITKUDOS>');

    numbers = {
      raw: [],
      helpers: []
    };

    wrapper = document.querySelector(config.wrapper);
    container = document.querySelector(config.container);
    text = document.querySelector(config.text);


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
    wrapper.addEventListener("mouseover", hoverListener, false);
    wrapper.addEventListener("mouseleave", hoverOutListener, false);

    //generate numbers
    generateNumbers();

    if(!(initiDone)){
      //prepareAnimation
      prepareAnimation();
    } else {
      done();
    };
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

    container.innerHTML = "";
    container.appendChild(docFrag);
  };
  var prepareAnimation = function() {
    animations = [];
    animationRuning = false;
    animationFinish = false;

    var elToAnimate = document.querySelectorAll('.'+config.animateClass);

    [].forEach.call(elToAnimate, function(el,i,a) {
      var helper = el.querySelector('.kudos-number-helper');
      var number = el.querySelector('.kudos-number-visible');

      var tl = new TimelineLite({paused:true});
      tl.to(number, 0.5, {top: 36})
      .to(number, 0.5, {top: 46, opacity: 0})
      .call(function(){_done();})
      .to(helper, 1, {opacity: 1}, '-=0.25')
      .to(helper, 2.2, {top: 25, ease:Elastic.easeOut}, '-=1');

      animations[i] = tl;
    });
  };
  var animate = function() {
    if(animationFinish === false){

      console.log(animations.reverse());

      [].forEach.call(animations, function(anim,i,a) {
        console.log(i);
        setTimeout(function(){
          anim.restart();
        }, i*400)

      });
    }
  };
  var hoverListener = function(e) {
    console.log('hover');
    if(animationFinish === false){
      text.innerHTML = config.dialog.hover;
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
      text.innerHTML = config.dialog.intro;
    }
  };

  var _done = function() {
    done();
    extendDone();
  };
  var done = function() {
    animationFinish = true;
    animationRuning = false;
    text.innerHTML = config.dialog.finish;
    window.location.hash = '😮';
  }
  visible.done = done;

  //callback
  var extendDone = function() {
    KudosFirebase.add();
  }
  visible.extendDone = extendDone;

  return visible;
})();



var KudosFirebase = (function() {
  var firebase = new Firebase("https://ents-testing.firebaseio.com/"),
  firebaseKudos = firebase.child('kudos'),
  authData = firebase.getAuth();
  visible = {};



  var init = function() {
    var authData = firebase.getAuth();
    if(authData == null){
      // authenticate the user
      firebase.authAnonymously(function(err, authenticationData) {});
    }

    console.log('ININIT');
    var key = document.location.pathname.replace(/[\/-]/g,'');
    console.log(key);
    firebaseKudos.child(key).on('value', function(snapshot){
      if(snapshot){
        var article = snapshot.val();
        var likeCount = 0;
        if(article){
          for(var prop in article.likes){
            likeCount++;
          }
        }
      }
      firebaseKudos.child(key).child('likes').child(authData.uid).once('value', function(snap){
        if(snap.val() !== null){
          console.log('hlasoval');
          Kudos.init(likeCount, true);
        } else {
          Kudos.init(likeCount);
        }
      });
    });
  };
  visible.init = init;

  var addKudo = function(){
    var kudo = function() {
      console.log(authData);
      if (authData) {
        firebaseKudos
          .child(key)
          .child('likes')
          .child(authData.uid)
          .set({
              count: 1
          });
        }
    };

    var key = document.location.pathname.replace(/[\/-]/g,'');
    var authData = firebase.getAuth();
    if(authData == null){
      // authenticate the user
      firebase.authAnonymously(function(err, authenticationData) {
        kudo();
      });
    } else {
      kudo()
    }



  };
  visible.add = addKudo;
  return visible;
})();

app.extFn.push(KudosFirebase.init);
console.log(app);

console.log(app);
console.log(KudosFirebase);
console.log(Kudos);


