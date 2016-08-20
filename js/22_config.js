
isHeaderExecutingOnServerLevel = 'Y';
apiUrlAccessHashValue = 'trr36pdthb9xbhcppyqkgbpkq';
globalBaseSitePath = 'http://localhost/dk-system/';
//globalBaseSitePath = 'http://192.168.1.103/dk-system/';
product_versionyear = '2016';
isProductInMaintainanceMode = 'N';
isDisableDocumentRightClick = 'Y';

// web-app loaded on devices type detect here
var isWindowResize = 'N';
var deviceWidth = parseInt($(window).width());
var deviceHeight = parseInt($(window).height());
console.log("on load deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);
//alert("on laod deviceWidth=>"+deviceWidth+", deviceHeight=>"+deviceHeight);

// web-app module defined here 
var app = angular.module('DESSERTSKHAZANAAPP', []);

// userSessionController using
app.controller('userSessionController', function($scope, $rootScope, UsersServices, OrderCartServices){
    
    // global variable declare 
    // this variable will be reflect on ui screen
    $rootScope.isDkDeliveryCityChanged = false;
    $rootScope.isDkDeliveryAreaChanged = false;
    $rootScope.dkDeliveryCityList = false;
    $rootScope.defaultedSelectedDKDeliveryCity = '';
    $rootScope.dkDeliveryAreaList = false;
    $rootScope.defaultedSelectedDKDeliveryArea = '';
    $rootScope.dkDeliveryAreaBasedProductTypeList = false;
    $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeValue = '';
    $rootScope.defaultedSelectedDKDeliveryAreaBasedProductTypeTitle = '';
    $rootScope.isDessertsProductTypeProductListLoaded = false;
    
    // loadDefaultDataInDkSession
    $rootScope.loadDefaultDataInDkSession = function(pageLoad){
        try{
            // check DKPARAMOBJ is available or not in session storage
            if((sessionStorage.getItem('DKPARAMOBJ')===null || sessionStorage.getItem('DKPARAMOBJ')===undefined 
                || sessionStorage.getItem('DKPARAMOBJ')==='' || sessionStorage.getItem('DKPARAMOBJ')===false) && pageLoad==='home'){
                var retStatusResetDkSessionDataCleared = initializeDkSessionData();  
                if(retStatusResetDkSessionDataCleared===true){
                }
            }else if((sessionStorage.getItem('DKPARAMOBJ')!==null && sessionStorage.getItem('DKPARAMOBJ')!==undefined 
                && sessionStorage.getItem('DKPARAMOBJ')!=='' && sessionStorage.getItem('DKPARAMOBJ')!==false) && pageLoad==='home'){
                // generate new user session id
                generateDkUserSessionId();
                addTrackingUserInfoAccessingWebsitesDetails(pageLoad);
            }else if((sessionStorage.getItem('DKPARAMOBJ')===null || sessionStorage.getItem('DKPARAMOBJ')===undefined 
                || sessionStorage.getItem('DKPARAMOBJ')==='' || sessionStorage.getItem('DKPARAMOBJ')===false) && pageLoad!=='home'){
                // clear browser cookies and other thing by javascript
                resetDKSessionData();
                // redirect to main page of desserts khazana
                window.location = globalBaseSitePath;
            }
        }catch(ex){
            console.log("problem in loadDefaultDataInDkSession ex=>"+ex);
        }
    };
    
    // checkInBackgroundDataAvailableForUpdationFromSession
    $rootScope.checkInBackgroundDataAvailableForUpdationFromSession = function(pageLoad){
        OrderCartServices.addProductDataInOrdercart(false, false, 'session');
    };
    
});
