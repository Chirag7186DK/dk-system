
angular.module('DKAPP').controller('dkSessionController', dkSessionController);

// dkSessionController
function dkSessionController($rootScope, $state, CommonServices){
    
    $rootScope.CommonServicesObj = CommonServices;
    
    // loadDefaultDataInDkSession
    $rootScope.loadDefaultDataInDkSession = function(pageLoad){
        try{
            if(checkDkSessionParamObjExists()==='FALSE' && pageLoad==='home'){
                var rtStatusDkSessionDataInitialized = initializeDkSessionData(); 
                console.log("rtStatusDkSessionDataInitialized=>"+rtStatusDkSessionDataInitialized);
            }else if(checkDkSessionParamObjExists()==='TRUE' && pageLoad==='home'){
                // reset user product data in session
                generateDkUserSessionId();
                resetUserproductSessionData();
            }else if(checkDkSessionParamObjExists()==='FALSE' && pageLoad!=='home'){
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
