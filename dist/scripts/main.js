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

  mainApp.controller('showNavController', function($scope, $location) {


  });





},{}],2:[function(require,module,exports){
module.exports = angular.module('app.home', []);

require('./HomeCtrl')

},{"./HomeCtrl":1}],3:[function(require,module,exports){
angular.module('app', [
  require('./home').name
]);

},{"./home":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL25vZGVfbW9kdWxlcy9waG8tZGV2c3RhY2svbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL3NyYy9zY3JpcHRzL2hvbWUvSG9tZUN0cmwuanMiLCIvVXNlcnMvZmlsaXBkYW5pc2tvL3dvcmsvZ3JlZW53b29kZW50cy9zcmMvc2NyaXB0cy9ob21lL2luZGV4LmpzIiwiL1VzZXJzL2ZpbGlwZGFuaXNrby93b3JrL2dyZWVud29vZGVudHMvc3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbWFpbkFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSk7XG5cblx0Ly9yb3V0aW5nXG5cdG1haW5BcHAuY29uZmlnKGZ1bmN0aW9uICgkcm91dGVQcm92aWRlcikge1xuXHQgICRyb3V0ZVByb3ZpZGVyLlxuICAgICAgd2hlbignL2Fib3V0Jywge3RlbXBsYXRlVXJsOiAnY29tcGFueS5odG1sJywgY29udHJvbGxlcjogJ2Fib3V0Q29udHJvbGxlcid9KS5cbiAgICAgIHdoZW4oJy93b3JrJywge3RlbXBsYXRlVXJsOiAnd29yay5odG1sJywgY29udHJvbGxlcjogJ3dvcmtDb250cm9sbGVyJ30pLlxuICAgICAgd2hlbignL2hvbWUnLCB7dGVtcGxhdGVVcmw6ICdob21lcGFnZS5odG1sJywgY29udHJvbGxlcjogJ2hvbWVDb250cm9sbGVyJ30pLlxuICAgICAgb3RoZXJ3aXNlKHtyZWRpcmVjdFRvOiAnL2hvbWUnfSk7XG5cdH0pXG5cblx0Ly9UZW1wbGF0aW5nXG4gIG1haW5BcHAuZGlyZWN0aXZlKCduYXZpZ2F0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZVVybDogJ25hdmlnYXRpb24uaHRtbCdcbiAgICB9O1xuICB9KTtcblxuXG5cbiAgbWFpbkFwcC5jb250cm9sbGVyKCdob21lQ29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICRzY29wZS5wYWdlQ2xhc3MgPSAnaG9tZXBhZ2UnO1xuXHRcdHdpbmRvdy5zY3JvbGxUbygwLDApO1xuXHR9KTtcblxuXHRtYWluQXBwLmNvbnRyb2xsZXIoJ2Fib3V0Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSkge1xuXHQgICAgJHNjb3BlLnBhZ2VDbGFzcyA9ICdjb21wYW55Jztcblx0XHRcdHdpbmRvdy5zY3JvbGxUbygwLDApO1xuXHR9KTtcblxuXHRtYWluQXBwLmNvbnRyb2xsZXIoJ3dvcmtDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdCAgICAkc2NvcGUucGFnZUNsYXNzID0gJ3dvcmsnO1xuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsMCk7XG5cdH0pO1xuXG5cbiAgLy9jb250cm9sbGVyc1xuICBtYWluQXBwLmNvbnRyb2xsZXIoJ25hdkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuICAgICRzY29wZS52ZXJzaW9uID0gJzAnO1xuICAgICRzY29wZS5pc0FjdGl2ZSA9IGZ1bmN0aW9uKHJvdXRlKSB7XG4gICAgICAgIHJldHVybiByb3V0ZSA9PT0gJGxvY2F0aW9uLnBhdGgoKTtcbiAgICB9ICAgXG5cbiAgICAvL2RlZmF1bHQgZm9ybSBtZW51IHRvIG5vdCBzaG93XG4gICAgJHNjb3BlLnNob3dtZW51ID0gZmFsc2U7XG5cbiAgICAkc2NvcGUuaG92ZXJJbiA9IGZ1bmN0aW9uKCl7XG4gICAgICB0aGlzLnNob3dtZW51ID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmhvdmVyT3V0ID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMuc2hvd21lbnUgPSBmYWxzZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLmNsaWNrID0gZnVuY3Rpb24oKXtcbiAgICAgIGlmICgkc2NvcGUuc2hvd21lbnUpIHtcbiAgICAgICAgJHNjb3BlLnNob3dtZW51ID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkc2NvcGUuc2hvd21lbnUgPSB0cnVlO1xuICAgICAgfTtcbiAgICB9O1xuICB9KTtcblxuICBtYWluQXBwLmNvbnRyb2xsZXIoJ3Nob3dOYXZDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pIHtcblxuXG4gIH0pO1xuXG5cblxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFtdKTtcblxucmVxdWlyZSgnLi9Ib21lQ3RybCcpXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICByZXF1aXJlKCcuL2hvbWUnKS5uYW1lXG5dKTtcbiJdfQ==
