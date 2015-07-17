Pace.once('done', function(){app.afterLoadInitial();});

(function(){
  'use strict';

  var mqMedium = window.matchMedia( "(min-width: 768px)" );

  var app = {};
  var executeExternalFunctions = [];
  app.extFn = executeExternalFunctions;

  //Helper functions
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

    var states = {
      active: 'menu-active',
      activeLeft: 'menu-active-left',
      openRight: 'menu-from-right-open',
      openLeft: 'menu-from-left-open'
    },
    body = document.body,
    drag,
    visible = {};

    var init = function() {

      var jsOpenMenu = document.querySelectorAll('.js-open-menu'),
          jsOpenMenuLeft = document.querySelectorAll('.js-open-menu-left'),
          closeButton = document.querySelector('.menu-close');

      //event listeners
      addEvent(window, 'hashchange', hashChange);
      addEvent(window, 'resize', choseMenu);
      addEvent(window, 'resize', menuSize);

      [].forEach.call(jsOpenMenu , function(element, index, array) {
        element.addEventListener('click', function() {openMenuFrom('right')});
      });
      [].forEach.call(jsOpenMenuLeft , function(element, index, array) {
        element.addEventListener('click', function() {openMenuFrom('left')});
      });


      closeButton.addEventListener('click', function() {
        clearAllMenuState();
        window.location.hash='';

        document.body.classList.add('button-click');
        setTimeout(function(){
          document.body.classList.remove('button-click');
        }, 500);
      });

      //dragable menu
      drag = new Dragdealer('dragMenu', {
        steps: 2,
        speed: 0.3,
        loose: false,
        requestAnimationFrame: true,
        css3: true,
        dragStopCallback: function(x,y) {
          if(x === 1){
            document.querySelector('.body-wrap').classList.add('opened');
            window.location.hash='menu';
          } else {
            document.querySelector('.body-wrap').classList.remove('opened');
            window.location.hash='';
          }
        },
        dragStartCallback: function(x, y) {
          if(x === 1){
            document.querySelector('.body-wrap').classList.remove('opened');
          }
        }
      });

      choseMenu();
    };

    visible.init = init;

    var choseMenu = function() {
      var openedMobile = document.querySelector('.body-wrap').classList.contains('opened');
      var openedDesktop = body.classList.contains(states.active);

      if(mqMedium.matches) {
        //dekstop view
        drag.disable();

        if( openedMobile || openedDesktop ) {
          mobileMenu('close');
          openMenuFrom('left');
        }

      } else {
        //mobile view
        drag.enable();

        if( openedMobile || openedDesktop ) {
          clearAllMenuState();
          mobileMenu('open');
        }

      }
    };

    var mobileMenu = function(todo) {
     switch(todo){
       case 'close':
          drag.setValue(0,0);
          document.querySelector('.body-wrap').classList.remove('opened');
         break;
      case 'open':
          drag.setValue(1,0);
          document.querySelector('.body-wrap').classList.add('opened');
         break;
       default:
         drag.setValue(1,0);
          document.querySelector('.body-wrap').classList.add('opened');
         break;
     }
    };

    var hashChange = function(e) {
      var hash = e.newURL.substring(e.newURL.indexOf('#')+1);

      if(hash === 'menu'){
        if(mqMedium.matches){
          openMenuFrom();
        } else {
          mobileMenu('open');
        }
      } else {
        if(mqMedium.matches){
          clearAllMenuState();
        } else {
          mobileMenu('close');
        }
      }
    };

    var openMenuFrom = function(side) {
      clearAllMenuState();
      window.scrollTo(0, 0);

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

      //claculate menu size
      menuSize();

      //add hash
      window.location.hash='menu';
    };

    var clearAllMenuState = function() {
      for (var key in states) {
       if (states.hasOwnProperty(key)) {
           var obj = states[key];
           body.classList.remove(obj);
        }
      }
    };

    visible.clearState = clearAllMenuState;

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

    init();

    return visible;
  })();

  console.log(menu);



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

  //Initial
  var initial = function() {
    //menu filtering init.
    var jsShow = document.querySelectorAll('.js-filtr a');
    [].forEach.call(jsShow , function(button, index, btnarray) {
      var refs = document.querySelectorAll('.js-filtr-content li');

      button.addEventListener('click', function(e){
        e.preventDefault();

        if (this.classList.contains('activated')) {
          this.classList.remove('activated');
        } else {
          var filterTag = this.getAttribute('filter').toLowerCase().trim();
          this.classList.add('activated');
        }
        filtr();
      });

      function filtr() {
        var activeButtons = document.querySelectorAll('.activated');
        var activeFilters = [];

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




        function hideAnimation(el) {
          el.classList.remove('fltr-hidden');
        }

        function showAnimation(el) {
          el.classList.remove('fltr-hidden');
        }
      }
    });

    //Bind Menu Buttons to Smoothstate.
    var projectOverlay = document.querySelectorAll('.project-overlay');
    [].forEach.call(projectOverlay , function(element, index, array) {
      element.addEventListener('click', function(e) {
        e.preventDefault();
        var content  = $('#main').smoothState().data('smoothState');
        content.load(this.href);
      });
      element.addEventListener('mouseover', function(e) {
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

                    document.getElementById('main').classList.remove('content-pending');

                    if (document.body.classList.contains('menu-active')) {
                      var body = document.body;
                      menu.clearState();
                      document.getElementById('main').classList.add('is-here');

                    } else {
                      document.getElementById('main').classList.add('is-here');
                    }

                    window.scrollTo(0,0);
                    window.app.components($content);
                  }
            }
        }).data('smoothState');
    })(jQuery);




    var lastScrollTop = 0,
        scrollTop = 0;

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

    //Add scroll listener
    addEvent(window, 'scroll', runOnScroll);
  };

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



























