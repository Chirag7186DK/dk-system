
angular.module('DKAPP').controller('dkSessionController', dkSessionController);

// dkSessionController using
function dkSessionController($rootScope, $state, CommonServices){
    
    $rootScope.CommonServicesObj = CommonServices;
    console.log($rootScope.CommonServicesObj);
    
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
                generateDkUserSessionId();
                resetUserproductSessionData();
            }else if((sessionStorage.getItem('DKPARAMOBJ')===null || sessionStorage.getItem('DKPARAMOBJ')===undefined 
                || sessionStorage.getItem('DKPARAMOBJ')==='' || sessionStorage.getItem('DKPARAMOBJ')===false) && pageLoad!=='home'){
                // clear browser cookies and other thing by javascript
                resetDKSessionData();
                // redirect to main page of desserts khazana
                // window.location = globalBaseSitePath;
                $state.go("/");
            }
        }catch(ex){
            console.log("problem in loadDefaultDataInDkSession ex=>"+ex);
        }
    };
    
}
