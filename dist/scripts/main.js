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
	});


  //controllers
  mainApp.controller('navController', function($scope, $location) {
    $scope.version = '0';
    $scope.isActive = function(route) {
        return route === $location.path();
    }   
  });

  mainApp.controller('showNavController', function($scope, $location) {
    //default the menu to not show
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL25vZGVfbW9kdWxlcy9waG8tZGV2c3RhY2svbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL3NyYy9zY3JpcHRzL2hvbWUvSG9tZUN0cmwuanMiLCIvVXNlcnMvZmlsaXBkYW5pc2tvL3dvcmsvZ3JlZW53b29kZW50cy9zcmMvc2NyaXB0cy9ob21lL2luZGV4LmpzIiwiL1VzZXJzL2ZpbGlwZGFuaXNrby93b3JrL2dyZWVud29vZGVudHMvc3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIG1haW5BcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnLCBbJ25nUm91dGUnLCAnbmdBbmltYXRlJ10pO1xuXG5cdC8vcm91dGluZ1xuXHRtYWluQXBwLmNvbmZpZyhmdW5jdGlvbiAoJHJvdXRlUHJvdmlkZXIpIHtcblx0ICAkcm91dGVQcm92aWRlci5cbiAgICAgIHdoZW4oJy9hYm91dCcsIHt0ZW1wbGF0ZVVybDogJ2NvbXBhbnkuaHRtbCcsIGNvbnRyb2xsZXI6ICdhYm91dENvbnRyb2xsZXInfSkuXG4gICAgICB3aGVuKCcvd29yaycsIHt0ZW1wbGF0ZVVybDogJ3dvcmsuaHRtbCcsIGNvbnRyb2xsZXI6ICd3b3JrQ29udHJvbGxlcid9KS5cbiAgICAgIHdoZW4oJy9ob21lJywge3RlbXBsYXRlVXJsOiAnaG9tZXBhZ2UuaHRtbCcsIGNvbnRyb2xsZXI6ICdob21lQ29udHJvbGxlcid9KS5cbiAgICAgIG90aGVyd2lzZSh7cmVkaXJlY3RUbzogJy9ob21lJ30pO1xuXHR9KVxuXG5cdC8vVGVtcGxhdGluZ1xuICBtYWluQXBwLmRpcmVjdGl2ZSgnbmF2aWdhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICduYXZpZ2F0aW9uLmh0bWwnXG4gICAgfTtcbiAgfSk7XG5cblxuXG4gIG1haW5BcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAkc2NvcGUucGFnZUNsYXNzID0gJ2hvbWVwYWdlJztcblx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcblx0fSk7XG5cblx0bWFpbkFwcC5jb250cm9sbGVyKCdhYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0ICAgICRzY29wZS5wYWdlQ2xhc3MgPSAnY29tcGFueSc7XG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcblx0fSk7XG5cblx0bWFpbkFwcC5jb250cm9sbGVyKCd3b3JrQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHQgICAgJHNjb3BlLnBhZ2VDbGFzcyA9ICd3b3JrJztcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLDApO1xuXHR9KTtcblxuXG4gIC8vY29udHJvbGxlcnNcbiAgbWFpbkFwcC5jb250cm9sbGVyKCduYXZDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pIHtcbiAgICAkc2NvcGUudmVyc2lvbiA9ICcwJztcbiAgICAkc2NvcGUuaXNBY3RpdmUgPSBmdW5jdGlvbihyb3V0ZSkge1xuICAgICAgICByZXR1cm4gcm91dGUgPT09ICRsb2NhdGlvbi5wYXRoKCk7XG4gICAgfSAgIFxuICB9KTtcblxuICBtYWluQXBwLmNvbnRyb2xsZXIoJ3Nob3dOYXZDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pIHtcbiAgICAvL2RlZmF1bHQgdGhlIG1lbnUgdG8gbm90IHNob3dcbiAgICAkc2NvcGUuc2hvd21lbnUgPSBmYWxzZTtcblxuICAgICRzY29wZS5ob3ZlckluID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMuc2hvd21lbnUgPSB0cnVlO1xuICAgIH07XG5cbiAgICAkc2NvcGUuaG92ZXJPdXQgPSBmdW5jdGlvbigpe1xuICAgICAgdGhpcy5zaG93bWVudSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY2xpY2sgPSBmdW5jdGlvbigpe1xuICAgICAgaWYgKCRzY29wZS5zaG93bWVudSkge1xuICAgICAgICAkc2NvcGUuc2hvd21lbnUgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICRzY29wZS5zaG93bWVudSA9IHRydWU7XG4gICAgICB9O1xuICAgIH07XG5cbiAgfSk7XG5cblxuXG5cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnLCBbXSk7XG5cbnJlcXVpcmUoJy4vSG9tZUN0cmwnKVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgcmVxdWlyZSgnLi9ob21lJykubmFtZVxuXSk7XG4iXX0=
