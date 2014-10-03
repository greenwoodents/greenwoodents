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
