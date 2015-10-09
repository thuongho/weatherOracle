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

  weatherApp.controller('forecastController', ['$scope', '$resource', 'cityService', function ($scope, $resource, cityService){

    $scope.cityName = cityService.city;

    // get external data from weather api
    // url, paramDefaults, actions
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", { callback: "JSON_CALLBACK"}, { get: { method: "JSONP" }});

    // assign the data
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: 2 });
    
  }]);

  weatherApp.controller('requirementsController', ['$scope', function ($scope){

  }]);

}());