Pace.once('done', function(){app.afterLoadInitial();});

(function(){
  'use strict';

  var mqMedium = window.matchMedia( "(min-width: 768px)" ),
      mqMobile = window.matchMedia( "(min-width: 680px)" ),
      app = {},
      animatedMenu = false,
      executeExternalFunctions = [];

  app.extFn = executeExternalFunctions;

  ///Helper functions
  var addEvent = function(elem, type, eventHandle) {
    if (elem == null || typeof(elem) == 'undefined') return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on" + type]=eventHandle;
    }
  };

  var defferAll = function() {
    [].forEach.call(document.querySelectorAll('.defer'), function(el,i,a) {
      el.classList.remove('defer');
      el.classList.add('deferload');
      if (el.hasAttribute("data-src")) {
        el.style.backgroundImage = "url('"+ el.getAttribute('data-src') +"')";
      };
    });
  };

  var loadJS = function(src, callback) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onreadystatechange = s.onload = function() {
        var state = s.readyState;
        if (!callback.done && (!state || /loaded|complete/.test(state))) {
            callback.done = true;
            callback();
        }
      };
    document.getElementsByTagName('head')[0].appendChild(s);
  };
  app.loadJS = loadJS;
  ///////

  var feedInit = function(){
    var feed = document.querySelectorAll('#instafeed');
    [].forEach.call(feed , function(element, index, array) {
      var feed = new Instafeed({
        get: 'user',
        clientId: '1fbd28fc3ac2446190809988d7bdbab7',
        userId: 1650642267,
        accessToken: '1650642267.467ede5.f7b1d8f9e1f4423b910d327f28f7b517',
        resolution: 'standard_resolution',
        limit: 7,
        template: '<img src="{{image}}" />'
      });
      feed.run();

      document.querySelector('.button-instagram').addEventListener('click', function(){
        //GA Event
        ga('send', 'event', 'instagram', 'clicked');
      });
    });
  };

  var menu = (function() {
    'use strict';

    var states = {
      active: 'menu-active',
      activeLeft: 'menu-active-left',
      openRight: 'menu-from-right-open',
      openLeft: 'menu-from-left-open'
    },

    body = document.body,
    drag,
    lastScrollTop = 0,
    scrollTop = 0,
    visible = {};

    var init = function() {
      //event listeners
      addEvent(window, 'resize', choseMenu);
      addEvent(window, 'resize', menuSize);
      addEvent(window, 'scroll', runOnScroll);
      addEvent(window, 'popstate', checkUrlforHash);


      var dragMenu = document.querySelector('.menu-drag');
      var wrap = document.querySelector('.body-wrap');

      drag = new Dragdealer('dragMenu', {
        steps: 2,
        speed: 0.3,
        loose: false,
        requestAnimationFrame: true,
        css3: true,
        dragStopCallback: function(x,y) {
          if(x === 1){
            dragMenu.style.zIndex = "900";
            setTimeout(function(){
              body.classList.add('opened');
              body.style.overflow = 'hidden';
            }, 300);
            if(mqMobile.matches){
              //desktop
              window.scrollTo(0,0);
              window.location.hash='menu';
            }
          } else {
            setTimeout(function(){
              body.classList.remove('opened');
              body.style.overflow = 'auto';
              dragMenu.style.zIndex = "10";
              window.location.hash = '';
            }, 300)
          }
        },
        dragStartCallback: function(x,y) {
          dragMenu.style.zIndex = "900";
        }
      });

      checkUrlforHash();
      choseMenu();
      filtr.init();
    };

    var addButtonListeners = function() {
      var jsOpenMenu = document.querySelectorAll('.js-open-menu'),
          jsOpenMenuLeft = document.querySelectorAll('.js-open-menu-left'),
          closeButton = document.querySelector('.menu-close');

      [].forEach.call(jsOpenMenu , function(element, index, array) {
        addEvent(element, 'click', function() {
          event.stopImmediatePropagation();
          openMenuFrom('right')})
      });
      [].forEach.call(jsOpenMenuLeft , function(element, index, array) {
        addEvent(element, 'click', function() {
          event.stopImmediatePropagation();
          openMenuFrom('left')})
      });

      closeButton.addEventListener('click', function() {
        event.stopImmediatePropagation();

        if(mqMobile.matches){
          window.location.hash='';
        }
        document.body.classList.add('button-click');
        setTimeout(function(){
          document.body.classList.remove('button-click');
        }, 500);
      });
    };
    visible.addButtonListeners = addButtonListeners;

    var clearAllMenuState = function() {
      for (var key in states) {
       if (states.hasOwnProperty(key)) {
           var obj = states[key];
           body.classList.remove(obj);
        }
      }
    };
    visible.clearAllMenuState = clearAllMenuState;

    var menuSize = function() {
      var lMq = window.matchMedia('(min-width: 1300px)');
      var mMq = window.matchMedia('(min-width: 960px)');
      var sMq = window.matchMedia('(min-width: 680px)');
      var ssMq = window.matchMedia('(max-width: 680px)');

      var space = 15;
      var boxesOnRow = 4;

      if (sMq.matches) {
        boxesOnRow = 2;
      }
      if (mMq.matches) {
        boxesOnRow = 3;
      }
      if (lMq.matches) {
        boxesOnRow = 4;
      }
      if (ssMq.matches) {
        boxesOnRow = 1;
      }

      var container = document.querySelector('.js-filtr-content');
      var containerW = container.offsetWidth;

      var viewportWidth;
      if (document.compatMode === 'BackCompat') {
          viewportWidth = document.body.clientWidth;
      } else {
          viewportWidth = document.documentElement.clientWidth;
      }

      var boxSize = Math.round(( (containerW - 4) / boxesOnRow) - space * 2);

      var jsMenuSize = document.querySelectorAll('.js-filtr-content li');
      [].forEach.call(jsMenuSize, function(reference, index, array) {
        reference.style.width = boxSize  + 'px';
        reference.style.margin = (space) + 'px';
      });
    };
    visible.size = menuSize;

    var checkUrlforHash = function() {
      var openedMobile = body.classList.contains('opened'),
          openedDesktop = body.classList.contains(states.active);

      if(window.location.hash === '#menu') {
        if(!( openedMobile || openedDesktop )) {
          if(mqMobile.matches){
            //desktop
            //spatna podminka tadz?
            openMenuFrom('left');
          } else {
            //mobile
            mobileMenu('open');
          }
        }
      } else {
        if( openedMobile || openedDesktop ) {
          if(mqMobile.matches){
            //dekstop
            clearAllMenuState();
          } else {
            //mobile
            mobileMenu('close');
          }
        }
      }
    };
    visible.checkUrlforHash = checkUrlforHash;

    var runOnScroll =  function(evt) {
      var hp = document.body.classList.contains('body-homepage');
      if(!( hp )) {
        var menu = document.querySelector('.fixed-menu-block');

        if( menu && mqMedium.matches){
          scrollTop = document.body.scrollTop;

          if (scrollTop > lastScrollTop) {
            menu.classList.add('hidden');
          } else {
            menu.classList.remove('hidden');
          }
          lastScrollTop = scrollTop;
        }
      }
    };

    var choseMenu = function() {
      var openedMobile = body.classList.contains('opened'),
          openedDesktop = body.classList.contains(states.active);

      if(mqMobile.matches) {
        //dekstop view
        drag.disable();

        if( openedMobile || openedDesktop ) {
          mobileMenu('close');
          openMenuFrom('left');
        }
        return 'desktop';
      } else {
        //mobile view
        drag.enable();

        if( openedMobile || openedDesktop ) {
          clearAllMenuState();
          mobileMenu('open');
        }
        return 'mobile';
      }
    };

    var mobileMenu = function(todo) {

     switch(todo){
       case 'close':
        drag.setValue(0,0);
        body.classList.remove('opened');
        break;
      case 'open':
        drag.setValue(1,0);
        body.classList.add('opened');
        break;
       default:
        drag.setValue(1,0);
        body.classList.add('opened');
        break;
     }
    };

    var openMenuFrom = function(side) {
      window.scrollTo(0, 0);

      if(!(body.classList.contains(states.active))) {

        switch(side) {
          case 'left':
              body.classList.add(states.active);
              body.classList.add(states.activeLeft);
              body.classList.add(states.openLeft);
              break;
          case 'right':

              body.classList.add(states.active);
              body.classList.add(states.openRight);
              break;
          default:
              body.classList.add(states.active);
              body.classList.add(states.openRight);
        }
      };

      //claculate menu size
      menuSize();

      if(mqMobile.matches){

         window.location.hash='menu';
      }
    };

    var filtr = (function() {
      'use strict';

      var visible = {},
      refs;

      var init = function() {
        var jsShow = document.querySelectorAll('.js-filtr a');

        [].forEach.call(jsShow , function(button, index, btnarray) {
          refs = document.querySelectorAll('.js-filtr-content li');

          addEvent(button, 'click', function(e){
            e.preventDefault();

            if (this.classList.contains('activated')) {
              this.classList.remove('activated');
            } else {
              var filterTag = this.getAttribute('filter').toLowerCase().trim();
              this.classList.add('activated');
            }
            filter();
          });
        });
      };

      visible.init = init;

      var filter = function() {
        var activeButtons = document.querySelectorAll('.activated'),
            activeFilters = [];

        [].forEach.call(activeButtons , function(btn, index, array) {
          var att = btn.getAttribute('filter').toLowerCase().trim();
          activeFilters.push(att);
        });

        [].forEach.call(refs , function(reference, index, array) {
          reference.classList.add('fltr-hidden');
        });

        setTimeout(function() {
          [].forEach.call(refs , function(reference, index, array) {
            reference.classList.add('fltr-hidden');
            var elementFilters = reference.getAttribute('filter-class').toLowerCase().trim().split(',');
            var contains = 0;

            if (activeFilters.length > 0) {
              [].forEach.call(elementFilters , function(elementFilter, elementIndex, elementArray) {

                [].forEach.call(activeFilters , function(activeFilter, activeindex, activearray) {
                  elementFilter = elementFilter.trim();
                  if (activeFilter == elementFilter) {
                    contains++;
                  }
                  if (contains === activearray.length) {
                    showAnimation(reference);
                  }
                });
              });
            } else {
              showAnimation(reference);
            }
          });
        }, 350)
      };

      var showAnimation = function(el) {
        el.classList.remove('fltr-hidden');
      };

      return visible;
    })();

    init();
    visible.drag = drag;
    return visible;
  })();

  var animationRatio = function(){
    var scale = 1,
        fw = window.innerWidth,
        fh = window.innerHeight,
        iw = 1920,
        ih = 1800,
        origOffset = 15, // %
        offset = 0,
        position = 0,
        positionX = 0,
        positionY = 0,
        wrapper = document.querySelector('.ratio-wrapper'),
        el = document.querySelector('.ratio-wrapper > .content'),
        cloud = document.querySelectorAll('.ratio-wrapper  .scale'),
        scene = document.querySelectorAll('.scene');

        scale = Math.max(fh/ih,fw/iw);
        iw = iw * scale;
        ih = ih * scale;
        offset = origOffset / 100;
        positionX = (iw-fw)/2
        positionY = (ih-fh)/2;

    //el.style.transform = "scale("+scale+")";
    console.log("image height: " + ih, "image Width: " + iw);
    console.log("scale factor " + scale);

    wrapper.style.height = ih + "px";
    wrapper.style.width = iw + "px";
    wrapper.style.transform = "translate(-" + positionX + "px,-" + positionY + "px)";



    [].forEach.call(cloud, function(el,i,a) {
      el.style.transform = "scale("+ scale + ")";
    });

    // [].forEach.call(document.querySelectorAll('.background'), function(el,i,a) {
    //   el.style.backgroundPosition = "50%" + (50 + origOffset) + "%";
    // });
  };

  var homepageAnimation = function() {
    var fade = document.querySelector('.hp-first-fade') || false;

    if(fade){
      setTimeout(function(){
        fade.classList.remove('hp-first-fade')
      }, 5000);
    }
  }

  // @-webkit-keyframes wide-mrak {
