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

  // CONTROLLERS
  weatherApp.controller('mainController', ['$scope', '$log', function ($scope, $log){
    
  }]);

  weatherApp.controller('forecastController', ['$scope', function ($scope){
    
  }]);

  weatherApp.controller('requirementsController', ['$scope', function ($scope){

  }]);
}());