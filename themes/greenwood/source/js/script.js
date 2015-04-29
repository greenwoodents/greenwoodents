Pace.once('done', addLoad);

var addEvent = function(elem, type, eventHandle) {
    if (elem == null || typeof(elem) == 'undefined') return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on"+type]=eventHandle;
    }
};


function addLoad () {
  document.querySelector('.body-wrap').classList.add('loaded');
  document.body.classList.add('web-loaded');
}

var jsOpenMenu = document.querySelectorAll('.js-open-menu');
[].forEach.call(jsOpenMenu , function(element, index, array) {
  var body = document.body;
  var menu = document.querySelector('.js-menu');
  var closeButton = document.querySelector('.js-menu .menu-close');
  var innerHeight =  window.innerHeight;
  var main = document.getElementById('main');

  console.log(innerHeight);

  element.addEventListener('click', function() {
    body.classList.remove('menuClose');
    menu.classList.remove('close');

    menu.classList.add('active');
    body.classList.add('menuActive');
    main.style.maxHeight =  innerHeight + "px";

    setTimeout(function() {
      window.scrollTo(0,0);
      menu.style.position = 'absolute';
    }, 500);
  });

  closeButton.addEventListener('click', function() {
    menu.classList.remove('active');
    menu.classList.add('close');

    body.classList.remove('menuActive');
    body.classList.add('menuClose');
    main.style.maxHeight =  "100%";
    menu.style.position = 'fixed';
  });

  var projectOverlay = document.querySelectorAll('.project-overlay');
  [].forEach.call(projectOverlay , function(element, index, array) {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('jedeme pryč');
      var content  = $('#main').smoothState().data('smoothState');
      content.load(this.href);
    });
    element.addEventListener('mouseover', function(e) {
      e.preventDefault();
      var content  = $('#main').smoothState().data('smoothState');
      content.fetch(this.href);
    });
  });
});

//show and hide
function components(data) {
  if (data) {
    var page = data[0].getAttribute('page');
    document.querySelector('.menu-close').innerHTML = page;
  }

  var homepage = document.querySelector('.homepage');
  if (homepage !== null ) {
    document.body.classList.add('body-homepage');
  } else {
    var isHere = document.body.classList.contains('body-homepage');
    if (isHere) {
      document.body.classList.remove('body-homepage');
    }
  }

  var loaded = document.querySelector('.body-wrap').classList.contains('loaded');
  if (loaded) {
    var jsShow = document.querySelectorAll('.js-show');
    [].forEach.call(jsShow , function(element, index, array) {
      element.classList.add('animate');
      element.classList.remove('js-show');
    });
  }

  var jsDetails = document.querySelectorAll('.js-hidden-box');
  [].forEach.call(jsDetails , function(element, index, array) {
    element.addEventListener('click', function() {
      element.classList.toggle('clicked');
    });
  });


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
  });
}


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
      reference.classList.add('fltr-hidden');
      var contains = 0;

      if (activeFilters.length > 0) {
        [].forEach.call(elementFilters , function(elementFilter, elementIndex, elementArray) {

          [].forEach.call(activeFilters , function(activeFilter, activeindex, activearray) {
            elementFilter = elementFilter.trim();
            if (activeFilter == elementFilter) {
              contains++;
            }
            if (contains === activearray.length) {
              reference.classList.remove('fltr-hidden');
            }
          });
        });
      } else {
        reference.classList.remove('fltr-hidden');
      }
    });
  }
});


addEvent(window, "resize", menuSize);

function menuSize() {
  var lMq = window.matchMedia( "(min-width: 1300px)" );
  var mMq = window.matchMedia( "(min-width: 960px)" );
  var sMq = window.matchMedia( "(min-width: 680px)" );
  var ssMq = window.matchMedia( "(max-width: 680px)" );

  var space = 10;
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


  var boxSize = Math.round((containerW / boxesOnRow) - space * 2);

  var jsMenuSize = document.querySelectorAll('.js-filtr-content li');
  [].forEach.call(jsMenuSize, function(reference, index, array) {
    console.log(boxSize);
    reference.style.width = boxSize  + "px";
    reference.style.margin = (space - 1) + "px";
  });
}menuSize();



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

                if (document.body.classList.contains('menuActive')) {
                  var menu = document.querySelector('.js-menu');
                  var body = document.body;

                  menu.classList.remove('active');
                  menu.classList.add('next');

                  body.classList.remove('menuActive');
                  body.classList.add('menuClose');



                  setTimeout(function() {
                    main.style.maxHeight =  "100%";
                    menu.style.position = 'fixed';
                  }, 500);
                  document.getElementById('main').classList.add('is-here');

                } else {
                  document.getElementById('main').classList.add('is-here');
                }

                window.scrollTo(0,0);
                window.components($content);
              }
        }
    }).data('smoothState');
})(jQuery);
























