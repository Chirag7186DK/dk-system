
// web-app module defined here 
var DKAPP = angular.module('DKAPP', ['ngRoute']);

DKAPP.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
            
    $stateProvider
    .state('/', {
        url:"/",
        templateUrl: 'initial.php'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({ enabled: true, requireBase: true });

}]);