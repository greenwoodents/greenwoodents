Pace.once('done', function(){app.afterLoadInitial();});

(function(){
  'use strict';

  var mqMedium = window.matchMedia( "(min-width: 768px)" ).matches;

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

  var clearAllMenuState = function() {
    var body = document.body;
    body.classList.remove('menu-active');
    body.classList.remove('menu-active-left');
    body.classList.remove('menu-from-left-open');
    body.classList.remove('menu-from-right-open');
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
      })


    });
  };

  //Menu resize
  var menuSize = function() {
    var lMq = window.matchMedia("(min-width: 1300px)");
    var mMq = window.matchMedia("(min-width: 960px)");
    var sMq = window.matchMedia("(min-width: 680px)");
    var ssMq = window.matchMedia("(max-width: 680px)");

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
      reference.style.width = boxSize  + "px";
      reference.style.margin = (space) + "px";
    });
  };
  addEvent(window, "resize", menuSize);

  //afterLoad
  var afterLoadInitial = function() {
    defferAll();
    components();
    menuSize();
    initial();


    if(mqMedium){
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
          var elementFilters = reference.getAttribute('filter-class').toLowerCase().trim().split(',');
          //reference.classList.add('fltr-hidden');
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
                } else {
                  hideAnimation(reference);
                }
              });
            });
          } else {
            showAnimation(reference);
          }
        });


        function hideAnimation(el) {
          console.log('hide', el);

          var tl = new TimelineLite();
          tl.to(el, 0.5, {opacity: 0, scale: "0.5"})
            .to(el, 0.5, {maxHeight: 0, maxWidth: 0,});
        }

        function showAnimation(el) {
          console.log('show', el);

          var tl = new TimelineLite();
          tl.to(el, 0.5, {maxHeight: 100, maxWidth: 100, })
            .to(el, 0.5, {opacity: 1, scale: "1"});
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
                      clearAllMenuState();
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

    var swipe = new SwipeMe(document.body,{
      accessClasses: {
        right: 'menu-active'
      },
      direction: ['right']
    });
  };

  //Components
  var components = function(data) {

    if (data) {
      var page = data[0].getAttribute('page') || "Home";
      document.querySelector('.menu-page-title').innerHTML = page;
    }

    var jsOpenMenu = document.querySelectorAll('.js-open-menu');
    [].forEach.call(jsOpenMenu , function(element, index, array) {
      var body = document.body;

      element.addEventListener('click', function() {
        clearAllMenuState();

        body.classList.add('menu-active');
        body.classList.add('menu-from-right-open');

        menuSize();
      });
    });

    var jsOpenMenuLeft = document.querySelectorAll('.js-open-menu-left');
    [].forEach.call(jsOpenMenuLeft , function(element, index, array) {
      var body = document.body;

      element.addEventListener('click', function() {
        clearAllMenuState();

        body.classList.add('menu-active');
        body.classList.add('menu-active-left');
        body.classList.add('menu-from-left-open');

        menuSize();
      });
    });

    var closeButton = document.querySelector('.menu-close');
    closeButton.addEventListener('click', function() {
      clearAllMenuState();
      document.body.classList.add('button-click');
      setTimeout(function(){
        document.body.classList.remove('button-click');
      }, 500);
    });

    var jsDetails = document.querySelectorAll('.js-hidden-box');
    [].forEach.call(jsDetails , function(element, index, array) {
      element.addEventListener('click', function() {
        element.classList.toggle('clicked');
      });
    });

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
    if(mqMedium){
      feedInit();
    }

  };
  //make visible
  app.components = components;
  //make it global.
  window.app = app;

})(this);



