//   0%   { opacity: 0;  .translate3d(0%, 0, 0);}
//   10%  { opacity: .8}
//   100% { opacity: .8;  .translate3d(250%, 0, 0);}
// }
// @keyframes wide-mrak {
//   0%   { opacity: 0;  .translate3d(0%, 0, 0);}
//   10%  { opacity: .8}
//   100% { opacity: .8;  .translate3d(250%, 0, 0);}
// }

  //Initial
  var initial = function() {
    //todo replace smoothstate, replace by smth wihout jquery
    //Bind Menu Buttons to Smoothstate.
    var projectOverlay = document.querySelectorAll('.project-overlay');

    [].forEach.call(projectOverlay , function(element, index, array) {
      addEvent(element, 'click', function(e) {
        e.preventDefault();
        event.stopImmediatePropagation();
        pjax.invoke(this.href, 'main');
      });
    });


    var body = document.body,
        container = document.getElementById('main');

    pjax.connect({
      autoAnalytics: false,
      'container': 'main',
      'beforeSend': function(e){
        container.classList.remove('is-here');
        container.classList.add('is-exiting');
      },
      'complete': function(e){
        container.classList.remove('is-exiting');

        if (body.classList.contains('menu-active')) {
          menu.clearAllMenuState();
          container.classList.add('is-here');
        } else {
          container.classList.add('is-here');
        }

        if(body.classList.contains('opened')){
          body.classList.remove('opened');
          menu.drag.setValue(0,0);
        }
        window.app.components();
      }
    });
  };
  addEvent(window, 'resize', animationRatio)

  //afterLoad
  var afterLoadInitial = function() {
    menu.size();
    defferAll();
    components();
    initial();
    animationRatio();
    homepageAnimation();

    if(mqMedium.matches){
      feedInit();
    }


    if(!(mqMobile.matches) && animatedMenu === false && !(window.location.hash === 'menu')){
      document.querySelector('.menu-drag').classList.add('menu-in-out');
    }
  };
  //make visible
  app.afterLoadInitial = afterLoadInitial;

  //Components
  var components = function(data) {

    if (data) {
      var page = data[0].getAttribute('page') || "Home";
      document.querySelector('.menu-page-title').innerHTML = page;
    }

    var jsDetails = document.querySelectorAll('.js-hidden-box');
    [].forEach.call(jsDetails , function(element, index, array) {
      element.addEventListener('click', function() {
        element.classList.toggle('clicked');
      });
    });


    var delays = [0, 1360, 2240],
        hiddenSoft = document.querySelectorAll('.hiddenSoft');
    if(hiddenSoft){
      [].forEach.call(hiddenSoft, function(el,i,a) {
        if (!(el.classList.contains('animated'))) {
          setTimeout(function(){
            el.classList.add('animated');
          }, delays[i] )
        }
      });
    }

    var homepage = document.querySelector('.homepage');
    if (homepage !== null ) {
      document.body.classList.add('body-homepage');
    } else {
      var isHere = document.body.classList.contains('body-homepage');
      if (isHere) {document.body.classList.remove('body-homepage');}
    }
    var loaded = document.querySelector('.body-wrap').classList.contains('loaded');
    if (loaded) {
      var jsShow = document.querySelectorAll('.js-show');
      [].forEach.call(jsShow , function(element, index, array) {
        element.classList.add('animate');
        element.classList.remove('js-show');
      });
    }

    for (var i = executeExternalFunctions.length - 1; i >= 0; i--) {
      executeExternalFunctions[i].call()
    };

    menu.addButtonListeners();
    animationRatio();
    homepageAnimation();

    //init feed
    if(mqMedium.matches){
      feedInit();
    }
  };
  //make visible
  app.components = components;
  //make it global.
  window.app = app;
})(this);



























