(function () {
  // Load Zurb
  $(document).foundation();

  // MODULE
  var weatherApp = angular.module('weatherOracle', ['ngResource', 'ngRoute']);

  // ROUTING
  weatherApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
      })
      .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'  
      })
      .when('/requirements', {
        templateUrl: 'pages/requirements.html',
        controller: 'requirementsController'
      })
  });

  // SERVICES
  weatherApp.service('cityService', function (){
    
    this.city = 'San Francisco, CA';
  });

  // CONTROLLERS
  weatherApp.controller('mainController', ['$scope', 'cityService', function ($scope, cityService){

    $scope.cityName = cityService.city;
    $scope.$watch('cityName', function () {
      cityService.city = $scope.cityName;
    });
    
  }]);

  weatherApp.controller('forecastController', ['$scope', 'cityService', function ($scope, cityService){

    $scope.cityName = cityService.city;
    
  }]);

  weatherApp.controller('requirementsController', ['$scope', function ($scope){

  }]);

}());