Pace.once('done', function(){app.afterLoadInitial();});

(function(){
  'use strict';

  var mqMedium = window.matchMedia( "(min-width: 768px)" ),
      mqMobile = window.matchMedia( "(min-width: 680px)" ),
      app = {},
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
    animatedMenu = false,
    visible = {};



    var init = function() {
      //event listeners
      addEvent(window, 'resize', choseMenu);
      addEvent(window, 'resize', menuSize);
      addEvent(window, 'scroll', runOnScroll);
      addEvent(window, 'popstate', checkUrlforHash);

      drag = new Dragdealer('dragMenu', {
        steps: 2,
        speed: 0.3,
        loose: false,
        requestAnimationFrame: true,
        css3: true,
        dragStopCallback: function(x,y) {
          if(x === 1){
            body.classList.add('opened');
            if(mqMobile.matches){
              window.scrollTo(0,0);
              window.location.hash='menu';
            }
          } else {
            setTimeout(function(){
              body.classList.remove('opened');
              window.location.hash='';
            }, 300)
          }
        },
        dragStartCallback: function(x,y) {
          if(x === 1){
            body.classList.remove('opened');
          }
        }
      });

      checkUrlforHash();
      choseMenu();
      filtr.init();

      if(!(mqMobile.matches) && animatedMenu === false && !(window.location.hash === 'menu')){
        document.querySelector('.menu-drag').classList.add('menu-in-out');
      }
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
            //

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
        console.log('init');
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
                    console.log('activeFilter');
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

  //Initial
  var initial = function() {
    //todo replace smoothstate, replace by smth wihout jquery
    //Bind Menu Buttons to Smoothstate.
    var projectOverlay = document.querySelectorAll('.project-overlay');
    console.log(projectOverlay);
    [].forEach.call(projectOverlay , function(element, index, array) {
      addEvent(element, 'click', function(e) {
        e.preventDefault();
        event.stopImmediatePropagation();
        var content  = $('#main').smoothState().data('smoothState');
        content.load(this.href);
      });
      addEvent(element, 'mouseover', function(e) {
        e.preventDefault();
        var content  = $('#main').smoothState().data('smoothState');
        content.fetch(this.href);
      });
    });

    //smoothstate init
    ;(function($) {
      'use strict';

        var $body    = $('html, body'),
        content  = $('#main').smoothState({
            prefetch: true,
            pageCacheSize: 0,
            onStart: {
              duration: 300,
              render: function (url, $container) {
                document.getElementById('main').classList.remove('is-here');
                content.toggleAnimationClass('is-exiting');
              }
            },
            onProgress : {
              duration: 0, // Duration of the animations, if any.
              render: function (url, $container) {
                  $body.css('cursor', 'wait');
                  $body.find('a').css('cursor', 'wait');
                  document.getElementById('main').classList.add('content-pending');
              }
            },
            onEnd : {
              duration: 300, // Duration of the animations, if any.
              render: function (url, $container, $content) {
                  $body.css('cursor', 'auto');
                  $body.find('a').css('cursor', 'pointer');
                  $container.html($content);

                  var body = document.body;

                  document.getElementById('main').classList.remove('content-pending');

                  if (body.classList.contains('menu-active')) {
                    menu.clearAllMenuState();
                    document.getElementById('main').classList.add('is-here');
                  } else {
                    document.getElementById('main').classList.add('is-here');
                  }

                  if(body.classList.contains('opened')){
                    body.classList.remove('opened');
                    menu.drag.setValue(0,0);
                  }

                  window.scrollTo(0,0);
                  window.app.components($content);
                }
            }
        }).data('smoothState');
    })(jQuery);
  };

  //afterLoad
  var afterLoadInitial = function() {
    menu.size();
    defferAll();
    components();
    initial();

    if(mqMedium.matches){
      feedInit();
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



























