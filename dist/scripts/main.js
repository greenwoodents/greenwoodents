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
	});

	mainApp.controller('aboutController', function($scope) {
	    $scope.pageClass = 'company';
	});

	mainApp.controller('workController', function($scope) {
	    $scope.pageClass = 'work';
	});


  //controllers
  mainApp.controller('navController', function($scope, $location) {
    $scope.version = '0';

    $scope.isActive = function(route) {
        return route === $location.path();
    }
  });

},{}],2:[function(require,module,exports){
module.exports = angular.module('app.home', []);

require('./HomeCtrl')

},{"./HomeCtrl":1}],3:[function(require,module,exports){
angular.module('app', [
  require('./home').name
]);

},{"./home":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL25vZGVfbW9kdWxlcy9waG8tZGV2c3RhY2svbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL3NyYy9zY3JpcHRzL2hvbWUvSG9tZUN0cmwuanMiLCIvVXNlcnMvZmlsaXBkYW5pc2tvL3dvcmsvZ3JlZW53b29kZW50cy9zcmMvc2NyaXB0cy9ob21lL2luZGV4LmpzIiwiL1VzZXJzL2ZpbGlwZGFuaXNrby93b3JrL2dyZWVud29vZGVudHMvc3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgbWFpbkFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFsnbmdSb3V0ZScsICduZ0FuaW1hdGUnXSk7XG5cdFxuXHQvL3JvdXRpbmdcblx0bWFpbkFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdCAgJHJvdXRlUHJvdmlkZXIuXG4gICAgICB3aGVuKCcvYWJvdXQnLCB7dGVtcGxhdGVVcmw6ICdjb21wYW55Lmh0bWwnLCBjb250cm9sbGVyOiAnYWJvdXRDb250cm9sbGVyJ30pLlxuICAgICAgd2hlbignL3dvcmsnLCB7dGVtcGxhdGVVcmw6ICd3b3JrLmh0bWwnLCBjb250cm9sbGVyOiAnd29ya0NvbnRyb2xsZXInfSkuXG4gICAgICB3aGVuKCcvaG9tZScsIHt0ZW1wbGF0ZVVybDogJ2hvbWVwYWdlLmh0bWwnLCBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInfSkuXG4gICAgICBvdGhlcndpc2Uoe3JlZGlyZWN0VG86ICcvaG9tZSd9KTtcblx0fSlcblx0XG5cdC8vVGVtcGxhdGluZ1xuICBtYWluQXBwLmRpcmVjdGl2ZSgnbmF2aWdhdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICduYXZpZ2F0aW9uLmh0bWwnXG4gICAgfTtcbiAgfSk7XG5cblxuXG4gIG1haW5BcHAuY29udHJvbGxlcignaG9tZUNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAkc2NvcGUucGFnZUNsYXNzID0gJ2hvbWVwYWdlJztcblx0fSk7XG5cblx0bWFpbkFwcC5jb250cm9sbGVyKCdhYm91dENvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0ICAgICRzY29wZS5wYWdlQ2xhc3MgPSAnY29tcGFueSc7XG5cdH0pO1xuXG5cdG1haW5BcHAuY29udHJvbGxlcignd29ya0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0ICAgICRzY29wZS5wYWdlQ2xhc3MgPSAnd29yayc7XG5cdH0pO1xuXG5cbiAgLy9jb250cm9sbGVyc1xuICBtYWluQXBwLmNvbnRyb2xsZXIoJ25hdkNvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuICAgICRzY29wZS52ZXJzaW9uID0gJzAnO1xuXG4gICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24ocm91dGUpIHtcbiAgICAgICAgcmV0dXJuIHJvdXRlID09PSAkbG9jYXRpb24ucGF0aCgpO1xuICAgIH1cbiAgfSk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXIubW9kdWxlKCdhcHAuaG9tZScsIFtdKTtcblxucmVxdWlyZSgnLi9Ib21lQ3RybCcpXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICByZXF1aXJlKCcuL2hvbWUnKS5uYW1lXG5dKTtcbiJdfQ==
