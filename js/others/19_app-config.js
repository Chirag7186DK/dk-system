
'use strict';

// web-app module defined here 
var DKAPP = angular.module('DKAPP', ['ui.router']);

DKAPP.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', 
    function($locationProvider, $stateProvider, $urlRouterProvider){
            
        $stateProvider
            .state('/', {
                url:"/",
                templateUrl: 'home.php'
            })
            .state('home', {
                url:"/home",
                templateUrl: 'home.php'
            })
            .state('party-order', {
                url:"/party-order",
                templateUrl: 'partyorder.php'
            })
            .state('customize-order', {
                url:"/customize-order",
                templateUrl: 'customizeorder.php'
            })
            .state('all-stores-cakes', {
                url:"/all-stores-cakes",
                templateUrl: 'all-stores-cakes.php'
            })
            .state('store-all-cakes', {
                url:"/store-all-cakes",
                templateUrl: 'store-all-cakes.php'
            })
            .state('cakes-product', {
                url:"/cakes-product",
                templateUrl: 'cakes-product.php'
            })
            .state('account-signup-signin', {
                url:"/account-signup-signin",
                templateUrl: 'account-signup-signin.php'
            })
            .state('customer-account', {
                url:"/customer-account",
                cache:false,
                templateUrl: 'customer-account.php'
            })
            .state('checkout', {
                url:"/checkout",
                templateUrl: 'checkout.php'
            });
            
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode({ enabled: true, requireBase: true});

}]);