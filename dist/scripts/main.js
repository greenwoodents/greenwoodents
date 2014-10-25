(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var mainApp = angular.module('app.home', ['ngRoute', 'ngAnimate']);

	//routing
	mainApp.config(function ($routeProvider) {
	  $routeProvider.
      when('/about', {templateUrl: 'company.html', controller: 'aboutController'}).
      when('/work', {templateUrl: 'work.html', controller: 'workController'}).
      when('/home', {templateUrl: 'homepage.html', controller: 'homeController'}).
      otherwise({redirectTo: '/home'});
	})

	//Templating
  mainApp.directive('navigation', function() {
    return {
      restrict: 'E',
      templateUrl: 'navigation.html'
    };
  });

  mainApp.controller('homeController', function($scope) {
    $scope.pageClass = 'homepage';
		window.scrollTo(0,0);
	});

	mainApp.controller('aboutController', function($scope) {
	    $scope.pageClass = 'company';
			window.scrollTo(0,0);
	});

	mainApp.controller('workController', function($scope) {
	  $scope.pageClass = 'work';
		window.scrollTo(0,0);

    //animation
    (function() {
      var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;
      // Main
      initHeader();
      addListeners();

      function initHeader() {
          width = window.innerWidth;
          height = 580;
          target = {x: 0, y: height};

          largeHeader = document.getElementById('large-header');
          largeHeader.style.height = height+'px';

          canvas = document.getElementById('demo-canvas');
          canvas.width = width;
          canvas.height = height;
          ctx = canvas.getContext('2d');

          // create particles
          circles = [];
          for(var x = 0; x < width*0.08 ; x++) {
              var c = new Circle();
              circles.push(c);
          }
          animate();
      }

      // Event handling
      function addListeners() {
          window.addEventListener('scroll', scrollCheck);
          window.addEventListener('resize', resize);
      }

      function scrollCheck() {
          if(document.body.scrollTop > height) animateHeader = false;
          else animateHeader = true;
      }

      function resize() {
          width = window.innerWidth;
          height = window.innerHeight;
          largeHeader.style.height = height+'px';
          canvas.width = width;
          canvas.height = height;
      }

      function animate() {
          if(animateHeader) {
              ctx.clearRect(0,0,width,height);
              for(var i in circles) {
                  circles[i].draw();
              }
          }
          requestAnimationFrame(animate);
      }

      // Canvas manipulation
      function Circle() {
          var _this = this;

          // constructor
          (function() {
              _this.pos = {};
              init();
          })();

          function init() {
              _this.pos.x = Math.random()*width;
              _this.pos.y = height+Math.random()*100;
              _this.alpha = 0.1+Math.random()*0.1;
              _this.scale = 0.1+Math.random()*0.2;
              _this.velocity = Math.random() * 0.5;
          }

          this.draw = function() {
              if(_this.alpha <= 0) {
                  init();
              }
              _this.pos.y -= _this.velocity;
              _this.alpha -= 0.0005;
              ctx.beginPath();
              ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
              ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
              ctx.fill();
          };
      }
    })();
  });

  mainApp.controller('worksController', function($scope) {
    //works
    $scope.works = [ 
      {  
        classname:"sales-layer", 
        title:"SalesLayer", 
        content:"Spanish startup from Plug’n’Play accelerator - design, frontend and responsivness", 
        href:""
      },
      {  
        classname:"metaxa", 
        title:"Metaxa Eshop", 
        content:"Spanish startup from Plug’n’Play accelerator - design, frontend and responsivness", 
        href:""
      },
      {  
        classname:"playerme", 
        title:"PlayerMe", 
        content:"Spanish startup from Plug’n’Play accelerator - design, frontend and responsivness", 
        href:""
      },      
      {  
        classname:"sales-layer", 
        title:"SalesLayer", 
        content:"Spanish startup from Plug’n’Play accelerator - design, frontend and responsivness", 
        href:""
      }
    ];
  });

  //controllers
  mainApp.controller('navController', function($scope, $location) {
    $scope.version = '0';
    $scope.isActive = function(route) {
        return route === $location.path();
    }   

    //default form menu to not show
    $scope.showmenu = false;

    $scope.hoverIn = function(){
      this.showmenu = true;
    };

    $scope.hoverOut = function(){
      this.showmenu = false;
    };

    $scope.click = function(){
      if ($scope.showmenu) {
        $scope.showmenu = false;
      } else {
        $scope.showmenu = true;
      };
    };
  });






},{}],2:[function(require,module,exports){
module.exports = angular.module('app.home', []);

require('./HomeCtrl')

},{"./HomeCtrl":1}],3:[function(require,module,exports){
angular.module('app', [
  require('./home').name
]);

},{"./home":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL25vZGVfbW9kdWxlcy9waG8tZGV2c3RhY2svbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL3NyYy9zY3JpcHRzL2hvbWUvSG9tZUN0cmwuanMiLCIvVXNlcnMvZmlsaXBkYW5pc2tvL3dvcmsvZ3JlZW53b29kZW50cy9zcmMvc2NyaXB0cy9ob21lL2luZGV4LmpzIiwiL1VzZXJzL2ZpbGlwZGFuaXNrby93b3JrL2dyZWVud29vZGVudHMvc3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1haW5BcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnLCBbJ25nUm91dGUnLCAnbmdBbmltYXRlJ10pO1xuXG5cdC8vcm91dGluZ1xuXHRtYWluQXBwLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcblx0ICAkcm91dGVQcm92aWRlci5cbiAgICAgIHdoZW4oJy9hYm91dCcsIHt0ZW1wbGF0ZVVybDogJ2NvbXBhbnkuaHRtbCcsIGNvbnRyb2xsZXI6ICdhYm91dENvbnRyb2xsZXInfSkuXG4gICAgICB3aGVuKCcvd29yaycsIHt0ZW1wbGF0ZVVybDogJ3dvcmsuaHRtbCcsIGNvbnRyb2xsZXI6ICd3b3JrQ29udHJvbGxlcid9KS5cbiAgICAgIHdoZW4oJy9ob21lJywge3RlbXBsYXRlVXJsOiAnaG9tZXBhZ2UuaHRtbCcsIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcid9KS5cbiAgICAgIG90aGVyd2lzZSh7cmVkaXJlY3RUbzogJy9ob21lJ30pO1xuXHR9KVxuXG5cdC8vVGVtcGxhdGluZ1xuICBtYWluQXBwLmRpcmVjdGl2ZSgnbmF2aWdhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICduYXZpZ2F0aW9uLmh0bWwnXG4gICAgfTtcbiAgfSk7XG5cbiAgbWFpbkFwcC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICRzY29wZS5wYWdlQ2xhc3MgPSAnaG9tZXBhZ2UnO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLDApO1xuXHR9KTtcblxuXHRtYWluQXBwLmNvbnRyb2xsZXIoJ2Fib3V0Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHQgICAgJHNjb3BlLnBhZ2VDbGFzcyA9ICdjb21wYW55Jztcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLDApO1xuXHR9KTtcblxuXHRtYWluQXBwLmNvbnRyb2xsZXIoJ3dvcmtDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdCAgJHNjb3BlLnBhZ2VDbGFzcyA9ICd3b3JrJztcblx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcblxuICAgIC8vYW5pbWF0aW9uXG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHdpZHRoLCBoZWlnaHQsIGxhcmdlSGVhZGVyLCBjYW52YXMsIGN0eCwgY2lyY2xlcywgdGFyZ2V0LCBhbmltYXRlSGVhZGVyID0gdHJ1ZTtcbiAgICAgIC8vIE1haW5cbiAgICAgIGluaXRIZWFkZXIoKTtcbiAgICAgIGFkZExpc3RlbmVycygpO1xuXG4gICAgICBmdW5jdGlvbiBpbml0SGVhZGVyKCkge1xuICAgICAgICAgIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgICAgaGVpZ2h0ID0gNTgwO1xuICAgICAgICAgIHRhcmdldCA9IHt4OiAwLCB5OiBoZWlnaHR9O1xuXG4gICAgICAgICAgbGFyZ2VIZWFkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGFyZ2UtaGVhZGVyJyk7XG4gICAgICAgICAgbGFyZ2VIZWFkZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0KydweCc7XG5cbiAgICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtby1jYW52YXMnKTtcbiAgICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgICAgICAgLy8gY3JlYXRlIHBhcnRpY2xlc1xuICAgICAgICAgIGNpcmNsZXMgPSBbXTtcbiAgICAgICAgICBmb3IodmFyIHggPSAwOyB4IDwgd2lkdGgqMC4wOCA7IHgrKykge1xuICAgICAgICAgICAgICB2YXIgYyA9IG5ldyBDaXJjbGUoKTtcbiAgICAgICAgICAgICAgY2lyY2xlcy5wdXNoKGMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmltYXRlKCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEV2ZW50IGhhbmRsaW5nXG4gICAgICBmdW5jdGlvbiBhZGRMaXN0ZW5lcnMoKSB7XG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHNjcm9sbENoZWNrKTtcbiAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2Nyb2xsQ2hlY2soKSB7XG4gICAgICAgICAgaWYoZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPiBoZWlnaHQpIGFuaW1hdGVIZWFkZXIgPSBmYWxzZTtcbiAgICAgICAgICBlbHNlIGFuaW1hdGVIZWFkZXIgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgICAgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgbGFyZ2VIZWFkZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0KydweCc7XG4gICAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICAgICBpZihhbmltYXRlSGVhZGVyKSB7XG4gICAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwwLHdpZHRoLGhlaWdodCk7XG4gICAgICAgICAgICAgIGZvcih2YXIgaSBpbiBjaXJjbGVzKSB7XG4gICAgICAgICAgICAgICAgICBjaXJjbGVzW2ldLmRyYXcoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhbnZhcyBtYW5pcHVsYXRpb25cbiAgICAgIGZ1bmN0aW9uIENpcmNsZSgpIHtcbiAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgICAgLy8gY29uc3RydWN0b3JcbiAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIF90aGlzLnBvcyA9IHt9O1xuICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgfSkoKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICAgIF90aGlzLnBvcy54ID0gTWF0aC5yYW5kb20oKSp3aWR0aDtcbiAgICAgICAgICAgICAgX3RoaXMucG9zLnkgPSBoZWlnaHQrTWF0aC5yYW5kb20oKSoxMDA7XG4gICAgICAgICAgICAgIF90aGlzLmFscGhhID0gMC4xK01hdGgucmFuZG9tKCkqMC4xO1xuICAgICAgICAgICAgICBfdGhpcy5zY2FsZSA9IDAuMStNYXRoLnJhbmRvbSgpKjAuMjtcbiAgICAgICAgICAgICAgX3RoaXMudmVsb2NpdHkgPSBNYXRoLnJhbmRvbSgpICogMC41O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZHJhdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBpZihfdGhpcy5hbHBoYSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICBpbml0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgX3RoaXMucG9zLnkgLT0gX3RoaXMudmVsb2NpdHk7XG4gICAgICAgICAgICAgIF90aGlzLmFscGhhIC09IDAuMDAwNTtcbiAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICBjdHguYXJjKF90aGlzLnBvcy54LCBfdGhpcy5wb3MueSwgX3RoaXMuc2NhbGUqMTAsIDAsIDIgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyNTUsMjU1LDI1NSwnKyBfdGhpcy5hbHBoYSsnKSc7XG4gICAgICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9KSgpO1xuICB9KTtcblxuICBtYWluQXBwLmNvbnRyb2xsZXIoJ3dvcmtzQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgIC8vd29ya3NcbiAgICAkc2NvcGUud29ya3MgPSBbIFxuICAgICAgeyAgXG4gICAgICAgIGNsYXNzbmFtZTpcInNhbGVzLWxheWVyXCIsIFxuICAgICAgICB0aXRsZTpcIlNhbGVzTGF5ZXJcIiwgXG4gICAgICAgIGNvbnRlbnQ6XCJTcGFuaXNoIHN0YXJ0dXAgZnJvbSBQbHVn4oCZbuKAmVBsYXkgYWNjZWxlcmF0b3IgLSBkZXNpZ24sIGZyb250ZW5kIGFuZCByZXNwb25zaXZuZXNzXCIsIFxuICAgICAgICBocmVmOlwiXCJcbiAgICAgIH0sXG4gICAgICB7ICBcbiAgICAgICAgY2xhc3NuYW1lOlwibWV0YXhhXCIsIFxuICAgICAgICB0aXRsZTpcIk1ldGF4YSBFc2hvcFwiLCBcbiAgICAgICAgY29udGVudDpcIlNwYW5pc2ggc3RhcnR1cCBmcm9tIFBsdWfigJlu4oCZUGxheSBhY2NlbGVyYXRvciAtIGRlc2lnbiwgZnJvbnRlbmQgYW5kIHJlc3BvbnNpdm5lc3NcIiwgXG4gICAgICAgIGhyZWY6XCJcIlxuICAgICAgfSxcbiAgICAgIHsgIFxuICAgICAgICBjbGFzc25hbWU6XCJwbGF5ZXJtZVwiLCBcbiAgICAgICAgdGl0bGU6XCJQbGF5ZXJNZVwiLCBcbiAgICAgICAgY29udGVudDpcIlNwYW5pc2ggc3RhcnR1cCBmcm9tIFBsdWfigJlu4oCZUGxheSBhY2NlbGVyYXRvciAtIGRlc2lnbiwgZnJvbnRlbmQgYW5kIHJlc3BvbnNpdm5lc3NcIiwgXG4gICAgICAgIGhyZWY6XCJcIlxuICAgICAgfSwgICAgICBcbiAgICAgIHsgIFxuICAgICAgICBjbGFzc25hbWU6XCJzYWxlcy1sYXllclwiLCBcbiAgICAgICAgdGl0bGU6XCJTYWxlc0xheWVyXCIsIFxuICAgICAgICBjb250ZW50OlwiU3BhbmlzaCBzdGFydHVwIGZyb20gUGx1Z+KAmW7igJlQbGF5IGFjY2VsZXJhdG9yIC0gZGVzaWduLCBmcm9udGVuZCBhbmQgcmVzcG9uc2l2bmVzc1wiLCBcbiAgICAgICAgaHJlZjpcIlwiXG4gICAgICB9XG4gICAgXTtcbiAgfSk7XG5cbiAgLy9jb250cm9sbGVyc1xuICBtYWluQXBwLmNvbnRyb2xsZXIoJ25hdkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuICAgICRzY29wZS52ZXJzaW9uID0gJzAnO1xuICAgICRzY29wZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKHJvdXRlKSB7XG4gICAgICAgIHJldHVybiByb3V0ZSA9PT0gJGxvY2F0aW9uLnBhdGgoKTtcbiAgICB9ICAgXG5cbiAgICAvL2RlZmF1bHQgZm9ybSBtZW51IHRvIG5vdCBzaG93XG4gICAgJHNjb3BlLnNob3dtZW51ID0gZmFsc2U7XG5cbiAgICAkc2NvcGUuaG92ZXJJbiA9IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnNob3dtZW51ID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmhvdmVyT3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMuc2hvd21lbnUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmICgkc2NvcGUuc2hvd21lbnUpIHtcbiAgICAgICAgJHNjb3BlLnNob3dtZW51ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUuc2hvd21lbnUgPSB0cnVlO1xuICAgICAgfTtcbiAgICB9O1xuICB9KTtcblxuXG5cblxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFtdKTtcblxucmVxdWlyZSgnLi9Ib21lQ3RybCcpXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICByZXF1aXJlKCcuL2hvbWUnKS5uYW1lXG5dKTtcbiJdfQ==
