
angular.module('DKAPP').controller('CheckoutController', CheckoutController);

// CheckoutController
function CheckoutController($rootScope){
    
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
}
