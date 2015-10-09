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
    // params in the api url
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.cityName, cnt: 2 });

    // console.log($scope.weatherResult);

    // function to convert K to F
    $scope.convertToFahrenheit = function(degK) {
      return Math.round((1.8 * (degK -273)) + 32);
    };

    // function to convert time to human readable time
    $scope.convertToDate = function(dt) {
      // multiply 1000 to convert milliseconds to second
      return new Date(dt * 1000);
    };
    
  }]);

  weatherApp.controller('requirementsController', ['$scope', function ($scope){

  }]);

}());