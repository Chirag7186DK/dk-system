
// dkSessionController using
app.controller('dkSessionController', function($scope, $rootScope, UsersServices, OrderCartServices){
    
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
    
});
