
angular.module('DKAPP').controller('CheckoutController', CheckoutController);

// CheckoutController
function CheckoutController($rootScope, OrderCartServices){
    
    // gotoCheckout
    $rootScope.gotoCheckoutProcess = function(){
        try{
            // check user logged in session
            var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
            if(authenticatedUserParamDataObj!==false 
                && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                window.location.href = globalBaseSitePath+"checkout.php";
            }else{
                window.location.href = globalBaseSitePath;
            }
        }catch(ex){
            console.log("problem in gotoCheckoutProcess ex=>"+ex);
        }
    };
    
    // loadStorewiseOrderSummaryForCheckoutProcess
    $rootScope.loadStorewiseOrderSummaryForCheckoutProcess = function(){
        try{
            var authenticatedUserParamDataObj = getParamDataAuthenticatedUserDetailsFromSession();
            if(authenticatedUserParamDataObj!==false 
                && jQuery.isEmptyObject(authenticatedUserParamDataObj)===false){
                var fetchedParamJsonObj = {};
                fetchedParamJsonObj['dkParamDataArr'] = authenticatedUserParamDataObj;
                // calling OrderCartServices 
                OrderCartServices.getStorewiseOrderSummaryForCheckoutProcess(fetchedParamJsonObj).done(function(retResponseJson){
                    $rootScope.$apply(function(){
                        var storewiseOrderSummaryData =  false;
                        if(retResponseJson!==false && retResponseJson!==undefined && retResponseJson!==''){
                            storewiseOrderSummaryData = extractDataFromReturnAjaxResponse('GET', 'apiFile', 'storewiseOrderSummaryData', retResponseJson);
                        }
                        if(storewiseOrderSummaryData!==false && storewiseOrderSummaryData!==undefined 
                            && jQuery.isEmptyObject(storewiseOrderSummaryData)===false){
                            $rootScope.storewiseOrderSummaryData =  storewiseOrderSummaryData;
                        }else{
                            window.location.href = globalBaseSitePath;
                        }
                    });
                });
            }else{
                window.location.href = globalBaseSitePath;
            }
        }catch(ex){
            console.log("problem in loadStorewiseOrderSummaryForCheckoutProcess ex=>"+ex);
        }
    };

    
}
