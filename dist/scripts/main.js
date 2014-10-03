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

},{}],2:[function(require,module,exports){
module.exports = angular.module('app.home', []);

require('./HomeCtrl')

},{"./HomeCtrl":1}],3:[function(require,module,exports){
angular.module('app', [
  require('./home').name
]);

},{"./home":2}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL25vZGVfbW9kdWxlcy9waG8tZGV2c3RhY2svbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9maWxpcGRhbmlza28vd29yay9ncmVlbndvb2RlbnRzL3NyYy9zY3JpcHRzL2hvbWUvSG9tZUN0cmwuanMiLCIvVXNlcnMvZmlsaXBkYW5pc2tvL3dvcmsvZ3JlZW53b29kZW50cy9zcmMvc2NyaXB0cy9ob21lL2luZGV4LmpzIiwiL1VzZXJzL2ZpbGlwZGFuaXNrby93b3JrL2dyZWVud29vZGVudHMvc3JjL3NjcmlwdHMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBtYWluQXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcC5ob21lJywgWyduZ1JvdXRlJywgJ25nQW5pbWF0ZSddKTtcblxuXHQvL3JvdXRpbmdcblx0bWFpbkFwcC5jb25maWcoZnVuY3Rpb24gKCRyb3V0ZVByb3ZpZGVyKSB7XG5cdCAgJHJvdXRlUHJvdmlkZXIuXG4gICAgICB3aGVuKCcvYWJvdXQnLCB7dGVtcGxhdGVVcmw6ICdjb21wYW55Lmh0bWwnLCBjb250cm9sbGVyOiAnYWJvdXRDb250cm9sbGVyJ30pLlxuICAgICAgd2hlbignL3dvcmsnLCB7dGVtcGxhdGVVcmw6ICd3b3JrLmh0bWwnLCBjb250cm9sbGVyOiAnd29ya0NvbnRyb2xsZXInfSkuXG4gICAgICB3aGVuKCcvaG9tZScsIHt0ZW1wbGF0ZVVybDogJ2hvbWVwYWdlLmh0bWwnLCBjb250cm9sbGVyOiAnaG9tZUNvbnRyb2xsZXInfSkuXG4gICAgICBvdGhlcndpc2Uoe3JlZGlyZWN0VG86ICcvaG9tZSd9KTtcblx0fSlcblxuXHQvL1RlbXBsYXRpbmdcbiAgbWFpbkFwcC5kaXJlY3RpdmUoJ25hdmlnYXRpb24nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnbmF2aWdhdGlvbi5odG1sJ1xuICAgIH07XG4gIH0pO1xuXG5cblxuICBtYWluQXBwLmNvbnRyb2xsZXIoJ2hvbWVDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgJHNjb3BlLnBhZ2VDbGFzcyA9ICdob21lcGFnZSc7XG5cdFx0d2luZG93LnNjcm9sbFRvKDAsMCk7XG5cdH0pO1xuXG5cdG1haW5BcHAuY29udHJvbGxlcignYWJvdXRDb250cm9sbGVyJywgZnVuY3Rpb24oJHNjb3BlKSB7XG5cdCAgICAkc2NvcGUucGFnZUNsYXNzID0gJ2NvbXBhbnknO1xuXHRcdFx0d2luZG93LnNjcm9sbFRvKDAsMCk7XG5cdH0pO1xuXG5cdG1haW5BcHAuY29udHJvbGxlcignd29ya0NvbnRyb2xsZXInLCBmdW5jdGlvbigkc2NvcGUpIHtcblx0ICAgICRzY29wZS5wYWdlQ2xhc3MgPSAnd29yayc7XG5cdFx0XHR3aW5kb3cuc2Nyb2xsVG8oMCwwKTtcblx0fSk7XG5cblxuICAvL2NvbnRyb2xsZXJzXG4gIG1haW5BcHAuY29udHJvbGxlcignbmF2Q29udHJvbGxlcicsIGZ1bmN0aW9uKCRzY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgJHNjb3BlLnZlcnNpb24gPSAnMCc7XG4gICAgJHNjb3BlLmlzQWN0aXZlID0gZnVuY3Rpb24ocm91dGUpIHtcbiAgICAgICAgcmV0dXJuIHJvdXRlID09PSAkbG9jYXRpb24ucGF0aCgpO1xuXG5cbiAgICB9XG4gIH0pO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyLm1vZHVsZSgnYXBwLmhvbWUnLCBbXSk7XG5cbnJlcXVpcmUoJy4vSG9tZUN0cmwnKVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtcbiAgcmVxdWlyZSgnLi9ob21lJykubmFtZVxuXSk7XG4iXX0=
