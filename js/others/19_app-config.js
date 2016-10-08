
'use strict';

// web-app module defined here 
var DKAPP = angular.module('DKAPP', ['ui.router']);

DKAPP.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 
    function($locationProvider, $stateProvider, $urlRouterProvider){
            
        $stateProvider
            .state('all-stores-cakes', {
                url:"/all-stores-cakes",
                templateUrl: 'all-stores-cakes.php'
            })
            .state('home', {
                url:"/home",
                templateUrl: 'home.php'
            })
            .state('/', {
                url:"/",
                templateUrl: 'home.php'
            });

        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({ enabled: true, requireBase: true});

}]);