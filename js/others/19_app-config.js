
// web-app module defined here 
angular.module('DKAPP', ['ngRoute']);

angular.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider) {
            
    $stateProvider
    .state('/', {
        url:"/",
        templateUrl: 'initial.php'
    });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({ enabled: true, requireBase: true });

}]);