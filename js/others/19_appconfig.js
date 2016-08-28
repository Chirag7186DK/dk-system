
isHeaderExecutingOnServerLevel = 'Y';
apiUrlAccessHashValue = 'trr36pdthb9xbhcppyqkgbpkq';
globalBaseSitePath = 'http://localhost/dk-system/';
//globalBaseSitePath = 'http://192.168.1.103/dk-system/';
product_versionyear = '2016';
isProductInMaintainanceMode = 'N';
isDisableDocumentRightClick = 'Y';

// web-app loaded on devices type detect here width/height
var deviceWidth = parseInt($(window).width());
var deviceHeight = parseInt($(window).height());
console.log("on load deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);
//alert("on laod deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);

// web-app module defined here 
var dkapp = angular.module('DKAPP', []);

dkapp.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                    .state('login', {
                            url: '/login',
                            templateUrl: './app/login/login.html',
                            controller: LoginCtrl,
                            controllerAs: 'vm'
                    })
                    .state('dashboard', {
                            url: '/dashboard',
                            templateUrl: './app/dashboard/dashboard.html',
                            controller: DashboardCtrl,
                            controllerAs: 'vm'
                    });

            $urlRouterProvider.otherwise('/login');
    }
]);