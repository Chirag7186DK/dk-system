
angular.module('DKAPP').controller('dkSessionController', dkSessionController);

// dkSessionController using
function dkSessionController($scope, $rootScope){
    
    // global variable declare 
    // this variable will be reflect on ui screen
    $rootScope.isUserChangedDeliveryCity = false;
    $rootScope.isUserChangedDeliveryArea = false;
    $rootScope.dkDeliveryCityList = false;
    $rootScope.userSelectedDeliveryCity = '';
    $rootScope.dkDeliveryAreaList = false;
    $rootScope.userSelectedDeliveryArea = '';
    
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
                // reset user product data in session
                resetUserproductSessionData();
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
    
}
